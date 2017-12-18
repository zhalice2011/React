import React from 'react'
import axios from 'axios'
import {withRouter} from  'react-router-dom'
import { connect } from 'react-redux'
import {getUserList} from '../../redux/chat.redux'
import UserCard from '../usercard/usercard'

@withRouter
@connect(
    state=>state.chatuser,
    {getUserList}
)
class Genius extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){ //在这里axios获取会员/牛人的列表
        this.props.getUserList('boss')  //调用redux里面的函数 传入一个type
    }
    render(){
        console.log("boss页面的state",this.state)
        console.log("this.genius页面中的.userList",this.props.userlist)
        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}
export default Genius