<template>
  <div class="app-container calendar-list-container">
    <h3 align="center">983医院住院患者误吸/窒息危险因素评估表</h3>
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
        <h4>|||级：</h4>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="yqkxx">
              <el-checkbox  label="有呛咳现象" v-model="form.yqkxx" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="xhddcx">
              <el-checkbox  label="消化道大出血" v-model="form.xhddcx" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="tygnza">
              <el-checkbox  label="吞咽功能障碍" v-model="form.tygnza" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="cywxs">
              <el-checkbox  label="曾有误吸史" v-model="form.cywxs" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>||级：
        </h4>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="jlot">
              <el-checkbox  label="剧烈呕吐" v-model="form.jlot" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="ss">
              <el-checkbox  label="嗜睡" v-model="form.ss" true-label="1" />
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="xzjsz">
              <el-checkbox  label="协助进食者" v-model="form.xzjsz" true-label="1" />
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="dxzd">
              <el-checkbox  label="癫痫、躁动" v-model="form.dxzd" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="nl">
              <el-checkbox  label="3岁以下、70岁以上" v-model="form.nl" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="gsysz">
              <el-checkbox  label="管饲饮食者" v-model="form.gsysz" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>|级：</h4>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="yenxx">
              <el-checkbox  label="有呃逆现象" v-model="form.yenxx" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="hbpsmzy">
              <el-checkbox  label="喉部喷洒麻醉药" v-model="form.hbpsmzy" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="jlks">
              <el-checkbox  label="剧烈咳嗽" v-model="form.jlks" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>措施预防：</h4>
        <el-row>
          <el-col  :span="10">
            <el-form-item prop="yf1">
              <el-checkbox  label="1.年龄在3岁以下，70岁以上须有专人陪护，并告知相关注意事项。" v-model="form.yf1" true-label="1"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="10">
            <el-form-item prop="yf2">
              <el-checkbox  label="2.有呛咳、呃逆现象时，注意观察程度，嘱少进流质食物，严重者停止口入食物，给予鼻饲饮食。" v-model="form.yf2" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="10">
            <el-form-item prop="yf3">
              <el-checkbox  label="3.吞咽障碍者，嘱进食时速度要慢、不要与人对话。" v-model="form.yf3" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="10">
            <el-form-item prop="yf4">
              <el-checkbox  label="4.协助喂食者，取半卧位，头偏向一侧，观察患者吞咽情况，确定口中无存留食物，再继续喂食。" v-model="form.yf4" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="10">
            <el-form-item prop="yf5">
              <el-checkbox  label="5.易发生误吸者，床头备压舌板、引器，协助患者头偏向一侧，及时清理口鼻分泌物。" v-model="form.yf5" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="10">
            <el-form-item prop="yf6">
              <el-checkbox  label="6.用麻醉药后，应暂禁食水。" v-model="form.yf6" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="10">
            <el-form-item prop="yf7">
              <el-checkbox  label="7.鼻饲前给予吸痰，鼻饲时取斜坡卧位，鼻饲后30分钟不易搬动。" v-model="form.yf7" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="10">
            <el-form-item prop="yf8">
              <el-checkbox  label="8.嗜睡者，唤醒病人后再进食。躁动者，禁止由口进食" v-model="form.yf8" true-label="1"/>
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
  import {getCokingList,addCoking} from '@/api/table'
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
          dangerLevel: 'Ⅲ级',
          content: '有呛咳现象',
          obj0: '',
          obj1: '',
          obj2: '',
          obj3: ''
        },
          {
            dangerLevel: 'Ⅲ级',
            content: '消化道大出血',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel: 'Ⅲ级',
            content: '吞咽功能障碍',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            dangerLevel: 'Ⅲ级',
            content: '曾有误吸史',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel: 'Ⅱ级',
            content: '剧烈呕吐',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel: 'Ⅱ级',
            content: '嗜睡',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel: 'Ⅱ级',
            content: '协助进食者',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel:'Ⅱ级',
            content: '癫痫、躁动',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            dangerLevel: 'Ⅱ级',
            content: '3岁以下、70岁以上',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            dangerLevel: 'Ⅱ级',
            content: '管饲饮食者',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            dangerLevel: 'Ⅰ级',
            content: '有呃逆现象',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel: 'Ⅰ级',
            content: '喉部喷洒麻醉药',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            dangerLevel: 'Ⅰ级',
            content: '剧烈咳嗽',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },{
            dangerLevel: '危险评级',
            content: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            dangerLevel: '预防措施',
            content: '1.年龄在3岁以下，70岁以上须有专人陪护，并告知相关注意事项。',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            dangerLevel: '预防措施',
            content: '2.有呛咳、呃逆现象时，注意观察程度，嘱少进流质食物，严重者停止口入食物，给予鼻饲饮食。',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            dangerLevel: '预防措施',
            content: '3.吞咽障碍者，嘱进食时速度要慢、不要与人对话。',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            dangerLevel: '预防措施',
            content: '4.协助喂食者，取半卧位，头偏向一侧，观察患者吞咽情况，确定口中无存留食物，再继续喂食。',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          }, {
            dangerLevel: '预防措施',
            content: '5.易发生误吸者，床头备压舌板、引器，协助患者头偏向一侧，及时清理口鼻分泌物。',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel: '预防措施',
            content: '6.用麻醉药后，应暂禁食水。',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel: '预防措施',
            content: '7.鼻饲前给予吸痰，鼻饲时取斜坡卧位，鼻饲后30分钟不易搬动。',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: ''
          },
          {
            dangerLevel: '预防措施',
            content: '8.嗜睡者，唤醒病人后再进食。躁动者，禁止由口进食。',
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
        getCokingList(this.formInline).then(response => {
          console.info(response);
          console.info(response.result.length);
          let data = response.result;
          console.log(data);
          data.forEach((item, index) => {
            let _obj = "obj" + index;
            this.tableData[0][_obj] = item.yqkxx === null||item.yqkxx=== "" ? null : "✔";
            this.tableData[1][_obj] = item.xhddcx === null||item.xhddcx === "" ? null : "✔";
            this.tableData[2][_obj] = item.tygnza === null||item.tygnza === "" ? null : "✔";
            this.tableData[3][_obj] = item.cywxs == null||item.cywxs === "" ? null : "✔";
            this.tableData[4][_obj] = item.jlot === null||item.jlot === "" ? null : "✔";
            this.tableData[5][_obj] = item.ss === null||item.ss === "" ? null : "✔";
            this.tableData[6][_obj] = item.xzjsz=== null||item.xzjsz=== "" ? null : "✔";
            this.tableData[7][_obj] = item.dxzd === null||item.dxzd === "" ? null : "✔";
            this.tableData[8][_obj] = item.nl === null||item.nl === "" ? null : "✔";
            this.tableData[9][_obj] = item.gsysz === null||item.gsysz === "" ? null : "✔";
            this.tableData[10][_obj] = item.yenxx === null||item.yenxx === "" ? null : "✔";
            this.tableData[11][_obj] = item.hbpsmzy=== null||item.hbpsmzy === "" ? null : "✔";
            this.tableData[12][_obj] = item.jlks === null||item.jlks === "" ? null : "✔";
            this.tableData[14][_obj] = item.yf1 === null||item.yf1 === "" ? null : "✔";
            this.tableData[15][_obj] = item.yf2 === null||item.yf2 === "" ? null : "✔";
            this.tableData[16][_obj] = item.yf3 === null||item.yf3 === "" ? null : "✔";
            this.tableData[17][_obj] = item.yf4 === null||item.yf4 === "" ? null : "✔";
            this.tableData[18][_obj] = item.yf5 === null||item.yf5 === "" ? null : "✔";
            this.tableData[19][_obj] = item.yf6 === null||item.yf6 === "" ? null : "✔";
            this.tableData[20][_obj] = item.yf7 === null||item.yf7 === "" ? null : "✔";
            this.tableData[21][_obj] = item.yf8 === null||item.yf8 === "" ? null : "✔";
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
        addCoking($form).then(() => {
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
