<template>
  <div class="app-container calendar-list-container">
    <h3 align="center">983医院住院患者跌倒/坠床、意外事件危险因素评估表</h3>
    <el-form :model="formInline" ref="formInline" label-width="100px" class="demo-ruleForm" size="mini" float="left">
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
      v-loading.body="listLoading"
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
        width="200">
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
    <!--<el-button size="small" type="success" @click="updateDanger()" disabled>修改</el-button>-->
    <el-button size="small" type="danger" @click="insertDanger()">新增</el-button>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="text-align: right;margin:20px 0;"
        :current-page.sync="formInline.page"
        :page-size="formInline.limit"
        :page-sizes="[10,20,30, 50]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="80%">
      <el-form :model="form" ref="form" label-width="100px" size="mini">
        <h4>项目（内容）：</h4>
        <el-row>
          <el-col  :span="8">
            <el-form-item prop="nl">
                <el-checkbox  label="【年龄】>75岁或<10岁" v-model="form.nl" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="8">
            <el-form-item prop="rzyc">
                <el-checkbox  label="【意识】认知异常" v-model="form.rzyc" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="8">
            <el-form-item prop="styc">
                <el-checkbox  label="【感觉】视觉、听力异常" v-model="form.styc" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="8">
          <el-form-item prop="zdzk">
              <el-checkbox  label="【精神】躁动、躁狂" v-model="form.zdzk" true-label="4" />
          </el-form-item>
        </el-col>
          <el-col  :span="8">
            <el-form-item prop="zdyyjl">
                <el-checkbox  label="【精神】重度抑郁、焦虑" v-model="form.zdyyjl" true-label="4" />
            </el-form-item>
          </el-col>
          <el-col  :span="8">
            <el-form-item prop="xyxz">
                <el-checkbox  label="【行动】需要协助（人或物）" v-model="form.xyxz" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="syyw">
                <el-checkbox  label="【药物】使用（利尿剂、镇痛剂、降压药、降糖药）" v-model="form.syyw" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="8">
            <el-form-item prop="ddzcs">
                <el-checkbox  label="【既往史】有跌倒、坠床史" v-model="form.ddzcs" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>措施预防：</h4>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="yf1">
              <el-checkbox  label="使用手腕带" v-model="form.yf1" true-label="1"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf2">
              <el-checkbox  label="使用保护性约束" v-model="form.yf2" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf3">
              <el-checkbox  label="按医嘱留家属陪护" v-model="form.yf3" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf4">
              <el-checkbox  label="落实相关护理记录" v-model="form.yf4" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="yf5">
              <el-checkbox  label="使用床档给予保护" v-model="form.yf5" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf6">
              <el-checkbox  label="使用相应的警示标牌" v-model="form.yf6" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf7">
              <el-checkbox  label="遵医嘱服药" v-model="form.yf7" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf8">
              <el-checkbox  label="告知有关注意事项" v-model="form.yf8" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
          <el-form-item prop="patientId">
            <el-input  type="hidden" v-model="form.patientId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item prop="visitId">
            <el-input  type="hidden" v-model="form.visitId" :disabled="true"></el-input>
          </el-form-item>
            <el-form-item prop="createTime">
              <el-input  type="hidden" v-model="form.createTime" :disabled="true"></el-input>
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
  import {getFallList, addFall,updateFall} from '@/api/table'

  var haha = "需要协助（人或物）";
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
          visitId:'1'
        },
        form:{
          patientId:'004',
          visitId:'1',
          createTime:'2019-08-06'
        },
        listLoading: true,
        total: null,
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
          content: '>75或<10岁',
          score: '1',
          obj0: '',
          obj1: '',
          obj2: '',
          obj3: '',
          obj4: '',
          obj5: ''
        },
          {
            project: '意识',
            content: '认知异常',
            score: '1',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          },
          {
            project: '感觉',
            content: '视觉、听觉异常',
            score: '1',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          },
          {
            project: '精神',
            content: '躁动、躁狂',
            score: '4',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          },
          {
            project: '精神',
            content: '重度抑郁、焦虑',
            score: '4',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          },
          {
            project: '行动',
            content: haha,
            score: '1',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          },
          {
            project: '药物',
            content: '使用（利尿剂、镇痛剂、降压药、降糖药）',
            score: '1',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          }, {
            project: '既往史',
            content: '有跌倒、坠床史',
            score: '1',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          }, {
            project: '得分',
            content: '',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          }, {
            project: '预防措施',
            content: '使用手腕带',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          }, {
            project: '预防措施',
            content: '使用保护性约束',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          }, {
            project: '预防措施',
            content: '按医嘱留家属陪护',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          }, {
            project: '预防措施',
            content: '落实相关护理记录',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          }, {
            project: '预防措施',
            content: '使用床档给予保护',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          }, {
            project: '预防措施',
            content: '使用相应的警示标牌',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          }, {
            project: '预防措施',
            content: '遵医嘱服药',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          }, {
            project: '预防措施',
            content: '告知有关注意事项',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          }, {
            project: '评估者签名',
            content: '',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          }, {
            project: '护士长签名',
            content: '',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
          },],
        projectArr: [],
        projectPos: 0,
      };
    },
    created() {
      this.projectQuery();
    },
    methods: {

      projectQuery() {
        this.listLoading = true;
        getFallList(this.formInline).then(response => {
          console.info(response);
          console.info(response.result.length);
          let data = response.result;
          data.forEach((item, index) => {
            let _obj = "obj" + index;
            this.tableData[0][_obj] = item.nl === null||item.nl === "" ? null : "✔";
            this.tableData[1][_obj] = item.rzyc === null||item.rzyc === "" ? null : "✔";
            this.tableData[2][_obj] = item.styc == null||item.styc === "" ? null : "✔";
            this.tableData[3][_obj] = item.zdzk === null||item.zdzk === ""  ? null : "✔";
            this.tableData[4][_obj] = item.zdyyjl === null||item.zdyyjl === "" ? null : "✔";
            this.tableData[5][_obj] = item.xyxz === null||item.xyxz === "" ? null : "✔";
            this.tableData[6][_obj] = item.syyw === null||item.syyw === "" ? null : "✔";
            this.tableData[7][_obj] = item.ddzcs === null||item.ddzcs === "" ? null : "✔";
            this.tableData[9][_obj] = item.yf1 === null||item.yf1 === "" ? null : "✔";
            this.tableData[10][_obj] = item.yf2 === null||item.yf2 === "" ? null : "✔";
            this.tableData[11][_obj] = item.yf3 === null||item.yf3 === "" ? null : "✔";
            this.tableData[12][_obj] = item.yf4 === null||item.yf4 === "" ? null : "✔";
            this.tableData[13][_obj] = item.yf5 === null||item.yf5 === "" ? null : "✔";
            this.tableData[14][_obj] = item.yf6 === null||item.yf6 === "" ? null : "✔";
            this.tableData[15][_obj] = item.yf7 === null||item.yf7 === "" ? null : "✔";
            this.tableData[16][_obj] = item.yf8 === null||item.yf8 === "" ? null : "✔";
            this.tableDate[_obj] = item.createTime;
            this.total= response.result.length;
            this.listLoading = false;
          });
        });
        for (var i = 0; i < this.tableData.length; i++) {
          if (i === 0) {
            this.projectArr.push(1);
            this.projectPos = 0;
          } else {
            if (this.tableData[i].project === this.tableData[i - 1].project) {
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
        if (columnIndex === 0) {
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
      //   getFallList(this.formInline).then(response => {
      //     console.info(response);
      //     this.form= response.result;
      //   });
      //   console.info("form"+this.form);
      // },
      create(formName){
        let $form =this.form ;
        addFall($form).then(() => {
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
      },
      handleCurrentChange(val) {
        this.formInline.page= val;
        this.projectQuery();
        console.info("ppppppp"+this.formInline.page)
      },
      handleSizeChange(val) {
        this.formInline.limit = val;
        this.projectQuery();
      },

    }
  }
</script>
