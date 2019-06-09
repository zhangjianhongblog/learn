<template>
<div class="checkQuestionBox">
    <span v-if="showId">{{data.id}}</span>
    <div class="title">
        <div class="richHtmlContent" v-if="data.title.isHtml" v-html="data.title.html"></div>
        <div v-else v-html="filterText(data.title.text)"></div>
        <div class="imageBox clearfix" v-if="data.title.isHtml && data.title.imgList.length">
            <div class="imgList" @click="viewLargeImage(item.url)" v-for="(item,index) in data.title.imgList" :key="index">
                <div class="img" :style="'background-image:url('+ item.url +')'"></div>
                <span class="imgIndex" v-if="data.title.imgList.length>1">图{{index+1}}</span>
            </div>
        </div>
    </div>
    <div class="tipsBox" v-if="data.tips.text">
        <div class="tips" v-if="data.tips.isHtml">
            <i class="fa fa-info-circle"></i>
            <span class="richHtmlContent" v-html="data.tips.html"></span>
        </div>
        <div class="tips" v-else>
            <i class="fa fa-info-circle"></i>
            <span v-html="filterText(data.tips.text)"></span>
        </div>
        <div class="imageBox clearfix" v-if="data.tips.isHtml && data.tips.imgList.length">
            <div class="imgList" @click="viewLargeImage(item.url)" v-for="(item,index) in data.tips.imgList" :key="index">
                <div class="img" :style="'background-image:url('+ item.url +')'"></div>
                <span class="imgIndex" v-if="data.tips.imgList.length>1">图{{index+1}}</span>
            </div>
        </div>
    </div>
    <div class="optionBox">
        <RadioGroup v-model="userAnswer" @on-change="changeAnswer">
            <div class="table">
                <div class="tableRows" v-for="index in countRow(data)">
                    <div class="optionList" v-if="(countIndex(index,itemIndex,data.showColNum) <= data.optionList.length)" v-for="itemIndex in parseInt(data.showColNum)" :style='{width:100/parseInt(data.showColNum)+"%"}'>
                        <template v-for="item in [data.optionList[countIndex(index,itemIndex,data.showColNum)-1]]">
                            <div class="list">
                                <Radio :disabled="item.disabled" :label="item" v-scoped>
                                    <div v-if="item.isHtml" class="text">
                                        <richHtmlShow ref="otherRichHtml" 
                                            :isDisabled="disabledBlank" 
                                            :htmlValue="item.html" 
                                            @completeOneBlank="completeOneBlank" 
                                            :answerData="userAnswer.richHtml" 
                                            v-if="item.isOther">
                                        </richHtmlShow>
                                        <div class="richHtmlContent" v-else v-html="item.html"></div>
                                    </div>
                                    <div v-else class="text" v-html="filterText(item.text)"></div>
                                </Radio>
                            </div>
                            <div class="imageBox clearfix" v-if="item.isHtml && item.imgList.length">
                                <div class="imgList" @click="viewLargeImage(imgItem.url)" v-for="(imgItem,imgIndex) in item.imgList" :key="index">
                                    <div class="img" :style="'background-image:url('+ imgItem.url +')'"></div>
                                    <span class="imgIndex" v-if="item.imgList.length>1">图{{imgIndex+1}}</span>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </RadioGroup>
    </div>
    <div class="umCompleteTips" v-if="errorMessage">
        <Alert type="error" show-icon v-scoped>{{errorMessage}}</Alert>
    </div>
