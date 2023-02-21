<template>
  <div style="height: 100%">
    <el-container>
      <el-aside style="width: 250px">
        <el-scrollbar >
        <!--边栏导航-->
        <el-menu :default-openeds="['1']"  router @open="handleOpen"
                 @close="handleClose">  <!--router属性：会将index作为path进行跳转-->
          <!--默认导航index=1的打开-->
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>导航一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="/form1">
              <span slot="title">表单1</span>
            </el-menu-item>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>导航二</template>
            <el-menu-item index="/table">
              <span slot="title">table</span>
            </el-menu-item>
            <el-menu-item index='/list'>
              <span slot="title">list</span>
              <!--
              <router-link :to="{name:'List',params:{id:2}}">list</router-link>-->
              <!--使用路由传参，{index中配置的路由name,传递的参数}-->
            </el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-message"></i>导航三</template>
            <el-menu-item index="/line">
              <span slot="title">line</span>
            </el-menu-item>
            <el-menu-item index="/pie">
              <span slot="title">饼状图</span>
            </el-menu-item>
            <el-menu-item index="/barline">
              <span slot="title">柱+折</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/goMain/admin123">
            <span slot="title">回到主页</span>
          </el-menu-item>
        </el-menu>
        </el-scrollbar>
      </el-aside>

      <!--主页面-->
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>管理员中心</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{$store.getters.getAdmin.name}}</span>
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
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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
  .el-aside {
    background: #787979;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-aside::-webkit-scrollbar {
    display: none;
  }

</style>
