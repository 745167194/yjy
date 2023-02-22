<template>
  <div>
    <div style="display: flex; margin: 10px;height:150px" >
      <div class="smallcon">
        div1
      </div>
      <div class="smallcon">
       div2
      </div>
      <div class="smallcon">
        div3
      </div>
      <div class="smallcon">
        div4
      </div>
    </div>


    <div class="myline">
      <MyLine style="width: 100%;height: 100%"></MyLine>
    </div>

    <div style="display: flex;">
      <div class="collapse">
        <radar style="width: 100%;height: 100%"></radar>
      </div>
      <div class="collapse">
        <Pie style="width: 100%;height: 100%"></Pie>
      </div>
      <div class="collapse">
        <Collapse ></Collapse>
      </div>

    </div>

  </div>
</template>



<script>
import MyLine from "./Line.vue"
import Collapse from "./Main/Collapse.vue"
import radar from "./Main/Radar.vue";
import Pie from "./Main/Pie.vue"
export default {
  name: "Main",
  date(){
    return{
      value: new Date()
    }
  },
  components: {
    MyLine,
    Collapse,
    radar,
    Pie
  }
}
</script>

<style lang="scss" scoped>

.smallcon{
  width: 450px ;
  height: 100px;
  margin: 20px ;
  border:1px solid #DCDFE6;
  box-shadow:0 0 30px #DCDFE6;
  border-radius:5px;
}
.smallcon:hover{
  transform: scale(1.05);//四周变大
}
.collapse{
  width: 500px;
  height: 450px;
  margin-top: 50px;
  margin-left: 30px;
  margin-right: 30px;
  border:1px solid #DCDFE6;
  box-shadow:0 0 30px #DCDFE6;
  border-radius:5px;
}
.myline{
  border:1px solid #DCDFE6;
  box-shadow:0 0 30px #DCDFE6;
  border-radius:5px;
  height: 350px;
  margin-left: 25px;
}
</style>
