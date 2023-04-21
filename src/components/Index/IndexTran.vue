<template>
  <!-- tab-swiper -->
  <div class="swiper-box" ref="swiperbox" >
    <ul class="tab">
      <li :class="{ is_active: tabIndex == 0 }" @click="tabIndex = 0"></li>
      <li :class="{ is_active: tabIndex == 1 }" @click="tabIndex = 1"></li>
    </ul>
    <div class="swiper">
      <div class="content" :class="{ slider: tabIndex == 1 }">
        <div class="first-tab common">
          <Index1></Index1>
        </div>
        <div class="second-tab common">
          <Index2></Index2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Index1 from "./Index1.vue";
import Index2 from "./Index2.vue";

export default {
  name: "IndexTran",
  data(){
    return {
      tabIndex: 0, // 控制tab的切换
    }
  },
  components:{
    Index1,
    Index2
  },
  methods:{
    handleScroll(e){
      //e.wheelDellta：可以用来获取鼠标的滚动方向，对于得到的值，只看正负，往上滚是正值，往下滚是负值。
      //火狐浏览器不支持这个方法，需要会用e.detail来获取滚轮的滚动方向，向上是负值，向下是正值
      let tabNum = e.wheelDelta > 0 ? '0':'1';
      if(tabNum=='0'){
        this.tabIndex=0
      }
      if(tabNum=='1'){
        this.tabIndex=1
      }
    }
  },
  mounted(){
    //监听鼠标滚动事件
    window.addEventListener('mousewheel',this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('mousewheel',this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
/* tab导航 开始 */
.swiper-box {
  background-color: white;
  position: absolute;
  height: 780px;
  width: 1520px;
  bottom: 0;
  margin-top: -390px;
  left: 50%;//先像左移动一半的距离
  margin-left: -760px; //减去宽度的一半，实现元素绝对定位下的居中
  .tab {
    height: 32px;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    li {
      list-style: none;
      float: left;
      padding: 0 25px 16px;
      border-bottom: 4px solid #DCDFE6;//底部标签
      font-size: 16px;
      color: #34364e;
      margin-right: 70px;
      font-weight: 400;
      z-index: 100;
    }
    li:last-child {
      margin-right: 0;
    }
    li.is_active {
      // 选中的tab更改字体颜色和出现底边框
      border-bottom: 4px solid #8cc5ff;
    }
    li:hover {
      cursor: pointer;
    }
  }
  .common {
    height: 780px;
    width: 1520px;
  }
  .swiper {
    height: 700px;
    width: 100%;
    overflow: hidden; // 让超出边框的部分隐藏
    .content {
      width: 3040px; // 总宽设成2倍内容的宽度
      transition: all 0.5s; // 左右平滑滚动切换，动画为0.5s
      -webkit-transform: translateX(0);
      transform: translateX(0); // 进入页面时显示tab1内容
      .first-tab {
        float: left;
        width: 1520px;
      }
      .second-tab {
        float: left;
        width: 1520px;
      }
    }
    .slider {
      // 点击不同标签后，根据内容平移百分比切换展示内容
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  }
}
/* tab导航 结束 */


</style>
