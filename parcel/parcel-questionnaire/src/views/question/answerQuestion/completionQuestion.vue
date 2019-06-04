<!-- 填空题 -->
<template>
    <div class="title">
        <span v-if="showId">{{data.id}}</span>
        <div class="completionContent">
            <div v-if="data.title.isHtml">
                <richHtmlShow
                ref="richHtml"
                :htmlValue="data.title.html"
                :answerData="userAnswer"
                @updateElement="updateElement"
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
            result:false,
            errorMessage:""
        }
    },
    computed:{
        questionId(){return this.data.id;},
        userAnswer:{
            get(){
                if(!(this.answer.answerData instanceof Array)){
                    this.answer.answerData=[];
                }
                return this.answer.answerData;
            },
            set(value){
                this.answer.answerData=value instanceof Array ?value:[];
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
    mounted(){
        // TODO: 下面代码不应该放到 nextTick 中最后一行吗？
        if(this.userAnswer.length>0)this.updateCompleteNum();
        this.$nextTick(()=>{
           this.initEvent();
           this.complete=this.$refs.richHtml.isOk(false,false);
        })
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
            if(isHide){
                this.clearAnswer();
                this.complete=false;
            }
            this.updateCompleteNum();
        },
        //清空答案
        clearAnswer(){
            this.userAnswer=[];
        },
        //答案是否为空
        answerIsEmpty(){
            return !this.userAnswer.length;
        },
        //根据自身状态判断目标题目的状态然后给予反馈
        checkQuestionShowStatusEvent(event){
            // TODO: 此题无规则
        },
        initEvent(){
            let allInput=this.$refs.richHtml?this.$refs.richHtml.$el.querySelectorAll("input.inputFrameBoxElement"):[];
            allInput.forEach(input=>{
                input.removeEventListener("blur",this.onInputBlur);
                input.addEventListener("blur",this.onInputBlur);
            })
        },
        updateElement(){
            this.initEvent();
        },
        //当编辑框失去焦点
        onInputBlur(event){
            var richHtml=this.$refs.richHtml;
            if(!richHtml.isOk()){
                this.complete=false;
                this.updateCompleteNum();
                return false;
            }
            if(!this.data.isStrided){
                this.complete=richHtml.isOk(false,false);
                this.updateCompleteNum();
                return;
            }
            let allInput=richHtml.$el.querySelectorAll("input.inputFrameBoxElement");
            let input=event.srcElement;
            let strideList=this.data.strideList;
            let maxCount=100,count=0;
            let replaceArr={
                "=":"==",
                "×":"*",
                "÷":"/",
                "≥":">=",
                "≤":"<="
            }
            for(let i=0;i<strideList.length;i++){
                let item=strideList[i];
                let str=String(item.value);
                let errorMessage=item.errorMessage?item.errorMessage:"输入值不满足表达式"+str;
                //替换成表式字符
                Object.keys(replaceArr).forEach(item=>{
                    let replaceStr=replaceArr[item];
                    str=str.replace(new RegExp(""+item+"","g"),replaceStr);
                })
                let index=str.search(/【(\d+)】/g);
                while (index>-1 && count<maxCount) {
                    let indexStr=str.substring(index,str.indexOf("】")+1);
                    indexStr=indexStr.replace(/【|】/g,"");
                    indexStr=parseInt(indexStr);//找到input索引
                    let inputValue="";
                    if(indexStr>0 && allInput.length>(indexStr-1)){
                        inputValue=allInput[indexStr-1].value;
                        if(isNaN(Number(inputValue))){
                            inputValue=`"${inputValue.replace(/\"/g,"'")}"`
                        }else{
                            inputValue=Number(inputValue);
                        }
                    }
                    str=str.replace(`【${indexStr}】`,inputValue);
                    index=str.search(/【(\d+)】/g);
                    count++;
                }
                try {
                    if(!str){
                        this.result=true;
                    }else{
                        this.result=eval(str);
                    }
                } catch (e) {
                    this.result=false;
                }
                if(!this.result){
                    this.errorMessage=errorMessage;
                    this.complete=(richHtml.isOk(false,false) && this.result);
                    this.updateCompleteNum();
                    return false;
                }else {
                    this.errorMessage="";
                }
            }
            this.complete=(richHtml.isOk(false,false) && this.result);
            this.updateCompleteNum();
        },
        //查看大图
        viewLargeImage(url) {
            this.$emit("viewLargeImage",url);
        },
        //校验答案
        checkAnswer(){
            if(!this.complete){
                this.errorMessage = this.errorMessage?this.errorMessage:"答题不完整，请补充！"
            }
            return this.complete;
        },
        getAnswer(){
            this.userAnswer=this.$refs.richHtml.getAnswer();
            return this.answer;
        },
        updateCompleteNum(){
            Event.dispatchEvent("updateCompleteNum");
        },
        completeOneBlank(status,errorMessage){
            if(!status){
                this.errorMessage=errorMessage;
            }else{
                this.errorMessage="";
            }
            // var richHtml=this.$refs.richHtml;
            // this.complete=(status && richHtml.isOk(false,false) && this.result);
            // this.updateCompleteNum();
        },
        filterText(value){
            return filterTextNode(value);
        }
    },
    components: {
        richHtmlShow
    },
    beforeDestroy() {
        Event.removeEventListener("updateQuestionStatusEvent",this.updateQuestionStatusEvent);
    }
}
</script>
<style lang="less" scoped>
@import '../../../libs/css/theme/theme.less';
@import '../../../libs/css/question.less';
.title{
    line-height: 30px;
    font-size: 18px;
    position: relative;
    overflow: hidden;
    overflow-x: auto;
}
.completionContent{
    margin-bottom: 10px;
}
</style>
