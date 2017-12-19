import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'

import daliForm from '../../component/dali-from/dali-from'  //引入自己写的高阶组件



//@connect获取状态和方法

@connect(
    state=>state.user,
    { login }
)
@daliForm  //因为daliForm也是需要state的数据的  所以要放在他的下面
class Login extends React.Component{
    constructor(props){
        super(props)
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)  //绑定this这样在这个函数内部就能获取this的状态了
        
    }
    register(){
        console.log(this.props) //由于这是一个路由组件 所以他里面有路由组件的所有内容
        this.props.history.push('/register')
    }
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }
    handleLogin(){
        this.props.login(this.props.state)
    }
    render(){
        return(
            <div>
                {this.props.redirctTo ? <Redirect to={this.props.redirctTo}/> :null}
                <Logo></Logo>
                <h2>登录页</h2>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> :null }
                        <InputItem
                            onChange={v=>this.props.handleChange('user',v)}
                        >用户名</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem
                            type="password"
                            onChange={v=>this.props.handleChange('pwd',v)}
                        >密码</InputItem>
                    </List>
                    <Button type='primary' onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>

        ) 
    }
}
export default Login