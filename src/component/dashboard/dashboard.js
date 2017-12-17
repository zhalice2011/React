import React from 'react'
import { NavBar,Grid,List } from 'antd-mobile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NavLinkBar from  '../../component/navLinkBar/navLinkBar'
import {Switch,Route} from 'react-router-dom'
import Boss from '../../component/boss/boss'
import Msg from '../../component/msg/msg'
import User from '../../component/user/user'

function Genins (){
    return <h2>Genins的首页</h2>
}

@connect(
    state=>state
)
class Dashboard extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {pathname} = this.props.location
        console.log("pathname",pathname)
        const user = this.props.user
        console.log("pathname",user)
        const navList = [
            {
                path:'/boss',
                text:'会员',
                icon:'boss',
                title:'药师列表',
                component:Boss,
                hide:user.type=='genins'
            },
            {
                path:'/genius',
                text:'药师',
                icon:'job',
                title:'会员列表',
                component:Genins,
                hide:user.type=='boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg,
            },
            {
                path:'/me',
                text:'me',
                icon:'user',
                title:'个人中心',
                component:User,
            }
        ]
        return (
            <div>
                <NavBar className='fixd-header' mode="dark">{navList.find(v=>v.path==pathname).title}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard