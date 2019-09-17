<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  // import { debounce } from 'utils';

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        chart: null
      };
    },
    mounted() {
      this.initChart();
      if (this.autoResize) {
        this.__resizeHanlder = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHanlder)
      }

      // 监听侧边栏的变化
      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHanlder)
      }

      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons');

        this.chart.setOption({
          xAxis: {
            name: '日期',
            data: ['8', '16', '20', '0', '4','8', '16', '20', '0', '4','8', '16', '20', '0', '4','8', '16', '20', '0', '4','8', '16', '20', '0', '4','8', '16', '20', '0', '4','8', '16', '20', '0', '4','8', '16', '20', '0', '4'],
            boundaryGap: false
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            containLabel: true
          },

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          yAxis: {
            type: 'value',
            name: '分值',
          },
         series: [
           {
            name: 'visitors',
            itemStyle: {
              normal: {
                areaStyle: {}
              }
            },
            smooth: true,
            type: 'line',
            data: [2, 3, 6, 9, 4, 5, 6,8,6,2,1,3,6,7,9,4,7,3,6,2,2,2,3,4,5,7,9,5,6,6,7,8,5,4,3],
            animationDuration: 2600,
            animationEasing: 'cubicInOut'
          },
          // {
           //   name: 'buyers',
           //   smooth: true,
           //   type: 'line',
           //   itemStyle: {
           //     normal: {
           //       color: 'rgba(2, 197, 233, 0.2)',
           //       lineStyle: {
           //         color: 'rgba(2, 197, 233, 0.2)'
           //       },
           //       areaStyle: {
           //         color: 'rgba(99,194,255, 0.6)'
           //       }
           //     }
           //   },
           //   data: [0,1,2,3,4,5,6,7,8,9,10],
           //   animationDuration: 2000,
           //   animationEasing: 'quadraticOut'
           // }
          ]
        })
      }
    }
}



</script>
