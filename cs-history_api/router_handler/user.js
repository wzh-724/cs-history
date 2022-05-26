// 用户相关的路由处理函数
// 导入数据库操作模块
const db = require('../db/index');


// 注册用户的处理函数
exports.regUser = (req, res) => {
  const userinfo = req.body.userInfo;
  // 定义 sql 语句
  const sql = 'select * from cs_user where name=? ';
  db.query(sql, [userinfo.name], (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      // return res.send({ status: 1, message: err.message });
      return res.cc(err);
    }
    // 判断用户名是否被占用
    if (results.length > 0) {
      // return res.send({ status: 1, message: '用户名被占用,请更换其他用户名' });
      return res.cc('用户名被占用,请更换其他用户名');
    }
    // 定义插入新用户的 SQL 语句
    const sql = 'INSERT INTO cs_user(name,password,phone,email,avatar,sign) VALUES(?,?,?,?,?,?)';
    db.query(sql, [userinfo.name, userinfo.password, userinfo.phone, userinfo.email, userinfo.avatar, userinfo.sign], (err, results) => {
      // 执行 SQL 语句失败
      if (err) {
        // return res.send({ status: 1, message: err.message });
        return res.cc(err);
      }
      // 判断影响行数是否为1
      if (results.affectedRows !== 1) {
        // return res.send({ status: 1, message: '注册用户失败,请稍后再试!' });
        return res.cc('注册用户失败,请稍后再试!');
      }
      // res.send({
      //   status: 0,
      //   message: '注册成功!',
      // })
      res.cc('注册成功!', 0)
    })

  })
}
// 登陆的处理函数
exports.login = (req, res) => {
  // 接收表单的数据
  const userinfo = req.body;
  // 定义 sql 语句
  const sql = `select * from cs_user where name=?`;
  // 执行sql语句，根据用户名查看用户的信息
  db.query(sql, userinfo.name, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);
    // 执行 SQL 语句成功，但是获取到的数据条数不等于 1
    if (results.length !== 1) return res.cc('用户名错误!');
    // 判断密码是否正确
    if (userinfo.password !== results[0].password) {
      return res.cc('密码不正确!');
    }

    res.send({
      status: 0,
      message: '登录成功！',
      data: results[0],
    })


  })
}