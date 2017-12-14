import React from 'react'
import {Button} from 'antd-mobile'  //引入这个蚂蚁进入的buttom
import  'antd-mobile/dist/antd-mobile.css'  //引入这个蚂蚁进入的css
class App extends  React.Component{
    render(){
      let boss = '李云龙'
      return(
        <div>
          <h2>独立团,团长是{boss}</h2>
          <一营地 老大="张大庙"></一营地>
          <骑兵连 老大="哈哈"></骑兵连>
        </div>
      )      
    }
}

function 骑兵连(props){
  return <h2>骑兵连连长{props.老大},冲啊!</h2>
}

class 一营地 extends  React.Component{
  constructor(props) {
    super(props)
    this.state = {
      solders:['胡子','二丫','达理']
    }
    //this.addSolder = this.addSolder.bind(this)  //强制绑定
  }
  componentWillMount(){
    console.log("组件马上就要被渲染了")
  }
  componentDidMount(){
    console.log("组件加载完毕")
  }
  addSolder(){
    console.log("你好啊新兵蛋子")
    this.setState({
      solders:[...this.state.solders,'新兵蛋子'+Math.random()]      
    })
  }
  render(){
    console.log("组件正在记载中")
    let boss = '张大庙'
    return (
      <div>
        <h2>独立团,营长是是{this.props.老大}</h2>
        <Button type="primary" onClick={()=>this.addSolder()}>新兵入伍</Button>
        <ul>
            {this.state.solders.map(v=>{
              return <li key={v}>{v}</li>
            })}
        </ul>
      </div>
    )
    
  }
}

export default App
