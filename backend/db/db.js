// 1.导入 mysql 模块
import mysql from 'mysql'

// 2.建立与 MySQL 数据库的连接
var db = mysql.createConnection({
    host: 'localhost',  //数据库的IP地址
    user: 'root',       //登录数据库的账号
    password: 'root',  //登录数据库的密码
    database: 'shop',   //指定要操作哪个数据库
    port:3306,
    multipleStatements: true,  // 允许多条sql同时查询
});

db.connect();

export default db;