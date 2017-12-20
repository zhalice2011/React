import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9090')

//定义action
const MSG_LIST = 'MSG_LIST'  //获取聊天列表
const MSG_RECV = 'MSG_RECV'  //读取消息
const MSG_READ = 'MSG_READ'  //标识已读

const initState = {
    chatmsg:[],//展示每一条聊天信息
    unred:0//显示未读信息列表
}

//设置reducer  拿到state和action,生成新的state(最终新的state去渲染应用)
export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST: //消息列表
        console.log("unread",action.payload.filter(v=>!v.read.length))
            return {...state,chatmsg:action.payload,unread:action.payload.filter(v=>!v.read).length}
        case MSG_RECV: //接收消息a
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unred+1} //每次发送消息 他的未读的消息列表都会增加1
            return false
        case MSG_READ:
            return false
        default:
            return state
    }
}

//action creat函数 就是return type和数据的函数
function msgList(msgs){
    return {type:MSG_LIST,payload:msgs}   //这个函数就会传入上面的reducer里面的chat 的作为action
}
function megRecv(msg){
    return {type:MSG_RECV,payload:msg}   
}


//具体操作的函数

//1.一开始进来的时候需要获取消息列表
export function getMsgList(){
    console.log("getMsgList函数")
    return dispatch=>{
        axios.get('/user/getmsglist')
            .then((res)=>{
                if(res.status==200&&res.data.code==0){
                    console.log("res",res.data)
                    dispatch(msgList(res.data.msgs))
                }
            })
    }
}

//2.发送消息  ---点击发送调用这个函数
export function sendMsg(from,to,msg){
    return dispatch=>{
        console.log("from,to,msg",from,to,msg)
        socket.emit('sendmsg',{from,to,msg})  //把所有数据发送给后端
    }
    
}

//3.接收消息  ---在用户一开始进入聊天应用开始接收信息
export function recvMsg(){
    return dispatch=>{
        socket.on('recvmsg',function(data){
            console.log("前端接收信息",data)
            dispatch(megRecv(data))
        })  
    }
}

