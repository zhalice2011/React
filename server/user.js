const express = require('express')
const Router = express.Router()
const models = require('./module') //引入这个数据库相关js文件
const User = models.getModels('user')  //获取user模型
const utils = require('utility')
const _filter = {'pwd':0,'__v':0}  //一个findcase 不显示password

Router.get('/list',function(req,res){
    //User.remove({},function(err,doc){})
    User.find({},function(err,doc){
        return res.json(doc)
    })
})
//注册请求
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
        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function(e,d){
            if (e) {
                return res.json({
                    code:1,
                    msg:"服务器出错"
                })
            }
            const {user,type,_id} = d  //一起赋值
            res.cookie('userid',_id) //设置cookie
            return res.json({code:0,data:{user,}})
        })

    })
})
//登录请求
Router.post('/login',function(req,res){
    console.log("前台传入的登录请求",req.body)
    const {user,pwd} = req.body
    User.findOne({user:user},function(err,doc){
        if(doc){  //如果存在比对密码
            if(doc.pwd==md5Pwd(pwd)){ //登录成功
                console.log("登录成功",doc)
                //设置cookie  将mongodb生成的用户唯一表示写入cookie中
                res.cookie('userid',doc._id)  

                return res.json({code:0,data:{
                    type:doc.type,
                    user:doc.user
                }})
            }else{
                return res.json({code:1,msg:"密码错误"})
            }
        }else{
            return res.json({
                code:1,
                msg:"用户名不存在"
            })
        }
    })
})

Router.get('/info',function(req,res){
    //查看请求里面有没有cookie
    const { userid } = req.cookies
    console.log("userid",userid)
    if(!userid){
        return res.json({code:1})
    }
    //cookie对应_id  去mongodb中查询对应的会员数据
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})   
        }
             
    })
})

//常用的加密方法  在MD5的基础上自己再加一串字符串  2层MD5
function md5Pwd(pwd){
    const salt = 'cherise_i_love_youZhalice2011#$%#@@$%'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router