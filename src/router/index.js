import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import NotFound from '../views/NotFound'
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
import EventIndex from "../views/Event/index.vue"
import Alarm from "../views/Event/Alarm.vue"
import ChartIndex from "../views/Chart/index.vue"
import ChartLine from "../views/Chart/Line.vue"
import SerialPort from "../views/Network/SerialPort.vue"
import CAN from "../views/Network/CAN.vue"
import IndexTran  from "../components/Index/IndexTran.vue"

Vue.use(Router);

export default new Router({
  mode:'history',//历史模式，没有# hash模式：有#
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
      component:indexVue,
      redirect:'/indextran',
      children:[
        {
          path:'/indextran',
          name:'IndexTran',
          component:IndexTran
        },

        //network
        {
          path:'/network',
          name:'Network',
          component:Network,
          alwaysShow:false,
          redirect:'/TCPIP',
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
            {
              path:'/serialport',
              name:'SerialPort',
              component: SerialPort
            },
            {
              path:'/can',
              name:'CAN',
              component: CAN
            }
          ]
        },

        {//System页面
          path:'/system',
          name:'System',
          component:System,
          redirect:'/general',
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
          redirect:'/log',
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

        {//Event页面
          path:'/eventindex',
          name:'EventIndex',
          component:EventIndex,
          redirect:'/alarm',
          children:[
            {
              path:'/alarm',
              name:'Alarm',
              component: Alarm
            }
          ]
        },

        {//图表
          path:'/chartindex',
          name:'ChartIndex',
          component:ChartIndex,
          redirect:'/chartline',
          children:[
            {
              path:'/chartline',
              name:'ChartLine',
              component:ChartLine
            }
          ]
        },
      ]
    },
  {
    path:'*', //404   通配符*
    component:NotFound
  },
    {
      path:'',
      redirect:'/index'
    }
  ]
})
