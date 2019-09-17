<template>
  <div class="app-container calendar-list-container">
    <div>
      <h2 align="center" style="margin-top: 0px">983医院住院患者疼痛评估记录单</h2>
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
    </div>
    <h4 style="margin-left: 20px">选择疼痛评分方法：</h4>
    <el-row>
    <el-checkbox style="margin-left: 20px" label="面部表情评分法：（faces  pain  scale,FPS）适用于儿童" v-model="mbbqpf" true-label="1"/>
    </el-row>
    <el-row>
    <img style="margin-left: 100px" src="../../../assets/pain/biaoqing.png">
    </el-row>
    <el-row>
      <el-checkbox style="margin-left: 20px" label="数字评分法（numeric  rating  scale,NRS）适用于成人（参照疼痛尺）" v-model="szpf" true-label="1"/>
    </el-row>
    <el-row>
      <img style="margin-left: 100px" src="../../../assets/pain/biaochi.png">
    </el-row>
    <el-row :gutter="50">
      <el-col :span="21">
        <line-chart></line-chart>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        label="评估时间"
        prop="time">
      </el-table-column>
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
        <el-table-column
          prop="obj6"
          align="right"
          header-align="center"
          :label="tableDate.obj6">
        </el-table-column>
    </el-table>
    <h4 style="margin-left: 20px">备注：</h4>
    <h5 style="margin-left: 40px">1. 疼痛分值≥5分时每4小时评估1次；疼痛分值＜5分时每班评估1次。</h5>
    <h5 style="margin-left: 40px">2．疼痛性质（记录在护理记录中）：</h5>
    <h5 style="margin-left: 100px">A &nbsp;赤痛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B&nbsp;灼痛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;绞痛/抽搐痛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D胀痛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E&nbsp;刺痛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F&nbsp;如触电</h5>
    <h5 style="margin-left: 100px">G 麻痹痛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;H 如针刺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I 扯住痛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;J 发射痛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;K 电击痛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L锐痛/刺痛</h5>
    <h5 style="margin-left: 100px"> M“拿”住痛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;N 刀刺痛/如刀割&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O 搏动性疼痛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;P 闷痛/隐隐作痛/酸痛</h5>
    <h5 style="margin-left: 40px">3. 护理措施（记录在护理记录中）：</h5>
    <h5 style="margin-left: 100px">①采取舒适卧位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;②保持环境安静舒适&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;③听音乐、分散注意力等</h5>
    <h5 style="margin-left:100px">④遵医嘱给予药物，并观察用药后反应 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⑤去除诱因&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⑥ 其他              	</h5>
    <!--<el-button size="small" type="success" @click="updateDanger()">修改</el-button>-->
    <el-button size="small" type="danger" @click="insertDanger()">新增</el-button>

    <el-dialog :visible.sync="dialogVisible" width="60%">
      <el-form :model="form" ref="form" label-width="200px" align="center">
        <el-form-item label="时间"  prop="time1">
          <span align="center">疼痛评分</span>
        </el-form-item>
        <el-form-item label="00:00"  prop="time1">
          <el-select v-model="form.time1" placeholder="10">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="04:00"  prop="time2">
        <el-select v-model="form.time2" placeholder="10">
          <el-option
            v-for="item in options1"
            :key="item.value1"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="08:00"  prop="time3">
        <el-select v-model="form.time3" placeholder="10">
          <el-option
            v-for="item in options2"
            :key="item.value2"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="12:00"  prop="time4">
          <el-select v-model="form.time4" placeholder="10">
            <el-option
              v-for="item in options3"
              :key="item.value3"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="16:00"  prop="time5">
          <el-select v-model="form.time5" placeholder="10">
            <el-option
              v-for="item in options4"
              :key="item.value4"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="20:00"  prop="time6">
          <el-select v-model="form.time6" placeholder="10">
            <el-option
              v-for="item in options5"
              :key="item.value5"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
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
    import lineChart from './lineChart';
  import {addPain} from '@/api/table'
    // import {
    //   forDefectStatistics
    // } from 'api/hqms/statistics/defect/index';
    export default {
      name: 'defect',
      components: {  lineChart },
      data() {
        return {
          dialogVisible: false,
          formInline: {
            page: 0,
            limit: 20,
            patientId: '001',
            visitId: '1',
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
            obj4:'',
            obj5:'',
            obj6:''
          },
          options: [{
            value: '10',
            label: '10'
          }, {
            value: '9',
            label: '9'
          },{
            value: '8',
            label: '8'
          }],
          options1: [{
            value: '10',
            label: '10'
          }, {
            value: '9',
            label: '9'
          }],
          options2: [{
            value: '10',
            label: '10'
          }, {
            value: '9',
            label: '9'
          }],
          options3: [{
            value: '10',
            label: '10'
          }, {
            value: '9',
            label: '9'
          }],
          options4: [{
            value: '10',
            label: '10'
          }, {
            value: '9',
            label: '9'
          }],
          options5: [{
            value: '10',
            label: '10'
          }, {
            value: '9',
            label: '9'
          }],
          time1:'10',
          time2:'10',
          time3:'10',
          time4:'10',
          time5:'10',
          time6:'10',
          mbbqpf:null,
          szpf:null,
          tableData: [{
            time: '白班(护士签名)',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4:'',
            obj5:'',
            obj6:''
          },
            {
              time: '夜班(护士签名)',
              obj0: '',
              obj1: '',
              obj2: '',
              obj3: '',
              obj4:'',
              obj5:'',
              obj6:''
            }],
        }
      },
      methods: {
        insertDanger() {
          this.dialogVisible = true;
        },
        // updateDanger() {
        //   this.dialogVisible = true;
        // },
        create(formName){
          let $form = this.form;
          addPain($form).then(() => {
            this.$notify({
              title: '成功',
              message: '处理成功',
              type: 'success',
              duration: 2000,
            });
            this.dialogVisible = false;
            this.$refs[formName].resetFields();
          })
            console.log($form);
        },
        onCancel(formName) {
          this.dialogVisible = false;
          this.$refs[formName].resetFields();
        }
      }
    }
  </script>

