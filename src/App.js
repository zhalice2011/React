
import React from 'react'
import { connect } from  'react-redux'
import { addGun,removeGun,addGunAsync } from  './index.redux'
class App extends React.Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        return(
            <div>
                <h1>现在有机枪{this.props.num}</h1>
                <button onClick={this.props.addGun}>申请武器</button>
                <button onClick={this.props.removeGun}>上交武器</button>
                <button onClick={this.props.addGunAsync}>拖两天再给</button>
                </div>
        ) 
    }
}
//我们需要的那些数据
const mapStatetoProps=(state)=>{  //将actions塞进去props里面
    return {num:state}
}
const actionCreators= { addGun,removeGun,addGunAsync }  ////将actions塞进去props里面

App = connect(mapStatetoProps,actionCreators)(App)
export default App