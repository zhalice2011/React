export function getRedirectPath({type,avatar}){ //专门用来获取用户渲染地址
    console.log('type',type)
    console.log('avatar',avatar)
    //根据用户信息 返回跳转的地址  user.type ==>/boss 或/genius  
    let url = (type==='boss') ? '/boss' : '/genius'  //url的前缀
    if (!avatar){ //没有头像  进入完善信息页面
        url+='info'
    }
    return url
}



//获取chatid写成一个公用的函数
export function getChatId(userId,targetId){
    console.log("userId,targetId",userId,targetId)
    return [userId,targetId].sort().join('_')
}