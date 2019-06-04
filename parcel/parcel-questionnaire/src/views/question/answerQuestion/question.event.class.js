


//题目显示状态
class QuestionShowSattus{
    constructor(question,optionItem,isHide){
        this.type="QuestionShowSattus";
        this.question=question;
        this.optionItem=optionItem;
        this.isHide=isHide;
    }
}
//更新状态
class QuestionUpdateStatus{
    constructor(questionId,updateQuestionItem){
        this.type="QuestionUpdateStatus";
        this.questionId=questionId;//受影响的id
        this.updateQuestionItem=updateQuestionItem;//更新子选项的数组
    }
}
module.exports={
    QuestionShowSattus,
    QuestionUpdateStatus
}
