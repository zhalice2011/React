import React from 'react'
import logoImg from './mtm.png'
import './logo.css'
class Logo extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="logo-containner">
                <img src={logoImg} alt=""/>
            </div>
        )
    }
}
export default Logo