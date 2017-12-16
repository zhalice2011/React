
import React from 'react'
import { connect } from  'react-redux'
import { addGun,removeGun,addGunAsync } from  './index.redux'

@connect(
    //你需要state的什么属性传入props中
    state=>({num:state.counter}),
    //你需要什么方法放到props中  自动会dispatch
    { addGun,removeGun,addGunAsync }
)

class App extends React.Component{
    constructor(props){
        super(props)
    }
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

export default App