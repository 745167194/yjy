// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'
import echarts from 'echarts';


Vue.use(ElementUI);//声明使用element
Vue.use(VueRouter);//声明使用vue-router
Vue.use(Vuex);//神功使用vuex
Vue.prototype.axios = axios;//声明使用axios
Vue.prototype.$echarts = echarts//引入echarts


Vue.config.productionTip = false

//每次路由跳转之前执行 钩子函数，不在vue实例中，所以不能用mounted
router.beforeEach((to,from,next)=>{
  let isLogin=sessionStorage.getItem('isLogin');//获取登录状态
  console.log("islogin="+isLogin);
  //注销，清除登陆状态,跳转到登陆页面
  if(to.path == '/logout'){
    sessionStorage.clear();
    next({path:'/login'});
  }
  //已经登录的用户去登陆页面，直接跳转主页
  else if(to.path == '/login'){
    if(isLogin != null){
      next({path:'/main/'+store.getters.getAdmin.name});
      console.log("2,,,,,"+isLogin);
    }
    console.log("2");
  }
  //如果未登录，则进入任何页面都要跳到登录页面
  else if(isLogin == null){
    next({path:'/login'});
    console.log("3");
  }

  next();//跳到下一个钩子函数

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)//element初始化
})
