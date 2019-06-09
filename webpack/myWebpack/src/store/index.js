import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions.js';
import mutations from './mutations.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict:process.env.NODE_ENV === 'production',
    state:{
        userInfo:{}
    },
    getters:{},
    mutations,
    actions
})
export default store;
