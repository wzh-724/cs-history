// 留言的处理函数
const db = require('../db/index')

// 发布留言的处理函数
exports.newMessage = (req, res) => {
  const mes = req.body.form;
  const sql = `insert into cs_message set ?`
  db.query(sql, mes, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('提交留言失败！')
    res.cc('提交留言成功！', 0)
  })
}
// 前台查询留言
exports.getMessage = (req, resp) => {
  const sql = "select * from cs_message where reply is not null";
  db.query(sql, (err, result) => {
    if (err) return resp.cc(err);
    resp.send({
      status: 0,
      message: "查询成功！",
      data: result,
    })
  })
}

// 后台查询留言
exports.getMessageBack = (req, resp) => {
  // 接收客户端传递过来的当前页参数
  let page = req.query.page;
  // 每一页显示的数据条数
  let pagesize = req.query.pagesize;
  let state = (page - 1) * pagesize;
  let content = [];
  let tables = [];
  let sql = 'select * from cs_message';
  if (req.query.query) {
    sql += " where content like ? order by mes_id";
    content.push("%" + req.query.query + "%");
  }
  db.query(sql, content, (err, results) => {
    if (err) return resp.cc(err);
    for (let i = state; i < state + 8; i++) {
      tables.push(results[i]);
      tables = tables.filter((x) => {
        return x;
      }
      )
    }
    // tables = results;
    let total = results.length;
    resp.send({
      status: 0,
      message: '获取留言信息成功!',
      tables: tables,
      total: total,
    })
  })
}
// 删除留言
exports.deleteMessage = (req, resp) => {
  const sql = "delete from cs_message where mes_id=?";
  db.query(sql, req.body.mes_id, (err, results) => {
    if (err) return resp.cc(err);
    if (results.affectedRows !== 1) return resp.cc("删除留言失败!");
    resp.cc("删除除文章成功！", 0);
  })
}

// 回复留言
exports.updateMessage = (req, resp) => {
  let mesinfo = req.body.mesInfo;
  const sql = 'update cs_message set ? where mes_id=?';
  db.query(sql, [mesinfo, mesinfo.mes_id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return resp.cc(err);
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return resp.cc('回复留言失败!');
    // 成功
    resp.cc('回复留言成功', 0);
  })
}