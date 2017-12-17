const express = require('express')
const utils = require('utility')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = new express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

app.listen(9093,function(){
    console.log("项目运行在9093端口")
})






















//连接数据库

// const User = mongoose.model('user', new mongoose.Schema({
//     user:{type:String,require:true},
//     age:{type:Number,require:true}
// }))

//新增一条数据
// User.create({
//     user:"周达理",
//     age:19
// },function(err,doc){
//     if(!err){
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// })
// //更新一条数据
// User.update({"age":19},{'$set':{age:88}},function(err,doc){
//     console.log(doc)
// })

// app.get('/data',function(req,res){
//     User.findOne({"user":"周达理"},function(err,doc){
//         return res.json(doc)
//     })
    
// })