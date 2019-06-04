//题型列表
export const QUESTION_SINGLECHOICE_TYPE=1,
    QUESTION_MULTIPLECHOICE_TYPE=2,
    QUESTION_TABLE_TYPE=3,
    QUESTION_COMPLETION_TYPE=4,
    QUESTION_SHORTANSWER_TYPE=5,
    QUESTION_RANKING_TYPE=6,
    QUESTION_INVENTORY_TYPE=7,
    QUESTION_PARAGRAPH_TYPE=8,
    QUESTION_COMBINATION_TYPE=9;
export const questionType={
    list:[
        {type:QUESTION_SINGLECHOICE_TYPE,name:"单选题",class:"radio"},
        {type:QUESTION_MULTIPLECHOICE_TYPE,name:"多选题",class:"checkbox"},
        {type:QUESTION_TABLE_TYPE,name:"表格题",class:"table"},
        {type:QUESTION_COMPLETION_TYPE,name:"填空题",class:"blank"},
        {type:QUESTION_SHORTANSWER_TYPE,name:"简答题",class:"shortAnswer"},
        // {type:QUESTION_RANKING_TYPE,name:"排序题",class:"ranking"},
        {type:QUESTION_INVENTORY_TYPE,name:"量表题",class:"inventory"},
        // {type:QUESTION_COMBINATION_TYPE,name:"组合题",class:"combination"},
        {type:QUESTION_PARAGRAPH_TYPE,name:"段落说明",class:"paragraph"}
    ]
};
//填空题输入类型
export const RULE_TEXT_TYPE=1,
    RULE_NUMBER_TYPE=2,
    RULE_INTEGER_TYPE=3,
    RULE_DECIMALS_TYPE=4;
export const fillsRuleType={
    list:[
        {type:RULE_TEXT_TYPE,name:"文本类型"},
        {type:RULE_NUMBER_TYPE,name:"数字类型"},
        {type:RULE_INTEGER_TYPE,name:"整数类型"},
        {type:RULE_DECIMALS_TYPE,name:"小数类型"}
    ]
};
    