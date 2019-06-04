<!--
    by: haoluo2 2019年01月23日
    name: 登录页
    notes:
-->
<template>
<div :class="['loginFrame',{'showClientTip':showClientTip}]">
    <div class="loginFrameBox">
        <div class="loginBg">
            <div class="topBox"></div>
            <div class="rightBox"></div>
        </div>
        <div class="loginBox">
            <div class="logoImage"></div>
            <div class="loginContent">
                <Spin size="large" fix v-if="loading.login"></Spin>
                <div class="loginheader">欢迎登录!</div>
                <div class="loginForm">
                    <div class="username">
                        <div class="iconBox">
                            <Icon type="md-people" size="25" />
                        </div>
                        <input @keyup="validate('name')" v-model.trim="loginData.name" class="inputBox" maxlength="35" placeholder="请输入用户名" />
                        <div v-if="errorTip.name.show" class="errorTip">{{errorTip.name.tip}}</div>
                    </div>
                    <div class="password">
                        <div class="iconBox">
                            <Icon type="md-lock" size="23" />
                        </div>
                        <input @keyup="validate('password')" @keyup.enter="login" type="password" v-model.trim="loginData.password" class="inputBox" maxlength="35" placeholder="请输入密码" />
                        <div v-if="errorTip.password.show" class="errorTip">{{errorTip.password.tip}}</div>
                    </div>
                    <div class="btnBox">
                        <Button class="loginButton" type="primary" @click="login">
                            <span class="loginText">登 录</span><Icon type="md-arrow-forward" size="25"></Icon>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="copyright"><font style="font-family:microsoft yahei;">©</font>版权所有 教育部基础教育质量监测中心</div>
        </div>
    </div>
    <div class="gotoClientFrame">
        <div class="clientWindow">
            <div class="clientWindowTxt">
                请使用<span class="clientName"> 问卷调查系统客户端 </span>作答，如未安装，请点击下方按钮进行下载!
            </div>
            <div class="downloadFrame">
                <Button type="primary" style="width:160px" @click="gotoDownloadWeb">下载客户端</Button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import publicUrl from '../libs/interface/public.js';
import paperUrl from '../libs/interface/paper.js';
import * as Event from "../libs/js/event.js";
import {
    mapState,
    mapMutations
} from "vuex";
import { debug } from 'util';
export default {
    name: 'login',
    data() {
        return {
            showClientTip:false,
            loading: {
                login: false
            },
            loginData:{
                name: '',
                password: ''
            },
            errorTip: {
                name: {
                    show:false,
                    tip:"请输入用户名"
                },
                password: {
                    show:false,
                    tip:"请输入密码"
                }
            },
            countNumber:0//点击按钮次数
        }
    },
    computed: {
        ...mapState(['userInfo','runElectron','networkInterfaces']),
        isOnline(){
            return window.isOnline;
        },
        isCloud(){
            return window.isCloud;
        }
    },
    methods: {
        ...mapMutations(['setPageZoom']),
        gotoDownloadWeb(){
            window.location="https://eachina.changyan.cn/";
        },
        //是否显示切换你在线版
        showCountEvent(){       
            if(this.countNumber>=5 || isOnline)return;//超过5或在线版返回 
            this.countNumber++;
        },
        //判断是否为空
        validate(type){
            this.errorTip[type].show=!this.loginData[type];
            return !!this.loginData[type];
        },
        login() {
            if(!this.validate("name") || !this.validate("password")){
                return;
            }
            this.loading.login = true;
            this.$ajax.post(publicUrl.loginUrl, {
                loginName: this.loginData.name,
                password: this.loginData.password,
                mac: this.networkInterfaces,
                version:'',
                smallVersion:'',
                versionFlag:this.isOnline?1:0,
                isCloud:this.isCloud?1:0,
                isElectron:this.runElectron?1:0
            }).then(res => {
                let data = this.$ajaxCheck(res);
                if (!data) return;
                let userInfo = data.userInfo;
                // 数据规整到userInfo中
                userInfo.notFinishSubjects = data.notFinishSubjects;
                window.loginUserId=userInfo.userId;
                window.loginUserName=this.loginData.name;
                this.$store.commit('setUserInfo', userInfo);
                this.navToPage(userInfo);
            }).catch(err => {
                this.$ajaxError(err);
            }).finally(() => {
                this.loading.login=false;
            });
        },
        navToPage(userInfo) {
            // 正在审核中的项目跳转至等待审核页面
            // 正式项目已作答完成之后，直接跳转至已完成的提示页
            // 其余均跳转至信息确认页
            let status = userInfo.status;//账号状态。0--待审核 1--审核通过 2--申请驳回 3--未提交过申请
            let projectType = userInfo.projectType;//项目类型，0--练习项目 1--正式项目
            // 已选问卷不为空，且未完成问卷为空，表示已完成
            let isDone = userInfo.chooseSubjectList
                        && userInfo.chooseSubjectList.length > 0
                        && userInfo.notFinishSubjects
                        && userInfo.notFinishSubjects.length === 0;

            // 正在审核中的项目，跳转至等待审核页面
            if (status === 0) {
                this.$router.replace({
                    name: '/verify.html'
                });
                return false;
            }
            // 其余状态走正常流程
            // 正式项目已完成之后跳转至已完成提示页面，其余跳转至确认信息页面
            if (String(projectType) === '1' && isDone) {
                this.$router.replace({
                    name: '/guide.html'
                });
            } else {
                this.$router.replace({
                    name: '/sureInfo.html'
                });
            }
        },
        changeWebVersion(){
            Event.dispatchEvent("changeWebVersionEvent")
        },
        showGotoClient(){

        }
    },
    mounted() {
        Event.dispatchEvent("clearCookies");
        this.setPageZoom(1);
        this.showClientTip=!window.runElectron;
    }
}
</script>

