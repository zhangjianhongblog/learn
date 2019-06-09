<!--
段落说明组件
-->
<template>
    <div class="title">
        <span v-if="showId">{{data.id}}</span>
        <div class="richHtmlContent" v-if="data.title.isHtml" v-html="data.title.html"></div>
        <div v-else v-html="filterText(data.title.text)"></div>
        <div class="imageBox clearfix" v-if="data.title.isHtml && data.title.imgList.length">
            <div class="imgList" @click="viewLargeImage(item.url)" v-for="(item,index) in data.title.imgList" :key="index">
                <div class="img" :style="'background-image:url('+ item.url +')'"></div>
                <span class="imgIndex" v-if="data.title.imgList.length>1">图{{index+1}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import * as Event from "../../../libs/js/event.js";
import filterTextNode from "../../../libs/js/filterText.js";
import {QuestionShowSattus,QuestionUpdateStatus} from "./question.event.class.js";
export default {
    props: {
        data:{
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
        }
    },
    computed:{
        questionId(){return this.data.id;},
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
        },
        //根据自身状态判断目标题目的状态然后给予反馈
        checkQuestionShowStatusEvent(event){
            // TODO: 此题无规则
        },
        //查看大图
        viewLargeImage(url) {
            this.$emit("viewLargeImage",url);
        },
        filterText(value){
            return filterTextNode(value);
        }
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
}
.richHtmlContent{
    line-height: 1.5;
    padding-right: 5px;
}
</style>
