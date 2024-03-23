const express = require('express');
//导入AccountModel
const AccountModel = require('../../models/AccountModel');
//导入 moment 
const moment = require('moment');
//导入中间件
let checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');

const router = express.Router();

//记账本的列表
router.get('/account',checkTokenMiddleware, function(req, res, next) {
    //获取所有的账单信息
    // let accounts = db.get('accounts').value();
    //读取集合信息
    AccountModel.find().sort({time: -1}).then((data) => {
      //响应成功提示
      res.json({
          //响应编号
          code: '0000',
          //响应的信息
          msg: '读取成功',
          //响应的数据
          data: data
      });
    }).catch((err) => {
      res.json({
          code: '1001',
          msg: '读取失败',
          data: null
      });
      return;
    })
});

//新增记录
router.post('/account',checkTokenMiddleware,(req,res) =>{
  //插入数据库
  AccountModel.create({
    ...req.body,
    // 修改 time 属性的值
    //用下面的 time 覆盖旧的
    time: moment(req.body.time).toDate()
  }).then((data) => {
    //成功提醒
    res.json({
        code: '0000',
        msg: '创建成功',
        data: data
    });
  }).catch((err) => {
    res.json({
        code: '1002',
        msg: '创建失败',
        data: null
    });
  })
})

//删除记录
router.delete('/account/:id',checkTokenMiddleware,(req,res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  AccountModel.deleteOne({_id: id}).then(() => {
    //提醒
    res.json({
        code: '0000',
        msg: '删除成功',
        data: {}
    });
  }).catch((err) => {
    res.json({
        code: '1003',
        msg: '删除帐单失败',
        data: null
    })
  })
})

//获取单个账单信息
router.get('/account/:id',checkTokenMiddleware, (req,res) => {
    //获取 id 参数
    let {id} = req.params;
    AccountModel.findById({_id: id}).then((data) => {
        res.json({
            code: '0000',
            msg: '读取成功',
            data: data
        })
    }).catch((err) => {
        res.json({
            code: '1004',
            msg: '读取失败',
            data: null
        })
    })
})

//更新单个账单信息
router.patch('/account/:id',checkTokenMiddleware, (req,res) => {
    //获取 id 参数值
    let {id} = req.params;
    //更新数据库
    AccountModel.updateOne({_id: id},req.body).then((data) => {
        AccountModel.findById({_id: id}).then((data) => {
            res.json({
                code: '0000',
                msg: '读取成功',
                data: data
            })
        }).catch((err) => {
            res.json({
                code: '1004',
                msg: '读取失败',
                data: null
            })
        })
    }).catch((err) => {
        //错误响应
        res.json({
            code: '1005',
            msg: '更新失败',
            data: null
        })
    })
})

module.exports = router;
