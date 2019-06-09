<!-- 量表题组件 -->
<template>
    <div class="tableQuestionBox">
        <span v-if="showId">{{data.id}}</span>
        <div class="title">
            <div v-if="data.title.isHtml">
                <richHtmlShow
                ref="richHtml"
                :htmlValue="data.title.html"
                :answerData="userAnswer.titleAnswer"
                @completeOneBlank="completeOneBlank">
                </richHtmlShow>
            </div>
            <div v-else v-html="filterText(data.title.text)"></div>
            <div class="imageBox clearfix" v-if="data.title.isHtml && data.title.imgList.length">
                <div class="imgList" @click="viewLargeImage(item.url)" v-for="(item,index) in data.title.imgList" :key="index">
                    <div class="img" :style="'background-image:url('+ item.url +')'"></div>
                    <span class="imgIndex" v-if="data.title.imgList.length>1">图{{index+1}}</span>
                </div>
            </div>
        </div>
        <div class="tableBox">
            <table cellpadding="0" cellspacing="0">
                <thead>
                    <td></td>
                    <td v-for="(item,index) in data.optionList" :key="index">
                        {{item.value}}
                    </td>
                    <td></td>
                </thead>
                <tbody v-if="data.choiceType==='2'">
                    <CheckboxGroup v-for="(item,index) in data.groupList"
                        :key="index"
                        class="radioGroup"
                        @on-change="changeAnswer"
                        v-model="item.answer">
                        <td class="questionTit">
                            {{item.leftValue}}
                        </td>
                        <td class="checkOption" v-for="(option,index) in data.optionList" :key="index">
                            <Checkbox :label="option" v-scoped><i></i></Checkbox>
                        </td>
                        <td class="questionTit">
                            {{item.rightValue}}
                        </td>
                    </CheckboxGroup>
                </tbody>
                <tbody v-if="data.choiceType==='1'">
                    <RadioGroup v-for="(item,index) in data.groupList"
                        :key="index"
                        class="radioGroup"
                        @on-change="changeAnswer"
                        v-model="item.answer">
                        <td class="questionTit">
                            {{item.leftValue}}
                        </td>
                        <td class="checkOption" v-for="(option,index) in data.optionList" :key="index">
                            <Radio :label="option" v-scoped><i></i></Radio>
                        </td>
                        <td class="questionTit">
                            {{item.rightValue}}
                        </td>
                    </RadioGroup>
                </tbody>
            </table>
        </div>
        <div class="umCompleteTips" v-if="errorMessage">
            <Alert type="error" show-icon v-scoped>{{errorMessage}}</Alert>
        </div>
    </div>
