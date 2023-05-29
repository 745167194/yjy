<template>
  <div style="height: 100%">
    <div id="main" style="width:100%;height:50%;" ></div>
    <div style="display: flex;margin-left: 10%;">
      <div style="width:250px" v-if="x1!==-1&&y1!==-1">
        <span style="color:#409EFF">x1:</span><span>{{parseFloat(x1).toFixed(2)}}</span>
        <span style="color:#409EFF">y1:</span> <span>{{parseFloat(y1).toFixed(2)}}</span>
      </div>
      <div style="margin-left:100px;width:250px" v-if="x2!==-1&&y2!==-1">
        <span style="color:#67C23A">x2:</span> <span>{{parseFloat(x2).toFixed(2)}}</span>
        <span style="color:#67C23A">y2:</span> <span>{{parseFloat(y2).toFixed(2)}}</span>
      </div>
      <div style="margin-left:100px;width:250px" v-if="x2!==-1&&y2!==-1&&x1!==-1&&y1!==-1">
        <span style="color:darkred">{{ $t('chartIndex.lineIndex.difference') }}</span> <span >({{parseFloat(x2-x1).toFixed(2)}},{{parseFloat(y2-y1).toFixed(2)}})</span>
      </div>
      <div v-if="(x2!==-1&&y2!==-1)||(x1!==-1&&y1!==-1)">
        <el-button  type="primary" @click="reset()">{{ $t('reset') }}</el-button>
      </div>
    </div>


  </div>
</template>

<script>
import echarts from "echarts";
import Drag from "@antv/g2/lib/interaction/action/view/drag";

