<template>
  <div class="app-container calendar-list-container">
    <h3 align="center">983医院住院患者管道滑脱评估表</h3>
    <el-form  :model="formInline" ref="formInline" label-width="100px" class="demo-ruleForm" size="mini" float="left">
      <el-row>
        <el-col :span="4">
          <el-form-item label="科室" prop="dept">
            <el-input v-model="formInline.dept" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="床号" prop="bedNo">
            <el-input v-model="formInline.bedNo" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formInline.name" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="性别" prop="sex">
            <el-input v-model="formInline.sex" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="formInline.age" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="住院号" prop="inpNo">
            <el-input v-model="formInline.inpNo" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <span>高危：</span>
      <el-row>
        <el-col :span="4">
          <el-form-item prop="qgcg">
            <el-checkbox  label="（经口/鼻）气管插管" v-model="form.qgcg" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="qgqktg">
            <el-checkbox  label="气管切开套管" v-model="form.qgqktg" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="tg">
            <el-checkbox  label="T管" v-model="form.tg" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="xqylg">
            <el-checkbox  label="胸腔引流管" v-model="form.xqylg" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="picc">
            <el-checkbox  label="PICC" v-model="form.picc" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="zxjmydg">
            <el-checkbox  label="中心静脉压导管" v-model="form.zxjmydg" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="pfdg">
            <el-checkbox  label="漂浮导管" v-model="form.pfdg" true-label="1"/>
          </el-form-item>
        </el-col>
      </el-row>
      <span>中危：</span>
      <el-row>
        <el-col :span="4">
          <el-form-item prop="sqelg">
            <el-checkbox  label="三腔二囊管" v-model="form.sqelg" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="gzzlg">
            <el-checkbox  label="各种造瘘管" v-model="form.gzzlg" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="fqylg">
            <el-checkbox  label="腹腔引流管" v-model="form.fqylg" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="wcjyg">
            <el-checkbox  label="胃肠减压管" v-model="form.wcjyg" true-label="1"/>
          </el-form-item>
        </el-col>
      </el-row>
      <span>低危：</span>
      <el-row>
        <el-col :span="4">
          <el-form-item prop="dg">
            <el-checkbox  label="尿管" v-model="form.dg" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="bsg">
            <el-checkbox  label="鼻饲管" v-model="form.bsg" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="qtdg">
            <el-checkbox  label="以上未提及到其他导管" v-model="form.qtdg" true-label="1"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%">
      <el-table-column
        label="项目"
        prop="project">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        align="left"
        header-align="center"
        width="270">
      </el-table-column>
      <el-table-column
        prop="score"
        align="right"
        header-align="center"
        label="分值"
        width="80">
      </el-table-column>
      <el-table-column
        header-align="center"
        label="评估时间">
        <el-table-column
          prop="obj0"
          align="right"
          header-align="center"
          :label="tableDate.obj0">
        </el-table-column>
        <el-table-column
          prop="obj1"
          align="right"
          header-align="center"
          :label="tableDate.obj1">
        </el-table-column>
        <el-table-column
          prop="obj2"
          align="right"
          header-align="center"
          :label="tableDate.obj2">
        </el-table-column>
        <el-table-column
          prop="obj3"
          align="right"
          header-align="center"
          :label="tableDate.obj3">
        </el-table-column>
        <el-table-column
          prop="obj4"
          align="right"
          header-align="center"
          :label="tableDate.obj4">
        </el-table-column>
        <el-table-column
          prop="obj5"
          align="right"
          header-align="center"
          :label="tableDate.obj5">
        </el-table-column>
      </el-table-column>
    </el-table>
    <!--<el-button size="small" type="success" @click="updateDanger()">修改</el-button>-->
    <el-button size="small" type="danger" @click="insertDanger()">新增</el-button>

    <el-dialog :visible.sync="dialogVisible" width="80%">
      <el-form :model="form" ref="form" label-width="100px" size="mini">
        <h4>项目（内容）：</h4>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="nl">
              <el-checkbox  label="【年龄】7岁以下或70岁以上" v-model="form.nl" true-label="2"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="ss">
              <el-checkbox  label="【意识】嗜睡" v-model="form.ss" true-label="2"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="ml">
              <el-checkbox  label="【意识】朦胧" v-model="form.ml" true-label="2"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="zd">
              <el-checkbox  label="【意识】躁动" v-model="form.zd" true-label="3"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="jl">
              <el-checkbox  label="【精神】焦虑" v-model="form.jl" true-label="2"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="kj">
              <el-checkbox  label="【精神】恐惧" v-model="form.kj" true-label="2" />
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="fz">
              <el-checkbox  label="【精神】烦躁" v-model="form.fz" true-label="3" />
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="sh">
              <el-checkbox  label="【活动】术后3天内" v-model="form.sh" true-label="3"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="xdbw">
              <el-checkbox  label="【活动】行动不稳" v-model="form.xdbw" true-label="2"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="pt">
              <el-checkbox  label="【活动】偏瘫" v-model="form.pt" true-label="2"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="syzxq">
              <el-checkbox  label="【活动】使用助行器" v-model="form.syzxq" true-label="2"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="bnzzhd">
              <el-checkbox  label="【活动】不能自主活动" v-model="form.bnzzhd" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="kns">
              <el-checkbox  label="【疼痛】可耐受" v-model="form.kns" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="nyns">
              <el-checkbox  label="【疼痛】难以耐受" v-model="form.nyns" true-label="3"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="ybnlj">
              <el-checkbox  label="【沟通】一般能理解" v-model="form.ybnlj" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="bnph">
              <el-checkbox  label="【沟通】差 不能配合" v-model="form.bnph" true-label="3"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>措施预防：</h4>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="yf1">
              <el-checkbox  label="导管明确标识、妥善固定并保持引流管通畅  " v-model="form.yf1" true-label="1"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="yf2">
              <el-checkbox  label="观察导管留置时间、部位、深度、局部情况等" v-model="form.yf2" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="8">
            <el-form-item prop="yf3">
              <el-checkbox  label="悬挂谨防导管滑脱安全警示标识" v-model="form.yf3" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="8">
            <el-form-item prop="yf4">
              <el-checkbox  label="加强巡视根据评分危险度2-4h观察一次" v-model="form.yf4" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item prop="yf5">
              <el-checkbox  label="护理操作时避免过度牵拉" v-model="form.yf5" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="yf6">
              <el-checkbox  label="意识障碍及躁动者专人看护，必要时肢体约束" v-model="form.yf6" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="8">
            <el-form-item prop="yf7">
              <el-checkbox  label="与患者有效沟通，给与心理护理，" v-model="form.yf7" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="8">
            <el-form-item prop="yf8">
              <el-checkbox  label="强化患者及家属的导管相关知识宣教" v-model="form.yf8" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="yf9">
              <el-checkbox  label="外出检查时认真检查导管连接部位" v-model="form.yf9" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="yf10">
              <el-checkbox  label="执行床头交接班制度" v-model="form.yf10" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="create('form')">保存</el-button>
          <el-button @click="onCancel('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {getPipeList,addPipeSlip} from '@/api/table'
  var haha="需要协助（人或物）";
  // import {
  //   forDefectStatistics
  // } from 'api/hqms/statistics/defect/index';
  export default {
    name: 'defect',
    data() {
      return {
        dialogVisible:false,
        formInline: {
          page: 0,
          limit: 20,
          patientId:'001',
          visitId:'1',
        },
        form:{
          patientId:'001',
          visitId:'1',
          createTime:'2019-07-06'
        },
        tableDate: {
          obj0: '',
          obj1: '',
          obj2: '',
          obj3: '',
          obj4: '',
          obj5: ''
        },
        tableData: [{
          project: '年龄',
          content: '七岁以下或70岁以上',
          score: '2',
          obj0: '',
          obj1: '',
          obj2: '',
          obj3: '',
          obj4: '',
          obj5: ''
        },
          {
            project: '意识',
            content: '嗜睡',
            score: '2',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },
          {
            project: '意识',
            content: '朦胧',
            score: '2',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },
          {
            project: '意识',
            content: '躁动',
            score: '3',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },
          {
            project: '精神',
            content: '焦虑',
            score: '2',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },
          {
            project: '精神',
            content: '恐惧',
            score: '2',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },
          {
            project: '精神',
            content: '烦躁',
            score: '3',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            project: '活动',
            content: '术后3天内',
            score: '3',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            project: '活动',
            content: '行动不稳',
            score: '2',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },
          {
            project: '活动',
            content: '偏瘫',
            score: '2',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            project: '活动',
            content: '使用助行器',
            score: '2',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            project: '活动',
            content: '不能自主活动',
            score: '1',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },  {
            project: '疼痛',
            content: '可耐受',
            score: '1',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },{
            project: '疼痛',
            content: '难以耐受',
            score: '3',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },{
            project: '沟通',
            content: '一般能理解',
            score: '1',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },{
            project: '沟通',
            content: '差  不能配合',
            score: '3',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },{
            project: '得   分',
            content: '',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },{
            project: '预防措施',
            content: '1.导管明确标识、妥善固定并保持引流管通畅',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            project: '预防措施',
            content: '2.观察导管留置时间、部位、深度、局部情况等',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            project: '预防措施',
            content: '3.悬挂谨防导管滑脱安全警示标识',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            project: '预防措施',
            content: '4.加强巡视根据评分危险度2-4h观察一次',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            project: '预防措施',
            content: '5.护理操作时避免过度牵拉',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            project: '预防措施',
            content: '6.意识障碍及躁动者专人看护，必要时肢体约束',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            project: '预防措施',
            content: '7.与患者有效沟通，给与心理护理，',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            project: '预防措施',
            content: '8.强化患者及家属的导管相关知识宣教',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },
          {
            project: '预防措施',
            content: '9.外出检查时认真检查导管连接部位',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },
          {
            project: '预防措施',
            content: '10.执行床头交接班制度',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },{
            project: '评估者签名',
            content: '',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            project: '护士长签名',
            content: '',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },],
        projectArr: [],
        projectPos: 0,

      };
    },
    created() {
      this.projectQuery();
    },
    methods: {

      projectQuery(){
        console.log(this.tableData);
        getPipeList(this.formInline).then(response => {
          let data = response.result;
          console.log(data);
          data.forEach((item, index) => {
            let _obj = "obj" + index;
            this.tableData[0][_obj] = item.nl === null||item.nl=== "" ? null : "✔";
            this.tableData[1][_obj] = item.ss === null||item.ss === "" ? null : "✔";
            this.tableData[2][_obj] = item.ml === null||item.ml === "" ? null : "✔";
            this.tableData[3][_obj] = item.zd == null||item.zd === "" ? null : "✔";
            this.tableData[4][_obj] = item.jl === null||item.jl === "" ? null : "✔";
            this.tableData[5][_obj] = item.kj === null||item.kj === "" ? null : "✔";
            this.tableData[6][_obj] = item.fz=== null||item.fz=== "" ? null : "✔";
            this.tableData[7][_obj] = item.sh === null||item.sh === "" ? null : "✔";
            this.tableData[8][_obj] = item.xdbw === null||item.xdbw === "" ? null : "✔";
            this.tableData[9][_obj] = item.pt === null||item.pt === "" ? null : "✔";
            this.tableData[10][_obj] = item.syzxq === null||item.syzxq === "" ? null : "✔";
            this.tableData[11][_obj] = item.bnzzhd=== null||item.bnzzhd === "" ? null : "✔";
            this.tableData[12][_obj] = item.kns === null||item.kns === "" ? null : "✔";
            this.tableData[13][_obj] = item.nyns === null||item.nyns === "" ? null : "✔";
            this.tableData[14][_obj] = item.ybnlj === null||item.ybnlj === "" ? null : "✔";
            this.tableData[15][_obj] = item.bnph === null||item.bnph === "" ? null : "✔";
            this.tableData[17][_obj] = item.yf1 === null||item.yf1 === "" ? null : "✔";
            this.tableData[18][_obj] = item.yf2 === null||item.yf2 === "" ? null : "✔";
            this.tableData[19][_obj] = item.yf3 === null||item.yf3 === "" ? null : "✔";
            this.tableData[20][_obj] = item.yf4 === null||item.yf4 === "" ? null : "✔";
            this.tableData[21][_obj] = item.yf5 === null||item.yf5 === "" ? null : "✔";
            this.tableData[22][_obj] = item.yf6 === null||item.yf6 === "" ? null : "✔";
            this.tableData[23][_obj] = item.yf7 === null||item.yf7 === "" ? null : "✔";
            this.tableData[24][_obj] = item.yf8 === null||item.yf8 === "" ? null : "✔";
            this.tableData[25][_obj] = item.yf9 === null||item.yf9 === "" ? null : "✔";
            this.tableData[26][_obj] = item.yf10 === null||item.yf10 === "" ? null : "✔";
            this.tableDate[_obj] = item.createTime;
          });
        });
        for(var i=0;i<this.tableData.length;i++){
          if (i === 0) {
            this.projectArr.push(1);
            this.projectPos = 0;
          } else {
            if (this.tableData[i].project=== this.tableData[i - 1].project) {
              this.projectArr[this.projectPos] += 1;
              this.projectArr.push(0);
            } else {
              this.projectArr.push(1);
              this.projectPos = i;
            }
          }
        }
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex ===0) {
          const _row = this.projectArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      insertDanger() {
        this.dialogVisible = true;
      },
      // updateDanger() {
      //   this.dialogVisible = true;
      // },
      create(formName){
        let $form = this.form;
        console.log($form);
        addPipeSlip($form).then(() => {
          this.$notify({
            title: '成功',
            message: '处理成功',
            type: 'success',
            duration: 2000,
          });
          this.projectQuery();
          this.dialogVisible = false;
          this.$refs[formName].resetFields();
        })

        // this.$refs[formName].resetFields();
      },
      onCancel(formName) {
        this.dialogVisible = false;
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
