<template>
  <div>
    <el-form :model="Form" ref="Form" label-width="280px" label-position="left">
      <el-form-item :label="$t('networkIndex.basicServiceIndex.ssh')" prop="SSH">
        <el-switch v-model="Form.SSH"></el-switch>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.basicServiceIndex.search')" prop="Search" >
        <el-switch v-model="Form.Search"></el-switch>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.basicServiceIndex.cgi')" prop="CGI">
        <el-switch v-model="Form.CGI"></el-switch>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.basicServiceIndex.onvif')" prop="ONVIF" >
        <el-switch v-model="Form.ONVIF"></el-switch>
      </el-form-item>
      <!--视频管理协议
      <el-form-item label="Genetec" prop="Genetec" >
        <el-switch v-model="Form.Genetec"></el-switch>
      </el-form-item>-->
      <el-form-item :label="$t('networkIndex.basicServiceIndex.mobilePushNotifications')" prop="Push" >
        <el-switch v-model="Form.Push"></el-switch>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.basicServiceIndex.privateProtocolAuthenticationMode')" >
        <el-select v-model="Form.PrivateProtocol" >
          <el-option :label="$t('networkIndex.basicServiceIndex.securityMode')" value="1" ></el-option>
          <el-option :label="$t('networkIndex.basicServiceIndex.compatibleMode')" value="2" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.basicServiceIndex.onlineLogBackup')" prop="LogBackup" >
        <el-switch v-model="Form.LogBackup"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">{{ $t('apply') }}</el-button>
        <el-button  style="margin: 20px" @click="Default()">{{ $t('default') }}</el-button>
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
    Default(){
      this.$refs.Form.resetFields();
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
