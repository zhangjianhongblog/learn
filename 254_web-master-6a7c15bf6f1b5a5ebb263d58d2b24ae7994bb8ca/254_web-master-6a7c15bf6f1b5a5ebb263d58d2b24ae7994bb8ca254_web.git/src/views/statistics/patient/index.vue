<template>
  <div>
    <span>当前范围：</span><span>{{ deptName }}</span>
    <span>病人总数：</span><span>{{ total }}</span>
    <span>男：</span><span>{{ man }}</span>
    <span>女：</span><span>{{ girl }}</span>
    <span>排序：</span>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-row>
      <el-col :span="4" class="velcol" v-for="(o, index) in counts" :key="o" :offset="index > 0 ? counts : 0">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <img v-if="Math.random() > 0.5" src="../../../assets/patient_image/woman.png" class="image">
            <img v-else src="../../../assets/patient_image/man.png" class="image">
            <span>住院号：</span><span>住院号</span><br>
            <span>姓名：</span><span>姓名</span><br>
            <span>性别：</span><span>性别</span>
            <span>年龄：</span><span>年龄</span><br>
            <span>科室：</span><span>科室</span>
            <span>床号：</span><span>床号</span><br>
            <span>诊断情况：</span><span>诊断情况</span><br>
            <span>入院情况：</span><span>入院情况</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<style>

  .image {
    width: 40%;
    display: block;
    float: left;
    margin-right: 4%;
  }
  .velcol{
    margin-left: 5%;
    margin-top: 2%;
  }

</style>

<script>
  export default {
    data() {
      return {
        deptName:'骨科',
        6:100,
        man:20,
        girl:80,
        options: [{
          value: '0',
          label: '住院号'
        }, {
          value: '1',
          label: '床号'
        }],
        value:'0',
        currentDate: new Date(),
        counts:8,
        man_image:"../../../assets/assessmentSheet_images/woman.png",
        woman_image:"../../../assets/assessmentSheet_images/man.png",
      };
    },
    mounted(){

    },
  }
</script>
