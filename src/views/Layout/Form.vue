<template>
  <div class="fromsty">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="设备名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="使用项目" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择项目名称">
        <el-option label="项目一" value="项目一"></el-option>
        <el-option label="项目二" value="项目二"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="购买时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;" value-format ="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">——</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;" value-format ="HH:mm:ss"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="即时配送" prop="delivery">
      <el-switch v-model="ruleForm.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="设备类型" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="类型一" name="type"></el-checkbox>
        <el-checkbox label="类型二" name="type"></el-checkbox>
        <el-checkbox label="类型三" name="type"></el-checkbox>
        <el-checkbox label="类型四" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="光之国能量源"></el-radio>
        <el-radio label="魔仙堡能量源"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="备注" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <!--<el-form-item label="双向选择框" prop="">
      <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入城市拼音" v-model="value" :data="transformData"></el-transfer>
    </el-form-item>-->
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button  style="margin: 20px" @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>


  </div>
</template>

<script>
import request from "../../utils/request";

export default {
  name: "Form",
  data() {
    return {
      ruleForm: {//表单数据
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {//限定条件
        name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择使用项目', trigger: 'change' }
        ],
        date1: [
          { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'string', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个设备类型', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log("fromname:"+JSON.stringify(this.ruleForm));
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request.post('/Datatable',//参数，新增不需要id
            {"name": this.ruleForm.name,
            "region": this.ruleForm.region,
            "date1": this.ruleForm.date1,
            "date2": this.ruleForm.date2,
            "delivery": false,
            "type": this.ruleForm.type,
            "resource": this.ruleForm.resource,
            "desc": this.ruleForm.desc}
            //JSON.stringify(this.ruleForm) //这样不行，他会是：JSON.stringify(this.ruleForm)：""
          ).then(res=>{
            console.log(res.data)
          })
          this.$message({message: '创建成功！', type: 'success'});//弹出成功提示框
          this.$refs[formName].resetFields()
        } else {
          console.log('error submit!!');
          this.$message.error("创建失败，请按照格式正确填写");//弹出成功提示框
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
.fromsty{
  width: 700px;
  margin: 20px;
}
</style>
