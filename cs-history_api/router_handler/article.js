// 文章的处理函数模块
const db = require('../db/index')

// 系统后台api
// 发布文章的处理函数
exports.addArticle = (req, res) => {
  const articleinfo = req.body.article;
  const sql = `insert into cs_articles set ?`
  db.query(sql, articleinfo, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('发布新文章失败！')
    res.cc('发布文章成功！', 0)
  })
}

// 查询文章的处理函数
exports.getArticle = (req, resp) => {
  // 接收客户端传递过来的当前页参数
  let page = req.query.page;
  // 每一页显示的数据条数
  let pagesize = req.query.pagesize;
  let state = (page - 1) * pagesize;
  let content = [];
  let tables = [];
  let sql = 'select * from cs_articles';
  if (req.query.query) {
    sql += " where title like ? order by id";
    content.push("%" + req.query.query + "%");
  }
  db.query(sql, content, (err, results) => {
    if (err) return resp.cc(err);
    for (let i = state; i < state + 8; i++) {
      tables.push(results[i]);
      tables = tables.filter((x) => {
        return x;
      })
    }
    let total = results.length;
    resp.send({
      status: 0,
      message: '获取文章信息成功!',
      tables: tables,
      total: total,
    })
  })
}

// 通过 Id 查询文章的处理函数
exports.getIdArticle = (req, resp) => {
  // console.log(req.query);
  const sql = "select * from cs_articles where id=?";
  db.query(sql, req.query.id, (err, results) => {
    if (err) return resp.cc(err);
    // if (results.affectedRows !== 1) return resp.cc('查询文章失败！');
    resp.send({
      status: 0,
      message: "查询文章成功!",
      data: results[0],
    })
  })
}
// 通过 ID 修改文章的处理函数
exports.updateIdArticle = (req, resp) => {
  const articleinfo = req.body.article;
  // console.log(articleinfo);
  const sql = "update cs_articles set ? where id=?";
  db.query(sql, [articleinfo, req.body.id], (err, results) => {
    if (err) return resp.cc(err);
    if (results.affectedRows !== 1) return resp.cc("更新文章的信息失败！");
    resp.cc('更新文章信息成功', 0);
  })
}
// 通过ID删除文章的路由函数
exports.deleteIdArticle = (req, resp) => {
  const sql = "delete from cs_articles where id=?";
  db.query(sql, req.body.id, (err, results) => {
    if (err) return resp.cc(err);
    if (results.affectedRows !== 1) return resp.cc("删除文章失败！");
    resp.cc("删除文章成功！", 0);
  })
}


// 系统前台api
// 查询所有文章
exports.getArticlefr = (req, resp) => {
  let content = [];
  let sql = "select * from cs_articles";
  if (req.query.search) {
    sql += " where title like ?";
    content.push("%" + req.query.search + "%");
  }
  sql += " order by pub_data desc"
  db.query(sql, content, (err, results) => {
    if (err) return resp.cc(err);
    resp.send({
      status: 0,
      message: "文章获取成功！",
      data: results,
    })
  })
}

// 根据id查询文章
exports.getIdArticleFr = (req, resp) => {
  let id = req.query.id;
  let fid = --id;
  let bid = id + 2;
  const sql = "select * from cs_articles where id between ? and ?";
  db.query(sql, [fid, bid], (err, results) => {
    if (err) return resp.cc(err);
    let length = results.length;
    resp.send({
      status: 0,
      message: "文章获取成功！",
      data: results,
      length: length,
    })
  })
}
// 根据分类标签查询文章
exports.getCateNameArticle = (req, resp) => {
  const name = req.query.cate_name;
  const sql = "select * from cs_articles where cate_name=? order by pub_data desc";
  db.query(sql, name, (err, results) => {
    if (err) return resp.cc(err);

    resp.send({
      status: 0,
      message: "文章获取成功！",
      data: results,
    })
  })
}
// 
exports.getRelics = (req, resp) => {
  const name = req.query.cate_name;
  const sql = "select * from cs_articles where cate_name=? order by agree desc LIMIT 0,5";
  db.query(sql, name, (err, results) => {
    if (err) return resp.cc(err);
    resp.send({
      status: 0,
      message: "文章获取成功！",
      data: results,
    })
  })
}
// 根据点赞数查询
exports.getHotSpot = (req, resp) => {
  let start = parseInt(req.query.start);
  const sql = "SELECT  * from cs_articles ORDER BY agree desc LIMIT ?,5";
  db.query(sql, start, (err, results) => {
    if (err) return resp.cc(err);
    resp.send({
      status: 0,
      message: "文章获取成功！",
      data: results,
    })
  })
}
// 随机获取几条文章数据
exports.getCarousel = (req, resp) => {
  const num = parseInt(req.query.num);
  const sql = "SELECT * FROM cs_articles WHERE id >= ((SELECT MAX(id) FROM cs_articles)-(SELECT MIN(id) FROM cs_articles)) * RAND() + (SELECT MIN(id) FROM cs_articles)  LIMIT ?";
  db.query(sql, num, (err, results) => {
    if (err) return resp.cc(err);
    resp.send({
      status: 0,
      message: "文章获取成功！",
      data: results,
    })
  })
}
// 点赞
exports.postLike = (req, resp) => {
  let agree = ++req.body.agree;
  const sql = "update cs_articles set agree = ? where id = ?";

  db.query(sql, [agree, req.body.id], (err, results) => {
    if (err) return resp.cc(err);
    if (results.affectedRows !== 1) return resp.cc("点赞失败！");
    resp.send({
      status: 0,
      message: "点赞成功！",
      data: results,
    })
  })
}
// 查询文章分类
exports.Cates = (req, resp) => {
  const sql = "select * from cs_article_cate";
  db.query(sql, (err, results) => {
    if (err) return resp.cc(err);
    resp.send({
      status: 0,
      message: "查询文章分类成功！",
      data: results,
    })
  })
}
// 文章访问量加一
exports.updateRead = (req, resp) => {
  const sql = "update cs_articles set reading=? where id=?";
  db.query(sql, [req.body.reading, req.body.id], (err, results) => {
    if (err) return resp.cc(err);
    resp.send({
      status: 0,
      message: "阅读量加1",
      data: results,
    })
  })
}
// 每种分类的总访问量
exports.cateNameRead = (req, resp) => {
  const sql = "select cate_name,reading from cs_articles WHERE cate_name=?";
  db.query(sql, req.query.cate_name, (err, results) => {
    let length = results.length;
    if (err) return resp.cc(err);
    resp.send({
      status: 0,
      message: "查询成功！",
      data: results,
      length: length,
    })
  })

}