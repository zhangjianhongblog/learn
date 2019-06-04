<template>
    <div class="container">
        <div>{{time | dateServer}}</div>
        我是登录页
        <FooterBox></FooterBox>
    </div>
</template>

<script>
export default {
    name:'login',
    components:{},
    computed:{},
    data(){
        return {
            time:'20190923'
        }
    },
    methods:{},
    mounted(){},
    watch:{}
}
</script>

<style scoped lang="less">

</style>