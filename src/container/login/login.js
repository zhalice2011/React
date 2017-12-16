import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.register = this.register.bind(this)
        
    }
    register(){
        console.log(this.props) //由于这是一个路由组件 所以他里面有路由组件的所有内容
        this.props.history.push('/register')
    }
    render(){
        return(
            <div>
                <Logo></Logo>
                <h2>登录页</h2>
                <WingBlank>
                    <List>
                        <InputItem>用户名</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem>密码</InputItem>
                    </List>
                    <Button type='primary'>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>

        ) 
    }
}
export default Login