<template>
  <div style="height: 100%">
    <el-container>
        <!--边栏导航-->
        <el-menu :default-openeds='defaultOpenedsArray' router :default-active="this.$route.path" :isCollapse="isCollapse" class="el-menu-vertical">  <!--router属性：会将index作为path进行跳转-->
          <!--默认导航index=1的打开-->
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>导航一</template>
            <el-menu-item index="1-1">
              <el-button @click="saveState">控制台信息</el-button>
            </el-menu-item>
            <el-menu-item index="/upload">
              <span slot="title">上传文件</span>
            </el-menu-item>
            <el-menu-item index="/form1">
              <span slot="title">表单1</span>
            </el-menu-item>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
                <el-menu-item index="/tabs">
                  <span slot="title">标签页+表格</span>
                </el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item index="/table">
              <span slot="title">table</span>
            </el-menu-item>
            <el-menu-item index='/list'>
              <span slot="title">list</span>
              <!--
              <router-link :to="{name:'List',params:{id:2}}">list</router-link>-->
              <!--使用路由传参，{index中配置的路由name,传递的参数}-->
            </el-menu-item>
            <el-menu-item index="/axiostest">Axiostest</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>导航三</template>
            <el-menu-item index="/line">
              <span slot="title">line</span>
            </el-menu-item>
            <el-menu-item index="/pie">
              <span slot="title">饼状图</span>
            </el-menu-item>
            <el-menu-item index="/barline">
              <span slot="title">柱+折</span>
            </el-menu-item>
            <el-menu-item index="/radar">
              <span slot="title">雷达图</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item  :index="'/goMain/'+$store.getters.getAdmin.name">
            <span slot="title"><i class="el-icon-s-home"></i>回到主页</span>
          </el-menu-item>
        </el-menu>


      <!--主页面-->
      <el-container>
        <el-header style="font-size: 12px;">
          <div style="float: left" @click="toggleCollapse"><i class="el-icon-s-fold"></i></div>
          <div style="float:right ">
            <i class="el-icon-s-home" @click="toIndex"></i>
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
          <router-view/>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Layout',
    data(){
      return {
        isCollapse: true,//true：菜单栏收缩；false：菜单栏展开
        defaultOpenedsArray:[]//默认打开打开的菜单
      }
    },
    methods: {
      saveState(){
        //保存state,使得刷新后还能得到原来的state数据
        console.log("layout state:"+
          JSON.stringify(this.$store.state.admin));
        sessionStorage.setItem('state',JSON.stringify(this.$store.state.admin));
        //console.log("state:"+sessionStorage.getItem('state'));
        //sessionStorage只能传递字符串,所以将state转化为JSON类型的字符串来存储state
      },
      outlog(){
        console.log("退出登录");
        sessionStorage.setItem('isLogin',false);//设置登录状态
        this.$router.push({name:'Login'});
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      toggleCollapse () {//菜单折叠与展开
        this.isCollapse = !this.isCollapse;
        console.log("collapse?"+this.isCollapse)
      },
      toIndex(){
        this.$router.push({name:'Index'});
      }
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
    width: 320px;
    height: 100%;
  }

</style>
