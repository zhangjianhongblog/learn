import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Routers from './router.js';
import store from './store/index.js';
import iview from 'iview';

import 'iview/dist/styles/iview.css';
import './libs/css/reset.css';

Vue.use(VueRouter);
Vue.use(iview);

const RouterConfig = {
    routes:Routers
};

const router = new VueRouter(RouterConfig);

new Vue({
    el:'#app',
    router,
    store,
    render: h => h(App)
})