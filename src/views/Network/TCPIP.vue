<template>
  <div>
    <el-form :model="Form" ref="Form" label-width="150px" label-position="left">
      <el-form-item :label="$t('networkIndex.tcpipIndex.hostName')" prop="host_name">
        <el-input style="width: 220px" v-model="Form.host_name" ></el-input>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.tcpipIndex.arp')" prop="ARP_Ping">
        <el-switch v-model="Form.ARP_Ping"></el-switch>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.tcpipIndex.nic')" prop="NIC">
        <el-select v-model="Form.NIC" >
          <el-option :label="$t('networkIndex.tcpipIndex.wired')" value="Wired" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.tcpipIndex.mode')" prop="Mode">
        <el-radio-group v-model="Form.Mode">
          <el-radio :label="$t('networkIndex.tcpipIndex.static')" value="static"></el-radio>
          <el-radio :label="$t('networkIndex.tcpipIndex.dhcp')" value="DHCP"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('networkIndex.tcpipIndex.mac')" prop="WifiMac"  >
        <!--MAC地址-->
        <macInput style="width: 280px" v-model="Form.WifiMac" :value="Form.WifiMac" ref="Mac"/>
      </el-form-item>

      <el-form-item :label="$t('networkIndex.tcpipIndex.ipVersion')" prop="IPversion">
        <el-select v-model="Form.IPVersion">
          <el-option label="IPv4" value="IPv4" ></el-option>
          <el-option label="IPv6" value="IPv6" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.tcpipIndex.ip')" prop="IPAddress"  >
        <ipInput1 style="width: 220px" ref="IPAddress" v-model="Form.IPAddress"></ipInput1>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.tcpipIndex.subnetMask')" prop="SubnetMask" >
        <ipInput2 style="width: 220px" ref="SubnetMask" v-model="Form.SubnetMask" :autoFocus="true"></ipInput2>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.tcpipIndex.defaultGateway')" prop="DefaultGateway" style="margin-top: 5px">
        <ipInput3 style="width: 220px" ref="DefaultGateway" v-model="Form.DefaultGateway" :autoFocus="true"></ipInput3>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.tcpipIndex.preferredDns')" prop="PreferredDNS" style="margin-top: 5px">
        <ipInput4 style="width: 220px" ref="PreferredDNS" v-model="Form.PreferredDNS" ></ipInput4>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.tcpipIndex.alternateDns')" prop="AlternateDNS">
        <ipInput5 style="width: 220px" ref="AlternateDNS" v-model="Form.AlternateDNS" ></ipInput5>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm()">{{ $t('apply') }}</el-button>

        <el-button  style="margin: 20px" @click="Default()">{{ $t('default') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "../../utils/request";
import ipInput1 from "../../components/Input/ipInput.vue";
import macInput from "../../components/Input/macInput.vue";
import ipInput2 from "../../components/Input/ipInput.vue";
import ipInput3 from "../../components/Input/ipInput.vue";
import ipInput4 from "../../components/Input/ipInput.vue";
import ipInput5 from "../../components/Input/ipInput.vue";

export default {
  name: "TCPIP",
  data(){
    return{
      Form: {//表单数据
        host_name: 'IPC',
        ARP_Ping: true,
        NIC: 'Wired',
        Mode: 'static',
        WifiMac:'',
        IPVersion:'IPv4',
        IPAddress:'',
        SubnetMask:'',
        DefaultGateway:'',
        PreferredDNS:'',
        AlternateDNS:'',
      },
    }
  },
  components:{
    ipInput1,
    ipInput2,
    ipInput3,
    ipInput4,
    ipInput5,
    macInput
  },
  methods:{
    submitForm() {
      let data=this.Form
      this.$api.CallRpc('applyTCPIP','applyTCPIP',data)
    },
    Refresh(){
      this.$refs.Form.resetFields();
    },
    Default(){

    },
  },
  mounted() {
    this.$refs.IPAddress.initValue("10.12.4.200")//ip地址初始化
    this.$refs.SubnetMask.initValue("255.255.240.0")//子网掩码初始化
    this.$refs.DefaultGateway.initValue("10.12.0.1")//默认网关初始化
    this.$refs.PreferredDNS.initValue("114.114.114.114")//首选域名解析初始化
    this.$refs.AlternateDNS.initValue("202.101.172.47")//替代域名解析初始化
    this.$refs.Mac.initValue("50-2B-73-A9-61-29")
  }
}
</script>

<style scoped>

</style>
