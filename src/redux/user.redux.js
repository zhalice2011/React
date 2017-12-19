import axios from 'axios'
import {getRedirectPath} from '../util'

//定义常量
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'
//用户的初始状态 需要用户信息的时候都来这个里面取数据
const initState={
    redirctTo:'',//用户应该跳转到什么地方    
    //isAuth:false, //是否登录
    msg:'', //报错信息
    user:'',
    //pwd:'',
    type:''
}

//定义reducer
export function user(state=initState,action){
    //console.log("此时的state",state)
    //console.log("此时的数据",action.payload)
    //判断不同的action.type
    switch(action.type){
        case AUTH_SUCCESS:
            //console.log("身份信息校验成功!")
            return {...state,msg:'',redirctTo:getRedirectPath(action.payload),...action.payload}        
        case ERROR_MSG: //注册失败
            return {...state,isAuth:false,msg:action.msg}   
        case LOAD_DATA:
            return {...state,...action.payload}
        case LOGOUT:
            return {...initState,redirctTo:'/login'}
            default:
            return state
    }
}

function authSuccess(obj){
    const {pwd,...data} = obj  //这样就把obj里面的pwd字段给去掉了
    return {type:AUTH_SUCCESS,payload:data}
}
function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}

//注册函数 提供给前端使用
export function register({user,pwd,repeatpwd,type}){
    console.log("前端登录register")
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
                dispatch(authSuccess({user,pwd,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }

}


//登录函数 提供给前端调用
export function login({user,pwd}){
    console.log("redux里面的登录函数",user,pwd)
    if (!user||!pwd){
        return errorMsg('用户名密码必须输入')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                if (res.status==200&&res.data.code==0){ //请求成功
                    console.log("后台传回来的数据,res.data",res.data)
                    dispatch(authSuccess(res.data.data))
                }else{ //请求失败
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

//保存用户的基本信息
export function loadData(userinfo){
    return {type:LOAD_DATA,payload:userinfo}
}
export function logoutSubmit(){
    return {type:LOGOUT}
}

//用户传递进来的完善信息的数据
export function update(data){  //用户传递进来的完善信息的数据
    console.log("update函数")
    return  dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                if (res.status==200&&res.data.code==0){ //请求成功
                    console.log("后台传回来的数据,res.data",res.data)
                    dispatch(authSuccess(res.data.data))
                }else{ //请求失败
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}


//退出登录
//export function lo