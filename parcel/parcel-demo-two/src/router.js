module.exports = [
    {
        path:"/login.html",
        name:'login.html',
        meta:{
            title:"登录",
            author:"jhzhang"
        },
        component:(resolve) => {
            return resolve(require('./pages/login/index.vue'))
        }
    },
    {
        path:"/home.html",
        name:'home.html',
        meta:{
            title:"主页",
            author:"jhzhang"
        },
        component:(resolve) => {
            return resolve(require('./pages/home/index.vue'))
        }
    }
]