import React from 'react'
export default function  daliForm(Comp){
    return class WrapperCmp extends React.Component{
        constructor(props){
            super(props)
            this.state = {}
            this.handleChange = this.handleChange.bind(this)
        }
        handleChange(key,val){
            this.setState({
                [key]:val
            })
        }
        render(){
            return (
                <div>
                    <Comp handleChange={this.handleChange} state={this.state}  {...this.props}></Comp>
                </div>
            )
        }
    }
}