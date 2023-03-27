<template>
  <div style="height:100%">
    <div id="main" style="width:100% ;height:100%"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: "Curve",
  data() {
    return{
      myChart:'',
      data1:[30,60,90,13,14,15,15,79,59,59,94,35,56,76,45],
      data2:[15,25,15,94,81,100,52,64,87,3,50,6,15,45,84],
      data3:[15,24,61,52,18,94,75,52,35,26,15,28,94,54,84]
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.getCurve()
    })
  },
  methods: {
    getOption() {
      let option = {
        legend: {
          data: ['scatter', 'scatter2', 'scatter3']
        },
        tooltip: {},
        xAxis: {
          type: 'value',
          min: 'dataMin',
          max: 'dataMax',
          splitLine: {
            show: true
          }
        },
        yAxis: {
          type: 'value',
          min: 'dataMin',
          max: 'dataMax',
          splitLine: {
            show: true
          }
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 1,
            end: 35
          },
          {
            type: 'slider',
            show: true,
            yAxisIndex: [0],
            left: '93%',
            start: 29,
            end: 36
          },
          {
            type: 'inside',
            xAxisIndex: [0],
            start: 1,
            end: 35
          },
          {
            type: 'inside',
            yAxisIndex: [0],
            start: 29,
            end: 36
          }
        ],
        series: [
          {
            name: 'scatter',
            type: 'scatter',
            itemStyle: {
              normal: {
                opacity: 0.8
              }
            },
            symbolSize: function (val) {
              return val[2] * 40;
            },
            data: data1
          },
          {
            name: 'scatter2',
            type: 'scatter',
            itemStyle: {
              normal: {
                opacity: 0.8
              }
            },
            symbolSize: function (val) {
              return val[2] * 40;
            },
            data: data2
          },
          {
            name: 'scatter3',
            type: 'scatter',
            itemStyle: {
              normal: {
                opacity: 0.8
              }
            },
            symbolSize: function (val) {
              return val[2] * 40;
            },
            data: data3
          }
        ]
      };
      return option
    },
    getCurve() {
      let myChart = echarts.init(document.getElementById('main'))
      let option =this.getOption
      myChart.setOption(option)
      console.log("6666666666")
      window.onresize = myChart.resize;
    },
  }
}
</script>

<style scoped>

</style>
