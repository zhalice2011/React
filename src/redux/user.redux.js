import axios from 'axios'

//定义常量
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

//用户的初始状态 需要用户信息的时候都来这个里面取数据
const initState={
    isAuth:false, //是否登录
    msg:'', //报错信息
    user:'',
    pwd:'',
    type:''
}

//reducer
export function user(state=initState,action){
    //判断不同的action.type
    switch(action.type){
        case REGISTER_SUCCESS: //注册成功
            return {...state,msg:'',isAuth:true,...action.payload}
        case ERROR_MSG: //注册失败
            return {...state,isAuth:false,msg:action.msg}
        default:
            return state
    }
}

function registerSuccess(data){
    return {type:REGISTER_SUCCESS,payload:data}
}

function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}

//注册函数 提供给前端使用
export function register({user,pwd,repeatpwd,type}){
    console.log("有人吗")
    if (!user||!pwd||!type){
        return errorMsg('用户名密码必须输入')
    }
    if (pwd!==repeatpwd){
        return errorMsg('两次输入密码不一致')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
        .then(res=>{ 
            if (res.status==200&&res.data.code==0){ //请求成功
                dispatch(registerSuccess({user,pwd,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }

}