<template>
  <div  style="height: 100%;background-color: #283443">
      <!--主页面-->
      <el-container>
        <el-header>
          <div style="float: left;height:100%" >
            <img class="logo" src="../assets/R-C.png" alt="logo">
          </div>
          <div style="float:right ">

            <el-dropdown >
              <i class="el-icon-setting icon" style="margin-right: 15px;font-size: 20px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>管理员中心</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span style="color: #333333">{{$store.getters.getAdmin.name}}</span>
          </div>
        </el-header>

        <el-main>
          <div class="indexButton">
          <div class="div1">
            <div class="smallcon" @click="layout">
1
            </div>
            <div class="smallcon" @click="chart">
chart
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
5
            </div>
            <div class="smallcon" @click="system">
              System
            </div>
            <div class="smallcon">
7
            </div>
            <div class="smallcon" @click="log">
              Log
            </div>
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
      //console.log("network state:"+
       // JSON.stringify(this.$store.state.admin));
      sessionStorage.setItem('isLogin', true);//设置登录状态
      sessionStorage.setItem('state',JSON.stringify(this.$store.state.admin));
      //sessionStorage只能传递字符串,所以将state转化为JSON类型的字符串来存储state
    },
    logout(){
      //console.log("退出登录");
      sessionStorage.setItem('isLogin',false);//设置登录状态
      this.$router.push('/logout');
    },
    network(){
      this.$router.push({name:'Network'});
    },
    system(){
      this.$router.push({name:'System'});
    },
    myevent(){
      this.$router.push({name:'EventIndex'});
    },
    log(){
      this.$router.push({name:'LogIndex'});
    },
    layout(){
      //this.$router.push({name: 'Layout', params: {name: this.$store.getters.getAdmin.name}});
    },
    chart(){
      this.$router.push({name: 'ChartIndex'});
    },
  }
}
</script>

<style lang="scss" scoped>

.smallcon{
  width: 300px ;
  height: 300px;
  text-align: center;
  margin: 10px ;
  //border:1px solid #DCDFE6;
  //box-shadow:0 0 30px #DCDFE6;
  border-radius:10px;

}
.smallcon:hover{
  //transform: scale(1.05);//四周变大
  background-color: #F0F8FF;
  color: #20a0ff;

}
.div1{
  justify-content: center;
  display: flex;
  height:320px;
  border-radius:10px;
}
.div2{
  border-radius:10px;
  display: flex;
  height:320px;
  bottom: 0;
  justify-content: center;
}
.icon:hover{
  color:#505050;
}
.logo{
  width: 100%;
  height: 100%;
  object-fit: contain;

}
.indexButton{
  background-color: white;
  position: absolute;
  height: 640px;
  width: 1200px;
  bottom: 10px;
  left: 50%;//先像左移动一半的距离
  margin-left: -600px; //减去宽度的一半，实现元素绝对定位下的居中
  box-shadow:0 0 30px black;
  border-radius:10px;
}
.el-header{
  font-size: 12px;
  background-color: white;
  box-shadow:0 0 30px black;
}
</style>
