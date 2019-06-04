<!--表格题组件-->
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
                    <td v-if="data.isShowTitle">分组</td>
                    <td></td>
                    <td v-for="(item,index) in data.optionList" :key="index">
                        {{item.value}}
                    </td>
                </thead>
                <tbody v-if="data.maximumCheck>1" v-for="(item,index) in data.groupList" :key="index">
                    <CheckboxGroup v-for="(row,tdIndex) in item.optionList"
                        :key="tdIndex"
                        class="radioGroup"
                        @on-change="changeAnswer"
                        v-model="row.answer">
                        <td class="questionTit" v-if="data.isShowTitle && tdIndex==0" :rowspan="item.optionList.length">{{item.title}}</td>
                        <td class="questionTit">
                            {{row.value}}
                        </td>
                        <td class="checkOption" v-for="(option,index) in data.optionList" :key="index">
                            <Checkbox :label="option" v-scoped><i></i></Checkbox>
                        </td>
                    </CheckboxGroup>
                </tbody>
                <tbody v-if="data.maximumCheck===1" v-for="(item,index) in data.groupList" :key="index">
                    <RadioGroup v-for="(row,tdIndex) in item.optionList"
                        :key="tdIndex"
                        class="radioGroup"
                        @on-change="changeAnswer"
                        v-model="row.answer">
                        <td class="questionTit" v-if="data.isShowTitle && tdIndex==0" :rowspan="item.optionList.length">{{item.title}}</td>
                        <td class="questionTit">
                            {{row.value}}
                        </td>
                        <td class="checkOption" v-for="(option,index) in data.optionList" :key="index">
                            <Radio :label="option" v-scoped><i></i></Radio>
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
        Event.addEventListener("checkQuestionShowStatusEvent",this.checkQuestionShowStatusEvent);
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
            if(isHide!==this.data.isHide){
                this.$set(this.data,"isHide",!!isHide);//是否隐藏
                if(isHide){
                    //要隐藏
                    this.$nextTick(empty=>{
                        this.clearAnswer();
                    })
                }
            }
            this.broadcastStatus();
        },
        //根据自身状态判断目标题目的状态然后给予反馈
        checkQuestionShowStatusEvent(event){
            if(this.data.maximumCheck>1)return;//多选没有规则
            let question=event.targetQuestion;//被检测的题目
            let item;
            this.data.optionList.forEach(optionItem=>{
                if(!optionItem.rules)return;
                let isSelected=this.isSelectComplete()&&this.isCheckedAllCol(optionItem);
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
        //清除答案
        clearAnswer(){
            this.$set(this,"userAnswer",{});//清空答案
            for(var i=0;i<this.data.groupList.length;i++){
                var groupItem=this.data.groupList[i];
                for(var j=0;j<groupItem.optionList.length;j++){
                    if(this.data.maximumCheck>1){
                        if(groupItem.optionList[j].answer instanceof Array){
                            groupItem.optionList[j].answer.splice(0);
                        }
                    }else{
                        if(groupItem.optionList[j].answer)groupItem.optionList[j].answer="";
                    }
                    this.$nextTick(empty=>{
                        this.changeAnswer();
                    })
                }
            }
        },
        //答案是否为空
        answerIsEmpty(){
            let answer=this.getAnswer();
            let hasDone=false;
            for(let i=0;i<this.userAnswer.dataAnswer.length;i++){
                let groupItem=this.userAnswer.dataAnswer[i];
                if(groupItem instanceof Array){
                    for(let j=0;j<groupItem.length;j++){
                        if(groupItem[j]){
                            hasDone=true;
                        }
                    }                
                }
            }
            return !hasDone && !this.userAnswer.titleAnswer.length;
        },
        setDefaultValue(){
            for(var i=0;i<this.data.groupList.length;i++){
                var groupItem=this.data.groupList[i];
                for(var j=0;j<groupItem.optionList.length;j++){
                    if(this.data.maximumCheck>1){
                        groupItem.optionList[j].answer=[];
                        groupItem.optionList[j].oldAnswer=[];
                        if(this.userAnswer.dataAnswer[i] instanceof Array){
                            if(this.userAnswer.dataAnswer[i][j] instanceof Array){
                                this.data.optionList.forEach(item=>{
                                    this.userAnswer.dataAnswer[i][j].forEach(answer=>{
                                        if(item.id===answer.id){
                                            groupItem.optionList[j].answer.push(item);
                                            groupItem.optionList[j].oldAnswer.push(item);
                                        }
                                    })
                                })
                            }
                        }
                    }else{
                        groupItem.optionList[j].answer="";
                        if(this.userAnswer.dataAnswer[i] instanceof Array){
                            this.data.optionList.forEach(item=>{
                                if(this.userAnswer.dataAnswer[i][j] && item.id===this.userAnswer.dataAnswer[i][j].id){
                                    groupItem.optionList[j].answer=item;
                                }
                            })
                        }
                    }
                }
            }
            this.$nextTick(empty=>{
                this.changeAnswer(true);
            })
        },
        //查看大图
        viewLargeImage(url) {
            this.$emit("viewLargeImage",url);
        },
        //校验答案
        checkAnswer(){
            if(!this.complete){
                this.errorMessage="答题不完整，请补充！";
            }
            return this.complete;
        },
        //获取答案
        getAnswer(){
            this.userAnswer.dataAnswer=[];
            for(var i=0;i<this.data.groupList.length;i++){
                var groupItem=this.data.groupList[i];
                var answer=[];
                for(var j=0;j<groupItem.optionList.length;j++){
                    answer.push(groupItem.optionList[j].answer);
                }
                this.userAnswer.dataAnswer.push(answer);
            }
            if(this.$refs.richHtml){
                this.userAnswer.titleAnswer=this.$refs.richHtml.getAnswer();
            }
            return this.answer;
        },
        //获取所有行答案
        getAllRowAnswer(){
            let totalAnswer=[];
            for(let i=0;i<this.data.groupList.length;i++){//循环所有表格组
                let groupItem=this.data.groupList[i];
                for(let j=0;j<groupItem.optionList.length;j++){//循环一个表格组内-行数
                    let answerText=groupItem.optionList[j].answer;
                    if(this.data.maximumCheck>1 && answerText.length){//多选
                        totalAnswer.push(answerText);
                    }else if(answerText){//单选
                        totalAnswer.push(answerText);
                    }
                }
            }
            return totalAnswer;
        },
        //是否改选的都选了
        isSelectComplete(){
            for(let i=0;i<this.data.groupList.length;i++){//循环所有表格组
                let groupItem=this.data.groupList[i];
                let itemAnswer=[];
                for(let j=0;j<groupItem.optionList.length;j++){//循环一个表格组内-行数
                    let answerText=groupItem.optionList[j].answer;
                    if(this.data.maximumCheck>1 && answerText.length){//多选
                        itemAnswer.push(answerText);
                    }else if(answerText){//单选
                        itemAnswer.push(answerText);
                    }
                }
                if(itemAnswer.length<groupItem.optionList.length)return false;
            }
            return true;
        },
        //判断当前列是否全部选中
        isCheckedAllCol(option){
            let totalAnswer=this.getAllRowAnswer();
            let isCheckAll=true;
            for(let i=1;i<totalAnswer.length;i++){
                //判断是否全部选中同一列
                if(JSON.stringify(totalAnswer[i])!==JSON.stringify(totalAnswer[0])){
                    isCheckAll=false;
                    break;
                }
            }
            return (isCheckAll && totalAnswer.length && totalAnswer[0].id===option.id);
        },
        changeAnswer(otherOptionEvent){
            let unCheckNum=0;
            let totalAnswer=[];
            for(let i=0;i<this.data.groupList.length;i++){
                let answer=[];
                let groupItem=this.data.groupList[i];
                for(let j=0;j<groupItem.optionList.length;j++){
                    let answerText=groupItem.optionList[j].answer;
                    let oldAnswer=groupItem.optionList[j].oldAnswer;
                    if(this.data.maximumCheck>1){//多选
                        if(answerText.length>this.data.maximumCheck){
                            this.$Modal.warning({
                                title:"提示",
                                content:"最多选择"+ this.data.maximumCheck +"项"
                            });
                            this.$nextTick(i=>{
                                groupItem.optionList[j].answer=oldAnswer;
                            })
                            answer.push(oldAnswer);
                            totalAnswer.push(oldAnswer);
                            break;
                        }
                        if(answerText.length){
                            groupItem.optionList[j].oldAnswer=answerText;
                            answer.push(answerText);
                            totalAnswer.push(answerText);
                        }
                    }else{//单选
                        if(answerText){
                            answer.push(answerText);
                            totalAnswer.push(answerText);
                        }
                    }
                }
                //判断表格组是否答完
                if(answer.length!==groupItem.optionList.length){
                    unCheckNum++
                }
            }
            if(otherOptionEvent!==true){
                this.broadcastStatus();
            }
            if(unCheckNum>0 || !this.$refs.richHtml.isOk(false,false)){//未选数量
                this.complete=false;
            }else{
                this.complete=true;
            }
            Event.dispatchEvent("updateCompleteNum");
        },
        //广播规则
        broadcastStatus(){
            let changeList=[];
            this.data.optionList.forEach(item=>{
               //要显示的题目插入待更新的数组
               item.rules && item.rules.show instanceof Array && item.rules.show.forEach(item=>{
                    //让选项隐藏并更新子选项状态
                    changeList.push(item);
                })
            })
            changeList.removeRepetition();//数组去重
            if(changeList.length){
                Event.dispatchEvent("updateQuestionStatusEvent",{
                    targetQuestion:this.data,
                    updateQuestionList:changeList
                });
            }
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
        Event.removeEventListener("checkQuestionShowStatusEvent",this.checkQuestionShowStatusEvent);
        Event.removeEventListener("updateQuestionStatusEvent",this.updateQuestionStatusEvent);
    }
}
</script>
<style lang="less" scoped>
@import '../../../libs/css/theme/theme.less';
@import '../../../libs/css/question.less';
.tableQuestionBox{
    position: relative;
}
.title{
    line-height: 30px;
    font-size: 18px;
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
