<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:'',
    components:{
        
    },
    computed:{},
    data(){
        return {}
    },
    methods:{},
    mounted(){
        this.$router.push({
            name:'login.html'
        })
    },
    watch:{}
}
</script>

<style scoped lang="less">

</style>