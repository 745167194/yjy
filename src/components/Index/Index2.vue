<template>
  <div style="height: 100%;width: 100%">
    <div class="div1">
      <div class="smallcon">
        <div>
          <img :src='sevenUrl' class="myimg"/>
        </div>
        <div class="title">
          <strong>nothing7</strong>
          <div class="myicon"><i class="el-icon-minus"></i></div>
        </div>
        <span class="des">7777777777777</span>
      </div>
      <div class="smallcon">
        <div>
          <img :src='eightUrl' class="myimg"/>
        </div>
        <div class="title">
          <strong>nothing8</strong>
          <div class="myicon"><i class="el-icon-minus"></i></div>
        </div>
        <span class="des">8888888888</span>
      </div>
      <div class="smallcon">
        <div>
          <img :src='nineUrl' class="myimg"/>
        </div>
        <div class="title">
          <strong>nothing9</strong>
          <div class="myicon"><i class="el-icon-minus"></i></div>
        </div>
        <span class="des">99999999999999</span>
      </div>
    </div>
    <div class="div2"></div>
  </div>
</template>

<script>
export default {
  name: "Index2",
  data(){
    return {
      sevenUrl:require('../../assets/security.png'),
      eightUrl:require('../../assets/live.png'),
      nineUrl:require('../../assets/control.png')
    }
  },
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
  bottom: 0;
  justify-content: center;
}

.smallcon{
  width: 500px ;
  height: 300px;
  text-align: center;
  margin: 10px ;
  //border:1px solid #DCDFE6;
  //box-shadow:0 0 30px #DCDFE6;
}
.smallcon:hover{
  //transform: scale(1.05);//四周变大
  background-color: #F0F8FF;
  color: #20a0ff;

}
//图片
.myimg{
  font-size: 100px;
  margin-top: 30px;
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
  color: #bbbbbb;
}

</style>
