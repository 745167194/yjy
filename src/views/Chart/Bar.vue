<template>
  <div style="height: 100%">
    <div id="main"></div>
  </div>
</template>

<script>
import G2, {Chart, registerInteraction} from '@antv/G2';

export default {
  name: "chartBar",
  data() {
    return {
      websocket: null,
      charts:'',
      data: [
        {x:54,y:566},
        {x:120,y:554},
        {x:132,y:532},
        {x:167,y:565},
        {x:234,y:532},
        {x:354,y:535},
        {x:475,y:553},
        {x:559,y:523},
        {x:657,y:553},
        {x:734,y:592},
        {x:954,y:597},
        // {x:1024,y:534},
        // {x:2059,y:545},
        // {x:3365,y:456},
        // {x:3955,y:499},
      ],
    }
  },
  destroyed() {
    this.websocket.close() // 离开路由之后断开websocket连接
    this.charts.clear()//使用dispose()方法销毁图例，图例不存在，但图例的resize()方法会启动，则会报没有resize这个方法，
    console.log("destory")
  },
  methods: {
    //图表
    initLineChart() {
      this.charts = new Chart({       // 创建一个图表
        container: "main",      // 容器是上面那个div
        //forceFit: true,
        autoFit: true,              // 自适应
        height: 500,                // 高度
        options:{
          scales:{
            x: {
              range: [0, 1]           // 输出数据的范围，默认[ 0, 1 ]，格式为 [ min, max ]，min 和 max 均为 0 至 1 范围的数据 --官方
            },                          // 简单来说就是 这个图标的多少用于显示数据[0,1]就是数据占满横坐标宽度,[0,0.5]就是还余下半个空的横坐标
            y: {
              //min: 0,                 // 我的纵坐标count的最小值，不设置的话自动取数据中最小数的作为y=0的起始
              nice: false,           // 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100] --官方
              //max:900
            },
          }
        }
      });

      // Step 2: 载入数据源
      this.charts.data(this.data);
      //
      // this.charts.scale({                   // 之前的chart.source()方法已经替换为chart.data()和chart.scale()
      //   x: {
      //     range: [0, 1]           // 输出数据的范围，默认[ 0, 1 ]，格式为 [ min, max ]，min 和 max 均为 0 至 1 范围的数据 --官方
      //   },                          // 简单来说就是 这个图标的多少用于显示数据[0,1]就是数据占满横坐标宽度,[0,0.5]就是还余下半个空的横坐标
      //   y: {
      //     min: 0,                 // 我的纵坐标count的最小值，不设置的话自动取数据中最小数的作为y=0的起始
      //     nice: false,           // 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100] --官方
      //     max:900
      //   },
      // })
      this.charts.option('slider', {
        smooth:true,
        start:0,  //缩略轴开始的位置：80%~100%的位置
        end:1,
      }); // 开启缩略轴组件
      // this.charts.option('scrollbar', {//开启滚动条
      //   type: 'horizontal',
      //   categorySize: 100,
      //   animate: true, //动画
      //   height:5 ,//滚动条高度，为0即隐藏滚动条
      // });
      // this.charts.interaction('plot-mousewheel-scroll', {//实现鼠标滚轮滚动
      //   start: [
      //     { trigger: 'plot:mousewheel', action: 'mousewheel-scroll:scroll', arg: { wheelDelta: 5 } },
      //   ],
      // });
      // registerInteraction('brush-x', {
      //   showEnable: [
      //     { trigger: 'plot:mouseenter', action: 'cursor:crosshair' },
      //     { trigger: 'plot:mouseleave', action: 'cursor:default' },
      //   ],
      //   start: [
      //     {
      //       trigger: 'mousedown',
      //       //isEnable: isPointInView,
      //       action: ['brush-x:start', 'x-rect-mask:start', 'x-rect-mask:show'],
      //     },
      //   ],
      //   processing: [
      //     {
      //       trigger: 'mousemove',
      //       //isEnable: isPointInView,
      //       action: ['x-rect-mask:resize'],
      //     },
      //   ],
      //   end: [
      //     {
      //       trigger: 'mouseup',
      //       //isEnable: isPointInView,
      //       action: ['brush-x:filter', 'brush-x:end', 'x-rect-mask:end', 'x-rect-mask:hide'],
      //     },
      //   ],
      //   rollback: [{ trigger: 'dblclick', action: ['brush-x:reset'] }],
      // })

      registerInteraction('view-zoom', {
        start: [
          {
            trigger: 'plot:mousewheel',
            isEnable(context) {
              context.event.gEvent.preventDefault();
              return context.event.gEvent.originalEvent.deltaY > 0;
              //return this.isWheelDown(context.event);
            },
            action: 'scale-zoom:zoomOut',
            throttle: { wait: 0, leading: true, trailing: false },
          },
          {
            trigger: 'plot:mousewheel',
            isEnable(context) {
              context.event.gEvent.preventDefault();
              return !(context.event.gEvent.originalEvent.deltaY > 0);
              //return !this.isWheelDown(context.event);
            },
            action: 'scale-zoom:zoomIn',
            throttle: { wait: 0, leading: true, trailing: false },
          },
        ],
      }),
        //this.charts.interaction('brush-x')

      //this.charts.AxisOption.position
      this.charts.interaction('view-zoom')
      // Step 3：创建图形语法,绘制折线图
      this.charts.line().position('x*y').shape('smooth');
      // Step 4: 渲染图表
      this.charts.render();
    },
    isWheelDown(event) {
      event.gEvent.preventDefault();
      return event.gEvent.originalEvent.deltaY > 0;
    },
    reDraw() {
      console.log(this.data)
      this.charts.changeData(this.data);
    },

    //websocket相关方法
    initWebSocket(){ //初始化websocket
      const wsuri = "ws://localhost:8887";
      this.websocket = new WebSocket(wsuri);
      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websocket.onclose = this.websocketclose;
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      console.log('打开连接',e);
      //this.longstart();   // 成功建立连接后，创建心跳检测
    },
    websocketonerror(){//连接建立失败重连
      console.log('连接异常',e);
      //this.initWebSocket();
    },
    websocketonmessage(e){ //数据接收 二进制 (0x11 0x22 0x33 0X44)-->float
      let mydata1 =[]
      const redata = JSON.parse(e.data);
      let i=0;
      for(;i<32767;i+=2){//一次取完就是最有效率的
        mydata1.push({
          x: redata[i],
          y: redata[i+1],
        });
      }
      this.data=mydata1
      this.reDraw()
    },
    websocketclose(e){  //关闭
      this.websocket.close()
      console.log('断开连接',e);
    },
    websocketsend(Data){//数据发送
      this.websocket.send(Data);
    },


  },
  mounted() {
    this.initLineChart();
    this.initWebSocket();
  },

}
</script>

<style scoped>

</style>
