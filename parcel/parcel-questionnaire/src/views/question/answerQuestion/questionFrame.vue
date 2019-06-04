<template>
    <div class="questionContent" ref="questionContent">
        <div class="questionList" 
            v-show="!item.isHide" 
            v-for="(item,index) in questionList" 
            ref="questionListBox"
            :key="index"
            @mousedown="removeUnComplete(index)">
            <div class="questionInfo clearfix">
                <div class="index" v-if="item.index">{{item.index}}.</div>
                <div class="content">
                    <components :is="getQuestionComponent(item.type)"
                        :data="item"
                        :showId="false"
                        :answer="getQuestionAnswer(item.id)"
                        @viewLargeImage="viewLargeImage"
                        ref="questionList"></components>
                </div>
            </div>
        </div>
        <Modal title="查看大图" v-model="isShowModal">
            <img :src="largeImgUrl" v-if="isShowModal" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
import * as Event from "../../../libs/js/event.js";
import * as Const from "../../../libs/js/questionConst.js";
import uuid from "../../../libs/js/uuid.js";
import SingleQuestion from "./singleQuestion.vue";//添加单选题组件
import MultipleQuestion from "./multipleQuestion.vue";//添加多选题组件
import CompletionQuestion from "./completionQuestion.vue";//添加填空题组件
import TableQuestion from "./tableQuestion.vue";//添加表格题组件
import ShortAnswerQuestion from "./shortAnswerQuestion.vue";//添加简答题组件
import ParagraphQuestion from "./paragraphQuestion.vue";//添加段落说明组件
import InventoryQuestion from "./inventoryQuestion.vue";//量表题组件
import RankingQuestion from "./rankingQuestion.vue";//排序题组件
import CombinationQuestion from "./combinationQuestion.vue";//组合题组件
export default {
    props: {
        data:{
            type:Object,
            required:true
        },
        answer:{
            type:Object,
            required:true
        }
    },
    computed:{
        questionList:{
            get(){
                return this.data.questionList;
            }
        }
    },
    data(){
        return {
            isShowModal:false,
            largeImgUrl:""
        }
    },
    watch:{
        data(newValue,oldValue){
            this.questionList=newValue.questionList?newValue.questionList:[];
        }
    },
    methods:{
        //是否在target区间
        hasRect(targetIdStart,targetIdEnd){
            let targetArr=[];
            for(var index=0;index<this.questionList.length;index++){
                let item=this.questionList[index];
                if(item.id===targetIdStart){
                    targetArr.push(item.id);
                }else if(item.id===targetIdEnd){
                    return targetArr.splice(1);
                }else if(targetArr.length){
                    targetArr.push(item.id);
                }
            }
            return [];
        },
        /**
         * 获取题目类型的组件名
         * @param  {String} type 题目类型
         * @return {String}      题目类型
         */
        getQuestionComponent(type){
            if(type===Const.QUESTION_SINGLECHOICE_TYPE)return "SingleQuestion";
            if(type===Const.QUESTION_MULTIPLECHOICE_TYPE)return "MultipleQuestion";
            if(type===Const.QUESTION_TABLE_TYPE)return "TableQuestion";
            if(type===Const.QUESTION_COMPLETION_TYPE)return "CompletionQuestion";
            if(type===Const.QUESTION_SHORTANSWER_TYPE)return "ShortAnswerQuestion";
            if(type===Const.QUESTION_RANKING_TYPE)return "RankingQuestion";
            if(type===Const.QUESTION_INVENTORY_TYPE)return "InventoryQuestion";
            if(type===Const.QUESTION_PARAGRAPH_TYPE)return "ParagraphQuestion";
            if(type===Const.QUESTION_COMBINATION_TYPE)return "CombinationQuestion";
        },
        /**
         * 根据题目寻找答案
         * @param  {String} questionId 题目ID
         * @return {Object}            返回题目对象
         */
        getQuestionAnswer(questionId){
            for(let i=0;i<this.questionList.length;i++){
                let question=this.questionList[i];
                if(question.id===questionId && question.type===Const.QUESTION_PARAGRAPH_TYPE){
                    return;
                }
            }
            if(!(this.answer && this.answer.answerList instanceof Array))return;
            for(let x=0; x<this.answer.answerList.length;x++){
                let answerData=this.answer.answerList[x];
                if(answerData.questionId===questionId){
                    return answerData;
                }
            }
            console.error("not find AnswerData");
            //容错处理，按照常理，不应该到这一步
            this.answer.answerList.push({
                questionId:questionId,
                complete:false,
                answerData:{}
            });
            return this.answer.answerList[this.answer.answerList.length-1];
        },
        //查看大图
        viewLargeImage(url) {
            this.largeImgUrl = url;
            this.isShowModal = true;
        },
        //获取用户答案
        getUserAnswer(){
            var answerList=[];
            var questionList=this.$refs.questionList;
            if(!questionList){return {} }
            for(var i=0;i<questionList.length;i++){
                if(this.questionList[i].type===Const.QUESTION_PARAGRAPH_TYPE || this.questionList[i].isHide)continue;
                answerList.push(questionList[i]?questionList[i].getAnswer():{});
            }
            return {
                pageId:this.data.pageId,
                answerList:answerList
            };
        },
        //显示有答案的题目
        showHasAnswerQuestion(){
            if(!(this.$refs.questionList instanceof Array))return;
            let willUpdateQuestion=[];
            this.$refs.questionList.forEach(question=>{
                if(question.answerIsEmpty && question.answerIsEmpty()===false){
                    this.questionList.forEach(item=>{
                        if(item.id===question.questionId){
                            question.data.isHide=false;
                            willUpdateQuestion.push(question.data);
                        }
                    })
                }
            })
            willUpdateQuestion.length && Event.dispatchEvent("updateQuestionStatusEvent",{
                targetQuestion: willUpdateQuestion[willUpdateQuestion.length-1],
                updateQuestionList:willUpdateQuestion.map(item=>{return item.id})
            });
        },
        //校验题目是否完成
        checkAnswer(){
            var questionList=this.$refs.questionList;
            if(!questionList){return true;}
            var questionListBox=this.$refs.questionListBox;
            var firstNode=null;
            var unCompleteNum=0;
            for(var i=0;i<questionList.length;i++){
                if(this.questionList[i].type===Const.QUESTION_PARAGRAPH_TYPE || this.questionList[i].isHide)continue;
                if(!questionList[i].checkAnswer()){
                    if(unCompleteNum===0){
                        firstNode=questionListBox[i];
                    }
                    unCompleteNum++;
                    questionListBox[i].classList.add("unComplete");
                }
            }
            if(unCompleteNum>0){
                var errorTop=firstNode.getOffset().top;
                this.$emit("setScrollTop",errorTop-120);
                return false;
            }
            return true;
        },
        //删除未完成样式
        removeUnComplete(index){
            var questionListBox=this.$refs.questionListBox;
            questionListBox[index].classList.remove("unComplete");
        },
        //监听窗口大小变化
        onResizeEvent() {
            let domTop=this.$refs.questionContent.getOffset().top;
            let clientHeight=window.document.documentElement.clientHeight;
            clientHeight=clientHeight - domTop - 40 - 20 - 20;
            this.$refs.questionContent.style.minHeight=clientHeight+"px";
        }
    },
    mounted() {
        this.onResizeEvent();
        window.addEventListener("resize", this.onResizeEvent);
        this.$nextTick(()=>{
            this.showHasAnswerQuestion();
        })
        
    },
    destroyed() {
        window.removeEventListener("resize", this.onResizeEvent);
    },
    updated() {
        this.onResizeEvent();
    },
    components: {
        SingleQuestion,
        MultipleQuestion,
        CompletionQuestion,
        TableQuestion,
        ShortAnswerQuestion,
        ParagraphQuestion,
        InventoryQuestion,
        RankingQuestion,
        CombinationQuestion
    }
}
</script>
<style lang="less" scoped>
@import '../../../libs/css/theme/theme.less';
.questionContent{
    width: 1100px;
    margin: 0px auto;
    min-height: 600px;
    position: relative;
    padding: 20px 0px 40px;
    color: #464C5B;
    font-size: 16px;
    background: #fff;
    .questionList{
        border-bottom: 1px solid #dcdcdc;
        .questionInfo{
            width: 1100px;
            padding: 20px 40px 10px;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
        }
        &.unComplete{
            background-color: #fff8f7;
            border-color: #FFA39E;
        }
        &:last-child{
            border-bottom:0px;
        }
    }
    .index{
        min-width: 25px;
        line-height:27px;
        margin-right: 5px;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .content{
        position: relative;
        flex:1;
        overflow: hidden;
        overflow-x: auto;
    }
}
</style>
