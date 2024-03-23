const express = require('express');

//导入中间件
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware');

//导入AccountModel
const AccountModel = require('../../models/AccountModel');

//导入 moment 
const moment = require('moment');

//创建路由对象
const router = express.Router();

//测试
// console.log(moment('2023-02-24').toDate());
//格式化日期对象
// console.log(moment(new Date()).format('YYYY-MM-DD'));

//首页路由规则
router.get('/', (req,res) => {
  //重定向 /account
  res.redirect('/account');
});

//记账本的列表
router.get('/account',checkLoginMiddleware, function(req, res, next) {
  //获取所有的账单信息
  // let accounts = db.get('accounts').value();

  //读取集合信息
  AccountModel.find().sort({time: -1}).then((data) => {
    // console.log(data);
    res.render('list',{accounts: data, moment: moment});
  }).catch((err) => {
    res.status(500).send('读取失败');
    return;
  })
});

//添加记录
router.get('/account/create',checkLoginMiddleware, function(req, res, next) {
  res.render('create');
});

//新增记录
router.post('/account',checkLoginMiddleware,(req,res) =>{
  //查看表单数据 2023-02-24  => new Date()
  //2023-02-24  => Moment => new Date()

  //插入数据库
  AccountModel.create({
    ...req.body,
    // 修改 time 属性的值
    //用下面的 time 覆盖旧的
    time: moment(req.body.time).toDate()
  }).then((data) => {
    //成功提醒
    res.render('success',{msg: '添加成功~~', url: '/account'});
  }).catch((err) => {
    res.status(500).send('插入失败');
  })
})

//删除记录
router.get('/account/:id',checkLoginMiddleware,(req,res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  AccountModel.deleteOne({_id: id}).then(() => {
    //提醒
    res.render('success', {msg: '删除成功', url: '/account'});
  }).catch((err) => {
    console.log(err);
  })
})

module.exports = router;
