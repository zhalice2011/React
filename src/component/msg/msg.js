import React from 'react'
import axios from 'axios'
import {withRouter} from  'react-router-dom'
import { connect } from 'react-redux'  //引入connext 引入之后就可以获取到redux里面所有的数据
import { List,Badge } from 'antd-mobile'

@withRouter
@connect(
    state=>state
)
class Msg extends React.Component{
    constructor(props){
        super(props)
    }
    getLast(arr){ //获取数组的最后一条聊天信息
        return arr[arr.length-1]
    }
    render(){
        // if(!this.props.chat.chatmsg.length){ //如果没有聊天信息的话
        //     chatlist=[]
        // }
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id  //当前登录用户的

        console.log("props", this.props.chat.chatmsg)
        //根据chatid进行分析
        const msgGoup ={}
        this.props.chat.chatmsg.forEach(v=>{
            msgGoup[v.chatid] =  msgGoup[v.chatid] ||[]
            msgGoup[v.chatid].push(v)
        })
        console.log("msgGoup",msgGoup)
        //拿到所有的valuev[0]._id
        const chatlist = Object.values(msgGoup).sort((a,b)=>{
            //console.log(" this.getLast(a)", this.getLast(a))
            const a_last = this.getLast(a).create_time //获取最后一个聊天的信息
            const b_last = this.getLast(b).create_time //获取最后一个聊天的信息
            console.log(b_last,a_last)
            return b_last-a_last
            
        })
        console.log("chatlist",chatlist)
        //对chatlist进行排序  根据时间   时间在上面的就在上面楼

    
        return(
            <div>
                    {chatlist.map(v=>{
                        const lastItem = this.getLast(v) //获取最后一个数组
                        const targetId = v[0].from==userid?v[0].to:v[0].from
                        const name = this.props.chat.users[targetId]?this.props.chat.users[targetId].name:''
                        const avatar = this.props.chat.users[targetId]?this.props.chat.users[targetId].avatar:''
                        const underadNum = v.filter(v=>!v.read&&v.to===userid).length
                        return (
                            <List>
                            <Item
                                                        
                                extra={
                                    <Badge text={underadNum}></Badge>
                                }
                                arrow="horizontal"
                                key={lastItem._id}
                                thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
                                onClick={()=>{
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >   {lastItem.content}
                                <Brief>{name}</Brief>
                            </Item>
                            </List>
                        )
                    })}
            </div>
        )
    }
}
export default Msg