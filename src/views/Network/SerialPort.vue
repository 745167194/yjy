<template>
  <div>
    <el-form :model="Form" ref="Form" label-width="150px" label-position="left">

      <el-form-item label="串口编号" prop="SerialPortNum">
        <el-select v-model="Form.SerialPortNum">
          <el-option label="COM1" value="COM1" ></el-option>
          <el-option label="COM2" value="COM2" ></el-option>
          <el-option label="COM3" value="COM3" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="波特率" prop="BPS">
        <el-select v-model="Form.BPS">
          <el-option label="115200" value="115200" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="校验位" prop="CheckBit">
        <el-select v-model="Form.CheckBit">
          <el-option label="000" value="000" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据位" prop="DataBit">
        <el-select v-model="Form.DataBit">
          <el-option label="9" value="9" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="停止位" prop="StopBit">
        <el-select v-model="Form.StopBit">
          <el-option label="0" value="0" ></el-option>
        </el-select>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm()">Apply</el-button>

        <el-button  style="margin: 20px" @click="Default()">Default</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SerialPort",
  data(){
    return{
      Form:{
        SerialPortNum:'COM1',
        BPS:'115200',
        CheckBit:'000',
        DataBit:'9',
        StopBit:'0'
      }
    }
  },
  methods:{
    submitForm() {
      let data=this.Form
      this.$api.CallRpc('SerialPortSetting','SerialPortSetting',data)
    },
    Refresh(){
      this.$refs.Form.resetFields();
    },
    Default(){

    },
  }

}
</script>

<style scoped>

</style>
