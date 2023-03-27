<template>
  <div style="background-color: #333333;height: 100%">
    <Curve ref="Curve"></Curve>
  </div>
</template>

<script>
import Curve from '../../components/Chart/Curve.vue'
export default {
  name: "chartBar",
  components:{
    Curve
  },
  data() {
    return {
      paramA: "aa",
      paramB: 123,
      food: "",
      drink: "",
      num: 2, // 两碗饭
    }
  },
  mounted() {
    //this.initWebSocket();
  },
  sockets: {
    // 连接成功
    onopen() {
      console.log("socket success");
    },
    // 接收消息
    onmessage(e) {
      console.log("===data", JSON.parse(e.data));
      // 服务端传过来的值
      let { event, data } = JSON.parse(e.data);
      // 妈妈：饭好了事件
      if(event === "FOOD_DONE") {
        this.getFood(data);
      };
    },
    // 连接报错
    onerror() {},
    // 关闭连接
    onclose() {
      console.log("socket close");
    },
  },
  destroyed() {
    // 销毁websocket
    //this.$disconnect();
  },
  methods:{
    initWebSocket(){
      this.$connect('//localhost:3000')
    },
    getFood(data){
      this.food=data.food||"";
      this.drink = data.drink||"";
    },
    // 吃饭事件，把吃了几碗饭告诉妈妈
    // ws中ws.send实现，注意JSON.stringify转下格式或其他服务端要的格式
    haveFood() {
      this.$socket.sendObj({
        event: "HAVE_FOOD",
        data: this.num
      });
    }
  }
}
</script>

<style scoped>

</style>
