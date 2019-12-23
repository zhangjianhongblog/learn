<template>
    <div class="container">
        <slot :user="user">
            {{user.firstName}}
        </slot>
    </div>
</template>

<script>
export default {
    props:{
        user:{
            type:Object,
            default(){
                return {}
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