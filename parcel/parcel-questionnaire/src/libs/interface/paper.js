/*
    by: haoluo2 2019年01月12日
    name:
*/
var context =require("./context.js");
const paperUrl = {
    chooseSubjectList: context.api + '/answer/chooseSubjectList',  //获取用户可选问卷
    validateKey: context.api + '/validate/validateKey',    //验证密钥
    choosePaper: context.api + '/answer/choosePaper',  //确定选择问卷
    queryHadPaper: context.api + '/answer/queryHadPaper',  //测试概览--已选问卷和当前需要作答问卷
    getAnswerPaper: context.api + '/answer/getAnswerPaper',    //获取问卷内容
    submitAnswer: context.api + '/answer/submitAnswer',    //提交问卷作答数据
    applyReset: context.api + '/answer/applyReset'    //申请重置身份
};

export default paperUrl;