</div>
</template>
<script>
import * as Event from "../../../libs/js/event.js";
import richHtmlShow from "../modules/richHtmlShow.vue";
import filterTextNode from "../../../libs/js/filterText.js";
import {
    QuestionShowSattus,
    QuestionUpdateStatus
} from "./question.event.class.js";
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        answer: {
            type: Object,
            required: true
        },
        showId: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            errorMessage: "",
            disabledBlank: true
        }
    },
    computed: {
        questionId() {
            return this.data.id;
        },
        userAnswer: {
            get() {
                if (!this.answer.answerData) return {};
                if (!(this.answer.answerData.richHtml instanceof Array)) this.$set(this.answer.answerData, "richHtml", []);
                return this.answer.answerData;
            },
            set(value) {
                this.answer.answerData = value ? value : {};
            }
        },
        //获取其他选项的dom对象
        otherRichHtml(){
            if(this.$refs.otherRichHtml instanceof Array && this.$refs.otherRichHtml.length){
                return this.$refs.otherRichHtml[0];
            }else{
                return null;
            }
        },
        complete: { //判断当前题是否已完成
            get() {
                return this.answer.complete;
            },
            set(value) {
                this.answer.complete = !!value;
            }
        }
    },
    watch: {
        complete(newVal, oldVal) {
            if (newVal) {
                this.errorMessage = "";
            }
        }
    },
    created() {
        this.filterData();
        //根据自身状态判断目标题目的状态
        Event.addEventListener("checkQuestionShowStatusEvent", this.checkQuestionShowStatusEvent);
        Event.addEventListener("updateQuestionStatusEvent", this.updateQuestionStatusEvent); //更新题目状态
    },
    mounted() {
        var richHtmlData = JSON.stringify(this.userAnswer.richHtml);
        if (Object.keys(this.userAnswer).length === 0) return ;
        this.data.optionList.forEach(item => {
            if (item.id === this.userAnswer.id) {
                this.userAnswer = item;
                if (this.userAnswer.id === this.data.otherOptionData.id) {
                    this.userAnswer.richHtml = JSON.parse(richHtmlData);
                }
                this.$nextTick(empty => {
                    this.changeAnswer(this.userAnswer, true);
                })
            }
        })
    },
    methods: {
        //接收到更新题目状态事件
        updateQuestionStatusEvent(event) {
            //let target = event.targetQuestion;//广播事件的原身
            //event.updateQuestionList 是  questionId 数组
            if (!(event.updateQuestionList instanceof Array)) return;
            //看看自身是不在在更新范围中
            event.updateQuestionList.forEach(questionId => {
                if (questionId === this.data.id) {
                    this.updateSelf();
                }
            })
        },
        //更新自己是否隐藏或显示
        updateSelf() {
            //查询自己是否显示或隐藏
            let eventData = {
                targetQuestion: this.data, //题目id
                showData: [], //存储其他试题的反馈结果
                disableData: {} //存放选项是否要禁选
            };
            this.data.optionList.forEach(optionItem => {
                eventData.disableData[optionItem.id] = []; //初始化为空数组
            })
            //从全局去筛选自己要不要显示或隐藏
            Event.dispatchEvent("checkQuestionShowStatusEvent", eventData);
            let isHide = false;
            eventData.showData.forEach(item => {
                if (item.isHide) isHide = true;
            })
            if (isHide !== this.data.isHide) {
                this.$set(this.data, "isHide", !!isHide); //是否隐藏
                if (isHide === false) {
                    //要显示
                } else {
                    //要隐藏且 当前存在被选中项时要先清除答案，然后广播自己的规则变更
                    if (Object.keys(this.userAnswer).length) this.clearAnswer();
                }
            }
            //更新子选项
            let disableKeys = Object.keys(eventData.disableData);
            this.data.optionList.forEach(optionItem => {
                let index = disableKeys.indexOf(optionItem.id);
                if (index < 0) return;
                let questionId = disableKeys[index];
                if (!(eventData.disableData[questionId] instanceof Array)) return;
                if (eventData.disableData[questionId].length) {
                    this.$set(optionItem, "disabled", true);
                    if (this.optionItemIsSelected(optionItem, this.userAnswer)) {
                        //选中状态被禁选
                        this.clearAnswer();
                    }
                } else {
                    this.$set(optionItem, "disabled", false)
                }
            })
            this.broadcastStatus();
            this.updateCompleteNum();
        },
        //广播 本题发生变化，受关联的题目需要进更新
        broadcastStatus() {
            let changeList = [];
            this.data.optionList.forEach(item => {
                if (!item.rules) return;
                if (item.rules.target) { //跳转逻辑
                    //把目标区间段涉及到的题目插入待更新的数组
                    this.$parent.hasRect(this.data.id, item.rules.target).forEach(rectItemId => {
                        //让选项隐藏并更新子选项状态
                        changeList.push(rectItemId);
                    })
                }
                //要显示的题目插入待更新的数组
                if (item.rules.show instanceof Array) { //显隐逻辑
                    item.rules.show.forEach(itemId => { //让选项隐藏并更新子选项状态
                        changeList.push(itemId);
                    })
                }
                //禁选规则
                if (item.rules.relate instanceof Array) { //显隐逻辑
                    item.rules.relate.forEach(relateItem => { //让选项隐藏并更新子选项状态
                        changeList.push(relateItem.id);
                    })
                }
            })
            changeList.removeRepetition(); //数组去重
            //广播让本题所有选项受关联的题更新状态
            if (changeList.length) {
                //console.log("更新区段",changeList.filter(item=>{return item.questionId}));
                Event.dispatchEvent("updateQuestionStatusEvent", {
                    targetQuestion: this.data,
                    updateQuestionList: changeList
                });
            }
        },
        //处理显示逻辑，单选题中如果有一个让其显示则屏蔽掉让其不显示的反馈
        initShowFun(showData, showArray) {
            let showList = showArray.filter(item => {
                return !item.isHide;
            });
            (showList.length ? showList : showArray).forEach(item => {
                showData.push(item);
            })
        },
        //根据自身状态判断目标题目的状态然后给予反馈
        checkQuestionShowStatusEvent(event) {
            let question = event.targetQuestion; //被检测的题目
            if (!question.id || question.id == this.data.id) return; //自己不会操控自己
            let showArray = [];
            this.data.optionList.forEach(optionItem => {
                let isSelected = (this.userAnswer && optionItem.id === this.userAnswer.id);
                if (!optionItem.rules) return;
                //此选项存在显示逻辑-----和题相关
                if (optionItem.rules.show instanceof Array) {
                    let index = optionItem.rules.show.indexOf(question.id);
                    if (index >= 0) {
                        let item = new QuestionShowSattus(this.data, optionItem, !isSelected); //如果选中了择不是隐藏
                        showArray.push(item);
                    }
                }
            })
            this.initShowFun(event.showData, showArray); //处理显示逻辑
            this.data.optionList.forEach(optionItem => {
                let isSelected = (this.userAnswer && optionItem.id === this.userAnswer.id);
                if (!optionItem.rules || !isSelected) return;
                //当选项被选中又存在关联-----和题相关
                if (optionItem.rules.target) {
                    if (this.$parent.hasRect(this.data.id, optionItem.rules.target).indexOf(question.id) >= 0) {
                        let item = new QuestionShowSattus(this.data, optionItem, !!"show"); //此选项选中，而且在区间内部，就设置isHide为true
                        event.showData.push(item);
                    }
                }
                //当存在禁选规则的时候
                let disableKeys = Object.keys(event.disableData);
                if (optionItem.rules.relate instanceof Array && disableKeys.length) {
                    optionItem.rules.relate.forEach(relateItem => {
                        if (!relateItem || relateItem.id !== question.id) return;
                        relateItem.disabled instanceof Array && relateItem.disabled.forEach(disabledItem => {
                            let index = disableKeys.indexOf(disabledItem);
                            if (index < 0) return;
                            let questionId = disableKeys[index];
                            if (event.disableData[questionId] instanceof Array) {
                                event.disableData[questionId].push(true);
                            }
                        })
                    })
                }
            })
        },
        filterData() {
            this.data.optionList.forEach(item => {
                this.$set(item, "disabled", false);
            })
            if (!this.data.showColNum) this.data.showColNum = 1;
        },
        //选项是否选中
        optionItemIsSelected(optionItem) {
            return optionItem.id === this.userAnswer.id;
        },
        //清空答案
        clearAnswer() {
            this.$set(this, "userAnswer", {});
            this.complete = false;
        },
        //答案是否为空
        answerIsEmpty() {
            return !this.userAnswer.id;
        },
        countRow(data) {
            return Math.ceil(data.optionList.length / parseInt(data.showColNum));
        },
        countIndex(rIndex, cIndex, showCols) {
            return (rIndex - 1) * parseInt(showCols) + cIndex;
        },
        //查看大图
        viewLargeImage(url) {
            this.$emit("viewLargeImage", url);
        },
        //校验答案
        checkAnswer() {
            if (!this.complete) {
                this.errorMessage = "答题不完整，请补充！"
            }
            return this.complete;
        },
        //获取答案
        getAnswer() {
            //判断选中其他选项
            if (this.userAnswer.id === this.data.otherOptionData.id) {
                if (!this.otherRichHtml) return;
                this.userAnswer.richHtml = this.otherRichHtml.getAnswer();
            }
            return this.answer;
        },
        //改变答案事件
        changeAnswer(data, isInit) {
            if (isInit !== true) this.broadcastStatus(); //不是初始化的时候广播变化
            if (data && data.id === this.data.otherOptionData.id) {
                this.disabledBlank = false;
            } else {
                this.disabledBlank = !!data;
                this.data.optionList.forEach(item => {
                    if (item.id === this.data.otherOptionData.id) {
                        item.richHtml = [];
                    }
                })
                this.$nextTick(empty => {
                    this.$set(this.userAnswer, "richHtml", []);
                })
            }
            this.updateCompleteNum();
        },
        //广播当前完成情况
        updateCompleteNum() {
            let answerId = this.userAnswer ? this.userAnswer.id : ""; //答案id
            if (!answerId) {
                this.complete = false;
            } else {
                if (answerId === this.data.otherOptionData.id) {
                    this.complete = this.otherRichHtml?this.otherRichHtml.isOk(false, false):false;
                } else {
                    this.complete = true;
                }
            }
            Event.dispatchEvent("updateCompleteNum");
        },
        //富文本编辑器回调事件
        completeOneBlank(status, errorMessage) {
            if (!status) {
                this.errorMessage = errorMessage;
            } else {
                this.errorMessage = "";
            }
            if (this.otherRichHtml){
                this.userAnswer.richHtml = this.otherRichHtml.getAnswer();
            }
            this.updateCompleteNum();
        },
        filterText(value) {
            return filterTextNode(value);
        }
    },
    components: {
        richHtmlShow
    },
    beforeDestroy() {
        Event.removeEventListener("checkQuestionShowStatusEvent", this.checkQuestionShowStatusEvent);
        Event.removeEventListener("updateQuestionStatusEvent", this.updateQuestionStatusEvent);
    }
}
</script>
<style lang="less" scoped>
@import '../../../libs/css/theme/theme.less';
@import '../../../libs/css/question.less';
.checkQuestionBox {
    position: relative;
}
.title {
    line-height: 30px;
    font-size: 18px;
}
.richHtmlContent {
    line-height: 1.5;
    padding-right: 5px;
}
.optionList {
    .imageBox {
        margin-left: 25px;
    }
}
</style>
