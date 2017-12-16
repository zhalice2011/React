
import React from 'react'
import { connect } from 'react-redux'
import { login,logout } from './Auth.redux'
import { Redirect } from 'react-router-dom';
//如果有两个reduce 就需要进行合并 需要使用combine
@connect(
    state=>state.auth,
    {login}
)
class Auth extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        return (
            <div>
                { this.props.isAuth ? <Redirect to='/dashboard'></Redirect> : null }
                <h2>没有权限 请先进行登录</h2>
                <button onClick={this.props.login}>登录</button>
            </div>
        )
    }
}

export default Auth