// 定义常量
const ADD_GUN = '加激光枪'
const REMOVE_GUN = '减激光枪'



// reducer
export function counter(state=0,action){
    console.log("action.type",action.type)
    switch(action.type){
        case ADD_GUN:
            console.log("ADD_GUN")
            return state+1
            break
        case REMOVE_GUN:
            return state-1
            break
        default:
            return 10
    }
}

// action creator  专门创建action的
export function addGun(){
    return {type:ADD_GUN}
}
export function removeGun(){
    return {
        type:REMOVE_GUN
    }
}


//暴露一个异步的函数  
export function addGunAsync(dispath){
    return dispath=>{
        setTimeout(()=>{
            dispath(addGun())
        },2000)
    }
}