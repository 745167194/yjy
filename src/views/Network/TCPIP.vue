<template>
  <div>
    <el-form :model="Form" ref="Form" label-width="150px" label-position="left">
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

      <el-form-item label="Mac Address:" prop="WifiMac"  >
        <!--MAC地址-->
        <macInput style="width: 440px" v-model="Form.WifiMac" :value="Form.WifiMac"/>
      </el-form-item>

      <el-form-item label="IP Version" prop="IPversion">
        <el-select v-model="Form.IPVersion">
          <el-option label="IPv4" value="IPv4" ></el-option>
          <el-option label="IPv6" value="IPv6" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="IP Address:" prop="IPAddress"  >
        <ipInput style="width: 220px" ref="ip" v-model="Form.IPAddress"></ipInput>
      </el-form-item>
      <el-form-item label="Subnet Mask:" prop="SubnetMask" >
        <ipInput style="width: 220px" ref="ip" v-model="Form.SubnetMask" :autoFocus="true"></ipInput>
      </el-form-item>
      <el-form-item label="Default Gateway:" prop="DefaultGateway" style="margin-top: 5px">
        <ipInput style="width: 220px" ref="ip" v-model="Form.DefaultGateway" :autoFocus="true"></ipInput>
      </el-form-item>
      <el-form-item label="Preferred DNS:" prop="PreferredDNS" style="margin-top: 5px">
        <ipInput style="width: 220px" ref="ip" v-model="Form.PreferredDNS" ></ipInput>
      </el-form-item>
      <el-form-item label="Alternate DNS:" prop="AlternateDNS">
        <ipInput style="width: 220px" ref="ip" v-model="Form.AlternateDNS" ></ipInput>
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
import ipInput from "../../components/Input/ipInput.vue";
import macInput from "../../components/Input/macInput.vue";
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
        IPAddress:'',
        SubnetMask:'255255255255',
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
      console.log("掩码:"+this.Form.SubnetMask)
      console.log("MAC地址:"+this.Form.WifiMac)

    },
    Refresh(form){

    },
    Default(form){

    },
  }
}
</script>

<style scoped>

</style>
