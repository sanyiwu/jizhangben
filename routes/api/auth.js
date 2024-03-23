var express = require('express');
const jwt = require('jsonwebtoken');
//导入 用户的模型
const UserModel = require('../../models/UserModel');
const md5 = require('md5');
//导入配置文件
const {secret} = require('../../config/config');

var router = express.Router();

//登录操作
router.post('/login', (req,res) => {
    //获取用户名和密码
    let {username,password} = req.body;
    //查询数据库
    UserModel.findOne({username: username, password: password}).then((data) => {
        //判断 data
        if(!data){
            return res.json({
                code: '2002',
                msg: '用户名或密码错误',
                data: null
            });
        }

        //创建当前用户的 token
        let token = jwt.sign({
            username: data.username,
            _id: data._id
        }, secret, {
            expiresIn: 60 * 60 * 24 * 7
        });

        //响应token
        res.json({
            code: '2002',
            msg: '登陆成功!!!!!!!!',
            data: token
        })
    }).catch((err) => {
        res.json({
            code: '2001',
            msg: '数据库读取失败',
            data: null
        })
    })
})

//退出登录
router.post('/logout', (req,res) => {
    //销毁 session
    req.session.destroy(() => {
        res.render('success',{msg: '退出成功', url: '/login'});
    })
})

module.exports = router;
