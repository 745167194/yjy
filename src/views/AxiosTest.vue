<template>
<div>
  <div>
    姓名：{{info.username}}
  </div>
  <div>
    id:{{info.id}}
  </div>
</div>
</template>

<script>
import axios from "axios";


export default {
  name: "AxiosTest",
  data(){
    return {
      info:{
        username:'',
        id:''
      }
    }
  },
  mounted() {
    axios.get('../static/result.json').then(response=>this.info=response.data);
  }
}
</script>

<style scoped>

</style>
