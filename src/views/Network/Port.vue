<template>
  <div>
    <el-form :model="Form" ref="Form" label-width="150px" :rules="FormRules">
      <el-form-item label="Max Connection:" prop="MaxConnection">
        <div style="display:flex">
        <el-input-number v-model="Form.MaxConnection" :min="1" :max="20" label="请输入数量"></el-input-number>
        <div> (1~20)</div>
        </div>
      </el-form-item>

      <el-form-item label="TCP Port:" prop="TCPPort">
        <div style="display:flex">
          <el-input-number v-model="Form.TCPPort" :min="1025" :max="65534" label="请输入数量"></el-input-number>
          <div> (1025~65534)</div>
        </div>
      </el-form-item>

      <el-form-item label="UDP Port:" prop="UDPPort">
        <div style="display:flex">
          <el-input-number v-model="Form.UDPPort" :min="1025" :max="65534" label="请输入数量"></el-input-number>
          <div> (1025~65534)</div>
        </div>
      </el-form-item>

      <el-form-item label="HTTP Port:" prop="HTTPPort">
        <div style="display:flex">
          <el-input-number v-model="Form.HTTPPort" label="请输入数量"></el-input-number>
        </div>
      </el-form-item>

      <el-form-item label="RTSP Port" prop="RTSPPort">
        <div style="display:flex">
          <el-input-number v-model="Form.RTSPPort" label="请输入数量"></el-input-number>
        </div>
      </el-form-item>

      <el-form-item label="RTMP Port:" prop="RTMPPort">
        <div style="display:flex">
          <el-input-number v-model="Form.RTMPPort" :min="1025" :max="65534" label="请输入数量"></el-input-number>
          <div> (1025~65534)</div>
        </div>
      </el-form-item>

      <el-form-item label="HTTPS Port:" prop="HTTPSPort">
        <div style="display:flex">
          <el-input-number v-model="Form.HTTPSPort" label="请输入数量"></el-input-number>
        </div>
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
import ipInput from "../../components/ipInput.vue";
import macInput from "../../components/macInput.vue";
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
          { required: true, type:"443" ,min: 443, max: 443,
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
    submitForm(formName) {
      //console.log("fromname:"+JSON.stringify(this.Form));
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({message: '创建成功！', type: 'success'});//弹出成功提示框
        } else {
          console.log('error submit!!');
          this.$message.error("创建失败");//弹出成功提示框
          return false;
        }
      });
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
