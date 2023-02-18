<template>
  <div>
    <el-container>
      <el-aside width="300px">
        <!--边栏导航-->
        <el-menu :default-openeds="['1']">
          <!--默认导航index=1的打开-->
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>导航二</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-message"></i>导航三</template>
            <el-menu-item index="3-1">
              <router-link :to="{name:'Table',params:{id:666}}">table</router-link>
            </el-menu-item>
            <el-menu-item index="3-2">扣小折</el-menu-item>
            <el-menu-item index="3-3">
              <router-link :to="{name:'List',params:{id:2}}">list</router-link><!--使用路由传参，{index中配置的路由name,传递的参数}-->
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3-4">
            <router-link to="/goMain/admin123"><i class="el-icon-message"></i>回到主页</router-link>
          </el-menu-item>
        </el-menu>
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
          <router-view />
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Main'
  }
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
