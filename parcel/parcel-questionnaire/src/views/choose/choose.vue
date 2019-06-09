<!--
    by: haoluo2 2019年01月23日
    name: 选择页
    notes:
-->
<template>
    <div class="wrap">
        <div class="fixedImg fixedLeftImg"></div>
        <div class="fixedImg fixedRightImg"></div>
        <div class="fixedImg fixedBottomImg"></div>
        <div class="zoomBox">
            <Spin size="large" fix v-if="loadingCount > 0"></Spin>
            <div class="infoWrap">
                <div ref="content" class="content">
                    <div class="title">选择身份</div>
                    <div class="identifyBox">
                        <div class="identifyItem border">
                            <div class="questionNumber">1</div>
                            <div class="question">您是否担任<span class="phase">{{gradeName}}</span>的班主任？</div>
                            <div class="radioWrap">
                                <div @click="chooseMonitor(1)" :class="['radio', {'select': monitor===1}]">
                                    是
                                    <div v-show="monitor===1" class="checkFrame">
                                        <Icon type="ios-checkmark" size="24" />
                                        <div class="checkBg"></div>
                                    </div>
                                </div>
                                <div @click="chooseMonitor(0)" :class="['radio', {'select': monitor===0}]">
                                    否
                                    <div v-show="monitor===0" class="checkFrame">
                                        <Icon type="ios-checkmark" size="24" />
                                        <div class="checkBg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="subjectPaperList.length>0" class="identifyItem">
                            <div class="questionNumber">2</div>
                            <div class="question">您是否担任<span class="phase">{{gradeName}}</span>测试学科教师？</div>
                            <div class="radioWrap">
                                <div @click="chooseTeacher(1)" :class="['radio', {'select': teacher===1}]">
                                    是
                                    <div v-show="teacher===1" class="checkFrame">
                                        <Icon type="ios-checkmark" size="24" />
                                        <div class="checkBg"></div>
                                    </div>
                                </div>
                                <div @click="chooseTeacher(0)" :class="['radio', {'select': teacher===0}]">
                                    否
                                    <div v-show="teacher===0" class="checkFrame">
                                        <Icon type="ios-checkmark" size="24" />
                                        <div class="checkBg"></div>
                                    </div>
                                </div>
                            </div>
                            <div v-show="teacher===1" class="selectPaperTip">请选择您在本校{{gradeName}}所教学科。 <span class="tip">(可以多选)</span>
                            </div>
                            <div v-show="teacher===1" class="paperList clearfix">
                                <div @click="choosePaper(item.paperId)" @mouseenter="paperOnMouseEnter(item.paperId)"
                                    @mouseleave="paperOnMouseLeave(item.paperId)" v-for="(item, index) in subjectPaperList"
                                    :key="index" :class="['paper', {'select': item.isChecked}]">
                                    <div class="icon">
                                        <img :src="getCoverSrc(item)" alt="">
                                        <span class="imgText">{{item.subjectName.slice(0,1)}}</span>
                                    </div>
                                    <div class="sub">{{item.subjectName}}</div>
                                    <div v-show="item.isChecked" class="checkFrame">
                                        <Icon type="ios-checkmark" size="34" />
                                        <div class="checkBg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btnWrap">
                        <Button @click="sure" type="primary">确定</Button>
                        <Button @click="reLogin">重新登录</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import publicUrl from '../../libs/interface/public.js';
    import paperUrl from '../../libs/interface/paper.js';
    import map from '../../map.js';
    import {
        mapState,
        mapMutations
    } from "vuex";
    export default {
        name: 'choose',
        data() {
            return {
                loadingCount: 0,
                monitor: '',
                teacher: '',
                selectList: [],
                // 正反色图片均从线上获取，在js中控制显示
                hoverPaperId: '',
                subjectPaperList: [],
                defaultPaperList: []
            }
        },
        watch:{
            zoom(newVal,oldVal) {
                this.setZoom();
            }
        },
        computed: {
            ...mapState(["userInfo",'zoom', 'networkInterfaces']),
            userType() {
                // 校长账号后三位数字是000
                let lastThreeNum = this.userInfo.loginName.substr(-3);
                if (lastThreeNum === '000') {
                    return 'president';
                } else {
                    return 'teacher';
                }
            },
            finalPaperResultIds() {
                let resultIdArr = [];
                // 校长默认问卷
                let presidentPaper = this.defaultPaperList.filter(paper => {
                    return paper.subject === 1;
                });
                // 班主任问卷
                let monitorPaper = this.defaultPaperList.filter(paper => {
                    return paper.subject === 3;
                });
                // 教师基本问卷
                let teacherPaper = this.defaultPaperList.filter(paper => {
                    return paper.subject === 2;
                });

                // 校长身份默认添加校长问卷
                if (this.userType === 'president') {
                    presidentPaper.forEach(item => {
                        resultIdArr.push(item.resultId);
                    });
                }
                if (this.monitor === 1) {
                    // 如果是班主任，则添加班主任问卷和教师基本问卷
                    let paperArr = [...monitorPaper, ...teacherPaper];
                    paperArr.forEach(item => {
                        resultIdArr.push(item.resultId);
                    });
                } else {
                    // 不是班主任，如果是教师，则添加教师基本问卷
                    if (this.teacher === 1) {
                        teacherPaper.forEach(item => {
                            resultIdArr.push(item.resultId);
                        });
                    }
                }

                // 添加学科问卷
                this.selectList.forEach(paper => {
                    resultIdArr.push(paper.resultId);
                });
                return resultIdArr.join(',');
            },
            gradeName() {
                return this.userInfo.gradeName || '';
            }
        },
        methods: {
            chooseMonitor(value) {
                this.monitor = value;
            },
            chooseTeacher(value) {
                this.teacher = value;
                // 选择否时，清空选择
                if (value === 0) {
                    this.selectList = [];
                    this.subjectPaperList.forEach(paper => {
                        paper.isChecked = false;
                    });
                }
            },
            paperOnMouseEnter(paperId) {
                this.hoverPaperId = paperId;
            },
            paperOnMouseLeave(paperId) {
                this.hoverPaperId = '';
            },
            getCoverSrc(item) {
                let imgName = item.isChecked ? 'checked' : (this.hoverPaperId === item.paperId ? 'checked' : 'notChecked');
                let src = require(`../../libs/images/choose/${imgName}.png`);
                return src;
            },
            getPaper() {
                this.loadingCount++;
                this.$ajax.post(paperUrl.chooseSubjectList, {
                    projectId: this.userInfo.projectId,
                    userId: this.userInfo.userId
                }).then(res => {
                    let data = this.$ajaxCheck(res);
                    if (!data) return;
                    let paperList = data.subject_all || [];
                    // 1、2、3是默认问卷
                    this.defaultPaperList = paperList.filter(paper => {
                        return paper.subject <= 3;
                    });
                    this.subjectPaperList = paperList.filter(paper => {
                        return paper.subject > 3;
                    }).map(paper => {
                        return Object.assign(paper, {
                            isChecked: false
                        });
                    });
                    if (this.subjectPaperList.length === 0) {
                        // 没有学科问卷允许作答，默认把教师身份置为否
                        this.teacher = 0;
                    }
                }).catch(err => {
                    this.$ajaxError(err);
                }).finally(() => {
                    this.loadingCount--;
                });
            },
            choosePaper(paperId) {
                this.subjectPaperList.forEach(paper => {
                    if (paper.paperId === paperId) {
                        paper.isChecked = !paper.isChecked;
                    }
                });
                this.selectList = this.subjectPaperList.filter(paper => {
                    return paper.isChecked;
                });

            },
            validateChooseResult() {
                let valid = true;
                let msg = '';
                if (this.monitor === '') {
                    valid = false;
                    msg = '请根据您的身份，选择是否作答班主任问卷！';
                } else if (this.teacher === '') {
                    valid = false;
                    msg = '请根据您的身份，选择是否作答学科教师问卷！';
                } else if (this.teacher === 1 && this.selectList.length === 0) {
                    valid = false;
                    msg = '请根据您的身份勾选对应的学科问卷！';
                } else if (this.monitor === 0 && this.teacher === 0 && this.userType === 'teacher') {
                    // 教师身份至少选择一个‘是’
                    valid = false;
                    msg = '没有可供作答的问卷，请重新选择！';
                }
                if (!this.finalPaperResultIds) {  // resultIds为空也不能提交
                    valid = false;
                    msg = '没有可供作答的问卷，请重新选择！';
                }
                return {
                    valid,
                    msg
                };
            },
            sure() {
                let {
                    valid,
                    msg
                } = this.validateChooseResult();
                if (!valid) {
                    this.$Modal.warning({
                        title: '提示',
                        content: msg
                    });
                    return false;
                }
                let isMonitor = (this.monitor === 1 ? '是' : '否');
                let isTeacher = (this.teacher === 1 ? '是' : '否');
                let subjectSelected = '';
                let subjectList = [];
                this.selectList.forEach((select) => {
                    subjectList.push(select.subjectName);
                });
                if (subjectList.length === 0) {
                    subjectSelected = '无'
                } else {
                    subjectSelected = subjectList.join(',');
                }
                subjectList = subjectList.join(',');
                this.loadingCount++;

                this.$ajax.post(paperUrl.choosePaper, {
                    resultIds: this.finalPaperResultIds,
                    des: '选择班主任身份为' + isMonitor + ';选择学科教师身份为' + isTeacher + ';选择对应学科为' + subjectSelected + ';',
                    mac: this.networkInterfaces
                }).then(res => {
                    let data = this.$ajaxCheck(res);
                    if (data.alreadyChoosed==='1' && this.userInfo.projectType==='1') {
                        // 正式项目已选过问卷之后不允许再选
                        this.$Modal.warning({
                            title: '提示',
                            content: '该账号已选择过身份和问卷，不允许重复选择！请检查是否本人操作！',
                            okText: '重新登录',
                            onOk: () => {
                                this.reLogin();
                            }
                        });
                    } else {
                        this.$router.push({
                            name: '/guide.html'
                        });
                    }
                }).catch(err => {
                    this.$ajaxError(err);
                }).finally(() => {
                    this.loadingCount--;
                });
            },
            reLogin() {
                this.loadingCount++;
                this.$ajax.get(publicUrl.addLog, {
                    params: {
                        modules: 4,
                        des: '重新登录'
                    }
                }).then(res => {
                    let data = this.$ajaxCheck(res);
                }).catch(err => {
                    this.$ajaxError(err);
                }).finally(() => {
                    this.loadingCount--;
                });
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
            setZoom(){
                this.$nextTick(()=>{
                    let node=document.querySelector('.infoWrap');
                    node.style.zoom = this.zoom;
                    node.style.MozTransform=`scale(${this.zoom})`;
                })
            }
        },
        mounted() {
            this.getPaper();
            this.setZoom();
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
                top: 0;
                background: url("../../libs/images/choose/choose-left.png") no-repeat;
                width: 123px;
                height: 453px;
            }

            &.fixedRightImg {
                right: 0;
                top: 0;
                background: url("../../libs/images/choose/choose-right.png") no-repeat;
                width: 140px;
                height: 404px;
                z-index: 0;
            }

            &.fixedBottomImg {
                right: 0;
                bottom: 0;
                background: url("../../libs/images/choose/choose-bottom.png") no-repeat;
                width: 464px;
                height: 189px;
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
        }

        .infoWrap{
            transform-origin: top center;
            width:770px;
            margin:0 auto;
            // overflow: hidden;
        }

        .content {
            width: 770px;
            margin: 0 auto;
            .title {
                margin-top: 20px;
                height: 24px;
                line-height: 24px;
                font-size: 24px;
                text-align: center;
                color: #17223d;
            }
            .identifyBox{
                padding-top: 30px;
            }
            .identifyItem {
                position: relative;
                margin: 20px auto 0;
                width: 770px;
                background: #fff;
                border-radius: 6px;
                overflow: hidden;
                min-height: 150px;
                background: #fff url("../../libs/images/choose/chooseGirl.png") no-repeat 500px 15px;
                background-size: 155px 120px;
                .bigShadow();
                &.border {
                    height: 150px;
                    background: #fff url("../../libs/images/choose/chooseBg.png") no-repeat 500px center;
                    background-size: 155px 120px;
                }
                .questionNumber {
                    position: absolute;
                    top: -6px;
                    left: -6px;
                    width: 50px;
                    height: 50px;
                    line-height: 52px;
                    padding-left: 18px;
                    border-radius: 50%;
                    background: #00bbac;
                    color: #fff;
                    font-size: 24px;
                }
                .question {
                    padding-top: 25px;
                    padding-left: 90px;
                    font-size: 16px;

                    .phase {
                        color: @focusColor;
                    }
                }
                .radioWrap {
                    margin-top: 25px;
                    padding-left: 100px;

                    .radio {
                        position: relative;
                        display: inline-block;
                        width: 110px;
                        height: 30px;
                        line-height: 30px;
                        margin-right: 30px;
                        border-radius: 4px;
                        text-align: center;
                        color: #657180;
                        cursor: pointer;
                        overflow: hidden;
                        .baseBorder();

                        &:hover {
                            border-color: @themeColor;
                            color: @themeColor;
                        }

                        &.select {
                            border-color: @themeColor;
                            color: @themeColor;
                        }

                        .checkFrame {
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            width: 20px;
                            height: 20px;
                            transition: all ease 1s;

                            .ivu-icon {
                                position: absolute;
                                top: 2px;
                                left: 2px;
                                color: #FFFFFF;
                                z-index: 2;
                            }

                            .checkBg {
                                position: absolute;
                                width: 28px;
                                height: 28px;
                                bottom: -14px;
                                left: 6px;
                                background-color: @themeColor;
                                transform: rotate(45deg);
                            }
                        }
                    }
                }
                .selectPaperTip {
                    margin-top: 20px;
                    padding-left: 100px;
                    height: 30px;
                    line-height: 30px;

                    .tip {
                        color: @focusColor;
                    }
                }
                .paperList {
                    margin-top: 20px;
                    padding-left: 100px;

                    .paper {
                        position: relative;
                        float: left;
                        width: 150px;
                        height: 86px;
                        margin: 0 30px 30px 0;
                        border: 1px solid #bbb;
                        border-radius: 4px;
                        overflow: hidden;
                        cursor: pointer;

                        &.select {
                            border: 1px solid @themeColor;

                            .sub {
                                color: @themeColor;
                            }
                            .icon{
                                .imgText{
                                    color: @themeColor;
                                }
                            }
                        }
                        .icon {
                            height: 40px;
                            text-align: center;
                            overflow: hidden;
                            position:relative;
                            img {
                                display:block;
                                margin:8px auto 0;
                                height: 32px;
                                width:27px;
                            }
                            .imgText{
                                position: absolute;
                                top: 16px;
                                left: 50%;
                                margin-left: -7px;
                                width: 16px;
                                height: 16px;
                                line-height: 16px;
                                color: #505b6e;
                            }
                        }

                        .sub {
                            display:table-cell;
                            width:150px;
                            height:40px;
                            line-height: 1;
                            vertical-align: middle;
                            font-size:14px;
                            margin-top:6px;
                            text-align: center;
                            padding:0 10px;
                            color: #505b6e;
                        }

                        &:hover {
                            border: 1px solid @themeColor;

                            .sub {
                                color: @themeColor;
                            }
                            .imgText{
                                color: @themeColor;
                            }
                        }

                        .checkFrame {
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            width: 30px;
                            height: 30px;

                            .ivu-icon {
                                position: absolute;
                                top: 4px;
                                left: 4px;
                                color: #FFFFFF;
                                z-index: 2;
                            }

                            .checkBg {
                                position: absolute;
                                width: 40px;
                                height: 40px;
                                bottom: -20px;
                                left: 10px;
                                background-color: @themeColor;
                                transform: rotate(45deg);
                            }
                        }
                    }
                }               
            }
            .btnWrap {
                width: 100%;
                display: flex;
                justify-content: center;
                padding: 50px 0 20px;
                .ivu-btn {
                    width: 120px;
                    height: 40px;
                    margin-right: 40px;
                    font-size: 16px;
                }
            }
        }
    }
</style>