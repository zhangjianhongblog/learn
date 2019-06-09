<!--  by: haoluo2 2019年02月20日
    name: 网页工具（返回顶部、放大、缩小）
    notes: 
-->
<template>
    <div v-if="showTool" class="toolWrap">
        <div v-show="showBackToTop" @click="backToTop" class="toTop">
            <Icon type="md-arrow-up" size="28"/>
        </div>
        <div class="zoomWrap">
            <div @click="zoomOut" :class="['item', 'zoomOut']" @mouseenter="mouseenterFn('enlarge')" @mouseleave="mouseleaveFn('enlarge')">
                <img src="../../libs/images/public/enlarge-blue.png" v-if="zoom!==1.5&&isShowLarge">
                <img src="../../libs/images/public/enlarge-gray.png" v-if="zoom!==1.5&&!isShowLarge">
                <img src="../../libs/images/public/enlarge-notClick.png" v-if="zoom===1.5">
            </div>
            <div @click="zoomIn" :class="['item', 'zoomIn']" @mouseenter="mouseenterFn('narrow')" @mouseleave="mouseleaveFn('narrow')">
                <img src="../../libs/images/public/narrow-notClick.png" v-if="zoom===1">
                <img src="../../libs/images/public/narrow-blue.png" v-if="zoom!==1&&isShowNarrow">
                <img src="../../libs/images/public/narrow-gray.png" v-if="zoom!==1&&!isShowNarrow">
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
export default {
    name: 'pageTool',
    data() {
        return {
            showBackToTop: false,
            isShowLarge:false,
            isShowNarrow:false,
        }
    },
    computed: {
        ...mapState(['zoom']),
        showTool() {
            return this.$route.name !== '/login.html';
        }
    },
    methods: {
        ...mapMutations(['setPageZoom']),
        onScroll() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let viewHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if (scrollTop >= viewHeight) {
                this.showBackToTop = true;
            } else {
                this.showBackToTop = false;
            }
        },
        backToTop() {
            window.scrollTo(0, 0);
        },
        zoomOut() {
            if (this.zoom >= 1.5) return;
            this.setPageZoom((this.zoom * 10 + 1) / 10);
        },
        zoomIn() {
            if (this.zoom <= 1) return;
            this.setPageZoom((this.zoom * 10 - 1) / 10);
        },
        mouseenterFn(text){
            text==='enlarge' ? this.isShowLarge = true : this.isShowNarrow = true;
        },
        mouseleaveFn(text){
            text==='enlarge' ? this.isShowLarge = false : this.isShowNarrow = false;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
    }
}
</script>

<style lang="less" scoped>
@import "../../libs/css/theme/theme.less";
.toolWrap {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 50px;
    z-index: 1000;
    .toTop {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        margin-bottom: 20px;
        background-color: #FFFFFF;
        box-shadow: 0 0 10px #dddddd;
        border-radius: 4px;
        color: #808695;
        cursor: pointer;
        &:hover {
            color: @themeColor;
        }
    }
    .zoomWrap {
        background-color: #FFFFFF;
        box-shadow: 0 0 10px #dddddd;
        border-radius: 4px;
        .item {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            cursor: pointer;
            color: #808695;
            &:hover {
                color: @themeColor;
            }
            &.zoomOut:after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 10px;
                width: 30px;
                height: 1px;
                background-color: @borderColor;
            }
            &.inValid {
                cursor: not-allowed;
                color: #C5C8CE;
            }
        }
    }
}
</style>
