<template>
  <div class="app-container calendar-list-container">
    <h3 align="center">983医院护理安全风险告知书</h3>
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
          <el-form-item label="住院号" prop="idNo">
            <el-input v-model="formInline.idNo" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="line-height: 32px">尊敬的患者、家属（或委托人）：<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在我们对病人实施医疗护理的过程中，可能会遇到一些无法预测或无法避免的风险，为此院方有
    义务向您加以说明。如您已清楚并同意护士告知内容，请在相应位置签名。<br></div>

    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="项目"
      header-align="center"
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="告知内容"
      header-align="center"
      width="1160">
    </el-table-column>

  </el-table>
<br>
    <div style="position: relative;left:50px;display: inline-block">以上告知事项已知晓，签名：<el-input v-model="formInline.dept" :disabled="true" style="width:100px"></el-input></div>
    <div style="display: inline-block;float: right;position: relative;right:15%">与患者关系：<el-input v-model="formInline.dept" :disabled="true" style="width:100px"></el-input></div><br><br>
    <div style="display: inline-block;float: right;position: relative;right:15%">告知护士签名：<el-input v-model="formInline.dept" :disabled="true" style="width:100px"></el-input></div><br><br><br>
    <div style="display: inline-block;float: right;position: relative;right:5%">年&nbsp;<el-input v-model="formInline.dept" :disabled="true" style="width:100px"></el-input>&nbsp;月&nbsp;<el-input v-model="formInline.dept" :disabled="true" style="width:100px"></el-input>&nbsp;日&nbsp;<el-input v-model="formInline.dept" :disabled="true" style="width:100px"></el-input></div><br><br>

  </div>
</template>

<script>

  var haha = "需要协助（人或物）";
  // import {
  //   forDefectStatistics
  // } from 'api/hqms/statistics/defect/index';
  export default {
    name: 'defect',
    data() {
      return {
        formInline:{},
        tableData:[
      {
        date: '静脉输液\n' +
              '外渗风险\n',
        name: '1.在使用高浓度电解质制剂 、肌肉松弛剂、化疗药物时，可能会出现静脉炎性反应和输液\n' +
          '不良反应，请将您的不适及时告知当班医护人员。\n' +
          '2.输液时，护理人员会按照医嘱要求调节滴速，请不要自行调节输液速度。\n' +
          '3.对于儿童、意识障碍者要加强观察和看护，输入高危药物时出现局部疼痛有可能出现外渗\n' +
          '的危险，如出现异常情况，及时告知当班护士按外渗处理。\n' +
          '4.做好拔针后护理：输液完毕迅速用棉签沿血管方向按压穿刺点及上方5--10min。切忌在按压处来回揉动，防止皮下淤血和再次输液时发生渗漏。\n' +
          '5.躁动患者应用约束带固定。\n',

      },
          {
            date:'跌倒/坠床\n' +
              '意外事件发生发生危险\n'
            ,
            name: '1.选择合适的裤子（不要过长），并穿防滑鞋，切勿赤脚。\n' +
              '2.湿性拖地后避免不必要的走动，地面弄湿时，请告知护理人员，以防不慎跌倒。\n' +
              '3.睡觉时请您将床档拉起，若需下床，先将床档放下，切勿翻越，离床活动时应有人陪护。\n' +
              '4.当您有服用安眠药或感头晕，血压不稳时，下床前先坐于床缘，再由照顾者扶下床。\n' +
              '5.如您在行走时出现头晕、双眼发黑，下肢无力、步态不稳和不能移动时，立即原地坐（蹲）\n' +
              '下或靠墙，呼叫他人帮助。\n' +
              '6.改变体位应遵守“三部曲”即平卧30秒、坐起30秒、站立30秒，再行走，避免突然改变体位，尤其是在夜间。\n' +
              '7.请您尽量将常用的物品放置在随手易取之处，其它物品收纳于柜内，以保持通道宽敞。当\n' +
              '您需要任何协助而无家属在身旁，请立即以呼叫器通知医护人员。\n' +
              '8.使用浴厕时要有家属陪伴，遇有紧急情况时，请按厕所内应急红色按钮通知医护人员。\n' +
              '9.使用轮椅、平车时，在上车、上轮椅或上床时，都要先确定锁好轮子，防止滑动。\n' +
              '10.当患者有躁动、不安、意识不清时，请患者家属务必将床档拉起，并予以约束保护。\n' +
              '11.家属您有事要短时外出，请务必告知护士，不要让病人单独活动、独处或离开你的视线。\n' +
              '12.病房内应尽量保持光线明亮。\n',

          },
          {
            date: '压疮发生\n' +
              '危险\n',
            name: '重危、昏迷、消瘦、低蛋白、水肿、长期卧床、特大手术、高龄、截瘫和采取强迫体位的患者，是压疮的易发人群，在医护人员已采取预防措施的情况下，仍存在发生压疮的危险，请积极配合医护人员，尽量避免压疮的发生。',

          },
          {
            date: '导管滑脱\n' +
              '危险\n',
            name: '由于翻身、活动、导管多、精神等因素的影响，可能导致患者有导管滑脱的危险，医护人员会采取相应的安全防护、约束措施、请家属配合、谅解并加强陪护。',

          },
          {
            date: '吸痰风险',
            name: '吸痰是清除呼吸道分泌物，保持呼吸道通畅的有效措施，医护人员会严格按照流程规范地操\n' +
              '作，但仍可能会发生粘膜受损、缺氧、窒息等情况，希望得到您的配合与谅解。\n',

          },
          {
            date: '预防误吸/\n' +
              '窒息措施\n',
            name: '1.年龄在3岁以下70岁以上病员须有专人陪护。\n' +
              '2.有呛咳、呃逆现象时，要少进流质食物严重者停止口入食物。 \n' +
              '3.吞咽障碍者，进食时速度要慢。需要喂食者，取半卧位，头偏向一侧，观察患者吞咽情况，确定口中无存留食物，再继续喂食。\n' +
              '4.易发生误吸者，要将患者头偏向一侧，及时清理口鼻分泌物。\n' +
              '5.使用麻醉药物后，应当禁食水。\n' +
              '6.鼻饲前要给予吸痰，鼻饲时取斜坡卧位，鼻饲后30分钟内不宜搬动。\n' +
              '7.对于嗜睡者一定要唤醒病人后再进食；躁动者禁止经口进食。\n',

          },
          {
            date: '预防烫伤\n' +
              '措施\n',
            name: '1.禁用玻璃瓶热敷保暖，感觉迟钝、昏迷、截瘫患者不要用热水袋保温。\n' +
              '2.老人、婴幼儿、循环不良患者，使用热水袋时不能直接贴于皮肤、灌水1∕3满、水温要\n' +
              '低于50°C。皮肤潮红、疼痛时立即停止使用。\n' +
              '3.糖尿病患者泡脚水温＜40℃，时间＜15分钟。\n' +
              '4.用热水袋外敷时要每半小时检查一次热敷部位皮肤、热水袋温度、有无漏水等。\n' +
              '5.鼻饲温度38-40°C。\n',

          },
          {
            date: '其他',
            name: '',

          },
      ]
        }
      }
    }

  </script>
