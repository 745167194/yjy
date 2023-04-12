<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

export default {//前端页面使用ES语言(export default ,import)，后端使用commonjs语言(module.exprot ,require)
  name: 'App',//运行每个页面都运行App.vue，
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  //created：在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  //mounted：在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。

 mounted(){//钩子函数mounted只能在vue实例中用
    window.addEventListener('unload',this.saveState);//监听事件 unload:刷新事件
  },
  methods:{
    saveState(){
      //保存state,使得刷新后还能得到原来的state数据
      sessionStorage.setItem('state',JSON.stringify(this.$store.state.admin));
      //sessionStorage只能传递字符串,所以将state转化为JSON类型的字符串来存储state
    },
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    }
  }
}
</script>

<style lang="scss">
/*
	找到html标签、body标签，和挂载的标签
	都给他们统一设置样式
*/
html,body,#app{
  /*统一设置高度为100%*/
  height: 100%;
}

</style>
