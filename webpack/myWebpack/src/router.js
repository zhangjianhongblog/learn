module.exports = [
    {
        path:'/login.html',
        name:"login.html",
        meta:{
            titie:"登录",
            author:"jhzhang"
        },
        component:(resolve) => {
            require.ensure([], () => {
                return resolve(require('./pages/login/index.vue'))
            }, "login")
        }
    }
]