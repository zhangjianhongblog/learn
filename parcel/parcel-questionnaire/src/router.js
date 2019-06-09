var context =require("./libs/interface/context.js");

module.exports = [
    {
        path: context.name + '/answer.html',
        name: '/answer.html',
        meta: {
            title: '答题',
            author:"hlwang7"
        },
        component: (resolve) => {
            return resolve(require('./views/question/answer.vue'))
        }
    },
    {
        path: context.name + '/login.html',
        name: '/login.html',
        meta: {
            title: '登录',
            author: 'haoluo2',
            parentRouter: '--'
        },
        component: (resolve) => {
            return resolve(require('./views/login.vue'))
        }
    },
    {
        path: context.name + '/index.html',
        name: '/index.html',
        meta: {
            title: '首页',
            author: 'haoluo2',
            parentRouter: '--'
        },
        component: (resolve) => {
            return resolve(require('./views/index/index.vue'))
        },
        children: [
            {
                path: context.name + '/sureInfo.html',
                name: '/sureInfo.html',
                meta: {
                    title: '身份确认',
                    author: 'haoluo2',
                    parentRouter: '--'
                },
                component: (resolve) => {
                    return resolve(require('./views/verify/sureInfo.vue'))
                }
            },
            {
                path: context.name + '/choose.html',
                name: '/choose.html',
                meta: {
                    title: '选择问卷',
                    author: 'haoluo2',
                    parentRouter: '--'
                },
                component: (resolve) => {
                    return resolve(require('./views/choose/choose.vue'))
                }
            },
            {
                path: context.name + '/studentChoose.html',
                name: '/studentChoose.html',
                meta: {
                    title: '选择问卷',
                    author: 'haoluo2',
                    parentRouter: '--'
                },
                component: (resolve) => {
                    return resolve(require('./views/choose/studentChoose.vue'))
                }
            },
            {
                path: context.name + '/guide.html',
                name: '/guide.html',
                meta: {
                    title: '指导页',
                    author: 'haoluo2',
                    parentRouter: '--'
                },
                component: (resolve) => {
                    return resolve(require('./views/guide/guide.vue'))
                }
            },
            {
                path: context.name + '/verify.html',
                name: '/verify.html',
                meta: {
                    title: '账号审核中',
                    author: 'haoluo2',
                    parentRouter: '--'
                },
                component: (resolve) => {
                    return resolve(require('./views/verify/verify.vue'))
                }
            }
        ]
    }
];
