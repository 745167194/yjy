<template>
  <div>
    <el-slider v-model="value" show-input :format-tooltip="formatTooltip"></el-slider>
  </div>
</template>

<script>
export default {
  name: "Alarm",
  data(){
    return{
      value:50
    }
  },
  methods :{
    formatTooltip(val){
      console.log('滑块值：'+val)
      this.$api.slider.changeSlider1(val).then(res=>{
        console.log("发送值：",res.data.data.slider)
      })
      return val
    }
  },
  mounted() {
    this.$api.slider.getSlider1().then(res=>{
      console.log("return data:",res.data)
      this.value=res.data.number
    })
  }
}
</script>

<style scoped>

</style>
