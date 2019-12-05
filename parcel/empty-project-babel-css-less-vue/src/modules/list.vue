<template>
    <div class="container">
        adasd
        <div v-for="(item,index) in myList" :key="index">{{item}}</div>
    </div>
</template>

<script>
export default {
    props:{
        myList:{
            required:true,
            type:Array,
            default(){
                return [1,2,3];
            }
        }
    },
    name:'',
    components:{},
    computed:{},
    data(){
        return {}
    },
    methods:{},
    mounted(){},
    watch:{}
}
</script>

<style scoped lang="less">

</style>