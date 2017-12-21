import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from  '../../component/navLinkBar/navLinkBar'
import {Switch,Route} from 'react-router-dom'
import Boss from '../../component/boss/boss'  //老板
import Msg from '../../component/msg/msg'
import User from '../../component/user/user' //老板 boss
import Genius from '../../component/genius/genius'//药师
import { getMsgList,recvMsg} from '../../redux/chatnew.redux'


@connect(
    state=>state,
    {getMsgList,recvMsg}
)
class Dashboard extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {pathname} = this.props.location
        //console.log("pathname",pathname)
        const user = this.props.user
        //console.log("pathname",user)
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'药师列表',
                component:Boss,
                hide:user.type==='genius'
            },
            {
                path:'/genius',
                text:'药师',
                icon:'job',
                title:'会员列表',
                component:Genius,
                hide:user.type==='boss'
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
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User,
            }
        ]
        return (
            <div>
                <NavBar className='fixd-header' mode="dark">{navList.find(v=>v.path==pathname).title||''}</NavBar>
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