export default {
  name: "ChartLine",
  data() {
    return {
      websocket: null,
      charts:'',
      data:[],
      x:0,//x轴从0开始每次加0.1

      x1:-1,
      y1:-1,
      flag:0,//游标1，2交替使用
      x2:-1,
      y2:-1,

      single:[], //标线取消了某一条

      length:8192 //图表中显示数据量

    }
  },
  destroyed() {//销毁后data不会存储，冲重新开始绘图，之前的记录也找不到
    this.websocket.close() // 离开路由之后断开websocket连接
    this.charts.clear()//使用dispose()方法销毁图例，图例不存在，但图例的resize()方法会启动，则会报没有resize这个方法，
                        // 而 clear()方法则是清空图例数据，不影响图例的 resize，而且能够释放内存。
  },
  methods: {
    //初始化
    getOption(){
      //函数绘图
      let option = {
        animation: false,
        tooltip: {
          //trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
        },
        xAxis: {
          //scale:true, //不会强制包含0刻度
          name:'x',
          type:'value',
          min:0,//起始
          max:this.length,//终止
          minorTick: {
            show: true
          },
          minorSplitLine: {
            show: true
          }
        },
        yAxis: {
          name: 'y',
          minorTick: {
            show: true
          },
          minorSplitLine: {
            show: true
          }
        },
        dataZoom: [
          {
            show: true,
            type: 'inside',
            filterMode: 'none',
            xAxisIndex: [0],
          },
          // {  //y轴缩放
          //   show: true,
          //   type: 'inside',
          //   filterMode: 'none',
          //   yAxisIndex: [0],
          // }
        ],
        series:{
          type: 'line',
          showSymbol: false,
        }
      }
      return option;
    },
    drawLine(id){
      this.charts = echarts.init(document.getElementById(id))     //初始化echarts实例
      window.onresize = this.charts.resize//适应窗口大小
      this.charts.setOption(this.getOption())

      //定游标+可拖拽
      this.charts.getZr().on('click',params =>{   //箭头参数可以在函数体中调用this，这个this是继承来的
        const pointInPixel = [params.offsetX, params.offsetY]
        // 使用 convertFromPixel方法 转换像素坐标值到逻辑坐标系上的点.
        let pointInGrid = this.charts.convertFromPixel({xAxisName: 'x', yAxisName: 'y'}, pointInPixel);
        if(this.single.length===4) this.single=[]
        if(this.single.length===0) {
            if (this.flag === 0) {
              this.x1 = pointInGrid[0]
              this.y1 = pointInGrid[1]
              if (this.x2 === -1 && this.y2 === -1) {
                this.charts.setOption({
                  graphic: [
                    {
                      name: 'x1',
                      type: 'rect',
                      shape: {
                        width: 2,
                        height: 4000
                      },
                      position: [params.offsetX,0],
                      invisible: true,
                      draggable: true,
                      z: 100,
                      cursor: 'move',//移入时鼠标形状,default为箭头
                      ondrag: this.onPointDragging,
                    },
                    {
                      name: 'y1',
                      type: 'rect',
                      shape: {
                        width: 4000,
                        height: 2
                      },
                      position: [0,params.offsetY],
                      invisible: true,
                      cursor: 'move',
                      draggable: true,
                      z: 100,
                      ondrag: this.onPointDragging,
                    }
                  ],
                  series: {
                    type: 'line',
                    markLine: {
                      silent: true,
                      animation: false, //不播放标线的动画
                      lineStyle: {
                        color: "#409EFF",
                        width: 1.5
                      },
                      data: [
                        {
                          name: 'x1',
                          xAxis: this.x1, //表示标注 x=xAxis的线, 具体配置项可以参考 https://www.echartsjs.com/zh/option.html#series-line.markLine
                        },
                        {
                          name: 'y1',
                          yAxis: this.y1, //表示标注 x=xAxis的线, 具体配置项可以参考 https://www.echartsjs.com/zh/option.html#series-line.markLine
                        }
                      ]
                    }
                  }
                })
              } else {
                let option={
                  graphic: [
                    {
                      name: 'x1',
                      type: 'rect',
                      shape: {
                        width: 2,
                        height: 4000
                      },
                      position: [params.offsetX, 0],
                      invisible: true,
                      draggable: true,
                      cursor: 'move',
                      z: 100,
                      ondrag: this.onPointDragging,
                    },
                    {
                      name: 'y1',
                      type: 'rect',
                      shape: {
                        width: 4000,
                        height: 2
                      },
                      position: [0,params.offsetY],
                      invisible: true,
                      draggable: true,
                      cursor: 'move',
                      z: 100,
                      ondrag: this.onPointDragging,
                    },
                    {
                      name: 'x2',
                      type: 'rect',
                      shape: {
                        width: 2,
                        height: 4000
                      },
                      position: [this.charts.convertToPixel({xAxisName: 'x'}, this.x2), 0],
                      invisible: true,
                      draggable: true,
                      cursor: 'move',
                      z: 100,
                      ondrag: this.onPointDragging,

                    },
                    {
                      name: 'y2',
                      type: 'rect',
                      shape: {
                        width: 4000,
                        height: 2
                      },
                      position: [0, this.charts.convertToPixel({yAxisName: 'y'}, this.y2)],
                      invisible: true,
                      draggable: true,
                      cursor: 'move',
                      z: 100,
                      ondrag: this.onPointDragging,
                    },
                  ],
                  series: {
                    type: 'line',
                    markLine: {
                      silent: true,
                      animation: false, //不播放标线的动画
                      data: [
                        {
                          name: 'x1',
                          xAxis: this.x1,
                          lineStyle: {
                            color: "#409EFF",
                            width: 1.5
                          },
                        },
                        {
                          name: 'y1',
                          yAxis: this.y1,
                          lineStyle: {
                            color: "#409EFF",
                            width: 1.5
                          },
                        },
                        {
                          name: 'x2',
                          xAxis: this.x2,
                          lineStyle: {
                            color: "#67C23A",
                            width: 1.5
                          },
                        },
                        {
                          name: 'y2',
                          yAxis: this.y2,
                          lineStyle: {
                            color: "#67C23A",
                            width: 1.5
                          },
                        }
                      ]
                    },
                  }
                }
                this.charts.setOption(option)
              }
              this.flag = 1
            } else {
              this.x2 = pointInGrid[0]
              this.y2 = pointInGrid[1]
              this.charts.setOption({
                graphic: [
                  {
                    name: 'x1',
                    type: 'rect',
                    shape: {
                      width: 2,
                      height: 4000
                    },
                    position: [this.charts.convertToPixel({xAxisName: 'x'}, this.x1), 0],
                    invisible: true,
                    draggable: true,
                    cursor: 'move',
                    z: 100,
                    ondrag: this.onPointDragging,
                  },
                  {
                    name: 'y1',
                    type: 'rect',
                    shape: {
                      width: 4000,
                      height: 2
                    },
                    position: [0, this.charts.convertToPixel({yAxisName: 'y'}, this.y1)],
                    invisible: true,
                    draggable: true,
                    cursor: 'move',
                    z: 100,
                    ondrag: this.onPointDragging,
                  },
                  {
                    name: 'x2',
                    type: 'rect',
                    shape: {
                      width: 2,
                      height: 4000
                    },
                    position: [params.offsetX, 0],
                    invisible: true,
                    draggable: true,
                    cursor: 'move',
                    z: 100,
                    ondrag: this.onPointDragging,
                  },
                  {
                    name: 'y2',
                    type: 'rect',
                    shape: {
                      width: 4000,
                      height: 2
                    },
                    position: [0, params.offsetY],
                    invisible: true,
                    draggable: true,
                    z: 100,
                    cursor: 'move',
                    ondrag: this.onPointDragging,
                  },
                ],
                series: {
                  markLine:
                    {
                      silent: true,
                      animation: false, //不播放标线的动画
                      data: [
                        {
                          name: 'x1',
                          xAxis: this.x1,
                          lineStyle: {
                            color: "#409EFF",
                            width: 1.5
                          },
                        },
                        {
                          name: 'y1',
                          yAxis: this.y1,
                          lineStyle: {
                            color: "#409EFF",
                            width: 1.5
                          },
                        },
                        {
                          name: 'x2',
                          xAxis: this.x2,
                          lineStyle: {
                            color: "#67C23A",
                            width: 1.5
                          },
                        },
                        {
                          name: 'y2',
                          yAxis: this.y2,
                          lineStyle: {
                            color: "#67C23A",
                            width: 1.5
                          },
                        }
                      ]
                    },
                }
              })
              this.flag = 0
            }
          }
        else{
            let x = pointInGrid[0]
            let y = pointInGrid[1]
            switch (this.single[0]){//先进先出
              case 'x1':{
                this.x1=x
                let option={graphic:[],series:{markLine:{data:[]}}}
                let data = this.charts.getOption().series[0].markLine.data
                for (let i = 0; i < data.length; i++) {
                  option.series.markLine.data.push(data[i])
                }
                option.series.markLine.data.push({
                  name: 'x1',
                  xAxis: this.x1,
                  lineStyle: {
                    color: "#409EFF",
                    width: 1.5
                  },
                })
                option.graphic.push({
                  name: 'x1',
                  type: 'rect',
                  shape: {
                    width: 2,
                    height: 4000
                  },
                  position: [params.offsetX, 0],
                  invisible: true,
                  draggable: true,
                  z: 100,
                  cursor: 'move',//移入时鼠标形状,default为箭头
                  ondrag: this.onPointDragging,
                })
                this.charts.setOption(option)
                this.single.shift()
                this.flag=1
                break;
              }
              case 'y1':{
                this.y1=y
                let option={graphic:[],series:{markLine:{data:[]}}}
                let data = this.charts.getOption().series[0].markLine.data
                for (let i = 0; i < data.length; i++) {
                  option.series.markLine.data.push(data[i])
                }
                option.series.markLine.data.push({
                  name: 'y1',
                  yAxis: this.y1,
                  lineStyle: {
                    color: "#409EFF",
                    width: 1.5
                  },
                })
                option.graphic.push({
                  name: 'y1',
                  type: 'rect',
                  shape: {
                    width: 4000,
                    height: 2
                  },
                  position: [0,params.offsetY],
                  invisible: true,
                  draggable: true,
                  z: 100,
                  cursor: 'move',//移入时鼠标形状,default为箭头
                  ondrag: this.onPointDragging,
                })
                this.charts.setOption(option)
                this.single.shift()
                this.flag=1
                break;
              }
              case 'x2':{
                this.x2=x
                let option={graphic:[],series:{markLine:{data:[]}}}
                let data = this.charts.getOption().series[0].markLine.data
                for (let i = 0; i < data.length; i++) {
                  option.series.markLine.data.push(data[i])
                }
                option.series.markLine.data.push({
                  name: 'x2',
                  xAxis: this.x2,
                  lineStyle: {
                    color: "#67C23A",
                    width: 1.5
                  },
                })
                option.graphic.push({
                  name: 'x2',
                  type: 'rect',
                  shape: {
                    width: 2,
                    height: 4000
                  },
                  position: [params.offsetX, 0],
                  invisible: true,
                  draggable: true,
                  z: 100,
                  cursor: 'move',//移入时鼠标形状,default为箭头
                  ondrag: this.onPointDragging,
                })
                this.charts.setOption(option)
                this.single.shift()
                this.flag=0
                break;
              }
              case 'y2':{
                this.y2=y
                let option={graphic:[],series:{markLine:{data:[]}}}
                let data = this.charts.getOption().series[0].markLine.data
                for (let i = 0; i < data.length; i++) {
                  option.series.markLine.data.push(data[i])
                }
                option.series.markLine.data.push({
                  name: 'y2',
                  yAxis: this.y2,
                  lineStyle: {
                    color: "#67C23A",
                    width: 1.5
                  },
                })
                option.graphic.push({
                  name: 'y2',
                  type: 'rect',
                  shape: {
                    width: 4000,
                    height: 2
                  },
                  position: [0,params.offsetY],
                  invisible: true,
                  draggable: true,
                  z: 100,
                  cursor: 'move',//移入时鼠标形状,default为箭头
                  ondrag: this.onPointDragging,
                })
                this.charts.setOption(option)
                this.single.shift()
                this.flag=0
                break;
              }
            }
          }
      })

      //游标随datazoom变化
      this.charts.on('datazoom',params=>{
        //console.log(params);//里面存有代表滑动条的起始的数字
        this.charts.setOption(this.datazoomOption())
      })

      //右键取消游标
      document.oncontextmenu = function () { return false }//去除默认的鼠标事件
      this.charts.getZr().on('contextmenu',params=>{
        //console.log(params.offsetX, params.offsetY)
        let x=this.charts.convertFromPixel({xAxisName: 'x'}, params.offsetX)
        let y=this.charts.convertFromPixel({yAxisName: 'y'}, params.offsetY)
        if(x-0.5<=this.x1&&x+0.5>=this.x1){//与坐标密集程度有关
          //console.log("与x1重叠")
          this.charts.setOption(this.cancalMarkline("x1"))
          //console.log(this.charts.getOption().series[0].markLine)
          this.single.push("x1")
        }
        if(y-0.05<=this.y1&&y+0.05>=this.y1){
          //console.log("与y1重叠")
          this.charts.setOption(this.cancalMarkline("y1"))
          this.single.push("y1")
        }
        if(x-0.5<=this.x2&&x+0.5>=this.x2){
          //console.log("与x2重叠")
          this.charts.setOption(this.cancalMarkline("x2"))
          this.single.push("x2")
        }
        if(y-0.05<=this.y2&&y+0.05>=this.y2){
          //console.log("与y2重叠")
          this.charts.setOption(this.cancalMarkline("y2"))
          this.single.push("y2")
        }
        //console.log(this.charts.getOption().graphic)
      })

    },

    //游标相关方法
    cancalMarkline(str){//删除游标生成option
      let option={graphic:[],series:{type:'line',markLine:{data:[]}}}
      let data = this.charts.getOption().series[0].markLine.data
      for (let i = 0; i < data.length; i++) {
        if(data[i].name!==str){
          option.series.markLine.data.push(data[i])
        }
      }
      switch (str) {
        case "x1": {
          //console.log("x1不可拖拽")
          option.graphic.push({name:"x1",draggable: false,cursor: 'default'})
          break
        }
        case "x2": {
          option.graphic.push({name:"x2",draggable: false,cursor: 'default'})
          break
        }
        case "y1": {
          option.graphic.push({name:"y1",draggable: false,cursor: 'default'})
          break
        }
        case "y2": {
          option.graphic.push({name:"y2",draggable: false,cursor: 'default'})
          break
        }
      }
      return option
    },
    reset(){//重置游标
      this.x1=-1
      this.x2=-1
      this.y1=-1
      this.y2=-1
      this.flag=0
      this.single=[]
      this.charts.setOption({graphic:[{name:"x1",draggable: false,cursor: 'default'},{name:"y1",draggable: false,cursor: 'default'},
          {name:"x2",draggable: false,cursor: 'default'},{name:"y2",draggable: false,cursor: 'default'}],series:{markLine:''}}) //chart.setOption(option, notMerge,lazyUpdate,silent);
    },
    onPointDragging(e) {//拖拽事件
        switch (e.target.name){
          case "x1":{
            //console.log("x1")
            let x1 = this.charts.convertFromPixel({xAxisName: 'x'}, e.target.position[0]);
            this.x1 = parseFloat(x1).toFixed(2)
            let option={series:{markLine:{data:[]}}}
            let data = this.charts.getOption().series[0].markLine.data
            for (let i = 0; i < data.length; i++) {
              if(data[i].name!=='x1'){
                option.series.markLine.data.push(data[i])
              }else{
                option.series.markLine.data.push({
                  name: 'x1',
                  xAxis: x1,
                  lineStyle: {
                    color: "#409EFF",
                    width: 1.5
                  },
                },)
              }
            }
            this.charts.setOption(option)
            break;
          }
          case "y1":{
            //console.log("y1")
            let y1 = this.charts.convertFromPixel({yAxisName: 'y'}, e.target.position[1]);
            this.y1 = parseFloat(y1).toFixed(2)
            let option={series:{markLine:{data:[]}}}
            let data = this.charts.getOption().series[0].markLine.data
            for (let i = 0; i < data.length; i++) {
              if(data[i].name!=='y1'){
                option.series.markLine.data.push(data[i])
              }else{
                option.series.markLine.data.push({
                  name: 'y1',
                  yAxis: y1,
                  lineStyle: {
                    color: "#409EFF",
                    width: 1.5
                  },
                })
              }
            }
            this.charts.setOption(option)
            break;
          }
          case "x2": {
            //console.log("x2")
            let x2 = this.charts.convertFromPixel({xAxisName: 'x'}, e.target.position[0]);
            this.x2 = parseFloat(x2).toFixed(2)
            let option={series:{markLine:{data:[]}}}
            let data = this.charts.getOption().series[0].markLine.data
            for (let i = 0; i < data.length; i++) {
              if(data[i].name!=='x2'){
                option.series.markLine.data.push(data[i])
              }else{
                option.series.markLine.data.push({
                  name: 'x2',
                  xAxis: x2,
                  lineStyle: {
                    color: "#67C23A",
                    width: 1.5
                  },
                })
              }
            }
            this.charts.setOption(option);
            break;
          }
          case "y2": {
            //console.log("y2")
            let y2 = this.charts.convertFromPixel({yAxisName: 'y'}, e.target.position[1]);
            this.y2 = parseFloat(y2).toFixed(2)
            let option={series:{markLine:{data:[]}}}
            let data = this.charts.getOption().series[0].markLine.data
            for (let i = 0; i < data.length; i++) {
              if(data[i].name!=='y2'){
                option.series.markLine.data.push(data[i])
              }else{
                option.series.markLine.data.push({
                  name: 'y2',
                  yAxis: y2,
                  lineStyle: {
                    color: "#67C23A",
                    width: 1.5
                  },
                })
              }
            }
            this.charts.setOption(option);
            break;
          }
        }
    },
    datazoomOption(){//游标随datazoom缩放且可移动
      let option={graphic:[],series:{type:'line',markLine:{data:[]}}}
      let data = this.charts.getOption().series[0].markLine.data
      for (let i = 0; i < data.length; i++) {
        option.series.markLine.data.push(data[i])
      }
      let dataGra=this.charts.getOption().graphic
      for(let i=0;i<dataGra[0].elements.length;i++){
        //console.log(dataGra[0].elements[i])
        switch (dataGra[0].elements[i].name){
          case 'x1': {
            dataGra[0].elements[i].position = [this.charts.convertToPixel({xAxisName: 'x'}, this.x1), 0]
            break;
          }
          case 'y1':{
            dataGra[0].elements[i].position = [0,this.charts.convertToPixel({yAxisName: 'y'}, this.y1)]
            break;
          }
          case 'x2':{
            dataGra[0].elements[i].position = [this.charts.convertToPixel({xAxisName: 'x'}, this.x2), 0]
            break;
          }
          case 'y2':{
            dataGra[0].elements[i].position = [0,this.charts.convertToPixel({yAxisName: 'y'}, this.y2)]
            break;
          }
        }
        option.graphic.push(dataGra[i])
      }
      return option
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
      this.initWebSocket();
    },
    websocketonmessage(e){ //数据接收 二进制 (0x11 0x22 0x33 0X44)-->float  只接收数据，不绘制
      const redata = JSON.parse(e.data);
      let relength=redata.length
      if(this.data.length<this.length){
        for (let i=0; i < relength; i++) {//一次1024
          this.data.push([this.x, redata[i]])
          this.x++
        }
        this.reDraw()
      }else{
        for(let j=relength,i=0;j<this.length;j++){//3072个循环
          this.data[j][0]=i
          i++
        }
        // let data1=this.data.slice(1024,4096)//拷贝原数组的3072个数据，但是个拷贝，原数组还在
        // this.data=[]
        // this.data=data1
        this.data.splice(0, relength)//原地删除start开始的deleteCount个数据
        for (let i=0,j=this.length-relength; i < relength; i++) {//最费时间，影响性能，替换1024个点
          this.data.push([j, redata[i]])
          j++
        }
        this.reDraw()
      }
    },
    websocketclose(e){  //关闭
      this.websocket.close()
      console.log('断开连接',e);
      //this.initWebSocket();
      //console.log('重连');
    },
    websocketsend(Data){//数据发送
      this.websocket.send(Data);
    },

    //重绘有关方法
    reDraw(){
      this.charts.setOption({
        animation: false,
        series: [
          {
            data: this.data
          }
        ]
      })  //确保数据更新时，标线也不会动
    },
  },
  mounted() {
    this.$nextTick(function() {//绘图
      this.drawLine('main')//main是容器id

    })

    this.initWebSocket();
  },
}
</script>

<style scoped>

</style>
