USE generalBlogs;

CREATE TABLE blogs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description VARCHAR(255),
    content TEXT
);

INSERT INTO blogs (title, description, content)
VALUES ('First Blog', 'This is the first blog', 'Welcome to my blog!');
