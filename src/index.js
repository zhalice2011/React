import React from 'react'
import ReactDom from 'react-dom'
import { createStore,applyMiddleware,compose } from 'redux' //applyMiddleware处理中间件
import thunk  from 'redux-thunk'
import { Provider } from 'react-redux'
import App from './App'
import { counter} from './index.redux'

const store = createStore(counter,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
))

ReactDom.render(
    (<Provider store={store}>
        <App />
    </Provider>)
    ,document.getElementById('root')
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
