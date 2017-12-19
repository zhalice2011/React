//这个里面要做的事情就是


import React from 'react'
import axios from 'axios'
import {withRouter} from  'react-router-dom'
import { List,InputItem,WhiteSpace,WingBlank } from 'antd-mobile'




import io from 'socket.io-client'
const socket = io('ws://localhost:9090')

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
        //接受请求
        socket.on('recvmsg',(data)=>{
            console.log("data",data)
            this.setState({
                msg:[...this.state.msg,data.text] //这表示现在state里面的msg等于之前的msg加上现在的text
            })
        })
    }
    handlerSubmit(){
        //发送信息
        socket.emit('sendmsg',{text:this.state.text})
        console.log("前端发送的信息",this.state.text)
        this.setState({text:''}) //清空text
    }
    render(){
        console.log("props",this.state)
        return (
            <div>
                {this.state.msg.map(v=>{
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
                            extra={<span onClick={()=>this.handlerSubmit()}>发送</span>}
                        >
                        </InputItem>
                    </List>
                </div>
            </div>
            
        )
    }
}
export default Chat