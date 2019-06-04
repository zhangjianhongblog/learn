<template>
    <div class="shortAnswerBox">
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
        <div class="answerBox">
            <Input placeholder="请在此输入你的答案" @on-blur="changeAnswer" v-model="userAnswer.dataAnswer" :maxlength="data.maxLength" type="textarea" :autosize="{minRows: 3}" v-scoped></Input>
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
            errorMessage:"",
        }
    },
    computed:{
        questionId(){return this.data.id;},
        userAnswer:{
            get(){
                if(!this.answer.answerData)this.$set(this.answer,"answerData",{});
                if(!this.answer.answerData.dataAnswer)this.$set(this.answer.answerData,"dataAnswer","");
                if(!this.answer.answerData.titleAnswer)this.$set(this.answer.answerData,"titleAnswer",[]);
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
    mounted(){
        if(Object.keys(this.userAnswer).length>0){
            this.$nextTick(()=>{
                this.changeAnswer();
            })
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
                this.$nextTick(empty=>{
                    this.clearAnswer();
                    this.changeAnswer();
                })
            }
        },
        //清空答案    
        clearAnswer(){
            this.$set(this,"userAnswer",{});
        },
        //答案是否为空
        answerIsEmpty(){
            let answer=this.getAnswer();
            return (!this.userAnswer.dataAnswer && !this.userAnswer.titleAnswer.length);
        },
        //根据自身状态判断目标题目的状态然后给予反馈
        checkQuestionShowStatusEvent(event){
            // TODO: 本体不存在规则
        },
        //查看大图
        viewLargeImage(url) {
            this.$emit("viewLargeImage",url);
        },
        //校验答案
        checkAnswer(){
            if(!this.complete){
                this.errorMessage="答题不完整，请补充！"
            }
            return this.complete;
        },
        getAnswer(){
            if(this.$refs.richHtml){
                this.userAnswer.titleAnswer=this.$refs.richHtml.getAnswer();
            }
            return this.answer;
        },
        completeOneBlank(status,errorMessage){
            if(!status){
                this.errorMessage=errorMessage;
            }else{
                this.errorMessage="";
            }
            var richHtml=this.$refs.richHtml;
            this.complete=(status && richHtml.isOk(false,false) && this.userAnswer.dataAnswer);
            this.updateCompleteNum();
        },
        changeAnswer(){
            var richHtml=this.$refs.richHtml;
            this.complete=(richHtml && richHtml.isOk(false,false) && this.userAnswer.dataAnswer);
            this.updateCompleteNum();
        },
        updateCompleteNum(){
            Event.dispatchEvent("updateCompleteNum");
        },
        filterText(value){
            return filterTextNode(value);
        }
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
.shortAnswerBox{
    position: relative;
}
.title{
    line-height: 30px;
    font-size: 18px;
    overflow: hidden;
    overflow-x: auto;
}
.answerBox{
    position: relative;
    margin-bottom: 10px;
    textarea{
        border:1px solid #E3E3E3;
        background: #fafafa;
    }
}
</style>
