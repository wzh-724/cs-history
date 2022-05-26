const express = require('express');
// 挂载路由
const router = express.Router();

// 导入路由模块处理函数
const message_handler = require('../router_handler/message');




// 新增留言
router.post('/newmessage', message_handler.newMessage);
// 前台查询留言
router.get("/getmessage", message_handler.getMessage);
// 后台查询留言
router.get("/getmessageback", message_handler.getMessageBack);
//删除用户留言
router.post("/deletemessage", message_handler.deleteMessage);
// 回复留言
router.post("/updatemessage", message_handler.updateMessage);
module.exports = router;








