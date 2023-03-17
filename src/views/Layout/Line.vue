<template>
  <div class="line">
    <!--echarts的容器-->
    <div id="main" style="width:100%;height:100% ;"></div>
  </div>
</template>


<script>
import echarts from "echarts";
import axios from "axios";

export default {
  name:'Line',
  data() {
    return {
      charts: '',
      opinionData1:[150,150,100,100,500,425,999],//数据
      opinionData2:[104,104,69,71,348,489,666],
    }
  },
  methods: {
    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id))     //初始化echarts实例
      //window.addEventListener('resize',() => { this.charts.resize(); });
      this.charts.setOption({      //setOption进行绘图
        //backgroundColor: '#394056',
        title:{   //标题设置
          left:'center',
          bottom:'10px',
          text:"最近一周订单数量",//标题文本，支持使用 \n 换行。
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#000'
          }
        },
        tooltip: {  //提示框取默认值，鼠标悬停显示的内容
          trigger: 'axis',   //触发类型；轴触发，axis则鼠标hover到一条柱状图显示全部数据，item则鼠标hover到折线点显示相应数据
          axisPointer: {  //坐标轴指示器，坐标轴触发有效，
            type: 'cross', //默认为line，line直线，cross十字准星，shadow阴影
          }
        },
        legend: {   //默认横标
          x:'center',
          y:'top',
          itemGap: 25,
          data: ['预期', '实际'],
          textStyle: {
            fontSize: 16,
            color: '#000'
          }
        },
        grid: {//图标距容器的距离
          top: '5%',
          left: '2%',
          right: '2%',
          bottom: '5%',
          containLabel: true
        },

       /* toolbox: {    //工具栏
          feature: {
            saveAsImage: {} //保存为图片
          }
        },*/
        xAxis: {
          type: 'category',
          boundaryGap:true,    //坐标轴留白策略，类目轴和非类目轴的设置和表现不一样。
          axisTick:{
            alignWithLabel:true //保证刻度线和标签对齐
          },
          data: ["周一","周二","周三","周四","周五","周六","周日"] //x坐标的名称

        },
        yAxis: {
          type: 'value',
          boundaryGap: true,
          splitNumber:4, //纵坐标数
          interval:200, //强制设置坐标轴分割间隔
          //min: this.minData, // 最大值和最小值要从后端获取，或者写死数值，或者不去自定义最大最小值
          //max: this.maxData,
        },

        series: [{
          name: '实际',
          type: 'line', //折线图line;柱形图bar;饼图pie;散点图：scatter，带涟漪的散点图：effectScatter
          //stack: '总量',   //若多个series的stack名称相同，则数据会堆叠，即第二条线的数值=本身的数值+第一条线的数值，第三条的数值=第二条线图上的数值+本身的数值，以此类推
          xAxisIndex: 0, // 指定使用下侧的x轴
          //yAxisIndex: 0, // 默认使用的是左侧的y轴 左侧的y轴yAxisIndex值为0
          areaStyle: {
            //显示区域颜色---渐变效果
            color:{
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgb(240,128,128)' // 0% 处的颜色
              }, {
                offset: 1, color: '#ffffff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          itemStyle: {
            color: 'rgb(139,0,0)', //改变折线点的颜色
            lineStyle: {
              color: 'rgb(139,0,0)' //改变折线颜色
            }

          },
          data: this.opinionData1
        },


          {
            name: '预期',
            type: 'line', //折线图line;柱形图bar;饼图pie;散点图：scatter，带涟漪的散点图：effectScatter
            //stack: '总量',
            xAxisIndex: 0, // 指定使用下侧的x轴
            //yAxisIndex: 1, // 指定使用右侧的y轴，也就是yAxisIndex为1即可
            areaStyle: {
              //显示区域颜色---渐变效果
              color:{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgb(144,238,144)' // 0% 处的颜色
                }, {
                  offset: 1, color: '#ffffff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            itemStyle: {
              color: 'rgb(0,128,0)', //改变折线点的颜色
              lineStyle: {
                color: 'rgb(0,128,0)' //改变折线颜色
              }

            },
            data:this.opinionData2
          }
        ]
      })
      window.onresize = this.charts.resize;//重绘
    }
  },
  //调用
  mounted() {
    this.$api.CallRpc('getLineData','getLineData')
     .then(res=>{/*
      console.log(res.data.optionData1);
      this.opinionData1=res.data.optionData1 //从json中获得数据1  注意opinion与option不同
      this.opinionData2=res.data.optionData2 //从json中获得数据2

      console.log(this.opinionData1+'+'+this.opinionData2)

      this.$nextTick(function() {//绘图
        console.log("draw")
        this.drawLine('main')//main是容器id
      })*/
    })

    this.$nextTick(function() {//绘图
      console.log("draw")
      this.drawLine('main')//main是容器id
    })
  }

  /*同步请求，客户端向服务端发送请求，服务端响应以后客户端才渲染页面
    异步请求，客户端向服务端发送请求，客户端不等服务端响应就行行页面渲染，一般做页面的局部刷新。(画不出来图）*/
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.line{
  border:1px solid #DCDFE6;
  box-shadow:0 0 30px #DCDFE6;
  border-radius:5px;
  height: 100%;

}

</style>
