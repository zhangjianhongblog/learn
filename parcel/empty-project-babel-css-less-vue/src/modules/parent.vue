<template>
    <div class="container">
        <child :user="user">
            <template v-slot="{user}">
                <span>{{user.lastName}}</span>
            </template>
        </child>
    </div>
</template>

<script>
import child from './child.vue';
export default {
    name:'',
    components:{
        child
    },
    computed:{},
    data(){
        return {
            user:{
                firstName:'zhang',
                lastName:'jianhong'
            }
        }
    },
    methods:{},
    mounted(){},
    watch:{}
}
</script>

<style scoped lang="less">

</style>