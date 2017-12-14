
import React from 'react'
import {addGun} from './index.redux'

class App extends React.Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        const store = this.props.store
        const num = store.getState()
        console.log("num",num)
        return(
            <div>
                <h1>现在有机枪{num}</h1>
                {console.log("周达理",addGun())
                    //let a = addGun()
                    //console.log(addGun())
                }
                <button onClick={()=>store.dispatch(addGun())}>申请武器</button>
                <button onClick={()=>store.dispatch({type:"加激光枪"})}>申请武器</button>
                </div>
        ) 
    }
}

export default App