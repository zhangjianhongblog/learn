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
                    <div class="headerText">
                        选择问卷
                    </div>
                    <div class="container">
                        <div class="selectPaperTip">请根据您的实际情况选择对应问卷。 <span class="tip">(可以多选)</span></div>
                        <div class="paperList clearfix">
                            <div @click="choosePaper(item.paperId)" @mouseenter="paperOnMouseEnter(item.paperId)"
                                @mouseleave="paperOnMouseLeave(item.paperId)" v-for="(item, index) in paperList"
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
    import {
        mapState,
        mapMutations
    } from "vuex";
    export default {
        name: 'choose',
        data() {
            return {
                loadingCount: 0,
                selectList: [],
                hoverPaperId: '',
                paperList: []
            }
        },
        watch:{
            zoom(newVal,oldVal) {
                this.setZoom();
            }
        },
        computed: {
            ...mapState(['userInfo','zoom', 'networkInterfaces']),
            finalPaperResultIds() {
                let resultIdArr = [];
                // 添加学生、家长问卷
                this.selectList.forEach(paper => {
                    resultIdArr.push(paper.resultId);
                });
                return resultIdArr.join(',');
            }
        },
        methods: {
            paperOnMouseEnter(paperId) {
                this.hoverPaperId = paperId;
            },
            paperOnMouseLeave(paperId) {
                this.hoverPaperId = '';
            },
            getPaper() {
                this.loadingCount++;
                this.$ajax.post(paperUrl.chooseSubjectList, {
                    projectId: this.userInfo.projectId,
                    userId: this.userInfo.userId
                }).then(res => {
                    let data = this.$ajaxCheck(res);
                    if (!data) return;
                    let list = data.subject_all || [];
                    // 该身份对应的试卷学科 13,学生,14,家长
                    let paperSubject = this.userInfo.userType === 2 ? 14 : 13;
                    this.paperList = list.filter(paper => {
                        return paper.subject === paperSubject;
                    }).map(paper => {
                        return Object.assign(paper, {
                            isChecked: false
                        });
                    });
                }).catch(err => {
                    this.$ajaxError(err);
                }).finally(() => {
                    this.loadingCount--;
                });
            },
            getCoverSrc(item) {
                let imgName = item.isChecked ? 'checked' : (this.hoverPaperId === item.paperId ? 'checked' : 'notChecked');
                let src = require(`../../libs/images/choose/${imgName}.png`);
                return src;
            },
            choosePaper(paperId) {
                this.paperList.forEach(paper => {
                    if (paper.paperId === paperId) {
                        paper.isChecked = !paper.isChecked;
                    }
                });
                this.selectList = this.paperList.filter(paper => {
                    return paper.isChecked;
                });
            },
            sure() {
                let valid = this.selectList.length;
                if (!valid) {
                    this.$Modal.warning({
                        title: '提示',
                        content: '请至少选择一份问卷！'
                    });
                    return false;
                }
                this.loadingCount++;
                this.$ajax.post(paperUrl.choosePaper, {
                    resultIds: this.finalPaperResultIds,
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

        .zoomBox {
            width: 100%;
            min-width: 1100px;
            height: calc(~'100% - ' 60px);
            margin: 60px auto 0;
            position: relative;
            overflow: auto;
        }

        .infoWrap{
            transform-origin: top center;
            width: 770px;
            margin: 0 auto;
            // overflow: hidden;
        }

        .content {
            width: 770px;
            margin: 0 auto;
            .headerText {
                margin-top: 20px;
                height: 24px;
                line-height: 24px;
                font-size: 24px;
                text-align: center;
                color: #17223d;
            }
            .container {
                margin: 50px auto 0;
                width: 770px;
                min-height: 190px;
                border-radius: 6px;
                background: #fff;
                padding: 70px 320px 40px 90px;
                background: #fff url("../../libs/images/choose/chooseGirl.png") no-repeat 500px center;
                background-size: 230px 190px;
                .bigShadow();
                .selectPaperTip {
                    font-size: 16px;
                    .tip {
                        color: @focusColor;
                    }
                }
                .paperList {
                    padding-top: 30px;
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