import React from 'react'
import {Link,Route, Redirect} from 'react-router-dom'
import App from './App'
import { logout } from './Auth.redux'
import { connect } from  'react-redux'

function Eerying(){
    return <h2>二营</h2>
}
function Qibinglian(){
    return <h2>骑兵连</h2>
}
@connect(
    state=>state.auth,
    {logout}
)
class Dashboard extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
            console.log(this.props)
            const redirctToLogin =<Redirect to="/login"></Redirect>
            const app=(
                <div>
                    <h1>独立团</h1>
                    {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
                    <ul>
                        <li>
                            <Link to="/dashboard">根目录</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/erying">一营</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/qibinglian">骑兵连</Link>
                        </li>
                    </ul>
                    <Route path='/dashboard' exact component={App}></Route>
                    <Route path='/dashboard/erying' component={Eerying}></Route>
                    <Route path='/dashboard/qibinglian' component={Qibinglian}></Route>
                </div>
            )
            return this.props.isAuth ? app : redirctToLogin
    }
}

export default Dashboard