import axios from 'axios'
import {getRedirectPath} from '../util'

//定义常量
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
//用户的初始状态 需要用户信息的时候都来这个里面取数据
const initState={
    redirctTo:'',//用户应该跳转到什么地方    
    isAuth:false, //是否登录
    msg:'', //报错信息
    user:'',
    //pwd:'',
    type:''
}

//定义reducer
export function user(state=initState,action){
    //判断不同的action.type
    switch(action.type){
        case REGISTER_SUCCESS: //注册成功
            return {...state,msg:'',redirctTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        case ERROR_MSG: //注册失败
            return {...state,isAuth:false,msg:action.msg}
        case LOGIN_SUCCESS: //登录成功
            console.log("action",action)
            return {...state,msg:'',redirctTo:getRedirectPath(action.payload),isAuth:true,...action.payload}    
        case LOAD_DATA:
            return {...state,...action.payload}
            default:
            return state
    }
}

function registerSuccess(data){
    return {type:REGISTER_SUCCESS,payload:data}
}
function loginSuccess(data){
    console.log("loginSuccess",data)
    return {type:LOGIN_SUCCESS,payload:data}
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
                dispatch(registerSuccess({user,pwd,type}))
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
                    dispatch(loginSuccess({
                        user:res.data.data.user,
                        pwd:res.data.data.user,
                        type:res.data.data.type
                    }))
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


// export function userInfo(){
//     //获取用户信息
//     return dispatch=>{
//         axios.get('/user/info')
//         .then(res=>{
//             if (res.status==200){
//                 if(res.data.code==0){ //表示有登录信息的
    
//                 }else{ //没有登录信息的
//                     console.log(this.props.history)  //不是路由组件
//                     //跳转到登录的页面
//                     this.props.loadDate(res.data.data)  //将data都返回给前端
//                     this.props.history.push('/login')
//                 }
//                 console.log(res.data)
//             }
//         })
//     }

//     //是否登录
//     //现在的url地址  login是不需要跳转的

//     //用户的身份 是会员还是药师 
// }