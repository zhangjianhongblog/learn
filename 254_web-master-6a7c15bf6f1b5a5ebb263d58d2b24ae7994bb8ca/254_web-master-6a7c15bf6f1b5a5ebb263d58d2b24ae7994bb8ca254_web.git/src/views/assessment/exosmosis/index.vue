<template>
  <div class="app-container calendar-list-container">
    <h3 align="center">983医院住院患者外渗危险因素评估表</h3>
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
    </el-form>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%">
      <el-table-column
        label="危险因素等级分级"
        prop="dangerLevel">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        align="left"
        header-align="center"
        width="280">
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
        <h4>|||级：</h4>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="gsyw">
              <el-checkbox  label="高渗药物" v-model="form.gsyw" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="hlyw">
              <el-checkbox  label="化疗药物" v-model="form.hlyw" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="xghxy">
              <el-checkbox  label="血管活性药" v-model="form.xghxy" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>||级：</h4>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="zd">
              <el-checkbox  label="躁动" v-model="form.zd" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="zce">
              <el-checkbox  label="早产儿" v-model="form.zce" true-label="1" />
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="jxyw">
              <el-checkbox  label="碱性药物" v-model="form.jxyw" true-label="1" />
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="glln">
              <el-checkbox  label="高龄老年（80岁以上）" v-model="form.glln" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="ts">
              <el-checkbox  label="脱水" v-model="form.ts" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="ytld">
              <el-checkbox  label="液体量大（≥3500ml∕24h）" v-model="form.ytld" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="jmcc">
              <el-checkbox  label="静脉穿刺难度大" v-model="form.jmcc" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="xk">
              <el-checkbox  label="休克" v-model="form.xk" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="sysjc">
              <el-checkbox  label="输液时间长（24小时持续）" v-model="form.sysjc" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="ylzry">
              <el-checkbox  label="阳离子溶液（钾、钙）" v-model="form.ylzry" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="yld">
              <el-checkbox  label="压力大（静推、加压输液）" v-model="form.yld" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>|级：</h4>
        <el-row>
        <el-col  :span="6">
          <el-form-item prop="xyzyj">
            <el-checkbox  label="血液∕造影剂" v-model="form.xyzyj" true-label="1"/>
          </el-form-item>
        </el-col>
          <el-col  :span="6">
            <el-form-item prop="tnb">
              <el-checkbox  label="糖尿病、动脉粥样硬化" v-model="form.tnb" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="sysdk">
              <el-checkbox  label="输液部位选择不当" v-model="form.sysdk" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="ytwd">
              <el-checkbox  label="输液速度快（≥100d∕min）" v-model="form.ytwd" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="jjzl">
              <el-checkbox  label="液体温度（≤15℃≥35℃）" v-model="form.jjzl" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="dj">
              <el-checkbox  label="拒绝治疗倾向、意识不清" v-model="form.dj" true-label="1"/>
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
  import {getExoList,addExo} from '@/api/table'
  // import {
  //   forDefectStatistics
  // } from 'api/hqms/statistics/defect/index';
  export default {
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
        tableData: [
          {
            dangerLevel: 'III',
            content: '高渗药物',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },
          {
            dangerLevel: 'III',
            content: '化疗药物',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },
          {
            dangerLevel: 'III',
            content: '血管活性药',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },
          {
            dangerLevel: 'II',
            content: '躁动',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },
          {
            dangerLevel: 'II',
            content: '早产儿',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },
          {
            dangerLevel: 'II',
            content: '碱性药物',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            dangerLevel: 'II',
            content: '高龄老年（80岁以上）',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            dangerLevel: 'II',
            content: '脱水',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            dangerLevel: 'II',
            content: '液体量大（≥3500ml∕24h）',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            dangerLevel: 'II',
            content: '静脉穿刺难度大',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            dangerLevel: 'II',
            content: '休克',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            dangerLevel: 'II',
            content: '输液时间长（24小时持续）',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            dangerLevel: 'II',
            content: '阳离子溶液（钾、钙）',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            dangerLevel: 'II',
            content: '压力大（静推、加压输液）',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            dangerLevel: 'I',
            content: '血液∕造影剂',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            dangerLevel: 'I',
            content: '糖尿病、动脉粥样硬化',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },{
            dangerLevel: 'I',
            content: '液部位选择不当',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },{
            dangerLevel: 'I',
            content: '输液速度快（≥100d∕min）',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },{
            dangerLevel: 'I',
            content: '液体温度（≤15℃≥35℃）',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },{
            dangerLevel: 'I',
            content: '拒绝治疗倾向、意识不清',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },{
            dangerLevel: '危险评级',
            content: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            dangerLevel: '评估者签名',
            content: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          }, {
            dangerLevel: '护士长签名',
            content: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: ''
          },],
        dangerLevelArr:[],
        dangerLevelPos:0
      };
    },
    created() {
      this.projectQuery();
    },
    methods: {
      projectQuery(){
        console.log(this.tableData);
        getExoList(this.formInline).then(response => {
          console.info(response);
          console.info(response.result.length);
          let data = response.result;
          console.log(data);
          data.forEach((item, index) => {
            let _obj = "obj" + index;
            this.tableData[0][_obj] = item.gsyw === null||item.gsyw=== "" ? null : "✔";
            this.tableData[1][_obj] = item.hlyw === null||item.hlyw === "" ? null : "✔";
            this.tableData[2][_obj] = item.xghxy === null||item.xghxy === "" ? null : "✔";
            this.tableData[3][_obj] = item.zd == null||item.zd === "" ? null : "✔";
            this.tableData[4][_obj] = item.zce === null||item.zce === "" ? null : "✔";
            this.tableData[5][_obj] = item.jxyw === null||item.jxyw === "" ? null : "✔";
            this.tableData[6][_obj] = item.glln=== null||item.glln=== "" ? null : "✔";
            this.tableData[7][_obj] = item.ts === null||item.ts === "" ? null : "✔";
            this.tableData[8][_obj] = item.ytld === null||item.ytld === "" ? null : "✔";
            this.tableData[9][_obj] = item.jmcc === null||item.jmcc === "" ? null : "✔";
            this.tableData[10][_obj] = item.xk === null||item.xk === "" ? null : "✔";
            this.tableData[11][_obj] = item.sysjc=== null||item.sysjc === "" ? null : "✔";
            this.tableData[12][_obj] = item.ylzry === null||item.ylzry === "" ? null : "✔";
            this.tableData[13][_obj] = item.yld === null||item.yld === "" ? null : "✔";
            this.tableData[14][_obj] = item.xyzyj === null||item.xyzyj === "" ? null : "✔";
            this.tableData[15][_obj] = item.tnb === null||item.tnb === "" ? null : "✔";
            this.tableData[16][_obj] = item.sysdk === null||item.sysdk === "" ? null : "✔";
            this.tableData[17][_obj] = item.ytwd === null||item.ytwd === "" ? null : "✔";
            this.tableData[18][_obj] = item.jjzl === null||item.jjzl === "" ? null : "✔";
            this.tableData[19][_obj] = item.dj === null||item.dj === "" ? null : "✔";
            this.tableDate[_obj] = item.createTime;
          });
        });
        for(var i=0;i<this.tableData.length;i++){
          if (i === 0) {
            this.dangerLevelArr.push(1);
            this.dangerLevelPos = 0;
          } else {
            if (this.tableData[i].dangerLevel=== this.tableData[i - 1].dangerLevel) {
              this.dangerLevelArr[this.dangerLevelPos] += 1;
              this.dangerLevelArr.push(0);
            } else {
              this.dangerLevelArr.push(1);
              this.dangerLevelPos = i;
            }
          }
        }
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex ===0) {
          const _row = this.dangerLevelArr[rowIndex];
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
        addExo($form).then(() => {
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
