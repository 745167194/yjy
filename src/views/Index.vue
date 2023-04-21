<template>
  <div :class="bgFlag?'bgBlue':'bgWhite'">
      <!--主页面-->
      <el-container>
        <el-header>
          <el-row style="height: 100%;"  >
            <el-col :lg="2"  class="block" >
              <img class="logo" src="../assets/logo1.png" alt="logo">
            </el-col>
            <el-col :lg="1" class="block">
              <i class="iconfont my-eliconhomepage" @click="toIndex"></i>
            </el-col>

            <el-col :lg="18"  class="block">

            </el-col>

            <el-col  :lg="3"  class="block">
              <el-dropdown show-timeout=0.2 hide-timeout=0.2>
                <i class="iconfont my-eliconworkbench_fill"></i>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item >
                    <slot style="background-color: #f56c6c;width: 100%">
                      <i class="iconfont my-eliconworkbench_fill" style="color: #1482f0"></i>
                    </slot>
                    {{ $t('skin')}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown show-timeout=0.2 hide-timeout=0.2 >
                <i class="iconfont my-eliconint" ></i>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item @click.native="changeLanguage('zh')" >简体中文</el-dropdown-item>
                  <el-dropdown-item @click.native="changeLanguage('en')" >English</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown show-timeout=0.2 hide-timeout=0.2>
                <i class="iconfont my-eliconmine" ></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="logout">{{ $t('logout') }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <span style="color: white;align-content: center">{{$store.getters.getAdmin.name}}</span>
              <el-dropdown show-timeout=0.2 hide-timeout=0.2>
                <i class="iconfont my-eliconsetup_fill"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="network">{{ $t('network') }}</el-dropdown-item>
                  <el-dropdown-item @click.native="myevent">{{ $t('myEvent') }}</el-dropdown-item>
                  <el-dropdown-item @click.native="log">{{ $t('log') }}</el-dropdown-item>
                  <el-dropdown-item @click.native="system">{{ $t('system') }}</el-dropdown-item>
                  <el-dropdown-item @click.native="chart">{{ $t('chart') }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>

        <el-main >
          <router-view></router-view>
        </el-main>
      </el-container>
  </div>
</template>

<script>
import IndexTran from "../components/Index/IndexTran.vue"
export default {
  name: "Index",
  data(){
    return {
      bgFlag:true,
    }
  },
  components:{
    IndexTran
  },
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
    toIndex(){
      //this.bgFlag=true;
      console.log(this.bgFlag)
      this.$router.push({name: 'Index', params: {name: this.$store.getters.getAdmin.name}});
    },
    changeLanguage(lang) { //切换方法
      this.$i18n.locale = lang
    },
    network(){
      //this.bgFlag=false;
      this.$router.push({name:'Network'});
    },
    system(){
      //this.bgFlag=false;
      this.$router.push({name:'System'});
    },
    myevent(){
      //this.bgFlag=false;
      this.$router.push({name:'EventIndex'});
    },
    log(){
      //this.bgFlag=false;
      this.$router.push({name:'LogIndex'});
    },
    chart(){
      //this.bgFlag=false;
      this.$router.push({name: 'ChartIndex'});
    },
  },
}
</script>

<style lang="scss" scoped>

.bgBlue{
  height: 100%;
  width: 100%;
  background-image: url("../assets/opacity.png"),url("../assets/people.png"),url("../assets/home_bg.png"),linear-gradient(350deg, #F3F3F3 50%, #375FFD 50%);
  background-position:left top,left top, right top;
  background-repeat: no-repeat,no-repeat, no-repeat,no-repeat;
  background-size:auto,auto,auto,cover;
}
.bgWhite{
  height: 100%;
  width: 100%;
  background-color: white;
}

.iconfont {
  margin-left: 8px;
  color:rgba(255,255,255,0.7);
}
.iconfont:hover{
  color:white;
}

.el-header{
  font-size: 12px;
  background-color:rgba(0,0,58,0.8);
  height:70px ;
}

.logo{
  width: 65%;
  height: 55%;
  //display: flex;
}

.block{
  display:flex;
  justify-content:center;/*主轴上居中*/
  align-items:center;/*侧轴上居中*/
  height:100%;
}

.el-main{
  margin: 0;
  padding: 0;
}
.selectde{

}


</style>
