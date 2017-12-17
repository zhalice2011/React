export function getRedirectPath({type,avatar}){ //专门用来获取用户渲染地址
    console.log('getRedirectPath',type)
    console.log('getRedirectPath',avatar)
    //根据用户信息 返回跳转的地址  user.type ==>/boss 或/genius  
    let url = (type==='boss') ? '/boss' : '/genius'  //url的前缀
    if (!avatar){ //没有头像  进入完善信息页面
        url+='info'
    }
    return url
}