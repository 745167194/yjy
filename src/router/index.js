import { listenerCount } from "node-notifier"
//import { component } from "vue/types/umd"
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Layout from '../views/Layout.vue'
import List from '../views/List'
import Table from '../views/Table'
import NotFound from '../views/NotFound'
import Line from '../views/Line'
import Pie from '../views/Pie'
import BarLine from "../views/bar+line";
import Form from "../views/Form";
import Main from "../views/Main.vue"
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
    path:'/layout/:name',
    name:'Layout',
    redirect:'/main/:name',//首页直接链接到内容显示
    component:Layout,
    children:[//Main中子路由用来跳转table list 等
      {//list
        path:'/main/:name',
        name:'Main',
        component:Main,
      },
      {//list
        path:'/list',
        name:'List',
        component:List,
      },
      {
        path:'/table',
        name:'Table',
        component:Table,
        props:true  //使用props方式进行传参
      },
      {
        path:'/goMain/:name',
        redirect:'/main/:name'
      },
      {
        path:'/line',
        name:'Line',
        component:Line//注意是component，不加s
      },
      {
        path:'/pie',
        name:'Pie',
        component:Pie
      },
      {
        path:'/barline',
        name:'BarLine', component:BarLine
      },
      {
        path:'/form1',
        name:'Form',
        component:Form//注意是component，不加s
      },
    ],
  },
  {
    path:'*', //404   通配符*
    component:NotFound
  }]
})
