<template>
    <div class="header clearfix">
        <img src="../../libs/images/login/logo.svg" class="logo fl">
        <slot name="other"></slot>
    </div>
</template>
<style v-scoped lang="less">
.header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    .logo {
        position: absolute;
        top:16px;
        left:20px;
        width: 343px;
        height: 30px;
    }
}
</style>

