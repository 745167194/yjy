<template>
  <div>
    <div class="myline">
      <My_Line style="width: 100%;height: 100%"></My_Line>
    </div>
    <div style="display: flex;">
      <div class="collapse">
        <My_radar style="width: 100%;height: 100%"></My_radar>
      </div>
      <div class="collapse">
        <My_Pie style="width: 100%;height: 100%"></My_Pie>
      </div>
      <div class="collapse">
        <My_Collapse ></My_Collapse>
      </div>
    </div>
  </div>
</template>



<script>
import My_Line from "./Main/Mainline.vue"
import My_Collapse from "./Main/Collapse.vue"
import My_radar from "./Main/Radar.vue";
import My_Pie from "./Main/Pie.vue"
export default {
  name: "Main",
  date(){
    return{
      value: new Date()
    }
  },
  components: {
    My_Line,
    My_Collapse,
    My_radar,
    My_Pie
  },
}
</script>

<style lang="scss" scoped>
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
  height: 500px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
