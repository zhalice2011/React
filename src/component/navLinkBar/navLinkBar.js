import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

@withRouter
class NavLinkBar extends React.Component{
    // static PropTypes ={
    //     data:PropTypes.array.isRequired  //制定传入的是数组
    // }
    constructor(props){
        super(props)
    }
    render(){
        //console.log("传过来的所有navList",this.props.data)
        const navList = this.props.data.filter(v=>!v.hide)  //将hide是true的从导航栏里面去掉
        //console.log("过滤掉的navList",navList)
        const {pathname} = this.props.location
        return (
            <div>
                <TabBar>
                    {navList.map(v=>(
                        <TabBar.Item
                            key={v.path}
                            title={v.text}
                            icon={{uri:require(`./img/${v.icon}.png`)}}
                            selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                            selected={pathname===v.path}  //只要当前路劲和导航路劲一直就设置为选中状态
                            onPress={()=>{  //点击跳转页面
                                this.props.history.push(v.path)
                            }}
                        >
                        </TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}

export default NavLinkBar