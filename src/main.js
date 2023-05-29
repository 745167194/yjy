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
import '../mock'
import VueClipboard from "vue-clipboard2";
import api from './api'
import elementResizeDetectorMaker from "element-resize-detector"
import 'default-passive-events'
import '../fetchmock/index'
import websocket from 'vue-native-websocket';
//导入图标
import './assets/iconfont/iconfont.css';
import zh from './i18n/zh'
import en from './i18n/en'
import VueI18n from 'vue-i18n'

//国际化
Vue.use(VueI18n)


Vue.use(websocket, '', {
  connectManually: true, // 手动连接
  format: 'json', // json格式
  reconnection: true, // 是否自动重连
  reconnectionAttempts: 5, // 自动重连次数
  reconnectionDelay: 2000, // 重连间隔时间
});//声明使用webSocket

//socket
// Vue.use(new VueSocketIO({
//   // 控制台调试 console.log
//   debug: true,
//   // 连接地址 后端提供
//   connection: 'http://localhost:1100',
// })),

Vue.use(ElementUI);//声明使用element
Vue.use(VueRouter);//声明使用vue-router
Vue.use(Vuex);//神功使用vuex
Vue.use(VueClipboard);//使用VueClipboard，实现IP输入框
Vue.prototype.axios = axios;//声明使用axios
//Vue.use(ElementUI, { locale })//国际化



// 3、组合语言包对象
const messages = {
  zh,
  en
}

// 4、创建 VueI18n 实例，并为 messages 和 locale 属性赋值
const i18n = new VueI18n({
  messages,
  locale: 'en'
})

Vue.config.productionTip = false
//process.env.MOCK  &&  require( '../mock' )

//每次路由跳转之前执行 钩子函数，不在vue实例中，所以不能用mounted
router.beforeEach((to,from,next)=>{
  let isLogin=sessionStorage.getItem('isLogin');//获取登录状态
  //注销，清除登陆状态,跳转到登陆页面
  if(to.path == '/logout'){
    sessionStorage.clear();
    next({path:'/login'});
  }
  //已经登录的用户去登陆页面，直接跳转主页
  else if(to.path == '/login'){
    if(isLogin != null){
      next({path:'/main/'+store.getters.getAdmin.name});
    }
  }
  //如果未登录，则进入任何页面都要跳到登录页面
  else if(isLogin == null){
    next({path:'/login'});
  }
  next();//跳到下一个钩子函数
})

//一下两个函数解决Navigating to current location (XXX) is not allowed  多次点击跳转同一个路由是不被允许的
//push
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n, //挂载
  render: h => h(App),//element初始化
})


