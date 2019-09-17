<template>
  <div class="app-container calendar-list-container">
    <h3 align="center">983医院烫伤危险因素评估表</h3>
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
        width="300">
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
        <h4>|||级：（需要加热保温）</h4>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="gjgnjt">
              <el-checkbox  label="感觉功能减退" v-model="form.gjgnjt" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="hm">
              <el-checkbox  label="昏迷" v-model="form.hm" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="jt">
              <el-checkbox  label="截瘫" v-model="form.jt" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>||级：（需要加热保温）
        </h4>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="nl">
              <el-checkbox  label="年龄＜7岁、＞70岁" v-model="form.nl" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="xyxhza">
              <el-checkbox  label="血液循环障碍" v-model="form.xyxhza" true-label="1" />
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="mzwx">
              <el-checkbox  label="麻醉未醒" v-model="form.mzwx" true-label="1" />
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="crq">
              <el-checkbox  label="产褥期" v-model="form.crq" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="dl">
              <el-checkbox  label="电疗" v-model="form.dl" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="tnbz">
              <el-checkbox  label="糖尿病足" v-model="form.tnbz" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>||级：</h4>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="rszy">
              <el-checkbox  label="热水坐浴" v-model="form.rszy" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="qyryys">
              <el-checkbox  label="取用热饮用水" v-model="form.qyryys" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="rl">
              <el-checkbox  label="热疗" v-model="form.rl" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="xz">
              <el-checkbox  label="洗澡" v-model="form.xz" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="bshz">
              <el-checkbox  label="鼻饲患者" v-model="form.bshz" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>措施预防：</h4>
        <el-row>
          <el-col  :span="10">
            <el-form-item prop="yf1">
              <el-checkbox  label="1.禁用玻璃瓶热敷保暖，感觉迟钝、昏迷、截瘫患者不用热水袋等保温措施。 " v-model="form.yf1" true-label="1"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
          <el-col  :span="10">
            <el-form-item prop="yf2">
              <el-checkbox  label="2.老人、婴幼儿、循环不良患者，热水袋热敷时不能直接贴于皮肤、灌水1∕3满、水温低于50°C，皮肤潮红、疼痛立即停止使用，并局部处理。" v-model="form.yf2" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
          <el-col  :span="10">
            <el-form-item prop="yf3">
              <el-checkbox  label="3.糖尿病患者泡脚水温＜4°时间＜15分钟。" v-model="form.yf3" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
          <el-col  :span="10">
            <el-form-item prop="yf4">
              <el-checkbox  label="4.热水袋外敷每半小时检查一次温度、热敷部位皮肤、有无漏水等。" v-model="form.yf4" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="10">
            <el-form-item prop="yf5">
              <el-checkbox  label="5.高温治疗时，灯距、温度、时间等操作符合治疗要求，患者不要自己调整操作。" v-model="form.yf5" true-label="1"/>
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
  import {getBurnsList,addBurns} from '@/api/table'
  // import {
  //   forDefectStatistics
  // } from 'api/hqms/statistics/defect/index';
  export default {
    name: 'defect',
    data() {
      return {
        dialogVisible:false,
        formInline: {
          page:0,
          limit:20,
          patientId:'001',
          visitId:'1'
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
          dangerLevel: 'Ⅲ级(需要加热保温)',
          content: '感觉功能减退',
          obj0: '',
          obj1: '',
          obj2: '',
          obj3: ''
        },
          {
            dangerLevel: 'Ⅲ级(需要加热保温)',
            content: '昏迷',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel: 'Ⅲ级(需要加热保温)',
            content: '截瘫',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel: 'Ⅱ级(需要加热保温)',
            content: '年龄＜7岁、＞70岁',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel: 'Ⅱ级(需要加热保温)',
            content: '血液循环障碍',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel: 'Ⅱ级(需要加热保温)',
            content: '麻醉未醒',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel:'Ⅱ级(需要加热保温)',
            content: '产褥期',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            dangerLevel: 'Ⅱ级(需要加热保温)',
            content: '电疗',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            dangerLevel: 'Ⅱ级(需要加热保温)',
            content: '糖尿病足',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            dangerLevel: 'Ⅰ级',
            content: '热水坐浴',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel: 'Ⅰ级',
            content: '取用热饮用水',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel: 'Ⅰ级',
            content: '热疗',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel: 'Ⅰ级',
            content: '洗澡',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            dangerLevel: 'Ⅰ级',
            content: '鼻饲患者',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            dangerLevel: '危险评级',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            dangerLevel: '预防措施',
            content: '1.禁用玻璃瓶热敷保暖，感觉迟钝、昏迷、截瘫患者不用热水袋等保温措施。',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            dangerLevel: '预防措施',
            content: '2.老人、婴幼儿、循环不良患者，热水袋热敷时不能直接贴于皮肤、灌水1∕3满、水温低于50°C，皮肤潮红、疼痛立即停止使用，并局部处理',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            dangerLevel: '预防措施',
            content: '3.糖尿病患者泡脚水温＜4°时间＜15分钟',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            dangerLevel: '预防措施',
            content: '4.热水袋外敷每半小时检查一次温度、热敷部位皮肤、有无漏水等。',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            dangerLevel: '预防措施',
            content: '5.高温治疗时，灯距、温度、时间等操作符合治疗要求，患者不要自己调整操作。',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            dangerLevel: '评估者签名',
            content: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            dangerLevel: '护士长签名',
            content: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
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
        getBurnsList(this.formInline).then(response => {
          console.info(response);
          console.info(response.result.length);
          let data = response.result;
          console.log(data);
          data.forEach((item, index) => {
            let _obj = "obj" + index;
            this.tableData[0][_obj] = item.gjgnjt === null||item.gjgnjt=== "" ? null : "✔";
            this.tableData[1][_obj] = item.hm === null||item.hm === "" ? null : "✔";
            this.tableData[2][_obj] = item.jt === null||item.jt === "" ? null : "✔";
            this.tableData[3][_obj] = item.nl == null||item.nl === "" ? null : "✔";
            this.tableData[4][_obj] = item.xyxhza === null||item.xyxhza === "" ? null : "✔";
            this.tableData[5][_obj] = item.mzwx === null||item.mzwx === "" ? null : "✔";
            this.tableData[6][_obj] = item.crq=== null||item.crq=== "" ? null : "✔";
            this.tableData[7][_obj] = item.dl === null||item.dl === "" ? null : "✔";
            this.tableData[8][_obj] = item.tnbz === null||item.tnbz === "" ? null : "✔";
            this.tableData[9][_obj] = item.rszy === null||item.rszy === "" ? null : "✔";
            this.tableData[10][_obj] = item.qyryys === null||item.qyryys === "" ? null : "✔";
            this.tableData[11][_obj] = item.rl=== null||item.rl === "" ? null : "✔";
            this.tableData[12][_obj] = item.xz === null||item.xz === "" ? null : "✔";
            this.tableData[13][_obj] = item.bshz === null||item.bshz === "" ? null : "✔";
            this.tableData[15][_obj] = item.yf1 === null||item.yf1 === "" ? null : "✔";
            this.tableData[16][_obj] = item.yf2 === null||item.yf2 === "" ? null : "✔";
            this.tableData[17][_obj] = item.yf3 === null||item.yf3 === "" ? null : "✔";
            this.tableData[18][_obj] = item.yf4 === null||item.yf4 === "" ? null : "✔";
            this.tableData[19][_obj] = item.yf5 === null||item.yf5 === "" ? null : "✔";
            this.tableDate[_obj] = item.createTime;
          });
        });
        console.log(this.tableData);
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
        addBurns($form).then(() => {
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
