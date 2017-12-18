import React from 'react'
import {withRouter} from  'react-router-dom'
import { Card,WhiteSpace,WingBlank } from 'antd-mobile'


//只负责显示数据card列表
class UserCard extends React.Component{
    render(){
        console.log("userlist",this.props.userlist)
        const a=this.props.userlist||[]
        return(
            <WingBlank>
                <WhiteSpace></WhiteSpace>  
                {a.map(v=>(
                    v.avatar ?(
                    <Card key={v._id}>
                        <Card.Header
                            title={v.user}  //用户名
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        >
                        </Card.Header>
                        <Card.Body>
                            {v.type=='boss'?<div>公司:{v.company}</div>:null} 
                            {v.desc.split('\n').map(d=>(  //将换行符渲染成一行一行的
                                <div key={d}>{d}</div>
                            ))} 
                            {v.type=='boss'?<div>薪资:{v.money}</div>:null} 
                        </Card.Body>  
                    </Card> ):null  //v.avatar ? XXx:null 如果用户有头像才返回  没有就不返回
                ))}
            </WingBlank>
        )
    }
}
export default UserCard