<template>
  <div>
    {{name}}
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        name: 'Hello World! 溺水时啥123123',
      }
    },
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