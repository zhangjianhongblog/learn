<template>
  <div class="app-container calendar-list-container">
    <h3 align="center">254医院高危人群压疮评估表</h3>
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
      <h5>压疮发生危险因素基本条件评估(申请难免压疮必须符合以下条件4项或4项以上者，请在相应条目前打钩。</h5>
      <el-row>
        <el-col :span="6">
          <el-form-item prop="qptw">
            <el-checkbox  label="强迫体位，严格限制翻身 " v-model="formInline.qptw" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="smtzbwd">
            <el-checkbox  label="生命体征不稳定 " v-model="form.smtzbwd" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col  :span="6">
          <el-form-item prop="yyqf">
            <el-checkbox  label="营养缺乏白蛋白≤30g/L" v-model="form.yyqf" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col  :span="6">
          <el-form-item prop="hm">
            <el-checkbox  label="昏迷 意识淡漠  " v-model="form.hm" true-label="1"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item prop="gl">
            <el-checkbox  label="高龄或≥75岁" v-model="formInline.gl" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="gpgz">
            <el-checkbox  label="骨盆骨折" v-model="form.gpgz" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col  :span="6">
          <el-form-item prop="hd3">
            <el-checkbox  label="xlsj " v-model="form.xlsj" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col  :span="6">
          <el-form-item prop="sgnxj">
            <el-checkbox  label="肾功能衰竭 " v-model="form.sgnxj" true-label="1"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item prop="cpxl">
            <el-checkbox  label="床旁血滤" v-model="formInline.cpxl" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="dxbsj">
            <el-checkbox  label="大小便失禁" v-model="form.dxbsj" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col  :span="6">
          <el-form-item prop="hxsj">
            <el-checkbox  label="呼吸衰竭" v-model="form.hxsj" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col  :span="6">
          <el-form-item prop="hxjfz">
            <el-checkbox  label="呼吸机辅助" v-model="form.hxjfz" true-label="1"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item prop="jzpt">
            <el-checkbox  label="截肢、偏瘫" v-model="formInline.jzpt" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="gdsz">
            <el-checkbox  label="高度水肿" v-model="form.gdsz" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col  :span="6">
          <el-form-item prop="dxwl">
            <el-checkbox  label="代谢紊乱" v-model="form.dxwl" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col  :span="6">
          <el-form-item prop="tnb">
            <el-checkbox  label="糖尿病" v-model="form.tnb" true-label="1"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item prop="yw">
            <el-checkbox  label="药物:镇静剂/类固醇" v-model="formInline.yw" true-label="1"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="qtzyzqsj">
            <el-checkbox  label="其他重要脏器衰竭" v-model="form.qtzyzqsj" true-label="1"/>
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
        <el-table-column
          prop="obj6"
          align="right"
          header-align="center"
          :label="tableDate.obj6">
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
            <el-form-item prop="gjwxss">
              <el-checkbox  label="【感觉】完全丧失" v-model="form.gjwxss" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="gjyzss">
              <el-checkbox  label="【感觉】严重丧失" v-model="form.gjyzss" true-label="2"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="gjqdsh">
              <el-checkbox  label="【感觉】轻度损害" v-model="form.gjqdsh" true-label="3"/>
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="gjwssh">
              <el-checkbox  label="【感觉】未受损害" v-model="form.gjwssh" true-label="4"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="6">
            <el-form-item prop="cjcs">
              <el-checkbox  label="【潮湿】持久潮湿" v-model="form.cjcs" true-label="1" />
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="sfcs">
              <el-checkbox  label="【潮湿】十分潮湿" v-model="form.sfcs" true-label="2" />
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="oecs">
              <el-checkbox  label="【潮湿】偶尔潮湿" v-model="form.oecs" true-label="3" />
            </el-form-item>
          </el-col>
          <el-col  :span="6">
            <el-form-item prop="hscs">
              <el-checkbox  label="【潮湿】很少潮湿" v-model="form.hscs" true-label="4" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="wcbq">
              <el-checkbox  label="【活动情况】卧床不起" v-model="form.wcbq" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="jxyy">
              <el-checkbox  label="【活动情况】局限于椅" v-model="form.jxyy" true-label="2"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="fzxd">
              <el-checkbox  label="【活动情况】辅助行动" v-model="form.fzxd" true-label="3"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="hdsx">
              <el-checkbox  label="【活动情况】活动受限" v-model="form.hdsx" true-label="4"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="xdwqbn">
              <el-checkbox  label="【行动能力】完全不能" v-model="form.xdwqbn" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="xdyzxz">
              <el-checkbox  label="【行动能力】严重限制" v-model="form.xdyzxz" true-label="2"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="xdqdxz">
              <el-checkbox  label="【行动能力】轻度限制" v-model="form.xdqdxz" true-label="3"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="xdbsxz">
              <el-checkbox  label="【行动能力】不受限制" v-model="form.xdbsxz" true-label="4"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="yyyzbl">
              <el-checkbox  label="【营养】严重不良" v-model="form.yyyzbl" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yybl">
              <el-checkbox  label="【营养】不良" v-model="form.yybl" true-label="2"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yyzd">
              <el-checkbox  label="【营养】中等" v-model="form.yyzd" true-label="3"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yylh">
              <el-checkbox  label="【营养】良好" v-model="form.yylh" true-label="4"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="mcjqy">
              <el-checkbox  label="【摩擦力和剪切力】有" v-model="form.mcjqy" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="mcjqqz">
              <el-checkbox  label="【摩擦力和剪切力】潜在危险" v-model="form.mcjqqz" true-label="2"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="mcjqw">
              <el-checkbox  label="【摩擦力和剪切力】无" v-model="form.mcjqw" true-label="3"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h4>压疮措施预防：</h4>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="yf1">
              <el-checkbox  label="避免压力和摩擦力" v-model="form.yf1" true-label="1"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf2">
              <el-checkbox  label="保持皮肤清洁、干燥、及时清洗" v-model="form.yf2" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf3">
              <el-checkbox  label="给予应用气垫床" v-model="form.yf3" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf4">
              <el-checkbox  label="2h更换尿不湿一次" v-model="form.yf4" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="yf5">
              <el-checkbox  label="给予减压用具" v-model="form.yf5" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf6">
              <el-checkbox  label="洗澡每周一次" v-model="form.yf6" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf7">
              <el-checkbox  label="保持30°侧卧位" v-model="form.yf7" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf8">
              <el-checkbox  label="擦浴至少每日一次" v-model="form.yf8" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="yf9">
              <el-checkbox  label="2h更换一次体位" v-model="form.yf9" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf10">
              <el-checkbox  label="移动病人时采取抬举方式" v-model="form.yf10" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf11">
              <el-checkbox  label="使用不沾水的喷雾剂" v-model="form.yf11" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="yf12">
              <el-checkbox  label="座椅时坐姿90°15分钟运动一次" v-model="form.yf12" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf13">
              <el-checkbox  label="使用皮肤透明贴" v-model="form.yf13" true-label="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="yf14">
              <el-checkbox  label="坐姿不长于1h，同时使用减压用具" v-model="form.yf14" true-label="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="yf15">
              <el-checkbox  label="加强营养，采取适当的营养支持措施" v-model="form.yf15" true-label="1"/>
            </el-form-item>
          </el-col>
            <el-col :span="6">
              <el-form-item prop="yf16">
                <el-checkbox  label="保持床单和衣裤清洁、干燥、舒适" v-model="form.yf16" true-label="1"/>
              </el-form-item>
            </el-col>
          <el-col :span="6">
            <el-form-item prop="yf17">
              <el-checkbox  label="经口进食 □鼻饲" v-model="form.yf17" true-label="1"/>
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
  import {getPressureList,addPressure} from '@/api/table'
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
          obj5: '',
          obj6: ''
        },
        tableData: [{
          project: '感  觉',
          content: '完全丧失',
          score: '1',
          obj0: '',
          obj1: '',
          obj2: '',
          obj3: '',
          obj4: '',
          obj5: '',
          obj6: ''
        },
          {
            project: '感  觉',
            content: '严重丧失',
            score: '2',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },
          {
            project: '感觉',
            content: '轻度损害',
            score: '3',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },
          {
            project: '感觉',
            content: '未受损害',
            score: '4',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },
          {
            project: '潮湿',
            content: '持久潮湿',
            score: '1',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '潮湿',
            content: '十分潮湿',
            score: '2',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '潮湿',
            content: '偶尔潮湿',
            score: '3',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '潮湿',
            content: '很少潮湿',
            score: '4',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },
          {
            project: '活动情况',
            content: '卧床不起',
            score: '1',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '活动情况',
            content: '局限于椅',
            score: '2',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '活动情况',
            content: '辅助行动',
            score: '3',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '活动情况',
            content: '活动受限',
            score: '4',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },
          {
            project: '行动能力',
            content: '完全不能',
            score: '1',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '行动能力',
            content: '严重限制',
            score: '2',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '行动能力',
            content: '轻度限制',
            score: '3',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '行动能力',
            content: '不受限制',
            score: '4',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          }, {
            project: '营养',
            content: '严重不良',
            score: '1',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          }, {
            project: '营养',
            content: '不良',
            score: '2',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '营养',
            content: '中等',
            score: '3',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '营养',
            content: '良好',
            score: '4',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '摩擦力和剪切力',
            content: '有',
            score: '1',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '摩擦力和剪切力',
            content: '潜在危险',
            score: '2',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '摩擦力和剪切力',
            content: '无',
            score: '3',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '得分',
            content: '',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          }, {
            project: '压疮预防措施',
            content: '避免压力和摩擦力',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          }, {
            project: '压疮预防措施',
            content: '保持皮肤清洁、干燥、及时清洗',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          }, {
            project: '压疮预防措施',
            content: '给予应用气垫床',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          }, {
            project: '压疮预防措施',
            content: '2h更换尿不湿一次',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          }, {
            project: '压疮预防措施',
            content: '给予减压用具',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          }, {
            project: '压疮预防措施',
            content: '洗澡每周一次',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          }, {
            project: '压疮预防措施',
            content: '保持30°侧卧位',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          }, {
            project: '压疮预防措施',
            content: '擦浴至少每日一次',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '压疮预防措施',
            content: '2h更换一次体位',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '压疮预防措施',
            content: '移动病人时采取抬举方式',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '压疮预防措施',
            content: '使用不沾水的喷雾剂',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '压疮预防措施',
            content: '座椅时坐姿90°15分钟运动一次',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '压疮预防措施',
            content: '使用皮肤透明贴',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '压疮预防措施',
            content: '坐姿不长于1h，同时使用减压用具',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '压疮预防措施',
            content: '加强营养，采取适当的营养支持措施',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '压疮预防措施',
            content: '保持床单和衣裤清洁、干燥、舒适',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
          },{
            project: '压疮预防措施',
            content: '经口进食   □鼻饲',
            score: '',
            obj0: '',
            obj1: '',
            obj2: '',
            obj3: '',
            obj4: '',
            obj5: '',
            obj6: ''
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
            obj6: ''
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
            obj6: ''
          },],
        projectArr: [],
        projectPos: 0

      };
    },
    created() {
      this.projectQuery();
    },
    methods: {

      projectQuery() {
        getPressureList(this.formInline).then(response => {
          console.info(response);
          console.info(response.result.length);
          let data = response.result;
          console.log(data);
          data.forEach((item, index) => {
            let _obj = "obj" + index;
            this.tableData[0][_obj] = item.gjwxss === null||item.gjwxss === "" ? null : "✔";
            this.tableData[1][_obj] = item.gjyzss === null||item.gjyzss === "" ? null : "✔";
            this.tableData[2][_obj] = item.gjqdsh == null||item.gjqdsh === "" ? null : "✔";
            this.tableData[3][_obj] = item.gjwssh === null||item.gjwssh === ""  ? null : "✔";
            this.tableData[4][_obj] = item.cjcs === null||item.cjcs === "" ? null : "✔";
            this.tableData[5][_obj] = item.sfcs === null||item.sfcs === "" ? null : "✔";
            this.tableData[6][_obj] = item.oecs === null||item.oecs === "" ? null : "✔";
            this.tableData[7][_obj] = item.hscs === null||item.hscs === "" ? null : "✔";
            this.tableData[8][_obj] = item.wcbq === null||item.wcbq === ""  ? null : "✔";
            this.tableData[9][_obj] = item.jxyy === null||item.jxyy === "" ? null : "✔";
            this.tableData[10][_obj] = item.fzxd === null||item.fzxd === "" ? null : "✔";
            this.tableData[11][_obj] = item.hdsx === null||item.hdsx === "" ? null : "✔";
            this.tableData[12][_obj] = item.xdwqbn === null||item.xdwqbn === "" ? null : "✔";
            this.tableData[13][_obj] = item.xdyzxz === null||item.xdyzxz === "" ? null : "✔";
            this.tableData[14][_obj] = item.xdqdxz === null||item.xdqdxz === ""  ? null : "✔";
            this.tableData[15][_obj] = item.xdbsxz === null||item.xdbsxz === "" ? null : "✔";
            this.tableData[16][_obj] = item.yyyzbl === null||item.yyyzbl === "" ? null : "✔";
            this.tableData[17][_obj] = item.yybl === null||item.yybl === "" ? null : "✔";
            this.tableData[18][_obj] = item.yyzd === null||item.yyzd === "" ? null : "✔";
            this.tableData[19][_obj] = item.yylh === null||item.yylh === "" ? null : "✔";
            this.tableData[20][_obj] = item.mcjqy === null||item.mcjqy === "" ? null : "✔";
            this.tableData[21][_obj] = item.mcjqqz === null||item.mcjqqz === "" ? null : "✔";
            this.tableData[22][_obj] = item.mcjqw === null||item.mcjqw === "" ? null : "✔";
            this.tableData[24][_obj] = item.yf1 === null||item.yf1 === "" ? null : "✔";
            this.tableData[25][_obj] = item.yf2 === null||item.yf2 === "" ? null : "✔";
            this.tableData[26][_obj] = item.yf3 === null||item.yf3 === "" ? null : "✔";
            this.tableData[27][_obj] = item.yf4 === null||item.yf4 === "" ? null : "✔";
            this.tableData[28][_obj] = item.yf5 === null||item.yf5 === "" ? null : "✔";
            this.tableData[29][_obj] = item.yf6 === null||item.yf6 === "" ? null : "✔";
            this.tableData[30][_obj] = item.yf7 === null||item.yf7 === "" ? null : "✔";
            this.tableData[31][_obj] = item.yf8 === null||item.yf8 === "" ? null : "✔";
            this.tableData[32][_obj] = item.yf9 === null||item.yf9 === "" ? null : "✔";
            this.tableData[33][_obj] = item.yf10=== null||item.yf10 === "" ? null : "✔";
            this.tableData[34][_obj] = item.yf11 === null||item.yf11 === "" ? null : "✔";
            this.tableData[35][_obj] = item.yf12 === null||item.yf12 === "" ? null : "✔";
            this.tableData[36][_obj] = item.yf13 === null||item.yf13 === "" ? null : "✔";
            this.tableData[37][_obj] = item.yf14 === null||item.yf14 === "" ? null : "✔";
            this.tableData[38][_obj] = item.yf15 === null||item.yf15 === "" ? null : "✔";
            this.tableData[39][_obj] = item.yf16 === null||item.yf16 === "" ? null : "✔";
            this.tableData[40][_obj] = item.yf17 === null||item.yf17 === "" ? null : "✔";
            this.tableDate[_obj] = item.createTime;
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
      // },
      create(formName){
        let $form = this.form;
        addPressure($form).then(() => {
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
