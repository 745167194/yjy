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
import request from "../../utils/request";

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
    //axios.get('http://localhost:3008/data').then(response=>this.info=response.data);
    request.get('/data').then(res=>this.info=res.data)
  }
}
</script>

<style scoped>

</style>
