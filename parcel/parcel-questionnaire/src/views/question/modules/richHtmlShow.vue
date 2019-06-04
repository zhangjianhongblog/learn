<template lang="html">
    <div class="richHtmlFrame"></div>
</template>

<script>
export default {
    props:{
        htmlValue:{
            type:String,
            default:"",
            required:true
        },
        isDisabled:{
            type:Boolean,
            default:false
        },
        answerData:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            errorMessage:""
        }
    },
    watch:{
        htmlValue(newVaule,oldValue){
            this.$el.innerHTML=newVaule;
            this.initEvent();
            this.$nextTick(empty=>{
                this.$emit("updateElement");
            })
        },
        isDisabled(newVaule,oldValue){
            var inputList=this.$el.querySelectorAll("input.inputFrameBoxElement");
            for(var i=0;i<inputList.length;i++){
                if(newVaule){
                    inputList[i].setAttribute("disabled",true);
                    inputList[i].style.borderColor="#dcdcdc";
                }else{
                    inputList[i].removeAttribute("disabled");
                    inputList[i].style.borderColor="#c5c8ce";
                }
                inputList[i].style.color="#657180";
            }
        },
        answerData: {
            handler(newValue, oldValue) {
                let inputList=this.$el.querySelectorAll("input.inputFrameBoxElement");
                for(let i=0;i<inputList.length;i++){
                    var inputId=inputList[i].getAttribute("inputId");
                    if(!newValue.length){
                        inputList[i].value="";
                    }
                    newValue.forEach(answer=>{
                        if(answer.id===inputId){
                            inputList[i].value=answer.value;
                        }
                    })
                }
            },
            deep: true
        }
    },
    mounted() {
        this.$el.innerHTML=this.htmlValue;
        this.$nextTick(()=>{
            this.initEvent();
        })
    },
    methods:{
        /*
        是否符合填写标准
         */
        isOk(colorTip,msgTip){
            let inputList=this.$el.querySelectorAll("input.inputFrameBoxElement");
            var num=0;
            for(let i=0;i<inputList.length;i++){
                let node=inputList[i],
                    data=node.getAttribute("data");
                let status=this.check(node,JSON.parse(data),colorTip,msgTip);
                if(!status) {
                    num++;
                }
            }
            if(num>0){
                return false;
            }
            return true;
        },
        setDefaultAnswer(){
            let inputList=this.$el.querySelectorAll("input.inputFrameBoxElement");
            this.answerData.forEach((answer)=>{
                inputList.forEach(input=>{
                    var inputId=input.getAttribute("inputId");
                    if(inputId===answer.id){
                        input.value=answer.value;
                    }
                })
            })
        },
        getAnswer(){
            let answer=[];
            let inputList=this.$el.querySelectorAll("input.inputFrameBoxElement");
            for(let i=0;i<inputList.length;i++){
                let inputId=inputList[i].getAttribute("inputId");
                answer.push({
                    id:inputId,
                    value:inputList[i].value
                });
            }
            return answer;
        },
        initEvent(){
            var divList=this.$el.querySelectorAll("div.inputFrameBoxElement");
            for(var i=0;i<divList.length;i++){
                let item=divList[i];
                var data=item.getAttribute("data");
                var inputId=item.getAttribute("inputId");
                var input=document.createElement("input");
                input.className="inputFrameBoxElement";
                input.setAttribute("inputId",inputId);
                if(this.isDisabled){
                    input.setAttribute("disabled",true);
                }
                if(data){
                    input.setAttribute("data",data);
                    var dataJson=JSON.parse(data);
                    if(dataJson.maxCharacter){
                        input.setAttribute("maxlength",dataJson.maxCharacter);
                    }
                    input.style.width=(dataJson.width?dataJson.width:120)+"px";
                    if(dataJson.style===2){
                        input.style.borderRadius="4px";
                        if(this.isDisabled){
                            input.style.border="1px solid #dcdcdc";
                        }else{
                            input.style.border="1px solid #c5c8ce";
                        }
                    }else{
                        input.style.border="none";
                        input.style.borderRadius="0px";
                        if(this.isDisabled){
                            input.style.borderBottom="1px solid #dcdcdc";
                        }else{
                            input.style.borderBottom="1px solid #c5c8ce";
                        }
                    }
                }
                input.onfocus=this.onFocus;
                input.onblur=this.onBlur;
                item.parentNode.insertBefore(input,item);
                item.parentNode.removeChild(item);
            }
            this.setDefaultAnswer();
        },
        onFocus(event){
            let node=event.srcElement;
            node.style.borderColor="#06c7c8";
            node.style.color="#657180";
        },
        onBlur(event){
            let node=event.srcElement;
            try {
                node.style.borderColor="#c5c8ce";
                node.style.color="#657180";
                let data=node.getAttribute("data");
                let status=this.check(node,JSON.parse(data),true,true);
                this.$emit("completeOneBlank",status,this.errorMessage);
            }catch(e){
                console.log(e);
            }
        },
        check(node,data,colorTip,msgTip){
            let value=node.value;
            this.errorMessage="";
            if(!data){
                if(value){
                    return true;
                }else{
                    if(colorTip)node.style.borderColor=node.style.color="#F00";
                    if(msgTip)this.errorMessage="此项必填";
                    return false;
                }
            }
            let type=data.type //1：文本 2：数字 3：整数 4:小数
            if(type===1 && !data.isNull){//文本类型
                if(!value){
                    if(colorTip)node.style.borderColor=node.style.color="#F00";
                    if(msgTip)this.errorMessage="此项必填";
                    return false;
                }
            }else if(type===2 || type===4){//数字类型 小数类型
                let min=data.minValue,
                    max=data.maxValue;
                let reg=/^(\-|\+)?\d+(\.\d+)?$/;
                if(!reg.test(value)){
                    if(colorTip)node.style.borderColor=node.style.color="#F00";
                    if(msgTip)this.errorMessage="请输入数字";
                    return false;
                }else if(min!=="" && min!=undefined && parseFloat(value)<min){
                    if(colorTip)node.style.borderColor=node.style.color="#F00";
                    if(msgTip)this.errorMessage="请输入大于等于"+min+(max?("且小于等于"+max):"")+"的值";
                    return false;
                }else if(max!=="" && max!=undefined && parseFloat(value)>max){
                    if(colorTip)node.style.borderColor=node.style.color="#F00";
                    if(msgTip)this.errorMessage="请输入"+(min?("大于等于"+min+"且"):"")+"小于等于"+max+"的值";
                    return false;
                }
                if(type===4 && data.decimalNum){
                    let decimalNum=data.decimalNum;
                    let index=value.indexOf('.');
                    let num=index>=0? String(value).split('.')[1].length:0;
                    if(index>=0 && (num > parseInt(decimalNum))){
                        if(colorTip)node.style.borderColor=node.style.color="#F00";
                        if(msgTip)this.errorMessage="请保留"+decimalNum+"位小数";
                        return false;
                    }
                }
            }else if(type===3){//整数类型
                let min=data.minValue,
                    max=data.maxValue;
                let reg=/^-?[0-9]\d*$/;
                if(!reg.test(value)){
                    if(colorTip)node.style.borderColor=node.style.color="#F00";
                    if(msgTip)this.errorMessage="请输入整数";
                    return false;
                }else if(min!=="" && min!=undefined && parseInt(value)<min){
                    if(colorTip)node.style.borderColor=node.style.color="#F00";
                    if(msgTip)this.errorMessage="请输入大于等于"+min+(max?("且小于等于"+max):"")+"的值";
                    return false;
                }else if(max!=="" && max!=undefined && parseInt(value)>max){
                    if(colorTip)node.style.borderColor=node.style.color="#F00";
                    if(msgTip)this.errorMessage="请输入"+(min?("大于等于"+min+"且"):"")+"小于等于"+max+"的值";
                    return false;
                }
            }
            return true;
        }
    }
}
</script>

<style lang="css" scoped>
.richHtmlFrame{
    line-height: 1.5;
    padding-right: 5px;
}
</style>
