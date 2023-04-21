<template>
  <div style="height: 100%;width: 100%;">
    <div class="div1" >
      <div class="smallcon" @click="chart">
        <div>
          <img :src='chartUrl' class="myimg"/>
        </div>
        <div class="title">
          <strong>{{ $t('chart') }}</strong>
          <div class="myicon"><i class="el-icon-minus"></i></div>
        </div>
        <span class="des">{{ $t('chartDes') }}</span>
      </div>
      <div class="smallcon" @click="network">
        <div>
          <img :src='networkUrl' class="myimg"/>
        </div>
        <div class="title">
          <strong>{{ $t('network') }}</strong>
          <div class="myicon"><i class="el-icon-minus"></i></div>
        </div>
        <span class="des">{{ $t('networkDes') }}</span>
      </div>
      <div class="smallcon" @click="myevent">
        <div>
          <img :src='myeventUrl' class="myimg"/>
        </div>
        <div class="title">
          <strong>{{ $t('myEvent') }}</strong>
          <div class="myicon"><i class="el-icon-minus"></i></div>
        </div>
        <span class="des">{{ $t('myEventDes') }}</span>
      </div>
    </div>
    <div class="div2">
      <div class="smallcon" @click="system">
        <div>
          <img :src='systemUrl' class="myimg"/>
        </div>
        <div class="title">
          <strong>{{ $t('system') }}</strong>
          <div class="myicon"><i class="el-icon-minus"></i></div>
        </div>
        <span class="des">{{ $t('systemDes') }}n</span>
      </div>
      <div class="smallcon" @click="log">
        <div>
          <img :src='logUrl' class="myimg"/>
        </div>
        <div class="title">
          <strong>{{ $t('log') }}</strong>
          <div class="myicon"><i class="el-icon-minus"></i></div>
        </div>
        <span class="des">{{ $t('logDes') }}</span>
      </div>
      <div class="smallcon" >
        <div>
          <img :src='oneUrl' class="myimg"/>
        </div>
        <div class="title">
          <strong>nothing6</strong>
          <div class="myicon"><i class="el-icon-minus"></i></div>
        </div>
        <span class="des">66666666666</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index1",
  data(){
    return {
      chartUrl:require('../../assets/chart.png'),
      systemUrl:require('../../assets/system.png'),
      logUrl:require('../../assets/record.png'),
      networkUrl:require('../../assets/AI.png'),
      myeventUrl:require('../../assets/event.png'),
      oneUrl:require('../../assets/live.png'),
    }
  },
  methods:{
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

.div1{
  justify-content: center;
  display: flex;
  height:320px;
  margin-top: 30px;
}
.div2{
  display: flex;
  height:320px;
  justify-content: center;
}

.smallcon{
  width: 500px ;
  height: 300px;
  text-align: center;//左右居中
  //margin: 10px ;
}
.smallcon:hover{
  //transform: scale(1.05);//四周变大
  background-color: #F0F8FF;
  color: #20a0ff;
  border-radius: 5px;

}
//图片
.myimg{
  font-size: 100px;
  margin-top:40px;
}
//标题
.title{
  margin-top: 10px;
  font-size: 20px;
  font-family:"San Francisco UI",sans-serif,Blod;
  color: rgb(80,80,80)
}
//小横杠
.myicon{
  font-size: 35px;
  color: #8cc5ff;
  height: 45px;
}
//描述
.des{
  font-size: 15px;
  color: #bbbbbb;
  line-height: 25px;
}


</style>
