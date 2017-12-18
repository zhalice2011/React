import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Result,List,WhiteSpace,Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import './user.css'
import {logoutSubmit} from '../../redux/user.redux'

@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(){
        const alert = Modal.alert
        alert('注销','确认退出登录吗?'[
            {text:'取消',onPress:()=>console.log("取消")},
            {text:'取消',onPress:()=>{
                browserCookie.erase('userid')
                window.location.href = window.location.href 
                this.props.logoutSubmit()
            }}
        ])
    }   
    render(){
        console.log("this.props",this.props)
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        return props.user?(
            <div>
                <Result 
                    img={<img style={{width:50}} src={require(`../img/${props.avatar}.png`)} alt=""/>}
                    title={props.user}
                    message={props.type=='boss'?props.company:null}
                />
                <List renderHeader={()=>'简介'}>
                    <Item
                        multipleLine
                    >
                        {props.title}
                        {props.desc.split('\n').map(v=>(
                            <Brief key={v}>{props.desc}</Brief>
                        ))}
                        {props.money.split('\n').map(v=>(
                            <Brief key={v}>薪资:{props.money}</Brief>
                        ))}
                    </Item>
                </List>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ):null
    }
}
export default User