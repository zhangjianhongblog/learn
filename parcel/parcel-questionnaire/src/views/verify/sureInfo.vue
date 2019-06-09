<template>
    <div class="wrap">
        <div class="fixedImg fixedLeftImg"></div>
        <div class="fixedImg fixedRightImg"></div>
        <div class="zoomBox">
            <Spin size="large" fix v-if="loadingCount > 0"></Spin>
            <div class="infoWrap">
                <div class="contentWrap">
                    <div class="clearfix">
                        <div class="fl imgBox">
                            <img src="../../libs/images/verify/sureInfo-info.png" alt="">
                        </div>
                        <div class="fl infoBox">
                            <div class="loginheader">信息确认</div>
                            <ul class="info">
                                <li class="item clearfix">
                                    <span class="tag fl">监测账号:</span>
                                    <span class="content fl">{{userInfo.loginName}}</span>
                                </li>
                                <li class="item clearfix">
                                    <span class="tag fl">账号类型:</span>
                                    <span class="content fl">{{userType}}</span>
                                </li>
                                <li class="item clearfix">
                                    <span class="tag fl">学校名称:</span>
                                    <span class="content fl">{{userInfo.schoolName.slice(0,50)}}</span>
                                </li>
                                <li class="item clearfix">
                                    <span class="tag fl">学校编码:</span>
                                    <span class="content fl">{{userInfo.schoolId}}</span>
                                </li>
                                <li v-if="userInfo.isKey" class="item">
                                    <span class="tag">测试密钥:</span>
                                    <span class="content">
                                        <Input 
                                            v-model.trim="confirm.key" @on-blur="keyValidator"
                                            @on-enter="sureInfo"
                                            placeholder="输入密钥"
                                            autofocus
                                            :class="{'error': confirm.showTip}" style="width: 160px;">
                                        </Input>
                                        <div v-if="confirm.showTip" class="tip">{{confirm.tipText}}</div>
                                    </span>
                                </li>
                            </ul>
                            <div class="btnWrap">
                                <Button @click="sureInfo" type="primary">确定</Button>
                                <Button @click="reLogin">重新登录</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import publicUrl from '../../libs/interface/public.js';
    import paperUrl from '../../libs/interface/paper.js';
    import {
        mapState,
        mapMutations
    } from "vuex";
    export default {
        name: 'sureInfo',
        data() {
            return {
                loadingCount: 0,
                confirm: {
                    showTip: false,
                    tipText: '密钥不能为空！',
                    key: ''
                }
            }
        },
        computed: {
            ...mapState(["userInfo",'zoom']),
            userType() {
                let lastThreeNum = this.userInfo.loginName.substr(-3);
                let userType = this.userInfo.userType;
                if (userType === 3) {
                    return '学生';
                } else if (userType === 2) {
                    return '家长';
                } else {
                    if (lastThreeNum === '000') {
                        return '校长';
                    } else {
                        return '教师';
                    }
                }
            }
        },
        methods: {
            setZoom(){
                this.$nextTick(()=>{
                    let node=document.querySelector('.infoWrap');
                    node.style.zoom = this.zoom;
                    node.style.MozTransform=`scale(${this.zoom})`;
                })
            },
            reLogin() {
                this.loadingCount++;
                this.$ajax.get(publicUrl.addLog, {
                    params: {
                        modules: 3,
                        des: '重新登录'
                    }
                }).then(res => {
                    let data = this.$ajaxCheck(res);
                }).catch(err => {
                    this.$ajaxError(err);
                }).finally(() => {
                    this.loadingCount--;
                });
                this.$ajax.get(publicUrl.logOut).then(res => {
                    let data = this.$ajaxCheck(res);
                    this.$router.replace({
                        name: '/login.html'
                    })
                }).catch(err => {
                    this.$ajaxError(err);
                }).finally(() => {
                    this.loadingCount--;
                });
            },
            keyValidator() {
                if (!Boolean(this.confirm.key)) {
                    this.confirm.tipText = '密钥不能为空！';
                    this.confirm.showTip = true;
                    return false;
                }
                this.confirm.showTip = false;
                return true;
            },
            sureInfo() {
                let validate = this.keyValidator();
                if (this.userInfo.isKey === 1 && !validate) return;
                this.loadingCount++;
                this.$ajax.post(paperUrl.validateKey, {
                    key: this.confirm.key
                }).then(res => {
                    let data = this.$ajaxCheck(res);
                    this.navToPage();
                }).catch(err => {
                    this.$ajaxError(err);
                }).finally(() => {
                    this.loadingCount--;
                });
            },
            navToPage() {
                // 选择的问卷
                let chooseListLength = this.userInfo.chooseSubjectList.length;
                // 不同身份有不同选择页面
                let choosePage = '';
                if (this.userInfo.userType === 2) {
                    // 家长
                    choosePage = '/studentChoose.html';
                } else if (this.userInfo.userType === 3) {
                    // 学生
                    choosePage = '/studentChoose.html';
                } else {
                    choosePage = '/choose.html';
                }

                // 未选过问卷，跳转选择页面
                if (chooseListLength === 0) {
                    this.$router.replace({
                        name: choosePage
                    });
                    return false;
                }
                // 选过并且有未作答的问卷，跳转测试概览页面
                if (this.userInfo.notFinishSubjects && this.userInfo.notFinishSubjects.length > 0) {
                    this.$router.push({
                        name: '/guide.html'
                    });
                    return false;
                }
                // 选过且没有未作答的问卷，表示已完成
                if (this.userInfo.projectType === '0') {
                    // 练习项目，允许多次作答，已完成之后重选问卷
                    this.$router.push({
                        name: choosePage
                    });
                } else {
                    // 正式项目只允许作答一次，这里跳转测试概览页，该页会根据用户信息里的问卷信息判断完成状态，从而显示已完成提示
                    this.$router.push({
                        name: '/guide.html'
                    });
                }
            }
        },
        watch:{
            zoom(newVal,oldVal) {
                this.setZoom();
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../libs/css/theme/theme.less";

    .wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .fixedImg{
            position: absolute;
            &.fixedLeftImg{
                left:0;
                top:18px;
                background: url("../../libs/images/verify/sureInfo-left.png") no-repeat;
                width: 123px;
                height: 453px;
            }
            &.fixedRightImg{
                right:0;
                bottom:0;
                background: url("../../libs/images/verify/sureInfo-right.png") no-repeat;
                width: 296px;
                height: 515px;
                z-index: 0;
            }
        }

        .zoomBox{
            width: 100%;
            min-width: 1100px;
            height: calc(~'100% - ' 60px);
            margin: 60px auto 0;
            position: relative;
            overflow: auto;

            .infoWrap{
                position: absolute;
                width: 758px;
                height: 448px;
                top:50%;
                left:50%;
                margin-top: -244px;
                margin-left: -397px;
                background: #fff;
                border-radius: 14px;
                transform-origin: center center;
                .bigShadow();
            }
        }

        .contentWrap {
            width: 758px;
            height: 448px;
            .imgBox {
                width: 340px;
                height: 448px;
                border-right:1px solid @borderColor;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .infoBox {
                width: 418px;
                height: 448px;
                position: relative;
                padding-bottom: 80px;
                .loginheader {
                    margin-top: 34px;
                    height: 24px;
                    line-height: 24px;
                    font-size: 24px;
                    font-weight: normal;
                    letter-spacing: 1px;
                    color: #464c5b;
                    text-align: center;
                    user-select: none;
                }
                .info {
                    width: 300px;
                    margin: 0 auto;
                    padding: 30px 0 0px;
                    .item {
                        margin-bottom: 12px;
                        font-size: 16px;
                        list-style-type: none;
                        .tag {
                            display: inline-block;
                            width: 80px;
                            color: #647180;
                        }
                        .content {
                            position: relative;
                            color: #454b5a;
                            width:220px;
                            .error {
                                transition: 1s;

                                /deep/ .ivu-input {
                                    border-color: @errorThemeColor;
                                }
                            }
                            .tip {
                                display: inline-block;
                                position: absolute;
                                left: 0;
                                bottom: -30px;
                                font-size: 14px;
                                color: @errorThemeColor;
                            }
                        }
                        &:last-child{
                            margin-bottom: 20px;
                        }
                    }
                }
                .btnWrap {
                    position: absolute;
                    bottom: 30px;
                    left: 0;
                    right: 0;
                    padding: 0px 40px;
                    text-align: center;
                    .ivu-btn {
                        width: 120px;
                        height: 40px;
                        font-size: 16px;
                        line-height: 18px;
                        margin: 0px 20px;
                    }
                }
            }
        }
    }
</style>