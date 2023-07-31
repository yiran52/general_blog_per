const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3005;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

var db_config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'generalBlogs',
  port: 3306
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);

  connection.connect(function(err) {
    if (err) {
      console.log('Error when connecting to MySQL:', err);
      setTimeout(handleDisconnect, 2000); 
    }                                     
  });

  connection.on('error', function(err) {
    console.log('MySQL error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                         
    } else {                                      
      throw err;                                  
    }
  });
}

handleDisconnect();

app.post('/createBlogs', (req, res) => {
  const { title, description, content } = req.body;
  connection.query('SELECT * FROM blogs WHERE title = ?', [title], function (error, results) {

    if (results?.length > 0) {
      return res.status(400).json({code:-1, message: 'Article title already exists. Please choose another title.' });
    }

    connection.query(
      'INSERT INTO blogs SET ?',
      { title, description, content },
      function (error) {
        if (error) {
          return res.status(500).json({code:-1, message: 'Error creating article' });
        }

        res.json({ code:0, data:{}, message: 'Article created successfully' });
      }
    );
  });
});
app.get('/getBlogs', (req, res) => {
  // 解析来自客户端的 page 和 pageSize 参数，如果没有提供这些参数，就使用默认值
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  // 计算 OFFSET 的值
  const offset = (page - 1) * pageSize;

  connection.query('SELECT COUNT(*) as count FROM blogs', function(error, result) {
    if (error) {
      return res.status(500).json({code:-1, message: 'Error counting blogs' });
    }

    const total = result[0].count; 

    // 在 SQL 查询中添加 LIMIT 和 OFFSET 来实现分页
    connection.query(`SELECT * FROM blogs LIMIT ${pageSize} OFFSET ${offset}`, function(error, results) {
      if (error) {
        return res.status(500).json({code:-1, message: 'Error fetching blogs' });
      }

      res.json({ code: 0, data: { total: total, blogs: results }, message: 'Blogs fetched successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

