import React from 'react'
import ReactDom from 'react-dom'
import { createStore,applyMiddleware,compose } from 'redux' //applyMiddleware处理中间件
import thunk  from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter,Route,Link,Redirect,Switch } from 'react-router-dom'  //引入路由
import AuthRoute from './component/authroute/authroute'
// import { counter} from './index.redux'

import 'antd-mobile/dist/antd-mobile.css'
import Login from './container/login/login'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Register from './container/register/register'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import reducers from './reducer'

import './config'
import './index.css'

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
))


//登录  没有登录信息统一跳转login  页面 导航+注销 一营 二营  骑兵连
ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>  
    </Provider>),
    document.getElementById('root')
)    





