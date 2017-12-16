import React from 'react'
import ReactDom from 'react-dom'
import { createStore,applyMiddleware,compose } from 'redux' //applyMiddleware处理中间件
import thunk  from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter,Route,Link,Redirect,Switch } from 'react-router-dom'  //引入路由
import AuthRoute from './component/authroute/authroute'
// import { counter} from './index.redux'
import reducers from './reducer'

import './config'
import 'antd-mobile/dist/antd-mobile.css'
import Login from './container/login/login'
import Register from './container/register/register'


const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
))
function Boss(){
    return <h2>我是BOSS页面</h2>
}
//登录  没有登录信息统一跳转login  页面 导航+注销 一营 二营  骑兵连
ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path="/boss" component={Boss}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
            </div>
        </BrowserRouter>  
    </Provider>),
    document.getElementById('root')
)    





