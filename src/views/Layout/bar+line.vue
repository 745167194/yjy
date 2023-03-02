<template>
  <div ref="myChart" style="width:100%;height:100%"></div>
</template>

<script>
export default {
  name: 'BarLine',
  methods:{
    showEcharts(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart);
      // 绘制图表
      myChart.setOption({
        title:{
          left:'center',
          bottom:'10px',
          text:"降水量与温度",//标题文本，支持使用 \n 换行。
        },
        legend:{
          x:'center',
          y:'top',
          textStyle: {
            fontSize: 16,
            color: '#000'
          },
          data:['水量','温度']
          /*formatter:function(name){
            return name+'%'
          }*/
        },
        grid: {//图标距容器的距离
          top: '5%',
          left: '2%',
          right: '2%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow',
              show:'true'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C'
            },
          }
        ],
        series: [   //两个条形图+一个折线图
          {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: '降水量',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          },
          {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      });
      //建议加上以下这一行代码，不加，当浏览器窗口缩小时，echarts显示不全。
      window.addEventListener('resize', function() {
        myChart.resize()
      });
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.showEcharts();
    })
  }
}
</script>

<style scoped>

</style>
