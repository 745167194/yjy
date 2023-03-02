import { listenerCount } from "node-notifier"
//import { component } from "vue/types/umd"
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Layout from '../views/Layout/Layout.vue'
import List from '../views/Layout/List.vue'
import Table from '../views/Layout/Table.vue'
import NotFound from '../views/NotFound'
import Line from '../views/Layout/Line.vue'
import Pie from '../views/Layout/Main/Pie.vue'
import BarLine from "../views/Layout/bar+line.vue";
import Form from "../views/Layout/Form.vue";
import Main from "../views/Layout/Main.vue"
import Radar from "../views/Layout/Main/Radar.vue";
import Upload from "../views/Layout/Upload.vue"
import Tabs from "../views/Layout/Tabs.vue"
import AxiosTest from "../views/Layout/AxiosTest.vue";
import indexVue from "../views/Index.vue"
import Network from "../views/Network/Network.vue";
import TCPIP from "../views/Network/TCPIP.vue"
import Port from "../views/Network/Port.vue"
import basicService from "../views/Network/basicService.vue";
import System from "../views/System/System.vue"
import General from "../views/System/General.vue";
import Account from "../views/System/Account.vue";
import LogIndex from "../views/Log/Index.vue"
import Log from "../views/Log/Log.vue";
import RemoteLog from "../views/Log/Remote Log.vue";

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
      //索引页
      path:'/index',
      name:'Index',
      component:indexVue
    },
  {
    //首页
    path:'/layout/:name',
    name:'Layout',
    redirect:'/main/:name',//首页直接链接到内容显示
    component:Layout,
    children:[//Main中子路由用来跳转table list 等
      {//main
        path:'/main/:name',
        name:'Main',
        component:Main,
      },
      {//list
        path:'/list',
        name:'List',
        component:List,
      },
      {//表格
        path:'/table',
        name:'Table',
        component:Table,
        props:true  //使用props方式进行传参
      },
      {
        path:'/goMain/:name',
        redirect:'/main/:name'
      },
      {//折线图
        path:'/line',
        name:'Line',
        component:Line//注意是component，不加s
      },
      {//饼状图
        path:'/pie',
        name:'Pie',
        component:Pie
      },
      {//折+柱
        path:'/barline',
        name:'BarLine',
        component:BarLine
      },
      {//雷达图
        path:'/radar',
        name:'Radar',
        component:Radar
      },
      {//表单
        path:'/form1',
        name:'Form',
        component:Form//注意是component，不加s
      },
      {//上传文件
        path:'/upload',
        name:'Upload',
        component:Upload//注意是component，不加s
      },
      {//标签
        path:'/tabs',
        name:'Tabs',
        component:Tabs//注意是component，不加s
      },
      {//测试Axios
        path:'/axiostest',
        name:'AxiosTest',
        component:AxiosTest//注意是component，不加s
      },
    ],
  },
    {//network
      path:'/network',
      name:'Network',
      component:Network,
      children:[
        {
          path: '/basicService',
          name: 'basicService',
          component: basicService
        },
        {
          path:'/port',
          name: 'Port',
          component: Port
        },
        {
          path: '/TCPIP',
          name: 'TCPIP',
          component: TCPIP
        },
      ]
    },
    {//System页面
      path:'/system',
      name:'System',
      component:System,
      children:[
        {
          path:'/general',
          name:'General',
          component: General
        },
        {
          path:'/account',
          name:'Account',
          component: Account
        }
      ]
    },
    {//Log页面
      path:'/logindex',
      name:'LogIndex',
      component:LogIndex,
      children:[
        {
          path:'/log',
          name:'Log',
          component: Log,
        },
        {
          path:'/remotelog',
          name:'RemoteLog',
          component: RemoteLog
        }
      ]
    },
  {
    path:'*', //404   通配符*
    component:NotFound
  }]
})
