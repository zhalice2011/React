const express = require('express')
const utils = require('utility')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const models = require('./module') //引入这个数据库相关js文件
const User = models.getModels('user')  //获取user模型
const Chat = models.getModels('chat')  //获取chat模型

const app = express()

//先将http用app包一层,然后传给io这个对象
const server = require('http').Server(app) 

const io = require('socket.io')(server)  //现在io和express就关联起来了

//监听事件
io.on('connection',function(socket){ //soket是当前监听的链接  io是全局的连接
    socket.on('sendmsg',function(data){
        console.log("前台传入的东西",data)

        const {from , to ,msg} =data 
        console.log("data2",data)
        //生成唯一id 通过两个用户的id来定义
        const chatid = [from,to].sort().join('_')
        console.log("后台的chatid",chatid)
        const create_time = new Date().getTime()
        console.log("create_time")
        //消息存入数据库
        Chat.create({chatid:chatid,from:from,to:to,content:msg,create_time:create_time},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
        //socket.emit('recvmsg',data) //将接受到的数据发送到全局
    })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(9090,function(){
    console.log("项目运行在9090端口")
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