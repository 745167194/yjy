<template>
  <div>
    <el-form :model="Form" ref="Form" label-width="150px">
      <el-form-item label="Host Name" prop="host_name">
        <el-input style="width: 220px" v-model="Form.host_name" ></el-input>
      </el-form-item>
      <el-form-item label="ARP/Ping" prop="ARP_Ping">
        <el-switch v-model="Form.ARP_Ping"></el-switch>
      </el-form-item>
      <el-form-item label="NIC" prop="NIC">
        <el-select v-model="Form.NIC" >
          <el-option label="Wired(Default)" value="Wired(Default)" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Mode" prop="Mode">
        <el-radio-group v-model="Form.Mode">
          <el-radio label="Static"></el-radio>
          <el-radio label="DHCP"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Mac Address:" prop="IPversion"  >
        <!--MAC地址-->
        <macInput style="width: 440px" v-model="Form.WifiMac" :value="Form.WifiMac"/>
      </el-form-item>

      <el-form-item label="IP Version" prop="IPversion">
        <el-select v-model="Form.IPVersion">
          <el-option label="IPv4" value="IPv4" ></el-option>
          <el-option label="IPv6" value="IPv6" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IP Address:" prop="IPversion"  >
        <!--key每次点击开始刷新，保证无缓存，以免残留上一次的ip信息；autoFocus是判断IP输入框是否需要自动聚焦-->
        <ipInput style="width: 220px" @getIp="getIp" :iPType="'ip'" :autoFocus="true"></ipInput>
      </el-form-item>
      <el-form-item label="Subnet Mask:" prop="SubnetMask" >
        <!--key每次点击开始刷新，保证无缓存，以免残留上一次的ip信息；autoFocus是判断IP输入框是否需要自动聚焦-->
        <ipInput style="width: 220px" @getIp="getIp" :iPType="'ip'" :autoFocus="true"></ipInput>
      </el-form-item>
      <el-form-item label="Default Gateway:" prop="DefaultGateway" >
        <!--key每次点击开始刷新，保证无缓存，以免残留上一次的ip信息；autoFocus是判断IP输入框是否需要自动聚焦-->
        <ipInput style="width: 220px" @getIp="getIp" :iPType="'ip'" :autoFocus="true"></ipInput>
      </el-form-item>
      <el-form-item label="Preferred DNS:" prop="PreferredDNS">
        <!--key每次点击开始刷新，保证无缓存，以免残留上一次的ip信息；autoFocus是判断IP输入框是否需要自动聚焦-->
        <ipInput style="width: 220px" @getIp="getIp" :iPType="'ip'" :autoFocus="true"></ipInput>
      </el-form-item>
      <el-form-item label="Alternate DNS:" prop="AlternateDNS">
        <!--key每次点击开始刷新，保证无缓存，以免残留上一次的ip信息；autoFocus是判断IP输入框是否需要自动聚焦-->
        <ipInput style="width: 220px" @getIp="getIp" :iPType="'ip'" :autoFocus="true"></ipInput>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Apply</el-button>
        <el-button  style="margin: 20px" @click="Refresh('ruleForm')">Refresh</el-button>
        <el-button  style="margin: 20px" @click="Default('ruleForm')">Default</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "../../utils/request";
import ipInput from "../../components/ipInput.vue";
import macInput from "../../components/macInput.vue";
export default {
  name: "TCPIP",
  data(){
    return{
      Form: {//表单数据
        host_name: 'IPC',
        ARP_Ping: true,
        NIC: 'Wired(Default)',
        Mode: 'Static',
        WifiMac:'',
        IPVersion:'IPv4',
        SubnetMask:'',
        DefaultGateway:'',
        PreferredDNS:'',
        AlternateDNS:'',
      },
    }
  },
  components:{
    ipInput,
    macInput
  },
  methods:{
    submitForm(formName) {

    },
    Refresh(form){

    },
    Default(form){

    },
    getIp(data){
      this.ipInfo=data;
    }
  }
}
</script>

<style scoped>

</style>
