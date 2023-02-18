import { listenerCount } from "node-notifier"
//import { component } from "vue/types/umd"
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Main from '../views/Main'
import List from '../views/List'
import Table from '../views/Table'
import NotFound from '../views/NotFound'

//import { component } from 'vue/types/umd';

Vue.use(Router);

export default new Router({
  mode:'history',//历史模式，没有#
  routes:[
  {
    //登录页
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    //首页
    path:'/main/:name',
    name:'Main',
    component:Main,
    children:[//Main中子路由用来跳转table list 等
      {//list
        path:'/list/:id',
        name:'List',
        component:List,
      },
      {
        path:'/table/:id',
        name:'Table',
        component:Table,
        props:true  //使用props方式进行传参
      },
      {
        path:'/goMain/:name',
        redirect:'/main/:name'
      }],
  },
  {
    path:'*', //404   通配符*
    component:NotFound
  }]
})
