<template>
  <div style="height: 100%;width: 100%">
    <el-container>
      <el-header style="font-size: 12px;">
        <div style="float:right ">
          <i class="el-icon-s-grid icon" style="font-size: 20px;margin-right: 5px" @click="toIndex"></i>
          <i class="el-icon-s-home icon" style="font-size: 20px;margin-right: 5px" @click="toHome"></i>
          <el-dropdown >
            <i class="el-icon-setting icon" style="margin-right: 15px;font-size: 20px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>管理员中心</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{$store.getters.getAdmin.name}}</span>
        </div>
      </el-header>


      <!--主页面-->
      <el-container>
        <!--边栏导航-->
        <el-menu router :default-active="this.$route.path" :isCollapse="isCollapse" class="el-menu-vertical">  <!--router属性：会将index作为path进行跳转-->
          <el-menu-item  index="/general">
            <span slot="title"><i class="el-icon-s-home"></i>General</span>
          </el-menu-item>
          <el-menu-item  index="/account">
            <span slot="title"><i class="el-icon-s-home"></i>Account</span>
          </el-menu-item>
        </el-menu>

        <el-main>
          <router-view/>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
export default {
  name: 'LogIndex',
  data(){
    return {
      isCollapse: true,//true：菜单栏收缩；false：菜单栏展开
    }
  },
  methods: {
    logout(){
      console.log("退出登录");
      sessionStorage.setItem('isLogin',false);//设置登录状态
      this.$router.push('/logout');
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toHome(){
      this.$router.push({name: 'Layout', params: {name: this.$store.getters.getAdmin.name}});
    },
    toIndex(){
      this.$router.push({name:'Index'});
    },
  }
}
</script>

<style lang="scss" >
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
.el-container {
  height:100%;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 240px;
  height: 100%;
}
.icon:hover{
  color:#828282;
}

</style>


