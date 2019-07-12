<template>
    <div class="container">
        我是登录页
        
        <div>
            {{message}}
        </div>
        <div>
            <input v-model="msg"/>
        </div>
        <div>
            <button @click="toHome">我要去home</button>
        </div>
        <FooterBox></FooterBox>
    </div>
</template>

<script>
import FooterBox from '../../components/Footer/index.vue'
export default {
    name:'login',
    components:{
        FooterBox
    },
    computed:{},
    data(){
        return {
            message:'哈哈哈哈',
            isFrom:false,
            msg:'',
        }
    },
    methods:{
        init(){
            this.message = '张荆红';
        },
        toHome(){
            this.message = '杀杀杀';
            this.$router.replace({
                name:'home.html'
            })
        }
    },
    mounted(){
        this.init();
        this.isFrom =false;
    },
    watch:{},
    beforeRouteLeave(to,from,next){
        this.isFrom = true;
        next(confirm('确定要离开吗？'))
    }
}
</script>

<style scoped lang="less">

</style>