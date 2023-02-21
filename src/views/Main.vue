<template>
  <div>
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

    <div style="width: 300px;height: 600px;float-wrap: wrap">
      <MyLine style="height: 100%;"></MyLine>
    </div>
    <div style="width: 500px;height: 300px">
      <el-calendar v-model="value" ></el-calendar>
    </div>


  </div>
</template>



<script>
import MyLine from "./Line.vue"
export default {
  name: "Main",
  date(){
    return{
      value: new Date()
    }
  },
  components: {
    MyLine
  }
}
</script>

<style lang="scss" scoped>
.smallcon{
  width: 300px ;
  height: 100px;
  float: left;
  margin: 50px;
  background: #1482f0;
}
</style>
