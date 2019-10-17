<template>
  <div>
    <FunctionButton :title="'我是一个按钮'" @click="log"><span>哈哈哈哈</span></FunctionButton>
  </div>
</template>

<script>
  import FunctionButton from './modules/functionButton.js';
  export default {
    data: function () {
      return {
        name: 'Hello World! 溺水时啥123123',
      }
    },
    components:{
      FunctionButton
    },
    methods:{
      log(){
        console.log('哈哈哈哈')
      }
    }
  };
</script>

<style>
  body {
    color: white;
    background-color: black;
  }
</style>
<style lang="less">
  @primary-color: white;
  @bg: black;

  body {
    color: @primary-color;
    background-color: @bg;
  }
</style>