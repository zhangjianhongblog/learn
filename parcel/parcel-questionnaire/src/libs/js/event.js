export const dispatchEvent=function(eventName,argument,isBubbling,isBroadcast){
    //3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
    var event = document.createEvent('HTMLEvents');
    // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
    event.initEvent(eventName, isBubbling, isBroadcast);
    Object.assign(event,argument);
    document.dispatchEvent(event);
    return event.result;
}
export const addEventListener=function(eventName,callback){
    document.addEventListener(eventName,callback);
}
export const removeEventListener=function(eventName,callback){
    document.removeEventListener(eventName,callback);
}
