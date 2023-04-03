<template>
  <div style="height: 100%">
    <div id="main" style="width:100%;height:50% ;"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "ChartLine",
  data() {
    return {
      charts: '',
      websocket: null,
    }
  },
  destroyed() {
    this.websocket.close() //离开路由之后断开websocket连接
  },
  methods: {
    getOption(){
      console.log("getoption")
      let option={      //setOption进行绘图
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
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'inside',//可有鼠标滚动
            xAxisIndex: [0],
            filterMode: 'filter',
            show:true
          },
          {
            id: 'dataZoomY',
            type: 'slider',//需要拖拽
            yAxisIndex: [0],
            filterMode: 'empty'
          }
        ],

        xAxis: {
          type: 'value',
          interval:100, //强制设置坐标轴分割间隔
        },
        yAxis: {
          type: 'value',
        },

        series: [{
          smooth:true,
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
              colorStops: [
                {
                offset: 0, color: 'rgb(240,128,128)' // 0% 处的颜色
              }, {
                offset: 0.5, color: '#ffffff' // 50% 处的颜色
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
          data: [
            [54,566],
            [120,554],
            [132,532],
            [167,565],
            [234,532],
            [354,535],
            [475,553],
            [559,523],
            [657,553],
            [734,592],
            [867,532],
            [880,545],
            [934,598]
          ]
        },
          {
            smooth:true,
            name: '预期' ,
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
                  offset: 0, color: 'rgb(144,238,144)' // 0% 处的颜色
                }, {
                  offset: 0.5, color: '#ffffff' // 50% 处的颜色
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
            data: [
              [67,245],
              [124,259],
              [135,237],
              [162,262],
              [237,239],
              [353,233],
              [472,258],
              [555,224],
              [653,257],
              [737,199],
              [860,237],
              [884,240],
              [968,299]
            ]
          }
        ]
      }
      console.log("option")
      return option;
    },
    drawLine(id){
      console.log("drawLine")
      this.charts = echarts.init(document.getElementById(id))     //初始化echarts实例
      console.log("????")
      this.charts.setOption(this.getOption())
      window.onresize = this.charts.resize;//适应窗口大小
    },

    //websocket相关方法
    initWebSocket(){ //初始化websocket
      const wsuri = "ws://localhost:3000";
      this.websocket = new WebSocket(wsuri);
      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websocket.onclose = this.websocketclose;
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      let actions = {"test":"12345"};
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror(){//连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e){ //数据接收
      const redata = JSON.parse(e.data);
      console.log(redata)
    },
    websocketclose(e){  //关闭
      console.log('断开连接',e);
    },
    websocketsend(Data){//数据发送
      this.websocket.send(Data);
    },
  },
  mounted() {
    this.$nextTick(function() {//绘图
      console.log("draw")
      this.drawLine('main')//main是容器id
    })
    //this.initWebSocket();
  },
}
</script>

<style scoped>

</style>
