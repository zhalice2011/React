const express = require('express')
const mongoose = require('mongoose')

//连接数据库
const DB_URL = 'mongodb://127.0.0.1:27017/react'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
    console.log("conncted TO mongodb://127.0.0.1:27017/react")
})
const User = mongoose.model('user', new mongoose.Schema({
    user:{type:String,require:true},
    age:{type:Number,require:true}
}))

//新增一条数据
User.create({
    user:"周达理",
    age:19
},function(err,doc){
    if(!err){
        console.log(doc)
    }else{
        console.log(err)
    }
})
//更新一条数据
User.update({"age":19},{'$set':{age:88}},function(err,doc){
    console.log(doc)
})

const app = new express()



app.get('/',function(req,res){
    res.send("<h1>周达理你好啊</h1>")
})

app.get('/data',function(req,res){
    User.find({},function(err,doc){
        return res.json(doc)
    })
    
})

app.listen(9093,function(){
    console.log("项目运行在9093端口")
})