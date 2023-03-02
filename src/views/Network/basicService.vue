<template>
  <div>
    <el-form :model="Form" ref="Form" label-width="200px" >
      <el-form-item label="SSH" prop="SSH">
        <el-switch v-model="Form.SSH"></el-switch>
      </el-form-item>
      <el-form-item label="Multicast/Broadcast Search" prop="Search" label-width="100px">
        <el-switch v-model="Form.Search"></el-switch>
      </el-form-item>
      <el-form-item label="CGI" prop="CGI" label-width="100px">
        <el-switch v-model="Form.CGI"></el-switch>
      </el-form-item>
      <el-form-item label="ONVIF" prop="ONVIF" label-width="100px">
        <el-switch v-model="Form.ONVIF"></el-switch>
      </el-form-item>
      <el-form-item label="Genetec" prop="Genetec" label-width="100px">
        <el-switch v-model="Form.Genetec"></el-switch>
      </el-form-item>
      <el-form-item label="Mobile Push Notifications" prop="Push" label-width="100px">
        <el-switch v-model="Form.Push"></el-switch>
      </el-form-item>
      <el-form-item label="Private Protocol Authentication Mode" prop="PrivateProtocol">
        <el-select v-model="Form.PrivateProtocol" >
          <el-option label="Security Mode (Recommended)" value="1" ></el-option>
          <el-option label="Compatible Mode" value="2" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Online Log Backup" prop="LogBackup" label-width="100px">
        <el-switch v-model="Form.LogBackup"></el-switch>
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
  }

}
</script>

<style scoped>

</style>