</template>
<script>
import * as Event from "../../../libs/js/event.js";
import filterTextNode from "../../../libs/js/filterText.js";
import richHtmlShow from "../modules/richHtmlShow.vue";
import {QuestionShowSattus,QuestionUpdateStatus} from "./question.event.class.js";
export default {
    props: {
        data:{
            type:Object,
            required:true
        },
        answer:{
            type:Object,
            required:true
        },
        showId:{
            type:Boolean,
            required:false,
            default:false
        }
    },
    data(){
        return {
            errorMessage:""
        }
    },
    computed:{
        questionId(){return this.data.id;},
        userAnswer:{
            get(){
                if(!this.answer.answerData)this.$set(this.answer,"answerData",{});
                if(!(this.answer.answerData.dataAnswer instanceof Array))this.$set(this.answer.answerData,"dataAnswer",[]);
                if(!(this.answer.answerData.titleAnswer instanceof Array))this.$set(this.answer.answerData,"titleAnswer",[]);
                return this.answer.answerData;
            },
            set(value){
                this.answer.answerData=value?value:{};
            }
        },
        complete:{//判断当前题是否已完成
            get(){
                return this.answer.complete;
            },
            set(value){
                this.answer.complete=!!value;
            }
        }
    },
    watch:{
        complete(newVal,oldVal){
            if(newVal){
                this.errorMessage="";
            }
        }
    },
    created(){
        //根据自身状态判断目标题目的状态
        //Event.addEventListener("checkQuestionShowStatusEvent",this.checkQuestionShowStatusEvent);
        Event.addEventListener("updateQuestionStatusEvent",this.updateQuestionStatusEvent);//更新题目状态
    },
    methods: {
        //接收到更新题目状态事件
        updateQuestionStatusEvent(event){
            let target = event.targetQuestion;//广播事件的原身
            //event.updateQuestionList 是  questionId 数组
            if(!(event.updateQuestionList instanceof Array))return;
            //看看自身是不在在更新范围中
            event.updateQuestionList.forEach(questionId=>{
                if(questionId===this.data.id){
                    this.updateSelf();
                }
            })
        },
        //更新自己是否隐藏或显示
        updateSelf(){
            //查询自己是否显示或隐藏
            let eventData={
                targetQuestion:this.data,//题目id
                showData:[],//存储其他试题的反馈结果
                disableData:{}//存放选项是否要禁选
            };
            //从全局去筛选自己要不要显示或隐藏
            Event.dispatchEvent("checkQuestionShowStatusEvent",eventData);
            let isHide=false;
            eventData.showData.forEach(item=>{
                if(item.isHide)isHide=true;
            })
            this.$set(this.data,"isHide",!!isHide);//是否隐藏
            if(isHide && Object.keys(this.userAnswer).length){
                //要隐藏且 当前存在被选中项时要先清除答案，然后广播自己的规则变更
                // TODO: 此处注释是否可以-待验证
                this.clearAnswer();
            }
        },
        //根据自身状态判断目标题目的状态然后给予反馈
        checkQuestionShowStatusEvent(event){
            // TODO: 规则暂未处理
        },
        //清空答案
        clearAnswer(){
            this.$set(this,"userAnswer",{});//清空答案
            for(var i=0;i<this.data.groupList.length;i++){
                var groupItem=this.data.groupList[i];
                if(this.data.choiceType=='2'){//多选
                    if(groupItem.answer instanceof Array)groupItem.answer.splice(0);
                }else{
                    if(groupItem.answer)groupItem.answer="";
                }
                this.$nextTick(empty=>{
                    this.changeAnswer();
                })
            }
        },
        //答案是否为空
        answerIsEmpty(){
            let answer=this.getAnswer();
            let hasDone=false;
            for(let i=0;i<this.userAnswer.dataAnswer.length;i++){
                if(this.userAnswer.dataAnswer[i]){
                    hasDone=true;
                }
            }
            return !hasDone && !this.userAnswer.titleAnswer.length;
        },
        //初始化默认值
        setDefaultValue(){
            for(var i=0;i<this.data.groupList.length;i++){
                var groupItem=this.data.groupList[i];
                if(this.data.choiceType=='2'){//多选
                    groupItem.answer=[];
                    if(this.userAnswer.dataAnswer instanceof Array){
                        if(this.userAnswer.dataAnswer[i] instanceof Array){
                            this.data.optionList.forEach(item=>{
                                this.userAnswer.dataAnswer[i].forEach(answer=>{
                                    if(item.id===answer.id){
                                        groupItem.answer.push(item);
                                    }
                                })
                            })
                            this.$nextTick(empty=>{
                                this.changeAnswer(true);
                            })
                        }
                    }
                }else{
                    groupItem.answer=null;
                    if(this.userAnswer.dataAnswer instanceof Array){
                        this.data.optionList.forEach(item=>{
                            if(this.userAnswer.dataAnswer[i] && this.userAnswer.dataAnswer[i].id && item.id===this.userAnswer.dataAnswer[i].id){
                                groupItem.answer=item;
                                this.$nextTick(empty=>{
                                    this.changeAnswer(true);
                                })
                            }
                        })
                    }
                }
            }
        },
        //查看大图
        viewLargeImage(url) {
            this.$emit("viewLargeImage",url);
        },
        //校验答案
        checkAnswer(){
            if(!this.complete){
                this.errorMessage = "答题不完整，请补充！";
            }
            return this.complete;
        },
        //获取答案
        getAnswer(){
            this.userAnswer.dataAnswer=[];
            for(var i=0;i<this.data.groupList.length;i++){
                var groupItem=this.data.groupList[i];
                this.userAnswer.dataAnswer.push(groupItem.answer);
            }
            if(this.$refs.richHtml){
                this.userAnswer.titleAnswer=this.$refs.richHtml.getAnswer();
            }
            return this.answer;
        },
        //改变答案
        changeAnswer(otherOptionEvent){
            let unCheckNum=0;
            let totalAnswer=[];
            for(let i=0;i<this.data.groupList.length;i++){
                let groupItem=this.data.groupList[i];
                let answerText=groupItem.answer;
                if(this.data.choiceType==='2'){//多选
                    if(answerText.length>0){
                        totalAnswer.push(answerText);
                    }
                }else{//单选
                    if(answerText){
                        totalAnswer.push(answerText);
                    }
                }
            }
            if(totalAnswer.length!==this.data.groupList.length){
                unCheckNum++
            }
            if(otherOptionEvent!==true){
                let changeList=[];
                this.data.optionList.forEach(item=>{
                    if(item.rules && item.rules.show instanceof Array){
                        //要显示的题目插入待更新的数组
                        item.rules.show.forEach(item=>{
                            //让选项隐藏并更新子选项状态
                            changeList.push(new QuestionUpdateStatus(item,[]));
                        })
                    }
                })
                //广播让本题所有选项受关联的题更新状态
                if(changeList.length){
                    Event.dispatchEvent("updateQuestionStatusEvent",{
                        targetQuestion:this.data,
                        updateQuestionList:changeList
                    });
                }
            }
            if(unCheckNum>0 || !this.$refs.richHtml.isOk(false,false)){//未选数量
                this.complete=false;
            }else{
                this.complete=true;
            }
            Event.dispatchEvent("updateCompleteNum");
        },
        completeOneBlank(status,errorMessage){
            if(!status){
                this.errorMessage=errorMessage;
            }else{
                this.errorMessage="";
            }
            this.changeAnswer();
        },
        filterText(value){
            return filterTextNode(value);
        }
    },
    mounted() {
        this.setDefaultValue();
    },
    components: {
        richHtmlShow
    },
    beforeDestroy() {
        //Event.removeEventListener("checkQuestionShowStatusEvent",this.checkQuestionShowStatusEvent);
        Event.removeEventListener("updateQuestionStatusEvent",this.updateQuestionStatusEvent);
    }
}
</script>
<style lang="less" scoped>
@import '../../../libs/css/theme/theme.less';
@import '../../../libs/css/question.less';
.tableQuestionBox {
    position: relative;
}
.title{
    line-height: 30px;
    overflow: hidden;
    overflow-x: auto;
}
.questionTit{
    text-align: left;
}
.tableQuestionBox .tableBox table td.checkOption{
    padding: 0px 0px;
    height: auto;
    &:hover{
        background-color: #f5f5f5;
    }
}
.radioGroup{
    .ivu-radio-wrapper,.ivu-checkbox-wrapper{
        height: 100%;
        width: 100%;
        line-height: 40px;
        text-align: center;
        margin-right: 0px;
        .ivu-radio{
            margin-right: 0;
        }
    }
}
</style>
