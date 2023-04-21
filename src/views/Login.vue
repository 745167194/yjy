<template><!-- ref=id  :rules:表单验证  :model = v-bind 实现双向数据绑定 -->
   <div class="background">
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" autocomplete="on" label-position="left" class="login-form" >
        <div class="logo-container">
          <img class="logo" src="../assets/login_logo.png" alt="logo">
        </div>
        <el-form-item prop="account" >
          <el-input ref="account" v-model="loginForm.account" placeholder="Account" name="account" prefix-icon="el-icon-user-solid"/>
        </el-form-item>
        <el-form-item prop="password" >
          <el-input class="myinput" ref="password" v-model="loginForm.password" type='password' placeholder="Password"
                    name="password" show-password prefix-icon="el-icon-lock"/>
        </el-form-item>
        <el-button type="primary" class="login-button" @click="submitForm('loginForm')">Login</el-button>
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
      }
    },

    methods:{
      submitForm(formName){
          if (this.loginForm.account && this.loginForm.password) {
            this.getAdmin()
          }
          else {
            this.$message({
              message: '请输入用户名密码',
              type: 'warning'
            });
          }

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


<style lang="scss" scoped>

//最大背景容器
.background{
  width: 100%;
  height: 100%;
  background:url("../assets/login_bg.png") fixed no-repeat;
  background-size: cover;
  text-align: center //实现水平居中
}

.login-container {

}

//表单容器
.login-form{
  width: 400px;
  height: 500px;
  border-radius:10px;
  position :absolute;
  top: 50%;//先像左移动一半的距离
  margin-top: -250px; //减去宽度的一半，实现元素绝对定位下的居中
  left: 50%;//先像左移动一半的距离
  margin-left: -200px; //减去宽度的一半，实现元素绝对定位下的居中
  background-color:rgba(0,0,0,0.10);//最后一个表示透明度，如果用opacity则里面的元素也会变透明
  border: solid 1px rgba(255,255,255,0.10);
}

//logo容器
.logo-container{
  margin-bottom: 40px;
  margin-top: 80px;
}

.el-input{
  //el-input高度不能直接用height，只能通过type="textarea" :rows="8"来实现，但是这样会导致输入不只一行，非常难看
  // 所以另外定义一个使用无lang="scss"的样式，如代码最后所定义
  border-radius: 20px;
  width: 300px;
  height: 45px;
  outline-color: rgba(83, 160, 0, 0.61);
}

.el-form-item{
  margin-top: 20px;
}

.login-button{
  margin-top: 30px;
  width: 300px;
  height: 45px;
  border-radius: 20px;
  background-color: #8cc5ff;
}
.tips{
  margin-top: 20px;
  color: white;
}


</style>

<style scoped>


/deep/ .el-input__inner{
  width: 300px;
  height: 45px;
  left:50%;
  padding-left: 50px;
  border-radius: 20px;
  background-color:rgba(0,0,0,0);
  border:solid 1px rgba(255,255,255,0.5);
  color: white;
}
/deep/ .el-input__inner:hover{
  border:solid 1px white;
}

</style>
