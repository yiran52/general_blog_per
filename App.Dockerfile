# 使用官方 Node.js 作为基础镜像
FROM node:14
# 设置工作目录
WORKDIR /usr/src/app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./

COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# 安装依赖
RUN npm install

# 将应用代码复制到工作目录
COPY . .

# 开放端口，使外界可以访问你的应用
EXPOSE 3005

# 启动应用
CMD [ "npm", "start" ]
