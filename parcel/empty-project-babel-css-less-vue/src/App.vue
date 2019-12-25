<template>
  <div class="heheh">
    <FunctionButton :title="'我是一个按钮'" @click="log"><span>哈哈哈哈</span></FunctionButton>
    <list :myList="undefined"></list>
    <slotLearn></slotLearn>
    <base-input v-model="msg" :label.sync="myLabel" @blur="blurFn" name="张建红" v-bind.sync="myDoc">
      <base-input>
  </div>
</template>

<script>
  import FunctionButton from './modules/functionButton.js';
  import list from './modules/list.vue';
  import slotLearn from './modules/slotLearn.vue';
  import baseInput from './modules/baseInput.vue';
  export default {
    data: function () {
      return {
        name: 'Hello World! 溺水时啥123123',
        msg: "",
        myLabel:'我是label',
        myDoc:{
          a:3,
          c:2,
          myName:'zhangjianhong'
        }
      }
    },
    components: {
      FunctionButton,
      list,
      slotLearn,
      baseInput
    },
    methods: {
      log() {
        console.log('哈哈哈哈')
      },
      blurFn() {
        console.log('我是去了焦点')
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