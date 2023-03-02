<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" >
      <el-tab-pane label="Basic" name="Basic">
        <el-form :model="Form" ref="Form" label-width="200px">
          <el-form-item label="Device Name" prop="Dev">
            <el-input style="width: 220px" v-model="Form.Dev"></el-input>
          </el-form-item>
          <el-form-item label="Video Standard" prop="VS">
            <el-select v-model="Form.VS">
              <el-option label="PAL" value="1" ></el-option>
              <el-option label="NTSC" value="2" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Apply</el-button>
            <el-button  style="margin: 20px" @click="Refresh('ruleForm')">Refresh</el-button>
            <el-button  style="margin: 20px" @click="Default('ruleForm')">Default</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>
      <el-tab-pane label="Date & Time" name="DT">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "General",
  data() {
    return {
      activeName: 'Basic',
      Form:{
        Dev:'',
        VS:'1'
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
  }
}
</script>

<style scoped>

</style>
