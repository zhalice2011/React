import React from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'
import App from './App'
import { counter } from './index.redux'
const store = createStore(counter)
function render(){
    console.log("执行render函数",store)
    
    ReactDom.render(<App store={store} />,document.getElementById('root'))    
}
render()
store.subscribe(render)












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
