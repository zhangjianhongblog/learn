//update 2018年12月26日
//增加 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
//增加 ajaxCheck 回调函数
//完善 ajaxError 错误处理机制===》 2018年12月28日
var axios = require('axios');
var qs = require('qs');

var ajax = (function() {
    var content=this;
    var ajaxAxios = axios.create({
        baseurl: "",
        timeout: 180000,
        withCredentials: true,//跨域携带cookies
        //responsetype: 'json',
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        },
        validateStatus: function() {
            return true; //错误码交给ajaxCheck去验证
        },
        paramsSerializer: function(params) {
            return qs.stringify(params, {
                arrayFormat: 'brackets'
            })
        },
        transformResponse: [function(data) {
            return data;
        }]
    });
    ajaxAxios.all=axios.all;//并发请求
    ajaxAxios.spread=axios.spread;//分隔请求
    ajaxAxios.interceptors.request.use((config) => {
        config.source = axios.CancelToken.source(); //设置取消函数
        config.cancelToken = config.source.token;
        //console.log(content);
        content.$options.destroyed.push(un=>{
            //if(config.source)config.source.cancel();
        })
        if (!config.params) config.params = {};
        if (config.method === 'post') {
          if (!config.data) config.data = {};
          if(typeof(FormData)!=="undefined" && config.data instanceof FormData){
              //不执行操作
          }else if (config.qs === undefined || config.qs) {
            config.data = qs.stringify(config.data);
          }
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    })
    ajaxAxios.interceptors.response.use((response) => {
        response.config.source=null;
        let contentType= (response.headers && response.headers["content-type"])?String(response.headers["content-type"]):"";
        if(contentType.indexOf("application/json")>=0){
            try {
                response.data=JSON.parse(response.data);
            } catch (e) {
                response.data={
                    status:"error",
                    message:"服务端返回数据格式错误！"
                }
            }
        }
        var errorTip="网络拥堵，您的请求需排队处理，请稍后再试";
        var errStatus = {
            300: "资源已被转移至其他位置",
            301: "请求的资源已被永久移动到新URI",
            302: "请求的资源已被临时移动到新URI",
            305: "请求的资源必须通过代理访问",
            400: "错误资源访问请求",
            401: "资源访问未授权",
            403: "资源禁止访问",
            404: errorTip,
            // 404: "未找到要访问的资源",
            405: "请更换请求方法",
            406: "无法访问",
            408: "请求超时",
            413: "请求实体过大",
            414: "请求URI过长",
            //500: "内部服务器错误",
            //501: "未实现",
            //503: "服务无法获得",
            //504: "接口访问超时"
            500: errorTip,
            501: errorTip,
            503: errorTip,
            504: errorTip
        }
        //var errorMessage=`请求服务过程中发生错误【${response.status}】`;
        var errorCode=isNaN(response.status)?1:(response.status*3);
        var errorMessage=`${errorTip}【${errorCode}】`;
        if(response.status >=300 && errStatus[String(response.status)]){
            // errorMessage=errStatus[String(response.status)]+`【${response.status}】`;
            errorMessage=errStatus[String(response.status)]+`【${errorCode}】`;
        }else if (response.status === 200) {
            return response;
        }
        response.data={
            status:"error",
            // message:errorMessage?errorMessage:`请求服务过程中发生错误【${response.status}】`
            message:errorMessage?errorMessage:`${errorTip}【${errorCode}】`
        }
        response.headers["content-type"]="application/json";
        return response;
    }, function(error) {
        return Promise.reject(error);
    });
    return ajaxAxios;
});

const ajaxCheck = function(response,callback) {
    let contentType= "";
    if(response.headers && response.headers instanceof Object){
        Object.keys(response.headers).forEach(headerItem=>{
            if(headerItem.toLocaleLowerCase()==="content-type"){
                contentType=response.headers[headerItem]
            }
        })
    }
    if(contentType.indexOf("application/json")>=0){
        switch (response.data.status) {
        case "login":
            if(callback instanceof Function && callback("login")===false)return;
            this.$router.replace({
                name:"/login.html"
            })
            break;
        case "location":
            document.location=response.data.message;
            document.close();
            break;
        case "error":
            throw(new Error(response.data.message));
            break;
        case "success":
            return response.data.data;
        default:
            throw(new Error("未知的协议格式"));
        }
        return null;
    }
    return response.data;
}
const ajaxError = function(error, errorMessage) {
    let message= "";
    if(errorMessage){
        message=errorMessage;
    }else if(typeof(error)==="string"){
        message=error;
    }else if(typeof(Error)!=="undefined" && error instanceof Error){
        message=error.message;
    }else{
        message="请求过程中出现问题，请稍后再试【000】";
    }
    message=(navigator.onLine===false || message==="Network Error")?"网络已断开连接，请连接网络后重试！":message;
    if(this.$Modal){
        this.$Modal.info({
            title: "提示",
            content: message
        });
    }else{
        alert(message);
    }
    //默认错误处理函数
    this.$log(error);
}

var install = {
    install(Vue) {
        Vue.mixin({
            beforeCreate() {
                this.$ajax = ajax.bind(this)();
                this.$ajaxCheck = ajaxCheck.bind(this);
                this.$ajaxError = ajaxError.bind(this);
            }
        })
    }
}
export {
    ajax,
    ajaxCheck,
    ajaxError
};
export default install;
