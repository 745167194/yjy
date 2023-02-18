<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>


export default {
  name: 'App',
  mounted(){//钩子函数mounted只能在vue实例中用
    window.addEventListener('unload',this.saveState());//监听事件 unload:刷新事件
  },
  methods:{
    saveState(){
      //保存state,使得刷新后还能得到原来的state数据
      sessionStorage.setItem('state',JSON.stringify(this.$store.state.admin));
      console.log("state:"+
                  sessionStorage.getItem('state'));
      //sessionStorage只能传递字符串,所以将state转化为JSON类型的字符串来存储state
    }
  }
}
</script>

<style>

</style>
