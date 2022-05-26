// 文章的路由模块
const express = require('express');
const router = express.Router();

// 导入需要的处理函数模块
const article_handler = require('../router_handler/article');
// 后台Api
// 发布文章的路由
router.post('/addarticle', article_handler.addArticle);
// 查询所有文章的路由
router.get("/getarticle", article_handler.getArticle);
// 通过 id 查询文章的路由
router.get("/getidarticle", article_handler.getIdArticle);
// 通过id 修改文章的路由
router.post('/updateidarticle', article_handler.updateIdArticle);
// 删除文章的路由
router.post('/deleteidarticle', article_handler.deleteIdArticle);

// 前台Api
// 获取文章数据
router.get("/getarticlefr", article_handler.getArticlefr);
// 根据Id获取文章数据
router.get("/getidarticlefr", article_handler.getIdArticleFr);
// 根据分类标签获取文章
router.get("/getcatenamearticle", article_handler.getCateNameArticle);
// 根据点赞数查询
router.get("/gethotspot", article_handler.getHotSpot);

router.get("/getrelics", article_handler.getRelics);
// 随机获取几条文章信息
router.get("/getcarousel", article_handler.getCarousel);
// 点赞
router.post("/postlike", article_handler.postLike);
// 查询文章分类的路由
router.get("/cates", article_handler.Cates);
// 文章访问量加一
router.post("/updateread", article_handler.updateRead);
// 每种分类的总访问量
router.get("/catenameread", article_handler.cateNameRead);

module.exports = router