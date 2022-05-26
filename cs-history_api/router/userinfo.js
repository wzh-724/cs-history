const express = require('express');
// 挂载路由
const router = express.Router();

// 导入路由模块处理函数
const userinfo_handler = require('../router_handler/userinfo');



// 获取用户基本信息的路由
router.get('/userinfo', userinfo_handler.getUserInfo);
// 获取所有用户信息的路由
router.get('/user', userinfo_handler.getUser);
// 更新用户信息的路由 
router.post('/updateuserinfo', userinfo_handler.updateUserInfo);
// 更改密码的路由
router.post('/updatepwd', userinfo_handler.updatePassword);
// 更改头像的路由
router.post('/update/avatar', userinfo_handler.updateAvatar);
// 删除指定用户的路由
router.post('/deleteuser', userinfo_handler.deleteUser);
// 分页
router.get('/getcurrentpage', userinfo_handler.getCurrentPage);
//查看用户是否已存在
router.get('/selectusername', userinfo_handler.selectUsername);
module.exports = router;








