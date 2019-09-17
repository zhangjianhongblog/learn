<template>
  <div>
    <div class="block">
      <span class="demonstration"  style="margin-left: 5%">开始时间：</span>
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
    <el-button type="primary" icon="el-icon-search">查询</el-button>
    <el-link type="primary">今日</el-link>
    <el-link type="primary">昨日</el-link>
    <el-link type="primary">近7天</el-link>
    <el-link type="primary">近30天</el-link>
    <el-row>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }" class="out">
          <el-row>
            <el-col :span="4" v-for="item of tableName">
              <el-card :body-style="{ padding: '0px' }" class="inner" v-bind:class="item.color">
                <img :src="item.src" class="image">
                <span>{{ item.name }}</span><br><br>
                <span>120</span><br><br>
                <span>{{ item.time }}</span>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }" class="out">
          <div id="main2" style="width: 600px;height: 250px;"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }" class="out">
          <div id="main1" style="width: 600px;height: 250px;"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }" class="out">
          <div id="main" style="width: 600px;height: 250px;">
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    data(){
      return{
        startDate_patient:'',
        endDate_patient:'',
        tableName:[
          {name:'病人总数', src:require('../../assets/dashboard/u55.png'),color:'lan',time:'2019-08-17'},
          {name:'评估单填写总数', src:require('../../assets/dashboard/u59.png'),color:'chen',time:'2019-08-17'},
          {name:'入院总人数', src:require('../../assets/dashboard/u73.png'),color:'huang',time:'2019-08-17'},
          {name:'出院总人数', src:require('../../assets/dashboard/u83.png'),color:'lv',time:'2019-08-17'},
        ],
        charts: '',
        opinion:['男','女'],
        opinionData:[
          {value:335, name:'男'},
          {value:310, name:'女'},

        ],
      }
    },
    methods:{
      drawLine_dept() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('main2'))
        // 绘制图表
        myChart.setOption({
          title: {text: '各科室填写评估单数量统计',left: 'center'},
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        })
      },
      drawLine_sheet() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('main1'))
        // 绘制图表
        myChart.setOption({
          title: {text: '各评估单填写数量统计',left: 'center'},
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        })
      },
      drawPie(id){
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption(
          {
          tooltip: {
            trigger: 'item',

          },
          title: {
              text: '各科室病人数量占比', // 标题文本
              left: 'center'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:this.opinion
          },
          series: [
            {
              name:'性别',
              type:'pie',
              radius:['50%','70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'blod'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:this.opinionData
            }
          ]
        })
      }
    },
    //调用
    mounted(){
      this.$nextTick(function() {
        this.drawPie('main');
        this.drawLine_dept();
        this.drawLine_sheet();
      })
    }
  }
</script>

<style scoped>
  .inner{
    width: 200px;
    height: 115px;
  }
  .image {
    width: 52%;
    margin-right: 5%;
  }
  .lan{
    background-color: #5bd1f3;
  }
  .chen{
    background-color: #f3b91a;
  }
  .huang{
    background-color: #f3f24e;
  }
  .lv{
    background-color: #60f311;
  }
  .out{
    width: 100%;
    height: 40%;
  }
  .el-card{
    text-align: center;
  }
  .block{
    display:inline;
  }
  .el-link{
    font-size: large;
  }
  .item{
    display:inline;
  }
  .el-col{
    margin-left: 5%;
    margin-top: 10px;
    display:inline;
    width: 40%;
    height: 40%;
  }
  .image {
    margin-right: 5%;
    float: left;
  }
</style>
