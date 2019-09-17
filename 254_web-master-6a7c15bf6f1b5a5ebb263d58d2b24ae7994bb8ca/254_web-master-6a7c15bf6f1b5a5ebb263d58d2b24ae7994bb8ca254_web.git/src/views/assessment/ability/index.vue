<template>
  <div class="app-container calendar-list-container">
    <h3 align="center">983医院住院患者自理能力评估表</h3>
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
          <el-form-item label="ID号" prop="idNo">
            <el-input v-model="formInline.idNo" :disabled="true"></el-input>
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
        width="280">
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
      </el-table-column>
    </el-table>
    <!--<el-button size="small" type="success" @click="updateDanger()">修改</el-button>-->
    <el-button size="small" type="danger" @click="insertDanger()">新增</el-button>

    <el-dialog :visible.sync="dialogVisible" width="80%">
      <el-form :model="form" ref="form" label-width="100px" size="mini">
        <h4>大便：</h4>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="db1">
              <el-checkbox  label="失禁或昏迷" v-model="form.db1" true-label="0"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="db2">
              <el-checkbox  label="偶有失禁（每周＜1次）" v-model="form.db2" true-label="5"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="db3">
              <el-checkbox  label="控制" v-model="form.db3" true-label="10"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>小便：</h4>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="xb1">
              <el-checkbox  label="失禁或昏迷或需由他人导尿" v-model="form.xb1" true-label="0"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="xb2">
              <el-checkbox  label="偶有失禁（每24小时＜1次）" v-model="form.xb2" true-label="5" />
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="xb3">
              <el-checkbox  label="控制" v-model="form.xb3" true-label="10" />
            </el-form-item>
          </el-col>
        </el-row>
        <h4>修饰：</h4>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="xs1">
              <el-checkbox  label="需要帮助" v-model="form.xs1" true-label="0"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="xs2">
              <el-checkbox  label="自理（洗脸、梳头、刷牙、剃须）" v-model="form.xs2" true-label="5"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>用厕</h4>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="yc1">
              <el-checkbox  label="依赖他人" v-model="form.yc1" true-label="0"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yc2">
              <el-checkbox  label="需部分帮助" v-model="form.yc2" true-label="5"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="yc3">
              <el-checkbox  label="自理（去和离开厕所、使用厕纸、穿脱裤子）" v-model="form.yc3" true-label="10"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>进食：</h4>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="js1">
              <el-checkbox  label="较大或完全依赖" v-model="form.js1" true-label="0"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="js2">
              <el-checkbox  label="需部分帮助（节面包、抹黄油、夹菜、盛饭）" v-model="form.js2" true-label="5"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="js3">
              <el-checkbox  label="完全自理（能进各种食物、但不包括取饭、做饭）" v-model="form.js3" true-label="10"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>转移：</h4>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="zy1">
              <el-checkbox  label="完全依赖他人，无坐位平衡" v-model="form.zy1" true-label="0"/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item prop="zy2">
              <el-checkbox  label="需大量帮助（1-2人，身体帮助），能坐" v-model="form.zy2" true-label="5"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="zy3">
              <el-checkbox  label="需少量帮助（言语或身体帮助）" v-model="form.zy3" true-label="10"/>
            </el-form-item>
          </el-col>
          <el-col  :span="5">
            <el-form-item prop="zy4">
              <el-checkbox  label="自理" v-model="form.zy4" true-label="15"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>活动：</h4>
        <el-row>
          <el-col :span="5">
            <el-form-item prop="hd1">
              <el-checkbox  label="不能步行" v-model="form.hd1" true-label="0"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="hd2">
              <el-checkbox  label="在轮椅上能独立行动" v-model="form.hd2" true-label="5"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="hd3">
              <el-checkbox  label="需1人帮助步行（言语或身体帮助）" v-model="form.hd3" true-label="10"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="hd4">
              <el-checkbox  label="独立步行（可用辅助器，在病房及附近）" v-model="form.hd4" true-label="15"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>穿衣：</h4>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="cy1">
              <el-checkbox  label="依赖他人" v-model="form.cy1" true-label="0"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="cy2">
              <el-checkbox  label="需一半帮助" v-model="form.cy2" true-label="5"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="cy3">
              <el-checkbox  label="自理（自己系、开纽扣，关、开拉锁和穿鞋）" v-model="form.cy3" true-label="10"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>上下楼梯：</h4>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="sxlt1">
              <el-checkbox  label="不能" v-model="form.sxlt1" true-label="0"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="sxlt2">
              <el-checkbox  label="需帮助（言语、身体、手杖帮助）" v-model="form.sxlt2" true-label="5"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="sxlt3">
              <el-checkbox  label="独立上下楼梯" v-model="form.sxlt3" true-label="10"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>洗澡：</h4>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="xz1">
              <el-checkbox  label="依赖" v-model="form.xz1" true-label="0"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="xz2">
              <el-checkbox  label="自理（无指导能进出浴池并自理洗澡）" v-model="form.xz2" true-label="5"/>
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
  var haha="需要协助（人或物）";
  import {getAbilityList,addAbility} from '@/api/table'
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
          obj3: ''
        },
        tableData: [{
          project: '大便',
          content: '失禁或昏迷',
          score: '0',
          obj0: '',
          obj1: '',
          obj2: '',
          obj3: ''
        },
          {
            project: '大便',
            content: '偶有失禁（每周＜1次）',
            score: '5',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '大便',
            content: '控制',
            score: '10',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            project: '小便',
            content: '失禁或昏迷或需由他人导尿',
            score: '0',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '小便',
            content: '偶有失禁（每24小时＜1次）',
            score: '5',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '小便',
            content: '控制',
            score: '10',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            project: '修饰',
            content: '需要帮助',
            score: '0',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '修饰',
            content: '自理（洗脸、梳头、刷牙、剃须）',
            score: '5',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            project: '用厕',
            content: '较大或完全依赖',
            score: '0',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '用厕',
            content: '需部分帮助',
            score: '5',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '用厕',
            content: '自理（去和离开厕所、使用厕纸、穿脱裤子）',
            score: ' 10',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            project: '进食',
            content: '较大或完全依赖',
            score: '0',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '进食',
            content: '需部分帮助（节面包、抹黄油、夹菜、盛饭）',
            score: '5',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '进食',
            content: '完全自理（能进各种食物、但不包括取饭、做饭）',
            score: '10',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            project: '转移',
            content: '完全依赖他人，无坐位平衡',
            score: '0',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '转移',
            content: '需大量帮助（1-2人，身体帮助），能坐',
            score: '5',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '转移',
            content: '需少量帮助（言语或身体帮助）',
            score: '10',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '转移',
            content: '自理',
            score: '15',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            project: '活动',
            content: '不能步行',
            score: '0',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '活动',
            content: '在轮椅上能独立行动',
            score: '5',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '活动',
            content: '需1人帮助步行（言语或身体帮助）',
            score: '10',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '活动',
            content: '独立步行（可用辅助器，在病房及附近）',
            score: '15',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            project: '穿衣',
            content: '依赖他人',
            score: '0',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '穿衣',
            content: '需一半帮助',
            score: '5',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '穿衣',
            content: '自理（自己系、开纽扣，关、开拉锁和穿鞋）',
            score: '10',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            project: '上下楼梯',
            content: '不能',
            score: '0',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '上下楼梯',
            content: '需帮助（言语、身体、手杖帮助）',
            score: '5',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '上下楼梯',
            content: '独立上下楼梯',
            score: '10',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            project: '洗澡',
            content: '依赖',
            score: '0',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            project: '洗澡',
            content: '自理（无指导能进出浴池并自理洗澡）',
            score: '5',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            project: '得分',
            content: '',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            project: '评估者签名',
            content: '',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            project: '护士长签名',
            content: '',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },],
        projectArr:[],
        projectPos:0
      };
    },
    created() {
      this.projectQuery();
    },
    methods: {
      projectQuery(){
        getAbilityList(this.formInline).then(response => {
          console.info(response);
          console.info(response.result.length);
          let data = response.result;
          console.log(data);
          data.forEach((item, index) => {
            let _obj = "obj" + index;
            this.tableData[0][_obj] = item.db1 === null||item.db1=== "" ? null : "✔";
            this.tableData[1][_obj] = item.db2 === null||item.db2 === "" ? null : "✔";
            this.tableData[2][_obj] = item.db3 === null||item.db3 === "" ? null : "✔";
            this.tableData[3][_obj] = item.xb1 == null||item.xb1 === "" ? null : "✔";
            this.tableData[4][_obj] = item.xb2 === null||item.xb2 === "" ? null : "✔";
            this.tableData[5][_obj] = item.xb3 === null||item.xb3 === "" ? null : "✔";
            this.tableData[6][_obj] = item.xs1=== null||item.xs1=== "" ? null : "✔";
            this.tableData[7][_obj] = item.xs2 === null||item.xs2 === "" ? null : "✔";
            this.tableData[8][_obj] = item.yc1 === null||item.yc1 === "" ? null : "✔";
            this.tableData[9][_obj] = item.yc2 === null||item.yc2 === "" ? null : "✔";
            this.tableData[10][_obj] = item.yc3 === null||item.yc3 === "" ? null : "✔";
            this.tableData[11][_obj] = item.js1=== null||item.js1 === "" ? null : "✔";
            this.tableData[12][_obj] = item.js2 === null||item.js2 === "" ? null : "✔";
            this.tableData[13][_obj] = item.js3 === null||item.js3 === "" ? null : "✔";
            this.tableData[14][_obj] = item.zy1 === null||item.zy1 === "" ? null : "✔";
            this.tableData[15][_obj] = item.zy2 === null||item.zy2 === "" ? null : "✔";
            this.tableData[16][_obj] = item.zy3 === null||item.zy3 === "" ? null : "✔";
            this.tableData[17][_obj] = item.zy4 === null||item.zy4 === "" ? null : "✔";
            this.tableData[18][_obj] = item.hd1 === null||item.hd1 === "" ? null : "✔";
            this.tableData[19][_obj] = item.hd2 === null||item.hd2 === "" ? null : "✔";
            this.tableData[20][_obj] = item.hd3 === null||item.hd3 === "" ? null : "✔";
            this.tableData[21][_obj] = item.hd4 === null||item.hd4 === "" ? null : "✔";
            this.tableData[22][_obj] = item.cy1 === null||item.cy1=== "" ? null : "✔";
            this.tableData[23][_obj] = item.cy2 === null||item.cy2 === "" ? null : "✔";
            this.tableData[24][_obj] = item.cy3 === null||item.cy3 === "" ? null : "✔";
            this.tableData[25][_obj] = item.sxlt1=== null||item.sxlt1 === "" ? null : "✔";
            this.tableData[26][_obj] = item.sxlt2=== null||item.sxlt2 === "" ? null : "✔";
            this.tableData[27][_obj] = item.sxlt3 === null||item.sxlt3 === "" ? null : "✔";
            this.tableData[28][_obj] = item.xz1 === null||item.xz1=== "" ? null : "✔";
            this.tableData[29][_obj] = item.xz2 === null||item.xz2 === "" ? null : "✔";
            this.tableDate[_obj] = item.createTime;
          });
        });
        console.log(this.tableData);
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
        addAbility($form).then(() => {
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
        console.log($form);
        // this.$refs[formName].resetFields();
      },
      onCancel(formName) {
        this.dialogVisible = false;
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
