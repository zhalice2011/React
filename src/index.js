import React from 'react'
import ReactDom from 'react-dom'
import { createStore,applyMiddleware,compose } from 'redux' //applyMiddleware处理中间件
import thunk  from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter,Route,Link,Redirect,Switch } from 'react-router-dom'  //引入路由
// import { counter} from './index.redux'
import reducer from './reducer'
import Auth from './Auth.js'
import Dashboard from './Dashboard.js'


const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
))
console.log(store.getState())

//当一个组件作为路由的时候
class Test extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props)
        return  <h2>测试{this.props.match.params.location}</h2>
    }
}
//登录  没有登录信息统一跳转login  页面 导航+注销 一营 二营  骑兵连
ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
                <Switch>
                    <Route path='/login'  component={Auth}></Route>
                    <Route path='/dashboard'  component={Dashboard}></Route>
                    <Redirect to='/dashboard'></Redirect>                    
                </Switch>
        </BrowserRouter>  
    </Provider>),
    document.getElementById('root')
)    









// function render(){
//     console.log("执行render函数",store)
//     //store={store} addGun={addGun} 这是参数
//     ReactDom.render(<App store={store} addGun={addGun} removeGun={removeGun} addGunAsync={addGunAsync} />,document.getElementById('root'))    
// }
// render()
// //当state有任何变化 就会执行render这个函数  
// store.subscribe(render)  //subscribe函数要传入一个函数的名字












// //通过reducer建立state
// function counter(state=0,action){
//     switch(action.type){
//         case '加机关枪':
//             return state+1
//             break
//         case '减机关枪':
//             return state-1
//             break
//         default:
//             return 10
//     }
// }
// //1.新建store
// const store = createStore(counter)
// //获取
// const init  = store.getState()
// console.log(init)
// function listener(){
//     const current = store.getState()
//     console.log("现在总共的机枪数目是:"+current)
// }
// //订阅
// store.subscribe(listener)
// //派遣时间
// store.dispatch({type:'加机关枪'})
// store.dispatch({type:'加机关枪'})
// store.dispatch({type:'减机关枪'})
