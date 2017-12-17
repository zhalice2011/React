import React from 'react'
import { NavBar,Grid,List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
    static propTypes={
        selectAvatar:PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        //所有的头像图片的名字
        const avatarList = ['boy','boy','chick','crab','girl','hedgehog','hippopotamus','koala','lemur','man','pig','tiger','whale','woman','zebra']
                                .map(v=>({
                                    icon:require(`../img/${v}.png`),
                                    text:v
                                }))

        //显示已经选择的表
        const gridHeader = this.state.icon ? (<div>
                                                <span>已选择头像</span>
                                                <img style={{height:16,width:16}} src={this.state.icon}/>
                                              </div>)
                                            : <div>请选择头像</div>
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid 
                        columnNum={5} 
                        data={avatarList} 
                        onClick={v=>{
                            this.setState(v)
                            this.props.selectAvatar(v.text)
                        }}
                    ></Grid>
                <NavBar mode="dark">头像选择</NavBar>
                </List>

            </div>
        )
    }
}

export default AvatarSelector