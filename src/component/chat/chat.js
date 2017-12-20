//这个里面要做的事情就是


import React from 'react'
import axios from 'axios'
import {withRouter} from  'react-router-dom'
import { List,InputItem,WhiteSpace,WingBlank } from 'antd-mobile'
import {connect} from 'react-redux'
import { getMsgList ,sendMsg,recvMsg} from '../../redux/chatnew.redux'



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
            msg:[]
        }
        this.handlerSubmit=this.handlerSubmit.bind(this)
    }
    componentDidMount(){
        console.log("获取消息列表开始")
        this.props.getMsgList()  //获取消息列表
        console.log("接收信息开始")
        this.props.recvMsg() 
        //接受请求
        // socket.on('recvmsg',(data)=>{
        //     console.log("data",data)
        //     this.setState({
        //         msg:[...this.state.msg,data.text] //这表示现在state里面的msg等于之前的msg加上现在的text
        //     })
        // })
    }
    handlerSubmit(){ //点击发送信息
        //socket.emit('sendmsg',{text:this.state.text})
        console.log("前端发送的信息",this.state.text)
        // this.setState({text:''}) //清空text
        // const form = this.props.user._id //当前  从state里面取出来
        // const to = this.props.match.params.user //发送给谁  从url里面取出
        // const msg = this.props.msg
        // //使用redux里面的函数进行发送
        // this.props.sendMsg(form,to,msg)
    }
    handlerSubmit2(){
        console.log("前端发送的信息",this.state.text)
        const from = this.props.user._id //当前  从state里面取出来
        const to = this.props.match.params.user //发送给谁  从url里面取出
        const msg = this.state.text
        //使用redux里面的函数进行发送
        this.props.sendMsg(from,to,msg)
        this.setState({text:''}) //清空text
    }
    render(){
        //console.log("props",this.state)
        return (
            <div>
                {this.props.state.chatmsg.map(v=>{
                    return <p key={v}>{v}</p>
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})  //其实setState就会运行render函数进行重新渲染
                            }}
                            extra={<span onClick={()=>this.handlerSubmit2()}>发送2</span>}
                        >
                        </InputItem>
                    </List>
                    <p onClick={()=>this.handlerSubmit2()}>点我发送</p>
                </div>
            </div>
            
        )
    }
}
export default Chat