<style lang="less" scoped>
@import "../libs/css/theme/theme.less";
.loginFrame {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
    overflow: hidden;
    .loginFrameBox{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #FFFFFF;
        overflow: hidden;
    }
    .gotoClientFrame{
        position: fixed;
        display: none;
        z-index: 100;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,0.3);
        .clientWindow{
            position: fixed;
            border-radius: 8px;
            width: 500px;
            height: 300px;
            background: #ffffff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            left: 50%;
            top: 50%;
            margin-left: -250px;
            margin-top: -150px;
            padding-top: 40px;
            .clientWindowTxt{
                background: url("../libs/images/login/toClient.png") no-repeat center top;
                text-align: center;
                padding:140px 20px 25px; 
                .clientName{
                    color: @themeColor;
                    font-weight: bold;
                }
            }
            .downloadFrame{
                text-align: center;
            }
        }
    }
    // &.showClientTip{
    //     .loginFrameBox{
    //         filter: blur(9px);
    //     }
    //     .gotoClientFrame{
    //         display: block;
    //     }
    // }
    .versionFrame {
        position: absolute;
        top:15px;
        left:20px;
        z-index: 1006;
        line-height: 20px;
        height: 20px;
        color: #fff;
        font-size: 12px;
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        -webkit-app-region: no-drag;
        .webBtn{
            cursor: pointer;
        }
    }
    .loginBg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        .topBox,.rightBox{
            position: absolute;
            width: 100%;
            background-repeat: no-repeat;
            background-size: auto 100%;
        }
        .topBox {
            top: 0;
            left: 0;
            min-height: 75px;
            height: 11%;
            background-position: left top;
            background-image: url("../libs/images/login/top.png");
        }
        .rightBox {
            right: 0;
            bottom: 0;
            min-height: 633px;
            height: 94%;
            background-position: right bottom;
            background-image: url("../libs/images/login/right.png");
        }
    }
    .loginBox {
        position: absolute;
        z-index: 3;
        top: 50%;
        left: 6%;
        transform: translate(0, -50%);
        width: 35.5%;
        min-width: 480px;
        min-height: 450px;
        .logoImage {
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 12%;
            min-height: 40px;
            background-repeat: no-repeat;
            background-size: 100% auto;
            background-image: url("../libs/images/login/logo.svg");
        }
        .loginContent {
            position: relative;
            z-index: 0;
            margin-top: 20%;
            width: 100%;
            background-color: #ffffff;
            box-shadow: 0 4px 35px 0px #c1d1d5;
            border-radius: 10px;
            padding: 8% 9.4%;
            .loginheader {
                height: 20px;
                line-height: 20px;
                font-size: 20px;
                font-weight: normal;
                letter-spacing: 1px;
                color: #657080;
                text-align: center;
                user-select: none;
            }
            .loginForm {
                .username,.password{
                    margin-top: 40px;
                    height: 40px;
                    border-bottom: 1px solid @borderColor;
                    position: relative;
                    user-select: none;
                    margin-bottom: 60px;
                }
                .iconBox{
                    width: 30px;
                    height: 32px;
                    line-height: 32px;
                    opacity: 0.6;
                }
                .inputBox{
                    position: absolute;
                    display: block;
                    left: 35px;
                    top: 0px;
                    color: rgba(0,0,0,0.7);
                    line-height: 30px;
                    width: calc(100% - 40px);
                    height: 32px;
                    border: none;
                    outline: none;
                    &::input-placeholder{
                        color: rgba(0,0,0,0.4);
                    }
                }
                .errorTip{
                    position: absolute;
                    height: 32px;
                    top: 0;
                    right: 0;
                    white-space: nowrap;
                    color: #f00;
                    line-height: 32px;
                    text-align: center;
                }
                .btnBox {
                    margin: 50px 0 20px 0;
                    .loginButton {
                        width:100%;
                        height: 45px;
                        .loginText {
                            font-size: 21px;
                            margin-right: 10px;
                            font-weight: bold;
                        }
                        i{
                            margin-top: -5px;
                        }
                    }
                }
            }
        }
    }
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 30px;
        line-height: 30px;
        background: rgba(255, 255, 255, 0.5);
        white-space: nowrap;
        padding: 0;
        border-top-right-radius: 20px;
        z-index: 99;
        .copyright {
            margin-left: 10px;
            margin-right: 20px;
            color: #818b97;
        }
    }
    // .copyright {
    //     position: absolute;
    //     bottom: 30px;
    //     left: 6%;
    //     width: 35.5%;
    //     z-index: 2;
    //     text-align: center;
    //     line-height: 30px;
    //     font-size: 12px;
    //     color: #909399;
    // }
}
</style>
