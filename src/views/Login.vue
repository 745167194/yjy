<template>
  <div style="height: 100%"> <!-- ref=id  :rules:表单验证  :model = v-bind 实现双向数据绑定 -->
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">Login Form</h3>
        </div>
        <el-form-item prop="account" >
          <span class="svg-container"><i class="el-icon-user-solid" style="margin-right: 15px;font-size: 20px"></i></span>
          <el-input ref="account" v-model="loginForm.account" placeholder="Account" name="account" type="text"/>
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container"><i class="el-icon-lock" style="margin-right: 15px;font-size: 20px"></i></span>
          <el-input ref="password" v-model="loginForm.password" type='password' placeholder="Password" name="password" show-password/>
        </el-form-item>
        <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="submitForm('loginForm')">Login</el-button>
        <div style="position:relative">
          <div class="tips">
            <span style="margin-right:18px;">Account : admin</span>
            <span>Password : admin</span>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default{
    name:'Login',
    data(){
      return{
        loginForm:{
          account:'',//form:account
          password:''//form:password
        },
        loginRules:{
          account:[{//prop=name
            required:true,
            message:'Please input your account!',
            trigger:'blur'
          }],
          password:[{//prop=password
            required:true,
            message:'Please input your password!',
            trigger:'blur'
          }]
        },
      }
    },

    methods:{
      submitForm(formName){
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.getAdmin()
          }
          else {
            this.$message({
              message: '用户名或密码错误',
              type: 'warning'
            });
          }
        })
      },

      getAdmin(){//用户登录验证
        if(this.loginForm.account==='admin'&&this.loginForm.password==='admin'){
          sessionStorage.setItem('isLogin', true);//设置登录状态
          this.$store.dispatch("asyncUpdateAdmin", {name: this.loginForm.account});//传递store
          this.$router.push({name: 'Index', params: {name: this.loginForm.account}});//传参{name:推到页面名,prarms:{传递参数名:参数}}
        }
        else {
          this.$message({
            message: '用户名或密码错误',
            type: 'warning'
          })
        }
        //this.$api.account.CallRpc('getAdmin','getAdmin')
       /* this.$api.account.getAllAdmin().then(res=>{
          //console.log(res.data)
          let adminList=res.data
          adminList.forEach(element=>{
            if(element.account===this.loginForm.account && element.password===this.loginForm.password){
              this.exist=true
              sessionStorage.setItem('isLogin', true);//设置登录状态
              this.$store.dispatch("asyncUpdateAdmin", {name: this.loginForm.account});//传递store
              this.$router.push({name: 'Index', params: {name: this.loginForm.account}});//传参{name:推到页面名,prarms:{传递参数名:参数}}
            }
          })
          if(!this.exist){
            this.$message({
              message: '用户名或密码错误',
              type: 'warning'
            });
          }
        })*/
      },
    }
  }
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
