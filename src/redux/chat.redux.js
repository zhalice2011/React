import axios from 'axios'
//关于消息管理的redux

//定义常量
const USER_LIST = 'USER_LIST'

//定义初始状态
const initState = {
    userList:[]
} 

//定义reducer
export function chatuser(state=initState,action){
    switch(action.type){
        case USER_LIST:
            return {...state,userlist:action.payload}
        default :
            return state
    }   
}

//定义action create
function userList(data){
    return {type:USER_LIST,payload:data}
}

//具体操作的函数
export function getUserList(type){
    console.log("getUserList函数 传入的type",type)
    return dispatch=>{
        axios.get('/user/list?type='+type)
        .then(res=>{
            if (res.data.code==0){
                console.log("数据获取成功")
                //将获取的数据方法state里面
                dispatch(userList(res.data.data))
            }
        })
    }
}