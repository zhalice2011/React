const express = require('express')
const Router = express.Router()
const models = require('./module') //引入这个数据库相关js文件
const User = models.getModels('user')  //获取user模型

Router.get('/list',function(req,res){
    User.find({},function(err,doc){
        return res.json(doc)
    })
})
Router.post('/register',function(req,res){
    console.log("前台传入的注册请求")
    const {user,pwd,type} = req.body
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({
                code:1,
                msg:"用户名重复"
            })
        }
        User.create({user,pwd,type},function(e,d){
            if (e) {
                return res.json({
                    code:1,
                    msg:"服务器出错"
                })
            }
            return res.json({code:0,})
        })
    })
})
Router.get('/info',function(req,res){
    return res.json({code:0})
})

module.exports = Router