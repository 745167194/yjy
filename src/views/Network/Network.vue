<template>
  <div style="height: 100%;width: 100%">
    <el-container>

        <!--边栏导航-->
        <el-menu
          router :default-active=this.$route.path  class="el-menu-vertical">  <!--router属性：会将index作为path进行跳转-->
          <el-menu-item  index="/TCPIP">
            <span slot="title"><i class="el-icon-s-home"></i>{{ $t('networkIndex.tcpip') }}</span>
          </el-menu-item>
          <el-menu-item  index="/port">
            <span slot="title"><i class="el-icon-s-home"></i>{{ $t('networkIndex.port') }}</span>
          </el-menu-item>
          <el-menu-item  index="/basicService">
            <span slot="title"><i class="el-icon-s-home"></i>{{ $t('networkIndex.basicService') }}</span>
          </el-menu-item>
          <el-menu-item  index="/serialport">
            <span slot="title"><i class="el-icon-s-home"></i>{{ $t('networkIndex.serialPort') }}</span>
          </el-menu-item>
          <el-menu-item  index="/can">
            <span slot="title"><i class="el-icon-s-home"></i>{{ $t('networkIndex.can') }}</span>
          </el-menu-item>
        </el-menu>

        <el-main class="mymain">
          <router-view/>
        </el-main>
      </el-container>
  </div>
</template>

<script>
export default {
  name: 'Network',
}
</script>

<style lang="scss" >

.el-container {
  height:100%;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 240px;
  height: 100%;
}
.mymain{
  background-color: white;
}


</style>

