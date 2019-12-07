<template>
  <div>
    <FunctionButton :title="'我是一个按钮'" @click="log"><span>哈哈哈哈</span></FunctionButton>
    <list :myList="undefined"><list>
  </div>
</template>

<script>
  import FunctionButton from './modules/functionButton.js';
  import list from './modules/list.vue';
  export default {
    data: function () {
      return {
        name: 'Hello World! 溺水时啥123123',
      }
    },
    components: {
      FunctionButton,
      list
    },
    methods: {
      log() {
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