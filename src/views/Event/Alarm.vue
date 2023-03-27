<template>
  <div>
    <el-slider v-if="showPage" v-model="value" show-input :format-tooltip="formatTooltip"></el-slider>
    alarm
  </div>
</template>

<script>
export default {
  name: "Alarm",
  data(){
    return{
      value:50,
      showPage:false
    }
  },
  methods :{
    formatTooltip(){
      this.$api.CallRpc('changeSlider','changeSlider', {value:this.value})
    }
  },

  created() {
    this.$nextTick(() => {
      this.$api.CallRpc('applyTCPIP','applyTCPIP')
        .then(res=>{
        this.showPage=true
      })
    })
  }
}
</script>

<style scoped>

</style>
