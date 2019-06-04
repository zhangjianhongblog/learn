import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Routers from './router.js';
import store from './store/index.js';
import iview from 'iview';

import 'iview/dist/styles/iview.css';
import '@/libs/css/reset.css';
import '@/libs/css/media.css';

// 过滤器
import * as custom from "./libs/js/filters.js";
Object.keys(custom).forEach(key => Vue.filter(key,custom[key]));

// 全局引用 所有的组件
import './components/componentRegister.js';

Vue.use(VueRouter);
Vue.use(iview);

const RouterConfig = {
    routes:Routers
}

const router = new VueRouter(RouterConfig);

new Vue({
    el:"#app",
    store,
    router,
    render: h => h(App)
})