import React from 'react'
import axios from 'axios'
import {withRouter} from  'react-router-dom'
import { connect } from 'react-redux'
import { Card,WhiteSpace,WingBlank } from 'antd-mobile'

@withRouter
@connect(
    null,
)
class Boss extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){ //在这里axios获取会员/牛人的列表

    }
    render(){
        console.log("boss页面的state",this.state)
        
        return(
            <div>
                <WingBlank>
                    <WhiteSpace></WhiteSpace>    
                    {this.state.data.map(v=>(
                        v.avatar ?(
                        <Card key>
                            <Card.Header
                                title={v.user}  //用户名
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            >
                            </Card.Header>
                            <Card.Body>
                                {v.desc.split('\n').map(v=>(  //将换行符渲染成一行一行的
                                    <div key={v}>{v}</div>
                                ))}  
                            </Card.Body>  
                        </Card> ):null  //v.avatar ? XXx:null 如果用户有头像才返回  没有就不返回
                    ))}
                </WingBlank>
            </div>
        )
    }
}
export default Boss