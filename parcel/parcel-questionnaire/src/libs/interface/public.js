/*
    by: tengma 2018年07月27日
    name: 公共接口
*/
var context =require("./context.js");
let publicUrl = {
    loginUrl: context.api + "/login", //登录接口
    getUser: context.api + "/validate/getUserInfo",    //获取用户信息
    logOut: context.api + "/logout",     //登出接口
    addLog:context.api+"/operator/addLog",//添加日志
    getUpdateUrl:context.name + '/update/update.json'// 检测更新
};

export default publicUrl;
