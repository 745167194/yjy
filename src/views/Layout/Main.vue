<template>
  <div>
    <div class="myline">
      <My_Line ref="My_Line"  style="width: 100%;height: 100%"></My_Line>
    </div>
    <div style="display: flex;  margin-top:20px;margin-left: 10px;">
      <div class="collapse">
        <My_radar ref="My_radar"></My_radar>
      </div>
      <div class="collapse">
        <My_Pie></My_Pie>
      </div>
      <div class="collapse">
        <My_Collapse ></My_Collapse>
      </div>
    </div>
  </div>
</template>



<script>
import My_Line from "../../components/Main/Mainline.vue"
import My_Collapse from "../../components/Main/Collapse.vue"
import My_radar from "../../components/Main/Radar.vue";
import My_Pie from "../../components/Main/Pie.vue"
export default {
  name: "Main",
  date(){
    return{
      value: new Date(),
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

.myline{
  height: 500px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.collapse{
  width: 500px;
  height: 450px;
  margin: 10px;
  border:1px solid #DCDFE6;
  box-shadow:0 0 30px #DCDFE6;
  border-radius:5px;
}

</style>
