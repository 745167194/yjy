<template>
  <div>
    <div style="display: flex;height:150px" >
      <div @click="refreshData('1')" class="smallcon"><i class="el-icon-s-goods" style="width: 100%"></i>
        div1
      </div>
      <div @click="refreshData('2')" class="smallcon">
        div2
      </div>
      <div @click="refreshData('3')" class="smallcon">
        div3
      </div>
      <div @click="refreshData('4')" class="smallcon">
        div4
      </div>
    </div>
    <div class="myline" ref="container">
      <!--echarts的容器-->
      <div id="main" style="height: 100%;width: 100%; "></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import resize from './resize'

export default {
  name:'Mainline',
  mixins: [resize],
  data() {
    return {
      mychart: '',

      opinionData1_1: ["275", "225", "867", "345", "655", "766", "654"],//数据
      opinionData1_2: ["432", "566", "344", "222", "234", "948", "456"],//数据

      opinionData2_1: ["555", "567", "867", "345", "655", "745", "654"],//数据
      opinionData2_2: ["645", "533", "344", "678", "765", "467", "346"],//数据

      opinionData3_1: ["277", "225", "867", "345", "675", "678", "954"],//数据
      opinionData3_2: ["495", "456", "344", "342", "654", "654", "746"],//数据

      opinionData4_1: ["566", "755", "867", "564", "655", "766", "654"],//数据
      opinionData4_2: ["293", "566", "344", "765", "345", "897", "866"],//数据

      width:'100%',

      flag:'1',

      num:'0'//标记画了多少次
    }
  },

  methods: {

    myOption(){
      return {      //setOption进行绘图
        title: {   //标题设置
          left: 'center',
          bottom: '10px',
          text: "最近一周订单数量",//标题文本，支持使用 \n 换行。
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
          x: 'center',
          y: 'top',
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
        xAxis: {
          type: 'category',
          boundaryGap: true,    //坐标轴留白策略，类目轴和非类目轴的设置和表现不一样。
          axisTick: {
            alignWithLabel: true //保证刻度线和标签对齐
          },
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"] //x坐标的名称

        },
        yAxis: {
          type: 'value',
          boundaryGap: true,
          splitNumber: 4, //纵坐标数
          interval: 200, //强制设置坐标轴分割间隔
          //min: this.minData, // 最大值和最小值要从后端获取，或者写死数值，或者不去自定义最大最小值
          //max: this.maxData,
        },
        series: [ //两条线
          {
            symbolSize: 7, // 拐点的大小
            smooth: true,//平滑曲线
            name: '实际',
            type: 'line', //折线图line;柱形图bar;饼图pie;散点图：scatter，带涟漪的散点图：effectScatter
            //stack: '总量',   //若多个series的stack名称相同，则数据会堆叠，即第二条线的数值=本身的数值+第一条线的数值，第三条的数值=第二条线图上的数值+本身的数值，以此类推
            xAxisIndex: 0, // 指定使用下侧的x轴
            //yAxisIndex: 0, // 默认使用的是左侧的y轴 左侧的y轴yAxisIndex值为0
            areaStyle: {
              //显示区域颜色---渐变效果
              color: {
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
            data: this.opinionData1_1,
          },
          {
            name: '预期',
            symbolSize: 7, // 拐点的大小
            smooth: true,//平滑曲线
            type: 'line', //折线图line;柱形图bar;饼图pie;散点图：scatter，带涟漪的散点图：effectScatter
            //stack: '总量',
            xAxisIndex: 0, // 指定使用下侧的x轴
            //yAxisIndex: 1, // 指定使用右侧的y轴，也就是yAxisIndex为1即可
            areaStyle: {
              //显示区域颜色---渐变效果
              color: {
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
            data: this.opinionData1_2,
          }
        ],
      }
    },

    drawLine(id) {
      this.mychart = echarts.init(document.getElementById(id))     //初始化echarts实例
      let option = this.refreshData(this.flag)
      if(this.num==='0'){
        this.mychart.setOption(option)
      }
      else {
        option.animation=false
        this.mychart.setOption(option)
      }
    },

    refreshData(flag){//实现点击div刷新图数据
      let option = this.myOption();
      this.flag=flag
      if(flag==='2'){
        option.series[0].data = this.opinionData1_1;
        option.series[1].data=this.opinionData1_2;
      }
      else if(flag==='3'){
        option.series[0].data = this.opinionData2_1;
        option.series[1].data=this.opinionData2_2;
      }
      else if(flag==='4'){
        option.series[0].data = this.opinionData3_1;
        option.series[1].data=this.opinionData3_2;
      }
      else {
        option.series[0].data = this.opinionData4_1;
        option.series[1].data=this.opinionData4_2;
      }
      return option
    },

    reDraw(){
      this.mychart = echarts.init(document.getElementById('main'))
      this.mychart.dispose()  //clear只清除数据部分,dispose消除实例
      this.drawLine('main')
    },
  },
  //调用
  mounted() {
    this.$refs.container.style.setProperty('--width',this.width)
    window.addEventListener('resize', () => {
      this.width=(window.innerWidth-10)+'px'
      }
    );
    this.$nextTick(function() {//绘图
      this.drawLine('main')//main是容器id
      this.num++;
    })
  },
  watch:{
    width(newValue, oldValue){
      this.reDraw()
    },
    flag(newValue,oldValue){
      this.mychart.setOption(this.refreshData(newValue))
    }
  },

  beforeDestroy(to, from, next) {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
    next();
  },
}
</script>


<style lang="scss" scoped>
.smallcon{
  width: 450px ;
  height: 100px;
  margin: 10px ;
  border:1px solid #DCDFE6;
  box-shadow:0 0 30px #DCDFE6;
  border-radius:5px;
}
.smallcon:hover{
  transform: scale(1.05);//四周变大
}
.myline{
  border:1px solid #DCDFE6;
  box-shadow:0 0 30px #DCDFE6;
  border-radius:5px;
  height: 350px;
  margin-left: 10px;
  width: var(--width);
}

</style>
