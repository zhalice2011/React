//这个里面要做的事情就是


import React from 'react'
import axios from 'axios'
import {withRouter} from  'react-router-dom'
import {Icon, List,InputItem,WhiteSpace,WingBlank,NavBar,Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList ,sendMsg,recvMsg} from '../../redux/chatnew.redux'
import {getChatId} from '../../util'


// import io from 'socket.io-client'
// const socket = io('ws://localhost:9090')
@connect(
    state=>state,  //获取redux所有用户的state
    { getMsgList,sendMsg,recvMsg }  //获取redux里面暴露出来的方法
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:'',
            msg:[],
            showEmoji:false
        }
        this.handlerSubmit=this.handlerSubmit.bind(this)
    }
    componentDidMount(){
        //简单判断  如果已经有这个信息了 
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()  //获取消息列表
            this.props.recvMsg()     //接收消息
        }
        this.fixCarousel()
        
    }
    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handlerSubmit(){
        console.log("前端发送的信息",this.state.text)
        const from = this.props.user._id //当前  从state里面取出来
        const to = this.props.match.params.user //发送给谁  从url里面取出
        const msg = this.state.text
        //使用redux里面的函数进行发送
        this.props.sendMsg(from,to,msg)
        this.setState({text:''}) //清空text
    }
    render(){
        const emoji='😀 😃 😄 😁 😆 😅 😂 🤣 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 🤡 🤠 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 🤤 😭 😓 😪 😴 🙄 🤔 🤥 😬 🤐 🤢 🤧 😷 🤒 🤕'
                        .split(' ') //将上面的字符串按照空格切开来
                        .filter(v=>v) //过滤一下
                        .map(v=>({text:v})) //生成一个对象
        
        //console.log("props",this.props.chat.chatmsg)
        const userid = this.props.match.params.user  //获取当前的user
        const Item = List.Item
        const users = this.props.chat.users //从state里面获取所有的用户列表
        if(!users[userid]){
            return null
        }//getChatId
        const chatid = getChatId(userid, this.props.user._id) //获取chatid
        const chatmsgs = this.props.chat.chatmsg.filter(v=>{
            //console.log("v.chatid=",v.chatid)
            //console.log("chatid=",chatid)
            return v.chatid==chatid
        })
        return (
            <div id="chat-page">
                <NavBar 
                    mode='dark'
                    icon={<Icon type='left' />}
                    onLeftClick={()=>{
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name} 
                </NavBar>
                
                {chatmsgs.map(v=>{
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from===userid ? ( //等于就说明这条消息是对方发过来的
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ):
                    (
                        <List key={v._id}>
                            <Item 
                            extra={<img src={avatar}/>}
                            className='chat-me'
                            >{v.content}</Item>
                        </List>
                    )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})  //其实setState就会运行render函数进行重新渲染
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight:15}}
                                        onClick={()=>{this.setState({
                                            showEmoji:!this.state.showEmoji
                                            
                                        })
                                        this.fixCarousel()
                                        }}
                                    >😀</span>
                                    <span onClick={()=>this.handlerSubmit()}>发送</span>
                                    
                                </div>
                            }
                        >
                        </InputItem>
                    </List>

                    {this.state.showEmoji?
                        <Grid 
                        data={emoji} //数据
                        columnNum={9} //一行显示9个
                        carouselMaxRow={4} //最多显示4行
                        isCarousel={true} 
                        onClick={el=>{
                            //console.log(el)
                            this.setState({
                                text:this.state.text+el.text
                            })
                        }}
                        ></Grid>
                        :null}
                    
                </div>
            </div>
            
        )
    }
}
export default Chat