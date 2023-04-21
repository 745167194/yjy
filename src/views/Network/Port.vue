<template>
  <div>
    <el-form :model="Form" ref="Form" label-width="150px" :rules="FormRules" label-position="left">
      <el-form-item :label="$t('networkIndex.portIndex.maxConnection')" prop="MaxConnection">
        <div style="display:flex">
        <el-input-number v-model="Form.MaxConnection" :min="1" :max="20" ></el-input-number>
        <div> (1~20)</div>
        </div>
      </el-form-item>

      <el-form-item :label="$t('networkIndex.portIndex.tcpPort')" prop="TCPPort">
        <div style="display:flex">
          <el-input-number v-model="Form.TCPPort" :min="1025" :max="65534" ></el-input-number>
          <div> (1025~65534)</div>
        </div>
      </el-form-item>

      <el-form-item :label="$t('networkIndex.portIndex.udpPort')" prop="UDPPort">
        <div style="display:flex">
          <el-input-number v-model="Form.UDPPort" :min="1025" :max="65534" ></el-input-number>
          <div> (1025~65534)</div>
        </div>
      </el-form-item>

      <el-form-item :label="$t('networkIndex.portIndex.httpPort')" prop="HTTPPort">
        <div style="display:flex">
          <el-input-number v-model="Form.HTTPPort" ></el-input-number>
        </div>
      </el-form-item>

      <el-form-item :label="$t('networkIndex.portIndex.rtspPort')" prop="RTSPPort">
        <div style="display:flex">
          <el-input-number v-model="Form.RTSPPort" ></el-input-number>
        </div>
      </el-form-item>

      <el-form-item :label="$t('networkIndex.portIndex.rtmpPort')" prop="RTMPPort">
        <div style="display:flex">
          <el-input-number v-model="Form.RTMPPort" :min="1025" :max="65534" ></el-input-number>
          <div> (1025~65534)</div>
        </div>
      </el-form-item>

      <el-form-item :label="$t('networkIndex.portIndex.httpsPort')" prop="HTTPSPort">
        <div style="display:flex">
          <el-input-number v-model="Form.HTTPSPort" ></el-input-number>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">{{ $t('apply') }}</el-button>
        <el-button  style="margin: 20px" @click="Default()">{{ $t('default') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ipInput from "../../components/Input/ipInput.vue";
import macInput from "../../components/Input/macInput.vue";
import {number} from "echarts/lib/export";

export default {
  name: "Port",
  data(){
    return{
      Form: {//表单数据
        MaxConnection: '10',
        TCPPort:'37779',
        UDPPort: '37778',
        HTTPPort: '80',
        RTSPPort:'554',
        RTMPPort:'1934',
        HTTPSPort:'443',
      },
      FormRules:{
        TCPPort: [
          { required: true, type:"number" ,min: 37779, max: 37779,
            message: 'Operation failed. Port is already occupied.',trigger: 'change' }
        ],
        UDPPort: [
          { required: true, type:"number" ,min: 37778, max: 37778,
            message: 'Operation failed. Port is already occupied.',trigger: 'change' }
        ],
        HTTPPort: [
          { required: true, type:"number" ,min: 80, max: 80,
            message: 'Operation failed. Port is already occupied.',trigger: 'change' }
        ],
        RTSPPort: [
          { required: true, type:"number" ,min: 554, max: 554,
            message: 'Operation failed. Port is already occupied.',trigger: 'change' }
        ],
        HTTPSPort: [
          { required: true, type:"number" ,min: 443, max: 443,
            message: 'Operation failed. Port is already occupied.',trigger: 'change' }
        ],
      }
    }
  },
  components:{
    ipInput,
    macInput
  },
  methods:{
    submitForm() {
      this.$refs.Form.validate((valid) => {
        if (valid) {
          let data=this.Form
          this.$api.CallRpc('applyPort','applyPort',data)
          this.$message({message: '创建成功！', type: 'success'});//弹出成功提示框
        } else {
          this.$message.error("创建失败");//弹出成功提示框
          return false;
        }
      });
    },
    Default(){

    },
    getIp(data){
      this.ipInfo=data;
    }
  }
}
</script>

<style scoped>

</style>
