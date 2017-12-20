
//合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { user } from './redux/user.redux'  //引入reducer
import { chatuser } from './redux/chat.redux'  //引入reducer
import { chat } from './redux/chatnew.redux'  //引入reducer

export default combineReducers({user,chatuser,chat})  //传递给index.js多个reducer