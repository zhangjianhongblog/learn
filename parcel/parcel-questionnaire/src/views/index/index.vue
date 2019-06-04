<!--
    by: haoluo 2019年01月08日
    name: 首页
    notes:
-->
<template>
<div class="frameWrap">
    <titleBar></titleBar>
    <div class="frameContent">
        <router-view></router-view>
    </div>
    <div class="footer">
        <div class="copyright"><font style="font-family:microsoft yahei;">©</font>版权所有 教育部基础教育质量监测中心</div>
    </div>
</div>
</template>

<script>
import publicUrl from "../../libs/interface/public.js";
import * as Event from "../../libs/js/event.js";
import titleBar from "../modules/titleBar.vue";
import {
    mapState,
    mapMutations
} from "vuex";
export default {
    name: "index",
    data() {
        return {}
    },
    computed: {
        ...mapState(["userInfo"])
    },
    components:{
        titleBar
    },
    methods:{
    },
    mounted() {
        window.onbeforeunload = function(e) {
            var confirmationMessage = '确定要退出吗？';
            (e || window.event).returnValue = confirmationMessage;     // Gecko and Trident
            return confirmationMessage;
        }
    },
    beforeDestroy() {
        window.onbeforeunload = null;
    }
}
</script>

<style scoped lang="less">
@import "../../libs/css/theme/theme.less";
.frameWrap {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f4f8fb url("../../libs/images/public/dottedLine.png");

    .frameContent {
        width: 100%;
        height: 100%;
        overflow: auto;
        padding-top: 0px;
    }
    .footer{
        position: fixed;
        bottom:0px;
        left:0;
        height: 30px;
        line-height: 30px;
        background: rgba(255,255,255,0.5);
        white-space: nowrap;
        padding: 0 0px;
        border-top-right-radius: 20px;
        z-index: 99;
        .copyright {
            margin-left: 10px;
            margin-right: 20px;
            color:#818b97;
        }
    }
}
</style>
