
import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem,Radio,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'

//@connect获取状态和方法
@connect(
    state=>state.user,
    { register }
)
class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'genius' //会员
        }
        this.handleRegister = this.handleRegister.bind(this)  //使用这个性能会好一点
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleRegister(){
        this.props.register(this.state)  //调用user.redux里面的注册函数
        console.log(this.state)
    }
    render(){
        const RadioItem = Radio.RadioItem
        
        return (
            <div>
                <Logo></Logo>
                <h2>注册页</h2>
                <List>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> :null }
                    <InputItem 
                        onChange={v=>this.handleChange('user',v)}
                    >用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        onChange={v=>this.handleChange('pwd',v)}
                        type="password"
                    >密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v=>this.handleChange('repeatpwd',v)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem 
                        checked={this.state.type=='genius'}
                        onChange={()=>this.handleChange('type',"genius")}
                        >
                        会员
                    </RadioItem>
                    <RadioItem 
                        checked={this.state.type=='boss'}
                        onChange={()=>this.handleChange('type',"boss")}
                        >
                        药师
                    </RadioItem>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        )
    }
}
export default Register