<template>
  <div> <!-- ref=id  :rules:表单验证  :model = v-bind 实现双向数据绑定 -->
    <el-form ref="form" :rules="rules" :model="form" class="login-box">
      <h3 class="login-title">欢迎登陆</h3>
      <el-form-item label="账号:" prop="name"><!--将需要验证的属性使用prop传递-->
        <el-input type="text" v-model="form.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-button type="primary"  @click="submitForm('form')">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { valid } from 'semver'
  export default{
    name:'Login',
    data(){
      return{
        form:{
          name:'',//form:name
          password:''//form:password
        },
        rules:{
          name:[{//prop=name
            required:true,
            message:'请输入用户名',
            trigger:'blur'
          }],
          password:[{//prop=password
            required:true,
            message:'请输入密码',
            trigger:'blur'
          }]
        }
      }
    },
    methods:{
      submitForm(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            sessionStorage.setItem('isLogin',true);//设置登录状态
            this.$store.dispatch("asyncUpdateAdmin",{name:this.form.name});//传递store
            this.$router.push({name:'Layout',params:{name:this.form.name}});//传参{name:推到页面名,prarms:{传递参数名:参数}}
            //this.$router.push('/main');
          }
          else{
            this.$message({
            message: '用户名或密码错误',
            type: 'warning'});
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-box{
    width:350px;
    margin:120px auto;
    border:1px solid #DCDFE6;
    padding:20px;
    border-radius:5px;
    box-shadow:0 0 30px #DCDFE6;
  }
  .login-title{
    text-align: center;
  }
</style>
