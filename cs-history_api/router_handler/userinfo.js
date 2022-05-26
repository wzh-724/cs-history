// 导入数据库操作模块
const db = require('../db/index')

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  // 定义查询用户信息的 SQL 语句
  const sql = `select user_id,user_name,password,phone,avatar from cs_user where user_id= ? `
  // const sql = `select * from cs_user where user_name=?`;
  db.query(sql, req.query.user_id, (err, results) => {
    // 执行 sql 语句失败
    if (err) return res.cc(err);
    // 执行 SQL 语句成功，但是查询的结果可能为空
    if (results.length !== 1) return res.cc('获取用户信息失败!');
    // 用户信息获取成功
    res.send({
      status: 0,
      message: '获取用户信息成功!',
      data: results[0],
    })
  })
}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, resp) => {
  let userinfo = req.body.userInfo;
  const sql = 'update cs_user set ? where user_id=?';
  db.query(sql, [userinfo, userinfo.user_id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return resp.cc(err);
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return resp.cc('更新用户的基本信息失败!');
    // 成功
    resp.cc('更新用户信息成功', 0);
  })
}

// 更新用户密码的处理函数
exports.updatePassword = (req, resp) => {
  // 根据id查询用户的信息
  const sql = 'select * from cs_user where user_id=?';
  db.query(sql, req.body.user_id, (err, results) => {
    ``
    // 执行 SQL 语句失败
    if (err) return resp.cc(err);
    // 判断结果是否存在
    if (results.length !== 1) return resp.cc('用户不存在！');
    if (req.body.oldPwd !== results[0].password) {
      return resp.cc('旧密码错误');
    }
    const sql = 'update cs_user set password=? where user_id=?';
    db.query(sql, [req.body.newPwd, req.body.user_id], (err, results) => {
      // 执行 SQL 语句失败
      if (err) return resp.cc(err);
      // 影响的行数不为1
      if (results.affectedRows !== 1) return resp.cc('更新密码失败!');
      // 成功
      resp.cc('更新密码成功', 0);
    })
  })


}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  const sql = 'update cs_user set avatar=? where user_id=?';
  db.query(sql, [req.body.avatar, req.body.user_id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 影响的行数是否等于 1
    if (results.affectedRows !== 1) return res.cc('更换头像失败！')
    // 成功
    res.cc('更换头像成功！', 0)
  })
}

//查看用户名是否已存在
exports.selectUsername = (req, resp) => {

  const sql = "select * from cs_user where name=?";
  db.query(sql, req.query.name, (err, results) => {
    if (err) return resp.cc(err);
    // resp.cc("用户名已存在", 0);
    console.log(results[0]);
    if (results.length == 0) {
      resp.send({
        status: 0,
        message: "用户名可修改",
        data: results,
      })
    } else {
      if (req.query.user_id == results[0].user_id) {
        resp.send({
          status: 0,
          message: "用户名可修改",
          data: results,
        })
      } else {
        resp.send({
          status: 1,
          message: "用户名已存在",
          data: results,
        })
      }

    }

  })
}
// 获取全部用户信息
exports.getUser = (req, resp) => {
  const sql = 'select * from cs_user';

  db.query(sql, (err, results) => {
    // 执行 sql 语句失败
    if (err) return resp.cc(err);
    resp.send({
      status: 0,
      message: '获取用户信息成功!',
      data: results,
    })
  })
}
// 删除指定用户
exports.deleteUser = (req, resp) => {
  const sql = 'delete from cs_user where user_id=?';
  db.query(sql, req.body.user_id, (err, results) => {
    if (err) return resp.cc(err);
    // 影响的行数是否等于 1
    if (results.affectedRows !== 1) return resp.cc('删除用户失败');
    resp.send({
      status: 0,
      message: '删除用户成功!',
      data: results,
    })
  })


}

exports.getCurrentPage = (req, resp) => {
  // 接收客户端传递过来的当前页参数
  let page = req.query.page;
  // 每一页显示的数据条数
  let pagesize = req.query.pagesize;
  let state = (page - 1) * pagesize;
  let content = [];
  let tables = [];
  let sql = 'select * from cs_user';
  if (req.query.query) {
    sql += " where name like ? ORDER BY user_id";
    content.push("%" + req.query.query + "%");
  }
  db.query(sql, content, (err, results) => {
    if (err) { return resp.cc(err) };
    for (let i = state; i < state + 8; i++) {
      tables.push(results[i]);
      tables = tables.filter((x) => {
        return x;
      })
    }
    let total = results.length;
    resp.send({
      status: 0,
      message: '获取用户信息成功!',
      tables: tables,
      total: total,
    })
    // let total = Math.ceil(count / pagesize);

  })

}