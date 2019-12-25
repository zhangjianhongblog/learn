<template>
    <div class="baseInput">
        <label>
            {{label}}
            <input v-bind="$attrs"
                :value="value"
                v-on="inputListeners">
        </label>
        <Button @click="clickMe">点击我</Button>
        {{myName}}
    </div>
</template>

<script>
export default {
    inheritAttrs:false,
    props:['label','value','myName'],
    name:'',
    components:{},
    computed:{
        inputListeners(){
            let vm = this;
            return Object.assign({},vm.$listeners,{
                input(event) {
                    vm.$emit('input',event.target.value)
                }
            })
        }
    },
    data(){
        return {}
    },
    methods:{
        clickMe(){
            this.$emit('update:label','你是不是傻');
            this.$emit('update:a',123);
            this.$emit('update:myName',123);
        }
    },
    mounted(){},
    watch:{}
}
</script>

<style scoped lang="less">

</style>