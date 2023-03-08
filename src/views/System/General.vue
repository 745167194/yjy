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
      <el-tab-pane label="Date & Time" name="DT">
        <div class="time_box">
          <template>
            <div >Data</div>
            <span ><h2>{{ date }}</h2></span>
            <div>time</div>
            <span ><h2>{{ time }}</h2></span>
          </template>
        </div>
      </el-tab-pane>
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
      },
      time: '',
      date: '',
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
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

    Timer(){
      let timerID = setInterval(this.updateTime, 1000);
      this.updateTime();
      return timerID
    },
    updateTime() {
      // var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      let cd = new Date();
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
      this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2);
    },
    zeroPadding(num, digit) {
      let zero = '';
      for(let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    }
  },
  mounted(){
    this.Timer();
  },


}
</script>

<style lang="scss" scoped>
.time_box{
  width: 100%;
  height: 200px;
  margin: 10px;
  border-color: #828282;

}

</style>
