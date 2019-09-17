<template>
  <div>
    <span>当前范围：</span><span>{{ deptName_patient }}</span>
    <span>已填总数：</span><span>{{ total_patient }}</span>
    <div class="block">
      <span class="demonstration">开始时间：</span>
      <el-date-picker
        v-model="startDate_patient"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">结束时间：</span>
      <el-date-picker
        v-model="endDate_patient"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="4" class="velcol" v-for="item of tableName" :key="o" :offset="index > 0 ? tableName.length : 0">
        <el-card :body-style="{ padding: '0px'}">
          <img :src="item.src" class="image">
          <p style="color: #1482f0 ;font-size: large">{{ item.name }}</p>
          <p v-if="Math.random() > 0.5" style="color: #120df0">已填</p>
          <p v-else style="color: #f0080a">未填</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          deptName_patient:'科室名称',
          total_patient:'总数',
          startDate_patient:'',
          endDate_patient:'',
          tableName:[
            {name:'不良事件上报表', src:require('../../../assets/assessmentSheet_images/u450.png')},
            {name:'跌倒坠床评估表', src:require('../../../assets/assessmentSheet_images/u526.png')},
            {name:'管道滑脱评估表', src:require('../../../assets/assessmentSheet_images/u528.png')},
            {name:'管道滑脱上报表', src:require('../../../assets/assessmentSheet_images/u530.png')},
            {name:'护理安全风险告知书', src:require('../../../assets/assessmentSheet_images/u532.png')},
            {name:'输血不良反应告知单', src:require('../../../assets/assessmentSheet_images/u534.png')},
            {name:'输液外渗评估表', src:require('../../../assets/assessmentSheet_images/u536.png')},
            {name:'烫伤评估表', src:require('../../../assets/assessmentSheet_images/u538.png')},
            {name:'疼痛评估表', src:require('../../../assets/assessmentSheet_images/u540.png')},
            {name:'误吸评估表', src:require('../../../assets/assessmentSheet_images/u542.png')},
            {name:'压疮报告表', src:require('../../../assets/assessmentSheet_images/u544.png')},
            {name:'压疮评估单', src:require('../../../assets/assessmentSheet_images/u546.png')},
            {name:'自理能力评估表', src:require('../../../assets/assessmentSheet_images/u548.png')},
          ],
        }
      }
    }
</script>

<style scoped>
.block{
  display:inline;
}
.velcol{
  margin-left: 4%;
  margin-top: 2%;

}
.image {
  width: 60%;
  margin-right: 5%;
}
.el-card{
  background-color: #5bd1f3;
  text-align: center;
}
</style>
