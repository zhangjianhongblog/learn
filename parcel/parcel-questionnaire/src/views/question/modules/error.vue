<template>
    <div class="errorFrame">
        <div class="errorBox">
            <div class="errorBg"></div>
            <div class="errorContentBox">
                <div class="title">请求异常</div>
                <div class="methods">
                    {{onLine===false?"网络已断开连接，请连接网络后重试！":"请求服务过程中发生错误！"}}
                </div>
                <div class="footer">
                    <Button class="btn refreshBtn" type="primary" @click="refreshEvent">重试</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            onLine:navigator.onLine
        }
    },
    methods:{
        refreshEvent(){
            this.$emit("ontry");
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../../libs/css/theme/theme.less';
.errorFrame{
    position:fixed;
    top:50%;
    left:50%;
    width: 800px;
    height:470px;
    margin-top:-250px;
    margin-left: -400px;
    background: #fff;
    .errorBg{
        width:400px;
        height:330px;
        margin:0px auto 20px;
        background:url("../../../libs/images/public/noNetwork.png") no-repeat center;
        background-size:contain;
        opacity:0.7;
    }
    .errorContentBox{
        text-align: center;
        .title{
            font-size:20px;
            font-weight:bold;
            color:#646464;
        }
        .methods{
            margin:10px 0px;
            font-size:16px;
            color:#646464;
        }
        .hostInfo{
            font-size:14px;
            height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .footer{
            text-align:center;
            padding:20px 10px 0px;
            .refreshBtn{
                width:100px;
            }
        }
    }
}
</style>
