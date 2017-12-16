
//此组件只负责获取用户的信息  和做一下对应的跳转
import React from 'react'
import axios from 'axios'
import {withRouter} from  'react-router-dom'
@withRouter
class AuthRoute extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){  //在这个周期里面获取用户信息
        const publicList = ['/login','/register']
        const pathname = this.props.history.location.pathname //获取当前的url this.props.loaction.pathname
        //判断当前的页面
        if (publicList.indexOf(pathname)>-1){
            return null
        }
        //获取用户信息
        axios.get('/user/info')
            .then(res=>{
                if (res.status==200){
                    if(res.data.code==0){ //表示有登录信息的

                    }else{ //没有登录信息的
                        console.log(this.props.history)  //不是路由组件
                        //跳转到登录的页面
                        this.props.history.push('/login')
                    }
                    console.log(res.data)
                }
            })
        //是否登录
        //现在的url地址  login是不需要跳转的

        //用户的身份 是会员还是药师  
        
    }
    render(){
        return(
            null
        )
    }
}
export default AuthRoute