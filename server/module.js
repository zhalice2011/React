const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/react'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
    console.log("conncted TO mongodb://127.0.0.1:27017/react")
})

//批量生产模型
const modules = {
    user:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},  //身份
        'avatar':{type:String},  //头像
        'desc':{type:String}, //个人简介
        'title':{type:String}, //职位期望
        'company':{type:String}, //公司期望
        'money':{type:String} //薪资期望              
    },
    chat:{ //聊天的表
        'chatid':{type:String,require:true}, //每一个聊天唯一的标识
        'from':{type:String,require:true}, //从谁发出来的 //require:true表示这是必填子弹
        'to':{type:String,require:true}, //要发给谁
        'read':{type:Boolean,default:false}, //是否已读  
        'content':{type:String,require:true,default:''},//发送的内容
        'creat_time':{type:Number,default:new Date().getTime()},//这个字段是不用传入的  默认每一个都有
    }
}

//批量注册
for (let m in modules){
    mongoose.model(m,new mongoose.Schema(modules[m]))
}

module.exports = {
    getModels:function(name){ //读取对应的表格
        return mongoose.model(name)
    }
}