<template>
<div class="answerFrame">
    <!-- 头部 -->
    <titleBar :class="{'answeringHeader':!isShowFirst}">
        <div slot="other">
            <div class="headerContent" v-if="!isShowFirst">
                <span class="examineName">{{examineName}}</span>
            </div>
            <div class="headerRight" :class="{'runElectron':runElectron}">
                <span v-if="userInfo.userType===1&&!isShowFirst" @click="showResetModal" class="applyIdentity"><i class="fa fa-fw fa-vcard"></i> 申请重置身份</span>
            </div>
        </div>
    </titleBar>
    <!-- 头部：进度条 -->
    <div class="progress" ref="progress" v-if="!isShowFirst">
        <div class="answerProInfo" ref="answerProInfo">
            <div class="proInfo">
                <div class="pageInfo">
                    <span class="label">当前页：</span>
                    <span class="cur">{{currentPage}}</span>/{{dataList.length}}
                </div>
                <span class="proLabel">答题进度</span>
                <div class="line">
                    <div class="answered" :style="'width:'+answerPercent+'%'"></div>
                </div>
                <span class="percentTip">{{answerPercent}}%</span>
                <!-- <span class="answerTime">
                    <i class="fa fa-clock-o"></i>{{answerTime}}</span> -->
                <Button type="primary" class="submitBtn" @click="submitPaper">提交</Button>

            </div>
        </div>
    </div>
    <!-- 左下角背景图 -->
    <div class="fixedImg fixedLeftImg" v-if="isShowFirst"></div>
    <!-- 右上角背景图 -->
    <div class="fixedImg fixedRightImg" v-if="isShowFirst"></div>
    <div class="zoomBox" ref="zoomBox">
        <Spin size="large" fix v-if="loadingCount > 0"></Spin>
        <div class="infoWrap">
            <div class="homePage" v-if="isShowFirst">
                <div class="homePageInfo">
                    <div class="examineName">{{examineName}}</div>
                    <div class="homeContent" ref="homeContent">
                        <div v-if="canTest" class="guideInfo">
                            <div class="guideHtmlFrame richHtmlContent" v-html="guideHtml"></div>
                        </div>
                        <div v-if="canTest" class="imgList">
                            <div v-for="(item, index) in imgList" :key="index" class="item">
                                <div @click="viewLargeImage(item.url)" class="imgWrap">
                                    <img :src="item.url" alt="">
                                </div>
                                <div class="title">{{`图${index+1}`}}</div>
                            </div>
                        </div>
                        <errorFrame v-if="!canTest" @ontry="ontry"></errorFrame>
                    </div>
                    <div class="startBox">
                        <Button type="primary" v-if="canTest" class="startBtn" @click="start">开始测评</Button>
                        <Button type="primary" v-if="!canTest" class="startBtn" disabled>开始测评</Button>
                    </div>
                </div>
            </div>
            <div class="answerBox" ref="answerBox" v-if="!isShowFirst">
                <div class="questionFrame">
                    <template v-for="(pageData,index) in dataList">
                        <questionFrame
                            v-show="currentPage==(index+1)"
                            :data="pageData"
                            :answer="getPageAnswerData(pageData.pageId)"
                            @setScrollTop="setScrollTop" ref="questionFrame">
                        </questionFrame>
                    </template>
                </div>
                <div class="operateBox">
                    <Button type="primary" @click="previousPage" v-show="currentPage>1">上一页</Button>
                    <Button type="primary" @click="nextPage" v-if="dataList.length>1" v-show="currentPage<dataList.length">下一页</Button>
                    <Button type="primary" @click="submitPaper" v-show="currentPage==dataList.length">提交</Button>
                </div>
            </div>
        </div>
    </div>
    <!-- 底部 -->
    <div class="footer">
        <div class="copyright"><font style="font-family:microsoft yahei;">©</font>版权所有 教育部基础教育质量监测中心</div>
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
    <Modal title="查看大图" v-model="guideImg.isShowModal">
        <img :src="guideImg.largeImgUrl" v-if="guideImg.isShowModal" style="width: 100%">
    </Modal>
