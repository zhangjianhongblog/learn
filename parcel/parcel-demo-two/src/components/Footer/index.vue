<template>
    <div class="footerBox">
        {{msg}}
        {{msg}}
        <Icon type="ios-checkmark" />
        <Icon type="logo-angular" />
        <Icon type="md-arrow-dropdown" />
    </div>
</template>

<script>
export default {
    name:'footerBox',
    components:{},
    computed:{},
    data(){
        return {
            msg:'我是footerhhhh'
        }
    },
    methods:{},
    mounted(){
        this.$store.commit('setUserInfo',{
            name:'zhangjianhong'
        })
    },
    watch:{}
}
</script>

<style scoped lang="less">
    .footerBox{
        color:red;
        text-align: center;
        font-size:1rem;
    }
</style>