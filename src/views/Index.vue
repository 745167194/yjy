<template>
  <div  >
      <!--主页面-->
      <el-container>
        <el-header style="font-size: 12px;">
          <div style="float: left" ><i class="el-icon-s-fold"></i></div>
          <div style="float:right ">
            <el-dropdown >
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>管理员中心</el-dropdown-item>
                <el-dropdown-item @click.native="outlog">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>{{$store.getters.getAdmin.name}}</span>
          </div>
        </el-header>

        <el-main>
          <div class="div1">
            <div class="smallcon" @click="saveState">
              local
            </div>
            <div class="smallcon" @click="camera">
              camera
            </div>
            <div class="smallcon" @click="network">
              Network
            </div>
            <div class="smallcon" @click="myevent">
              Event
            </div>
          </div>
          <div class="div2">
            <div class="smallcon">
              storage
            </div>
            <div class="smallcon" @click="system">
              System
            </div>
            <div class="smallcon">
              System info
            </div>
            <div class="smallcon" @click="log">
              Log
            </div>
          </div>
        </el-main>
      </el-container>
  </div>
</template>

<script>
export default {
  name: "Index",

  methods:{
    saveState(){
      //保存state,使得刷新后还能得到原来的state数据
      console.log("network state:"+
        JSON.stringify(this.$store.state.admin));
      sessionStorage.setItem('isLogin', true);//设置登录状态
      sessionStorage.setItem('state',JSON.stringify(this.$store.state.admin));
      //sessionStorage只能传递字符串,所以将state转化为JSON类型的字符串来存储state
    },
    outlog(){
      console.log("退出登录");
      sessionStorage.setItem('isLogin',false);//设置登录状态
      this.$router.push({name:'Login'});
    },
    network(){
      this.$router.push({name:'Network'});
    },
    system(){

    },
    myevent(){

    },
    log(){

    },
    camera(){

    }
  }
}
</script>

<style lang="scss" scoped>
.smallcon{
  width: 300px ;
  height: 300px;
  margin: 10px ;
  border:1px solid #DCDFE6;
  box-shadow:0 0 30px #DCDFE6;
  border-radius:5px;
}
.smallcon:hover{
  transform: scale(1.05);//四周变大
}
.div1{
  display: flex;
  margin-top:250px;
  height:300px;
  margin-left:300px;
}
.div2{
  display: flex;
  margin-top:20px;
  height:300px;
  margin-left:300px;
}
</style>