</div>
</template>
<script>
import * as Event from "../../libs/js/event.js";
import * as Const from "../../libs/js/questionConst.js";
import { Base64 } from 'js-base64';
import questionFrame from "./answerQuestion/questionFrame.vue"; //题目框架组件
import titleBar from "../modules/titleBar.vue";//公共头部
import errorFrame from "./modules/error.vue"; //错误页面
import paperUrl from '../../libs/interface/paper.js';
import publicUrl from '../../libs/interface/public.js';
import { mapState,mapMutations } from "vuex";
export default {
    data() {
        return {
            loadingCount: 0,
            examineName: "",
            guideLanguage: "",
            canTest:true,//是否可以测评
            answerRecord:{},//缓存中的答题记录
            currentPage: 1,
            dataList: [],
            answerList: [],
            isShowFirst: true,
            totalQuestionNum: 1,
            completeQuestionNum: 0,
            answerTime: 0,
            startTime: null,
            initTime: 0,
            paperId: '',
            showModal: false,
            reasonOne: false,
            reasonTwo: false,
            guideImg: {
                isShowModal: false,
                largeImgUrl: '' //查看大图
            }
        }
    },
    watch: {
        zoom(newVal, oldVal) {
            this.setZoom();
        }
    },
    computed: {
        ...mapState(['userInfo', 'runElectron', 'zoom', 'networkInterfaces']),
        answerPercent() { //计算完成进度
            if(this.totalQuestionNum===0)return 0;
            let progress = Math.floor(this.completeQuestionNum / this.totalQuestionNum * 100);
            return isNaN(progress) ? 0 : progress;
        },
        answerTimeSeconds() {
            let timeArr = this.answerTime.split(':');
            return parseInt(timeArr[0]) * 3600 + parseInt(timeArr[1]) * 60 + parseInt(timeArr[2]);
        },
        guideHtml() {
            return this.guideLanguage ? JSON.parse(this.guideLanguage).html : '';
        },
        imgList() {
            if (!this.guideLanguage) return [];
            return JSON.parse(this.guideLanguage).imgList || [];
        }
    },
    components: {
        questionFrame,
        errorFrame,
        titleBar
    },
    methods: {
        setZoom(){
            this.$nextTick(()=>{
                let node=document.querySelector('.infoWrap');
                node.style.zoom = this.zoom;
                node.style.MozTransform=`scale(${this.zoom})`;
            })
        },
        ontry(){
            this.init();
        },
        async init() {
            let paperId = this.$route.query.paperId; //得到试卷ID
            if (paperId) {
                this.paperId = paperId;
                let previewPaper = await this.getPaper(paperId); //获取试卷数据
                if (previewPaper instanceof Error) {
                    this.$ajaxError(previewPaper);
                    this.canTest=false;
                } else {
                    this.answerRecord=this.getAnswerRecord();//获取缓存中的答案数据
                    this.setExamData(previewPaper); //设置试卷数据
                    this.canTest=true;
                }
            }else{
                // TODO: 处理错误
                this.canTest=false;
            }
        },
        //获取试卷数据
        getPaper(paperId) {
            this.loadingCount++;
            let encodePaperId = Base64.encode(paperId);
            return this.$ajax.post(paperUrl.getAnswerPaper, {
                enPaperId: encodePaperId,
                isNeedContent: 1
            }).then(res => {
                let data = this.$ajaxCheck(res);
                if (!data) return;
                if (!data.paper) throw new Error("不合法的试卷数据类型！");
                //组织试卷格式
                let paperJson = data.paper.paperJson ? JSON.parse(data.paper.paperJson) : [];
                let previewPaper = {
                    examineName: data.paper.name,
                    guideLanguage: data.paper.guideLanguage,
                    questionData: paperJson
                };
                return previewPaper;
            }).catch(err => {
                return err;
            }).finally(() => {
                this.loadingCount--;
            });
        },
        //设置试卷
        setExamData(data) {
            this.examineName = data.examineName;
            this.guideLanguage = data.guideLanguage;
            let dataList = this.shuffle(data.questionData);//页码乱序
            dataList.forEach(pageItem => {
                this.answerList.push(
                    (page => {
                        let config = {};
                        config.pageId = page.pageId;
                        config.answerList = [];
                        page.questionList instanceof Array && page.questionList.forEach(question => {
                            if (question.type === Const.QUESTION_PARAGRAPH_TYPE) return;
                            config.answerList.push({
                                questionId: question.id,
                                complete: false,
                                answerData: this.getAnswerData(page.pageId, question.id)
                            })
                        })
                        return config;
                    })(pageItem)
                )
            }) //生成答案数据
            dataList.forEach(item => {
                item.questionList.forEach(question => {
                    if (question.type === Const.QUESTION_SINGLECHOICE_TYPE || question.type ===
                        Const.QUESTION_MULTIPLECHOICE_TYPE) {
                        if (question.isShowOtherOption) {
                            this.$set(question.otherOptionData, "isOther", true);
                            question.optionList.push(JSON.parse(JSON.stringify(question.otherOptionData)));
                        }
                    }
                })
                this.dataList.push(item);
            }) //生成试题数据
            this.filterDefaultData();
        },
        //过滤默认隐藏数据
        filterDefaultData() {
            for (let i = 0; i < this.dataList.length; i++) {
                let questionList = this.dataList[i].questionList;
                let hideIdList = [];
                questionList.forEach(item => {
                    if (item.optionList) {
                        item.optionList.forEach(option => {
                            if (option.rules && option.rules.show instanceof Array) {
                                for (var i = 0; i < option.rules.show.length; i++) {
                                    hideIdList.push(option.rules.show[i]);
                                }
                            }
                        })
                    }
                })
                questionList.forEach(item => {
                    let isHide = false;
                    for (var i = 0; i < hideIdList.length; i++) {
                        isHide = (item.id === hideIdList[i]);
                        if (isHide) break;
                    }
                    this.$set(item, "isHide", isHide);
                });
            }
        },
        //获取默认答案
        getAnswerData(pageId, questionId) {
            let answerData;
            let answerRecord = this.answerRecord;
            let dataList = answerRecord.dataList || [];
            for (let i = 0; i < dataList.length; i++) {
                let page = dataList[i];
                if (page.pageId === pageId && page.answerList instanceof Array) {
                    for (var j = 0; j < page.answerList.length; j++) {
                        if (page.answerList[j].questionId === questionId) {
                            answerData = page.answerList[j].answerData;
                            break;
                        }
                    }
                }
                if(answerData)break;
            }
            return answerData ? answerData : {};
        },
        //读取答题记录
        getAnswerRecord() {
            let fileName=`answer-paperId-${this.paperId}-${this.userInfo.userId}`;
            if(this.runElectron){//运行在客户端
                let eventData = {
                    fileName:fileName,
                    answerData: {
                        data:null
                    }
                };
                try {
                    Event.dispatchEvent("getUserAnswerData",eventData);
                    let data=eventData.answerData.data;
                    return data?JSON.parse(data):{dataList:[]};
                } catch (e) {
                    console.error("读取客户端本地缓存Error",e);
                    return {dataList:[]}
                }
            }else{
                let localAnswer=null;
                try {
                    localAnswer = window.localStorage.getItem(fileName);
                    return localAnswer?JSON.parse(localAnswer):{dataList:[]};
                } catch (e) {
                    console.error("读取web本地缓存Error",e);
                    return {dataList:[]};
                }
            }
        },
        viewLargeImage(url) {
            this.guideImg.largeImgUrl = url;
            this.guideImg.isShowModal = true;
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
                this.$Modal.warning({
                    title: "提示",
                    content: "请选择申请原因"
                });
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
                modules: 7,
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
        //答题时间更新
        countTime() {
            var today = new Date().getTime() - this.startTime;
            this.answerTime = new Date(this.initTime + today).format("hh:mm:ss")
            let t = setTimeout(this.countTime, 500)
        },
        //更新答题进度
        updateProgress() {
            let totalQuestionNum = 0,
                completeQuestionNum = 0;
            for (var i = 0; i < this.dataList.length; i++) {
                let pageData = this.dataList[i];
                let questionList = pageData.questionList;
                let answerPageData = this.getPageAnswerData(pageData.pageId);
                for (var j = 0; j < questionList.length; j++) {
                    let question = questionList[j];
                    if (question.type !== Const.QUESTION_PARAGRAPH_TYPE && !question.isHide) {
                        totalQuestionNum++;
                        let answerListData = answerPageData.answerList;
                        for (var k = 0; k < answerListData.length; k++) {
                            var answerData = answerListData[k];
                            if (answerData.questionId === question.id && answerData.complete) {
                                completeQuestionNum++;
                                break;
                            }
                        }
                    }
                }
            }
            this.totalQuestionNum = totalQuestionNum;
            this.completeQuestionNum = completeQuestionNum;
        },
        //数组随机排序
        shuffle(arr) {
            var len = arr.length;
            for (var i = 0; i < len - 1; i++) {
                var index = parseInt(Math.random() * (len - i));
                var temp = arr[index];
                arr[index] = arr[len - i - 1];
                arr[len - i - 1] = temp;
            }
            return arr;
        },
        //根据页码得到数据页码对应答案
        getPageAnswerData(pageId) {
            //如果这道题有问题返回undefined
            let answerData;
            for (let i = 0; this.answerList instanceof Array && i < this.answerList.length; i++) {
                let page = this.answerList[i];
                if (page.pageId === pageId) {
                    return page;
                }
            }
            //容错处理，按照常理，不应该到这一步
            this.answerList.push({
                pageId: pageId,
                answerList: []
            });
            return this.answerList[this.answerList.length - 1];
        },
        //上一页
        previousPage() {
            if (this.currentPage === 1) return;
            this.currentPage--;
            this.setScrollTop(0);
        },
        //下一页
        nextPage() {
            // TODO:
            let pageList = this.$refs.questionFrame;
            let curPageFrame = pageList[this.currentPage - 1];
            if (!curPageFrame.checkAnswer()) {
                return;
            }
            //当期答题校验
            if (this.currentPage === this.dataList.length) return;
            this.currentPage++;
            this.setScrollTop(0);
        },
        //开始测评
        start() {
            this.loadingCount++;
            this.$ajax.get(publicUrl.addLog, {
                params: {
                    modules: 6,
                    des: '开始' + '『' + this.examineName + '』作答'
                }
            }).then(res => {
                let data = this.$ajaxCheck(res);
                this.isShowFirst = false;
                this.$routePlugin.addQuery({
                    doing: true
                });
                this.setScrollTop(0);
            }).catch(err => {
                this.$ajaxError(err);
            }).finally(() => {
                this.loadingCount--;
            });
        },
        //设置滚动距离
        setScrollTop(value) {
            this.$refs.zoomBox.scrollTop = value;
            this.$nextTick(() => {
                var event = document.createEvent('HTMLEvents');
                event.initEvent("resize");
                window.dispatchEvent(event);
            })
        },
        //提交试卷
        submitPaper() {
            let pageList = this.$refs.questionFrame;
            let pageNum=this.currentPage;
            for (let i = 0; i < pageList.length && i<pageNum; i++) {
                let curPageFrame = pageList[i];
                if (!curPageFrame.checkAnswer())return;
            }
            if(this.answerPercent<100){
                //未答完题目
                this.$Modal.info({
                    title:"信息提示",
                    content:"本页问卷已作答完成，请点击下一页继续作答！"
                });
                return;
            }
            let pageAnswer = [];
            let resultId = this.$route.query.resultId;
            pageList.forEach(page=>{
                pageAnswer.push(page.getUserAnswer());
            })
            this.loadingCount++;
            
            let userAnswerData={};
            userAnswerData.paperId=this.paperId;
            userAnswerData.resultId=resultId;
            userAnswerData.answerList=pageAnswer;
            userAnswerData.userId=window.loginUserId;
            userAnswerData.userName=window.loginUserName;
            userAnswerData.version='';
            userAnswerData.smallVersion='';
            userAnswerData.publishTime='';
            
            this.$ajax.post(paperUrl.submitAnswer, {
                time: this.answerTimeSeconds,
                resultText: JSON.stringify(userAnswerData),
                resultId: resultId,
                paperName: this.examineName,
                mac: this.networkInterfaces,
                userId:window.loginUserId,
                userName:window.loginUserName
            }).then(res => {
                let data = this.$ajaxCheck(res);
                this.$Modal.success({
                    title: "提示",
                    content: "提交成功",
                    onOk: () => {
                        this.$router.replace({
                            name: '/guide.html'
                        })
                    }
                });
            }).catch(err => {
                this.$ajaxError(err);
            }).finally(() => {
                this.loadingCount--;
            });
        },
        //完成一道题目
        updateCompleteNum(event) {
            this.$nextTick(i => {
                this.addAnswerRecord();
                this.updateProgress();
            })
        },
        //每完成一道题目后做缓存
        addAnswerRecord() {
            let fileName = `answer-paperId-${this.paperId}-${this.userInfo.userId}`;
            let localAnswer= {
                'examineName': this.examineName,
                'examineId': this.paperId,
                'dataList': []
            };
            let pageList = this.$refs.questionFrame;
            for(let i=0;i<pageList.length;i++){
                let pageAnswer=pageList[i].getUserAnswer();
                localAnswer.dataList.push(pageAnswer);
            }
            if(this.runElectron){//客户端存储答案数据
                Event.dispatchEvent("saveUserAnswerData",{
                    fileName:fileName,
                    answerData:JSON.stringify(localAnswer,null,4)
                });
            }else{
                window.localStorage.setItem(fileName, JSON.stringify(localAnswer));
            }
        },
        //监听窗口变化
        onResizeEvent() {
            let clientHeight = window.document.documentElement.clientHeight;
            let homeContent = this.$refs.homeContent;
            if (homeContent) {
                let homeContentTop = homeContent.getOffset().top,
                    homeContentHeight = clientHeight - homeContentTop - 101;
                homeContent.style.height = (homeContentHeight<500?500:homeContentHeight) + "px";
            }
        },
        onBeforeUnloadEvent(e) {
            window.onbeforeunload = function(e) {
                var confirmationMessage = '问卷尚未完成，确定要退出吗？';
                (e || window.event).returnValue = confirmationMessage;     // Gecko and Trident
                return confirmationMessage;
            }
        }
    },
    updated() {
        this.onResizeEvent();
    },
    mounted() {
        this.onBeforeUnloadEvent();
        this.countTime();
        this.startTime = new Date().getTime();
        let time = new Date();
        time.setHours(0);
        time.setMinutes(0);
        time.setSeconds(0);
        this.initTime = time.getTime();
        this.init();
        this.setZoom();
        this.isShowFirst = !this.$route.query.doing;
        window.addEventListener("resize", this.onResizeEvent);
        Event.addEventListener("updateCompleteNum", this.updateCompleteNum); //完成题目
    },
    destroyed() {
        window.removeEventListener("resize", this.onResizeEvent);
        Event.removeEventListener("updateCompleteNum",this.updateCompleteNum);
        window.onbeforeunload = null;
    }
}
</script>
<style lang="less" scoped>
@import '../../libs/css/theme/theme.less';
.answerFrame {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f4f8fb url("../../libs/images/public/dottedLine.png");
    overflow: hidden;
    .header {
        z-index: 100;
        .headerContent {
            margin: 0 auto;
            width: 1100px;
            height: 60px;
            line-height: 60px;
            padding: 0 200px;
            text-align: center;
            position: relative;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .examineName {
                font-size: 18px;
                color: #464C5B;
                font-weight: normal;
            }
        }
        .headerRight {
            position: absolute;
            width: 120px;
            height: 60px;
            line-height: 60px;
            top: 0;
            right: 0;
            z-index: 1006;
            user-select: none;
            -webkit-app-region: no-drag;
            &.runElectron{
                right:100px;
            }
            .applyIdentity {
                cursor: pointer;
                color: @themeColor;
            }
        }
        &.answeringHeader {
            background: #fff;
            border-bottom: 1px solid #dcdcdc;
        }
    }
    .progress {
        position: fixed;
        top: 60px;
        left: 0;
        height: 50px;
        width: 100%;
        background: #fff;
        z-index: 99;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        .answerProInfo {
            min-width: 1100px;
            margin: 0 auto;
            height: 50px;
            padding: 10px 0;
            line-height: 30px;
            background: #fff;
            z-index: 10;
            .proInfo {
                max-width: 1100px;
                min-width: 1100px;
                margin: 0 auto;
                color: #657180;
            }
        }
        .pageInfo {
            display: inline-block;
            height: 30px;
            font-size: 20px;
            margin-right: 90px;
            .label {
                position: relative;
                top: -2px;
                font-size: 14px;
            }
            .cur {
                color: @themeColor;
            }
        }
        .proLabel {
            color: #464C5B;
            font-size: 18px;
        }
        .line {
            display: inline-block;
            width: 58%;
            height: 8px;
            border-radius: 8px;
            background-color: #D5D5D5;
            margin-left: 5px;
            position: relative;
            top: -2px;
            overflow: hidden;
            .answered {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                width: 0;
                background-color: @themeColor;
            }
        }
        .percentTip {
            font-size: 18px;
            color: @themeColor;
            margin-left: 10px;
        }
        .answerTime {
            margin-left: 20px;
            font-size: 20px;
            position: relative;
            top: 2px;
            i {
                font-size: 16px;
                color: @themeColor;
                margin-right: 5px;
                position: relative;
                top: -1px;
            }
        }
        .submitBtn {
            float: right;
            width: 95px;
            height: 32px;
            line-height: 19px !important;
        }
    }
    .fixedImg {
        position: fixed;
        &.fixedLeftImg {
            left: 0;
            bottom: 0;
            background: url("../../libs/images/answer/answer-left.png") no-repeat;
            width: 241px;
            height: 155px;
        }
        &.fixedRightImg {
            right: 0;
            top: 0;
            background: url("../../libs/images/answer/answer-right.png") no-repeat;
            width: 140px;
            height: 404px;
            z-index: 0;
        }
    }
    .zoomBox {
        height: calc(~'100% - '60px);
        margin: 60px auto 0;
        overflow: auto;
        position: relative;
    }
    .infoWrap{
        transform-origin: top center;
        width: 1100px;
        margin: 0 auto;
    }
    .examineName {
        text-align: center;
        font-size: 24px;
        color: #17223d;
        font-weight: normal;
        margin-bottom: 20px;
    }
    .homePage {
        .homePageInfo {
            width: 1100px;
            margin: 0 auto;
            position: relative;
            .homeContent {
                background: #fff;
                position: relative;
                overflow-y: auto;
                overflow-x: hidden;
                color: #333;
                min-height: 500px;
                border-radius: 8px;
                .shadow();
            }
            .examineName {
                margin-top: 10px;
            }
            .guideInfo {
                margin-top: 20px;
                padding: 0 30px;
                .guideHtmlFrame{
                    overflow: hidden;
                    overflow-x: auto;
                }
                .richHtmlContent {
                    line-height: 1.5;
                    padding-right: 5px;
                }
            }
            .imgList {
                display: flex;
                padding: 20px 50px;
                .item {
                    margin: 0 10px 10px 0;
                    .imgWrap {
                        width: 80px;
                        height: 60px;
                        margin-bottom: 10px;
                        border: 1px solid @borderColor;
                        cursor: pointer;
                        img {
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .title {
                        color: #657180;
                        font-size: 12px;
                        line-height: 10px;
                        text-align: center;
                    }
                }
            }
        }
        .startBox {
            text-align: center;
            margin: 20px auto;
            button {
                width: 140px;
                height: 40px;
                font-size: 16px;
            }
        }
    }
    .answerBox {
        margin-top: 70px;
        .questionFrame{
            border-radius: 8px;
            overflow: hidden;
            .shadow();
        }
        .operateBox {
            text-align: center;
            margin: 20px auto;
            button {
                width: 120px;
                margin: 0 10px;
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
            padding: 4px 0 0 70px;

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
