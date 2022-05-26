//  导入 express 模块
const express = require('express');
const bodyParser = require('body-parser');
const joi = require('joi')
// 创建 express 的服务器实例
const app = express();

// 导入 cors 模块
const cors = require('cors');
// 将cors注册成全局中间件
app.use(cors());
// 定义接收 post 数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 托管静态资源文件
app.use(express.static('public'));


// 一定要在路由模块之前，封装res.cc 函数
app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next();
})



// 导入并使用用户路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter);
// 导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo');
app.use('/my', userinfoRouter);

// 导入并使用文章的路由模块
const articleRouter = require('./router/article');
app.use('/my/article', articleRouter);
// 导入留言信息的路由模块
const messsageRouter = require('./router/message');
app.use('/my/message', messsageRouter);
// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) {
    return res.cc(err);
  }
  // 身份认证失败后的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败!');
  //  未知错误
  res.cc(err);
})

// 调用app.listen方法，指定端口好并启动web服务器
app.listen(8003
  , () => {
    console.log('api server running at http://127.0.0.1:8003');
  })