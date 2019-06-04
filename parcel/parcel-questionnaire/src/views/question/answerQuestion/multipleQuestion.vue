<!--多选题-->
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
            <CheckboxGroup v-model="userAnswer" @on-change="checkChange">
                <div class="table">
                    <div class="tableRows" v-for="index in countRow(data)">
                        <div class="optionList" v-if="(countIndex(index,itemIndex,data.showColNum) <= data.optionList.length)" v-for="itemIndex in parseInt(data.showColNum)" :style='{width:100/parseInt(data.showColNum)+"%"}'>
                            <template v-for="item in [data.optionList[countIndex(index,itemIndex,data.showColNum)-1]]">
                                <div class="list">
                                    <Checkbox :disabled="item.disabled" :label="item" v-scoped>
                                        <div v-if="item.isHtml" class="text">
                                            <richHtmlShow
                                                ref="otherRichHtml"
                                                :isDisabled="disabledBlank"
                                                :htmlValue="item.html"
                                                :answerData="item.richHtml"
                                                @completeOneBlank="completeOneBlank"
                                                v-if="item.isOther">
                                            </richHtmlShow>
                                            <div class="richHtmlContent" v-else v-html="item.html"></div>
                                        </div>
                                        <div v-else class="text" v-html="filterText(item.text)"></div>
                                    </Checkbox>
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
            </CheckboxGroup>
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
            disabledBlank:true,
            oldSelect:[]//历史选中项
        }
    },
    computed:{
        questionId(){return this.data.id;},
        userAnswer:{
            get(){
                if(!(this.answer.answerData instanceof Array))this.answer.answerData=[];
                return this.answer.answerData;
            },
            set(value){
                this.$set(this.answer,"answerData",value instanceof Array?value:[]);
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
        complete:{
            //判断当前题是否已完成
            get(){
                return this.answer.complete;
            },
            set(value){
                this.answer.complete=!!value;
            }
        },
        //互斥选项规则
        disabledFilter:{
            get(){
                let disabledObj={};
                if(!(this.data.ruleList instanceof Array))return disabledObj;
                this.data.ruleList.forEach(item=>{
                    let hc=(item.optionList instanceof Array?item.optionList:[])
                        .filter(item=>{return item && item.check})
                        .map(item=>{return item.id});//得到互斥列表
                    disabledObj[item.id]=hc;
                })
                for(let name in disabledObj){
                    disabledObj[name].forEach(item=>{
                        if(disabledObj[item] instanceof Array){
                            disabledObj[item].push(name);
                        }else{
                            disabledObj[item]=[name];
                        }
                    })
                }
                return disabledObj;
            }
        }
    },
    created(){
        this.filterData();
        //根据自身状态判断目标题目的状态
        Event.addEventListener("checkQuestionShowStatusEvent",this.checkQuestionShowStatusEvent);
        Event.addEventListener("updateQuestionStatusEvent",this.updateQuestionStatusEvent);//更新题目状态
    },
    mounted(){
        this.data.optionList.forEach(item=>{
            this.userAnswer.forEach((answer,index)=>{
                if(item.id===answer.id){
                    if(answer.id===this.data.otherOptionData.id){
                        this.$set(item,"richHtml",answer.richHtml);
                    }
                    this.userAnswer.splice(index,1,item);
                }
            })
        })
        this.oldSelect=this.userAnswer.map(item=>{return item});
        this.updateCompleteNum();
    },
    watch:{
        complete(newVal,oldVal){
            if(newVal){
                this.errorMessage="";
            }
        }
    },
    methods: {
        //清空答案
        clearAnswer(){
            if(this.userAnswer.length)this.userAnswer.splice(0);
        },
        //答案是否为空
        answerIsEmpty(){
            return !this.userAnswer.length;
        },
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
            this.data.optionList.forEach(optionItem=>{
                eventData.disableData[optionItem.id]=[];//初始化为空数组
            })
            //从全局去筛选自己要不要显示或隐藏
            Event.dispatchEvent("checkQuestionShowStatusEvent",eventData);
            let isHide=false;
            eventData.showData.forEach(item=>{
                if(item.isHide)isHide=true;
            })
            if(isHide!==this.data.isHide){
                this.$set(this.data,"isHide",!!isHide);//是否隐藏
                if(isHide){
                   this.clearAnswer();
                }
            }
            //更新子选项
            let disableKeys=Object.keys(eventData.disableData);
            let disabled=false;
            let disabledHcObj=this.disabledFun();//获取互斥结果
            this.data.optionList.forEach(optionItem=>{
                let index= disableKeys.indexOf(optionItem.id);
                if(index<0)return;
                if(!(eventData.disableData[optionItem.id] instanceof Array))return;
                if(eventData.disableData[optionItem.id].length || disabledHcObj[optionItem.id]){
                    this.$set(optionItem,"disabled",true);
                    if(this.optionItemIsSelected(optionItem)){
                        //选中状态被禁选
                        if(this.cancelQuestionItem(optionItem))disabled=true;
                    }
                }else{
                    this.$set(optionItem,"disabled",false);
                }
            })
            this.broadcastStatus();//有选项禁止且禁止前被选中则广播事件
            this.updateCompleteNum();
        },
        //根据自身规则判断目标题目的状态然后给予反馈
        checkQuestionShowStatusEvent(event){
            let question=event.targetQuestion;//被检测的题目
            let item;
            this.data.optionList.forEach(optionItem=>{
                let isSelected=this.optionItemIsSelected(optionItem);
                if(!optionItem.rules)return;
                //此选项存在显示逻辑-----和题相关
                if(optionItem.rules.show instanceof Array){
                    let index=optionItem.rules.show.indexOf(question.id);
                    if(index>=0){
                        item=new QuestionShowSattus(this.data,optionItem,!isSelected);//如果选中了择不是隐藏
                        event.showData.push(item);
                    }
                }
            })
        },
        //取消某个选项
        cancelQuestionItem(optionItem){
            let searchIndex=this.userAnswer.indexOf(optionItem);
            if(searchIndex>=0)this.userAnswer.splice(searchIndex,1);
            return searchIndex>=0;
        },
        //广播 本题发生变化，受关联的题目需要进更新
        broadcastStatus(){
            let changeList=[];
            this.data.optionList.forEach(item=>{
                if(!item.rules)return;
                //要显示的题目插入待更新的数组
                if(item.rules.show instanceof Array){//显隐逻辑
                    item.rules.show.forEach(itemId=>{//让选项隐藏并更新子选项状态
                        changeList.push(itemId);
                    })
                }
                //禁选规则
                if(item.rules.relate instanceof Array){
                    item.rules.relate.forEach(relateItem=>{//让选项隐藏并更新子选项状态
                        changeList.push(relateItem.id);
                    })
                }
            })
            changeList.removeRepetition();//数组去重
            //广播让本题所有选项受关联的题更新状态
            if(changeList.length){
                //console.log("更新区段",changeList.filter(item=>{return item.questionId}));
                Event.dispatchEvent("updateQuestionStatusEvent",{
                    targetQuestion:this.data,
                    updateQuestionList:changeList
                });
            }
        },
        //选项是否选中
        optionItemIsSelected(optionItem){
            return this.userAnswer.indexOf(optionItem)>=0;
        },
        //根据id判断是否选中
        optionItemIsSelectedForId(optionItemId){
            let isSelected=false;
            if(!optionItemId)return isSelected;
            this.userAnswer.forEach(item=>{
                if(item.id===optionItemId)isSelected=true;
            })
            return isSelected;
        },
        //根据id禁止选项
        checkDisabledFilterForID(optionItemId){
            let disabledList=[];
            for(let itemId in this.disabledFilter){
                if(this.optionItemIsSelectedForId(itemId) && this.disabledFilter[itemId].indexOf(optionItemId)>=0){
                    disabledList.push(itemId);
                }
            }
            return disabledList;
        },
        checkChange(newValue){
            let oldValue=this.oldSelect;
            //最多选项数判断
            if(this.data.maximumCheck && newValue.length>this.data.maximumCheck){
                this.$Modal.warning({
                    title:"提示",
                    content:"最多选择"+ this.data.maximumCheck +"项"
                });
                this.$nextTick(i=>{
                    this.userAnswer=oldValue;
                })
                // for(let index=this.userAnswer.length-1;index<=0;index--){
                //     let item=this.userAnswer[index];
                //     if(oldValue.indexOf(item)<0)this.userAnswer.splice(index,1);
                // }
                return false;
            }
            //互斥项判断
            this.oldSelect=this.userAnswer.map(item=>{return item});
            this.updateSelf();
            this.broadcastStatus();
            //如果其他选项没有选择，则禁止内部的输入
            if(this.data.isShowOtherOption && this.data.otherOptionData){
                if(!this.optionItemIsSelectedForId(this.data.otherOptionData.id)){
                    this.disabledBlank=true;
                    this.data.optionList.forEach(item=>{
                       if(item.id===this.data.otherOptionData.id){
                           item.richHtml=[];
                       }
                    })
                }
            }
        },
        //处理互斥选项，返回是否清空数据
        disabledFun(){
            let disabledData={}
            this.data.optionList.forEach(item=>{
                let disabledList=this.checkDisabledFilterForID(item.id);
                disabledData[item.id]=disabledList.length>0;
            })
            return disabledData;
        },
        //默认数据处理
        filterData(){
            this.data.optionList.forEach(item=>{
                this.$set(item,"disabled",false);
            })
            if(!this.data.showColNum)this.data.showColNum=1;
        },
        countRow(data) {
            return Math.ceil(data.optionList.length/parseInt(data.showColNum));
        },
        countIndex(rIndex,cIndex,showCols){
            return (rIndex-1) * parseInt(showCols) + cIndex;
        },
        //查看大图
        viewLargeImage(url) {
            this.$emit("viewLargeImage",url);
        },
        //校验答案
        checkAnswer(){
            if(!this.complete)this.errorMessage="答题不完整，请补充！";
            return this.complete;
        },
        //获取答案
        getAnswer(){
            //判断选中其他选项
            for(var i=0;i<this.userAnswer.length;i++){
                if(this.userAnswer[i].id===this.data.otherOptionData.id){
                    if(!this.otherRichHtml) return;
                    this.userAnswer[i].richHtml=this.otherRichHtml.getAnswer();
                }
            }
            return this.answer;
        },
        //广播当前完成情况
        updateCompleteNum(){
            if(this.userAnswer.length<=0){
                this.complete=false;
            }else{
                this.disabledBlank=!(this.data.isShowOtherOption && this.optionItemIsSelectedForId(this.data.otherOptionData.id));
                if(!this.disabledBlank){
                    this.complete=this.otherRichHtml?this.otherRichHtml.isOk(false,false):false;
                }else{
                    this.complete=true;
                }
            }
            Event.dispatchEvent("updateCompleteNum");
        },
        //其他选项输入监听
        completeOneBlank(status,errorMessage){
            if(!status){
                this.errorMessage=errorMessage;
            }else{
                this.errorMessage="";
            }
            if(this.otherRichHtml){
                this.complete = status && this.otherRichHtml.isOk(false,false);
                for(var i=0;i<this.userAnswer.length;i++){
                    if(this.userAnswer[i].id===this.data.otherOptionData.id){
                        this.userAnswer[i].richHtml=this.otherRichHtml.getAnswer();
                    }
                }
            }
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
        Event.removeEventListener("checkQuestionShowStatusEvent",this.checkQuestionShowStatusEvent);
        Event.removeEventListener("updateQuestionStatusEvent",this.updateQuestionStatusEvent);
    }
}
</script>
<style lang="less" scoped>
@import '../../../libs/css/theme/theme.less';
@import '../../../libs/css/question.less';
.checkQuestionBox{
    position: relative;
}
.title{
    line-height: 30px;
    font-size: 18px;
}
.richHtmlContent{
    line-height: 1.5;
    padding-right: 5px;
}
.optionList{
    .imageBox{
        margin-left: 25px;
    }
}
</style>
