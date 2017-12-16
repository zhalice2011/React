
import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem,Radio,WingBlank,WhiteSpace,Button} from 'antd-mobile'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            type:'genius' //会员
        }
    }

    render(){
        const RadioItem = Radio.RadioItem
        
        return (
            <div>
                <Logo></Logo>
                <h2>注册页</h2>
                <List>
                    <InputItem>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem checked={this.state.type=='genius'}>
                        会员
                    </RadioItem>
                    <RadioItem checked={this.state.type=='boss'}>
                        药师
                    </RadioItem>
                    <WhiteSpace/>
                    <Button type='primary'>提交</Button>
                </List>
            </div>
        )
    }
}
export default Register