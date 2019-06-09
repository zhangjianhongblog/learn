<!--
    by: haoluo2 2019年01月25日
    name: 测试概览页
    notes:
-->
<template>
    <div class="wrap">
        <div class="fixedImg fixedLeftImg"></div>
        <div class="fixedImg fixedRightImg"></div>
        <div :class="['zoomBox',complete==='doing'?'doingZoomBox':'doneZoomBox']" >
            <Spin size="large" fix v-if="loadingCount > 0"></Spin>
            <div class="infoWrap">
                <div  class="content" v-if="complete==='doing'">
                    <div class="title">测试概览</div>
                    <div class="tipsBox" ref="tipsBox">
                        <div class="tips">
                            <span class="text tipsText">您好：根据您的身份和选择，本次需要作答<span class="num">{{paperCount}}</span>份问卷，
                                分别是“<span class="stress">{{paperNameStr}}</span>”
                                <span v-if="currentPosition === 1">，请核对是否有误，<span
                                        class="stress">一旦进入测评，将不能重选问卷</span></span>。
                            </span>
                        </div>
                        <div class="tips">
                            <span class="text tipsText">您即将作答的是第
                                <span class="num">{{currentPosition}}</span>
                                份问卷——“<span class="stress">{{currentPaper.subjectName.replace(/\(系统默认\)/, '')}}</span>”，
                                本份问卷作答完成后，请及时提交作答结果。
                            </span>
                        </div>
                    </div>
                    <div class="guide">
                        <div class="paperList">
                            <div :class="['item', getPaperStatus(index)]" v-for="(item, index) in chooseList" :key="index" @click="startPaper(index)">
                                <div class="bar"></div>
                                <div class="subjectNameShort">{{item.subjectName.replace(/\(系统默认\)/, '').slice(0,1)}}</div>
                                <div class="subjectName">{{item.subjectName.replace(/\(系统默认\)/, '')}}</div>
                                <div class="status">
                                    <span :class="[getPaperStatus(index)]">({{getPaperStatusText(index)}})</span>
                                </div>
                            </div>
                        </div>
                        <div class="btnWrap">
                            <Button @click="gotoExam(currentPaper.paperId, currentPaper.resultId)"
                                type="primary">进入测评</Button>
                            <Button v-if="currentPosition === 1" @click="reChoose">重选问卷</Button>
                            <Button v-if="currentPosition !== 1 && userInfo.userType === 1"
                                @click="showResetModal">申请身份重置</Button>
                        </div>
                    </div>
                </div>
                <div v-if="complete==='done'" class="doneContent">
                    <div class="doneIcon"></div>
                    <div class="tips">
                        <p class="text">您已经完成了所有的问卷，现在您可以退出系统。</p>
                        <p class="text">本次测验中您一共填写了<span class="num">{{paperCount}}</span>份问卷，
                            分别是“<span class="stress">{{paperNameStr}}</span>”。</p>
                    </div>
                    <div class="btnWrap">
                        <!-- <Button type="primary" @click="testAgain">再作答一次</Button> -->
                        <Button type="primary" @click="reLogin"> 已提交成功,请退出 </Button>
                    </div>
                </div>
            </div>
        </div>
        <Modal width="800" class-name="vertical-center-modal" v-model="showModal" :mask-closable="false" title="申请身份重置">
            <div class="contentBody">
                <Alert type="warning" show-icon>提交申请后，已选身份将会被重置，所作答数据将会被清空，请谨慎操作。
                    </br>提交后，账号将自动退出登录，请于5-10分钟后重新登录！
                </Alert>
                <div class="modalContent">
                    <span class="resetCap">重置原因:</span>
                    <div class="resetInput">
                        <Checkbox v-model="reasonOne">选错了班主任身份</Checkbox>
                        <Checkbox v-model="reasonTwo">选错了学科</Checkbox>
                    </div>
                </div>
            </div>
            <div class="brnWrap" slot="footer">
                <Button @click="closeResetModal" style="width:110px">取消</Button>
                <Button @click="applyReset" style="width:110px" type="primary">提交申请</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    const CONTENT_WIDTH = 1000; // 内容宽度 1000
    import publicUrl from '../../libs/interface/public.js';
    import paperUrl from '../../libs/interface/paper.js';
    import * as Event from "../../libs/js/event.js";
    import {
        mapState,
        mapMutations
    } from "vuex";
    export default {
        name: 'guide',
        data() {
            return {
                loadingCount: 0,
                complete: '',
                chooseList: [],
                currentPosition: 1,
                currentPaper: {},
                showModal: false,
                reasonOne: false,
                reasonTwo: false
            }
        },
        watch:{
            zoom(newVal,oldVal) {
                this.setZoom();
            }
        },
        computed: {
            ...mapState(['userInfo','runElectron','zoom', 'networkInterfaces']),
            paperCount() {
                return this.chooseList.length;
            },
            paperNameStr() {
                let paperNameArr = [];
                this.chooseList.forEach(paper => {
                    paperNameArr.push(paper.subjectName.replace(/\(系统默认\)/, ''));
                });
                return paperNameArr.join('、');
            }
        },
        mounted() {
            this.init();
            this.setZoom();
        },
        methods: {
            setZoom(){
                this.$nextTick(()=>{
                    let node=document.querySelector('.infoWrap');
                    node.style.zoom = this.zoom;
                    node.style.MozTransform=`scale(${this.zoom})`;
                })
            },
            init() {
                this.getHadPaper();
            },
            reChoose() {
                this.loadingCount++;
                this.$ajax.get(publicUrl.addLog, {
                    params: {
                        modules: 5,
                        des: '重选问卷'
                    }
                }).then(res => {
                    let data = this.$ajaxCheck(res);
                    let userType = this.userInfo.userType;
                    // 1，教师/校长；2,家长；3，学生
                    let routerName = userType === 1 ? '/choose.html' : '/studentChoose.html';
                    this.$router.replace({
                        name: routerName
                    });
                }).catch(err => {
                    this.$ajaxError(err);
                }).finally(() => {
                    this.loadingCount--;
                });
            },
            gotoExam(paperId, resultId) {
                if (!paperId || !resultId) return;
                this.loadingCount++;
                this.$ajax.get(publicUrl.addLog, {
                    params: {
                        modules: 5,
                        des: '进入' + '『' + this.currentPaper.subjectName.replace(/\(系统默认\)/, '') + '』测评'
                    }
                }).then(res => {
                    let data = this.$ajaxCheck(res);
                }).catch(err => {
                    this.$ajaxError(err);
                }).finally(() => {
                    this.loadingCount--;
                });
                this.$router.push({
                    name: '/answer.html',
                    query: {
                        paperId: paperId,
                        resultId: resultId
                    }
                });
            },
            clearLocalAnswerRecord() {
                this.chooseList.forEach(item => {
                    let fileName = `answer-paperId-${item.paperId}-${this.userInfo.userId}`;
                    if(this.runElectron){
                        Event.dispatchEvent("clearUserAnswerData",{fileName:fileName});
                    }else{
                        window.localStorage.removeItem(fileName);
                    }
                });
            },
            testAgain() {
                this.$router.replace({
                    name: '/choose.html'
                });
            },
            reLogin() {
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
            closeResetModal() {
                this.showModal = false;
                this.reasonOne = this.reasonTwo = false;
            },
            showResetModal() {
                this.showModal = true;
            },
            applyReset() {
                if (!this.reasonOne && !this.reasonTwo) {
                    this.$Message.warning('请选择申请原因');
                    return false;
                }
                let reasonArr = [];
                if (this.reasonOne) {
                    reasonArr.push('选错了班主任身份');
                }
                if (this.reasonTwo) {
                    reasonArr.push('选错了学科');
                }
                this.closeResetModal();
                this.loadingCount++;
                this.$ajax.post(paperUrl.applyReset, {
                    apply: reasonArr.join(','),
                    modules: 5,
                    mac: this.networkInterfaces
                }).then(res => {
                    let data = this.$ajaxCheck(res);
                    this.refreshUserInfo();
                }).catch(err => {
                    this.$ajaxError(err);
                }).finally(() => {
                    this.loadingCount--;
                });
            },
            refreshUserInfo() {
                this.loadingCount++;
                this.$ajax.post(publicUrl.getUser).then(res => {
                    let data = this.$ajaxCheck(res);
                    if (!data) return;
                    let userInfo = data.userInfo;
                    this.$store.commit('setUserInfo', userInfo);
                    this.$router.replace({
                        name: '/verify.html'
                    });
                }).catch(err => {
                    this.$ajaxError(err);
                }).finally(() => {
                    this.loadingCount--;
                });
            },
            getHadPaper() {
                this.loadingCount++;
                this.$ajax.get(paperUrl.queryHadPaper).then(res => {
                    let data = this.$ajaxCheck(res);
                    if (!data) return;
                    this.chooseList = data.chooseSubjectList || [];
                    this.currentPosition = data.currentSubject.currentPosition || '';
                    this.currentPaper = data.currentSubject.subjectInfo || {};
                    if (!this.currentPosition) {
                        this.complete = 'done';
                        // 完成后在地址栏加入完成状态，便于客户端进行判断
                        this.$router.replace({
                            name: '/guide.html',
                            query: {
                                status: 'done'
                            }
                        })
                        // 清除作答数据
                        this.clearLocalAnswerRecord();
                    } else {
                        this.complete = 'doing';
                        // 设置提示居中
                        this.$nextTick(i => {
                            let number = 0;
                            [].slice.apply(this.$refs.tipsBox.getElementsByClassName('tipsText'))
                                .forEach(item => {
                                    let temp = Math.ceil(window.getComputedStyle(item, null).width
                                        .slice(0, -2));
                                    number = temp > number ? temp : number;
                                })
                            const MARGIN_LEFT = Math.floor((CONTENT_WIDTH - number) / 2);
                            [].slice.apply(this.$refs.tipsBox.getElementsByClassName('tipsText'))
                                .forEach(item => {
                                    item.style.marginLeft = MARGIN_LEFT + 'px';
                                })
                        })
                    }
                }).catch(err => {
                    this.$ajaxError(err);
                }).finally(() => {
                    this.loadingCount--;
                });
            },
            //获试卷状态
            getPaperStatus(index) {
                let status;
                if (index < this.currentPosition - 1) {
                    status = 'done';
                } else if (index === this.currentPosition - 1) {
                    status = 'doing';
                } else if (index > this.currentPosition - 1) {
                    status = 'waiting';
                }
                return status;
            },
            //点击卡片进入测评
            startPaper(index){
                if(this.getPaperStatus(index)==="doing"){
                    this.gotoExam(this.currentPaper.paperId, this.currentPaper.resultId)
                }
            },
            getPaperStatusText(index) {
                let statusMap = {
                    waiting: '未进行',
                    doing: '即将作答',
                    done: '已完成'
                }
                let status = this.getPaperStatus(index);
                return statusMap[status];
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../libs/css/theme/theme.less";
    @focusColor: #ff5353;
    .wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .fixedImg {
            position: fixed;
            &.fixedLeftImg {
                left: 0;
                bottom: 0;
                background: url("../../libs/images/guide/guide-left.png") no-repeat;
                width: 210px;
                height: 400px;
            }
            &.fixedRightImg {
                right: -130px;
                bottom: 0;
                background: url("../../libs/images/guide/guide-right.png") no-repeat;
                width: 343px;
                height: 790px;
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
                transform-origin: top center;
            }
            &.doneZoomBox{
                .infoWrap{
                    width: 1100px;
                    margin:0 auto;
                    overflow: hidden;
                }
            }
        }
        .content {
            position: relative;
            // width: 1100px;
            z-index: 9;
            margin: 0px auto;
            .title {
                margin-top: 28px;
                height: 24px;
                line-height: 24px;
                font-size: 24px;
                color: #17223d;
                text-align: center;
            }
            .tipsBox {
                margin: 40px auto 0;
                padding: 0 50px;
                width: 1100px;
                .tips {
                    .text {
                        display: inline-block;
                        color: #657180;
                        line-height: 30px;
                        font-size: 16px;
                        .num {
                            color: @focusColor;
                        }
                        .stress {
                            color: #464c5b;
                            font-weight: 600;
                        }
                    }
                }
            }
            .guide {
                position: relative;
                .paperList {
                    width: 1100px;
                    margin: 50px auto 0px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    flex-wrap: wrap;
                    .item {
                        display: flex;
                        flex-direction: column;
                        margin-top: 21.5px;
                        margin-right: 24px;
                        width: 178px;
                        height: 237px;
                        overflow: hidden;
                        position: relative;
                        border-radius: 8px;
                        color: #9ea7b4;
                        background-color: #fff;
                        background-repeat: no-repeat;
                        background-position: bottom right;
                        .bar {
                            position: absolute;
                            top: 118.5px;
                            right: -24px;
                            width: 24px;
                            height: 2px;
                            background-color: #cecece;
                        }
                        .subjectNameShort {
                            text-align: center;
                            font-size: 30px;
                            width: 100px;
                            height: 100px;
                            margin: 0 auto;
                            margin-top: 30px;
                            background-size: contain;
                            line-height: 90px;
                            background: url("../../libs/images/guide/waiting.png") no-repeat center;
                        }
                        .subjectName {
                            display: block;
                            margin-top: 15px;
                            margin-bottom: 10px;
                            line-height: 30px;
                            text-align: center;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .status {
                            display: block;
                            margin-top: -5px;
                            text-align: center;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        &.waiting {
                            border: 1px solid #cccccc;
                            background-image: url("../../libs/images/guide/waiting-arraw.png");
                            .subjectNameShort{
                                background: url("../../libs/images/guide/waiting.png") no-repeat center;
                            }
                        }
                        &.doing {
                            border: 1px solid #fe9625;
                            margin-top: 7px;
                            width: 189px;
                            height: 266px;
                            cursor: pointer !important;
                            background-image: url("../../libs/images/guide/doing-arraw.png");
                            color: #ff8502;
                            .bigShadow();
                            &:hover{
                                .bigShadow(#ff8502);
                                *{
                                    cursor: pointer !important;
                                }
                            }
                            .subjectNameShort{
                                width: 120px;
                                height: 120px;
                                line-height: 110px;
                                background: url("../../libs/images/guide/doing.png") no-repeat center;
                            }
                            .subjectName {
                                font-size: 16px;
                                font-weight: bold;
                            }
                            .status {
                                margin-top: -5px;
                                color:#ff5353;
                                font-weight: bold;
                            }
                        }
                        &.done {
                            border: 1px solid #0bc8c9;
                            background-image: url("../../libs/images/guide/done-arraw.png");
                            .subjectNameShort{
                                color: #0bc8c9;
                                background: url("../../libs/images/guide/done.png") no-repeat center;
                            }
                            .subjectName {
                                color: #0bc8c9;
                                border: none;
                                color: @themeColor;
                            }
                            .status {
                                color: #0bc8c9;
                                color: @themeColor;
                            }
                            .bar {
                                background-color: @themeColor;
                            }
                        }
                        &:last-child,&:nth-child(5n) {
                            margin-right: 0;
                            .bar {
                                display: none;
                            }
                        }
                    }
                }
                .tips {
                    padding-top: 30px;
                    .text {
                        width: 520px;
                        font-size: 16px;
                        line-height: 30px;
                        color: #657180;
                        .num {
                            color: @focusColor;
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
                    padding-top: 70px;
                    width: 710px;
                    margin: 0 auto;
                    padding-bottom: 20px;
                    .ivu-btn {
                        width: 120px;
                        height: 40px;
                        margin-right: 40px;
                        font-size: 16px;
                        padding: 0;
                    }
                }
            }
        }
        .doneContent {
            width: 1100px;
            margin: 0 auto;
            padding-top: 35px;
            .doneIcon {
                height: 170px;
                margin-top: 30px;
                background: url("../../libs/images/public/doneIcon.png") no-repeat center;
            }
            .tips {
                margin-bottom: 60px;
                .text {
                    font-size: 16px;
                    line-height: 40px;
                    text-align: center;
                    .num {
                        color: @focusColor;
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
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;
        .contentBody {
            font-size: 14px;
            padding: 10px 50px;
            .resetCap {
                position: absolute;
                left: 0;
                top: 10px;
                width: 60px;
                height: 32px;
            }
            .resetInput {
                padding: 4px 0px 0px 70px;
                .ivu-checkbox-wrapper {
                    margin-left: 20px;
                }
            }
        }
        .ivu-modal {
            top: 0;
        }
        .modalContent {
            position: relative;
            padding: 6px 0 10px;
        }
    }
</style>