<!--
    by: haoluo2 2019年01月31日
    name: 账号审核中
    notes:
-->
<template>
    <div class="wrap">
        <div class="zoomBox">
            <Spin size="large" fix v-if="loadingCount > 0"></Spin>
            <div class="infoWrap">
                <div class="doneContent">
                    <div class="doneIcon"></div>
                    <div class="tips">
                        <p class="text">该账号已提交了重置身份申请，目前处于审核状态，暂时无法进入测试，将于10分钟内审核完成，请耐心等待！</p>
                    </div>
                    <div class="btnWrap">
                        <Button type="primary" @click="logout">退出登录</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import publicUrl from '../../libs/interface/public.js';
    import {
        mapState,
        mapMutations
    } from "vuex";
    export default {
        name: 'verify',
        data() {
            return {
                loadingCount: 0,
                timer: null
            }
        },
        watch:{
            zoom(newVal,oldVal) {
                this.setZoom();
            }
        },
        computed: {
            ...mapState(["userInfo",'zoom'])
        },
        methods: {
            navToPage(userInfo) {
                // 账号状态。0--待审核 1--审核通过 2--申请驳回 3--未提交过申请
                let status = userInfo.status;
                // 账号身份，2：家长，3：学生，其余教师
                let userType = userInfo.userType;
                // 已选择的问卷
                let chooseListLength = userInfo.chooseSubjectList.length;
                // 不同身份有不同选择页面
                let choosePage = '';
                if (userType === 2 || userType === 3) {
                    // 家长,学生
                    choosePage = '/studentChoose.html';
                } else {
                    choosePage = '/choose.html';
                }

                // 跳转逻辑
                // 正在审核中的项目仍然停留在本页，继续按时刷新
                if (status === 0) return false;
                if (chooseListLength > 0) {
                    // 只要已选过问卷，就跳转至测试概览页，该页会判断问卷完成情况
                    this.$router.replace({
                        name: '/guide.html'
                    });
                } else {
                    // 未选过问卷，跳转至对应身份选择问卷页面
                    this.$router.replace({
                        name: choosePage
                    });
                }
            },
            refreshPage() {
                this.loadingCount++;
                this.$ajax.post(publicUrl.getUser).then(res => {
                    let data = this.$ajaxCheck(res);
                    if (!data) return;
                    let userInfo = data.userInfo;
                    // 数据规整到userInfo中
                    userInfo.notFinishSubjects = data.notFinishSubjects;
                    this.$store.commit('setUserInfo', userInfo);
                    this.navToPage(userInfo);
                }).catch(err => {
                    this.$ajaxError(err);
                }).finally(() => {
                    this.loadingCount--;
                });
            },
            setZoom(){
                this.$nextTick(()=>{
                    let node=document.querySelector('.infoWrap');
                    node.style.zoom = this.zoom;
                    node.style.MozTransform=`scale(${this.zoom})`;
                });
            },
            logout() {
                this.loadingCount++;
                this.$ajax.get(publicUrl.logOut).then(res => {
                    let data = this.$ajaxCheck(res);
                    this.$store.commit('setUserInfo', false);
                    this.$router.replace({
                        name: '/login.html'
                    });
                }).catch(err => {
                    this.$ajaxError(err);
                }).finally(() => {
                    this.loadingCount--;
                });
            },
            init() {
                this.navToPage(this.userInfo);
                this.timer = setInterval(() => {
                    this.refreshPage();
                }, 60 * 1000);
                this.setZoom();
            }
        },
        beforeDestroy() {
            if (this.timer) {
                this.timer = clearInterval(this.timer);
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style lang="less" scoped>
    @import "../../libs/css/theme/theme.less";

    .wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .zoomBox{
            width: 100%;
            min-width: 1100px;
            height: calc(~'100% - ' 60px);
            margin: 60px auto 0;
            position: relative;
            overflow: auto;
        }
        .infoWrap{
            transform-origin: top center;
            width:1100px;
            margin:0 auto;
            overflow: hidden;
        }

        .doneContent {
            width: 1100px;
            margin: 0 auto;
            padding-top: 35px;

            .doneIcon {
                height: 170px;
                margin-top: 30px;
                background: url("../../libs/images/public/verify.png") no-repeat center;
            }

            .tips {
                margin-bottom: 60px;

                .text {
                    font-size: 16px;
                    line-height: 40px;
                    text-align: center;

                    .num {
                        // color: @focusColor;
                    }

                    .stress {
                        color: #464c5b;
                        font-weight: 600;
                    }
                }
            }

            .btnWrap {
                display: flex;
                justify-content: center;

                .ivu-btn {
                    margin-right: 40px;
                    width: 166px;
                    font-size: 16px;
                }
            }
        }
    }
</style>