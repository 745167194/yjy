<template>
  <div>
    <el-form :model="Form" ref="Form" label-width="280px" label-position="left">
      <el-form-item label="SSH" prop="SSH">
        <el-switch v-model="Form.SSH"></el-switch>
      </el-form-item>
      <el-form-item label="Multicast/Broadcast Search" prop="Search" >
        <el-switch v-model="Form.Search"></el-switch>
      </el-form-item>
      <el-form-item label="CGI" prop="CGI">
        <el-switch v-model="Form.CGI"></el-switch>
      </el-form-item>
      <el-form-item label="ONVIF" prop="ONVIF" >
        <el-switch v-model="Form.ONVIF"></el-switch>
      </el-form-item>
      <el-form-item label="Genetec" prop="Genetec" >
        <el-switch v-model="Form.Genetec"></el-switch>
      </el-form-item>
      <el-form-item label="Mobile Push Notifications" prop="Push" >
        <el-switch v-model="Form.Push"></el-switch>
      </el-form-item>
      <el-form-item label="Private Protocol Authentication Mode" >
        <el-select v-model="Form.PrivateProtocol" >
          <el-option label="Security Mode (Recommended)" value="1" ></el-option>
          <el-option label="Compatible Mode" value="2" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Online Log Backup" prop="LogBackup" >
        <el-switch v-model="Form.LogBackup"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">Apply</el-button>
        <el-button  style="margin: 20px" @click="Refresh()">Refresh</el-button>
        <el-button  style="margin: 20px" @click="Default()">Default</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "basicService",
  data(){
    return {
      Form: {
        SSH:true,
        Search:true,
        CGI:true,
        ONVIF:true,
        Genetec:true,
        Push:true,
        PrivateProtocol:'1',
        LogBackup:false
      }
    }
  },
  methods:{
    submitForm() {
      let data=this.Form
      this.$api.CallRpc('basicService','basicService',data)
    },
    Refresh(){
      this.$refs.Form.resetFields();
    },
    Default(){

    },

  }
}
</script>

<style lang="scss" scoped>
.myForm{
  margin-left: 30px;
  background-color: #828282;
}

</style>
