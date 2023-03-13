<template>
  <div>
    <el-slider v-if="showPage" v-model="value" show-input :format-tooltip="formatTooltip"></el-slider>
  </div>
</template>

<script>
export default {
  name: "Alarm",
  data(){
    return{
      value:0,
      showPage:false
    }
  },
  methods :{
    formatTooltip(){//有一些问题
      this.$api.slider.changeSlider1(this.value).then(res=>{
      })
    }
  },

  created() {
    this.$nextTick(() => {
      this.$api.slider.getSlider1().then(res=>{
        this.value=res.data.data.number
        this.showPage=true
      })
    })
  }
}
</script>

<style scoped>

</style>
