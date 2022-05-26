// 导入 MySQL 模块
const mysql = require('mysql');

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1', //数据库地址
  user: 'root',  //用户名
  password: '1999724wzh', //密码
  database: 'csls',  //数据库名
})
module.exports = db;