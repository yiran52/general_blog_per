## 安装依赖
```shell
npm install
```
## 运行项目
1. npm install -g pm2
2. pm2 start app.js  - 这会在后台启动你的应用，并且即使你关闭了命令行窗口，你的应用也会继续运行
3. 其他 PM2 命令

pm2 list 列出由 PM2 管理的所有应用。
pm2 stop app 停止名为 "app" 的应用。
pm2 restart app 重启名为 "app" 的应用。
pm2 delete app 删除名为 "app" 的应用。
4. pm2 startup  PM2 提供了一种方式让你的应用在服务器重启时自动启动
## 构建与运行
```shell
//依次执行
docker system prune --all --force --volumes
docker network create general_blog_per_default
docker-compose -f docker-compose.yml up --build //这将构建并打开你的项目
    
//构建多平台时使用-在docker-compose.yml中配置platform: linux/amd64打包amd64的应用
- vim ~/.docker/config.json
- 添加"experimental": "enabled"
- DOCKER_CLI_EXPERIMENTAL=enabled docker-compose up --build
```

## 数据库操作
```shell
1. docker ps
2. docker exec -it <container-id> mysql -u root -p
3. sql语句执行，创建表
```
# 自动同步修改
> 修改文件自动同步