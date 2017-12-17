import React from 'react'
import axios from 'axios'
import {withRouter} from  'react-router-dom'
import {loadData} from '../../redux/user.redux'
import { connect } from 'react-redux'

@withRouter
@connect(
    null,
)
class User extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                我是boss
            </div>
        )
    }
}
export default User