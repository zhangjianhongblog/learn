<!--  by: hlwang 2018年11月08日
    name: 入口路由
    notes: 登录后根据路由进行分发
-->
<template>
    <div>
        <div id="app">
            <router-view></router-view>
        </div>
        <page-tool></page-tool>
    </div>
</template>
<script>
    import pageTool from "./modules/pageTool.vue";
    import publicUrl from "../libs/interface/public.js";
    export default {
        data() {
            return {}
        },
        props: {
            firstRouter: {
                type: Object
            }
        },
        components: {
            pageTool
        },
        methods: {
            getUser(action) {
                this.$ajax.post(publicUrl.getUser).then(res => {
                    let data = this.$ajaxCheck(res);
                    if (!data) return;
                    let userInfo = data.userInfo;
                    // 数据规整到userInfo中
                    userInfo.notFinishSubjects = data.notFinishSubjects;
                    this.$store.commit('setUserInfo', userInfo);
                    if (this.firstRouter.path !== '/' && this.firstRouter.name) {
                        this.$router.replace(Object.assign({}, this.firstRouter));
                    } else {
                        this.$router.replace({
                            name: '/login.html'
                        });
                    }
                }).catch(err => {
                    this.$router.replace({
                        name: '/login.html'
                    });
                    console.log("获取用户信息时发生问题：",err)
                })
            }
        },
        mounted() {
            this.getUser(this.firstRouter.query.action);
        }
    }
</script>
<style lang="less">
    @import "../libs/css/theme/theme.less";
    div{
        user-select: none;
    }
</style>
