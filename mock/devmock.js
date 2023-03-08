import  TableAPI from '../src/api'
import AccountAPI from '../src/api'
import {HV_NAMES} from "echarts/lib/util/layout";
const  Mock  =  require( "mockjs" )

Mock.mock('/getTableData', "get",  {
  "code" :  0 ,
  "list":[
    {
      "name": "光之国怪兽格斗仪",
      "region": "beijing",
      "date1": "2023-02-15",
      "date2": "2023-02-24",
      "delivery": false,
      "type": [
        "类型三",
        "类型二"
      ],
      "resource": "光之国能量源",
      "desc": "1111111",
      "id": 12
    },
    {
      "name": "魔仙变身器",
      "region": "项目一",
      "date1": "2023-02-23",
      "date2": "2023-02-27",
      "delivery": false,
      "type": [
        "类型二"
      ],
      "resource": "魔仙堡能量源",
      "desc": "魔仙堡特供",
      "id": 13
    },
  ],
  "msg": "success"
})

Mock.mock('/getAllAdminData',"get",{
  "code" :  0 ,
  "list":[
    {
      "id": "20237772",
      "account": "admin",
      "password": "admin",
    },
    {
      "id": "20237773",
      "account": "admin111",
      "password": "admin111",
    },
    {
      "id": "20237778",
      "account": "admin7778",
      "password": "7778"
    },
    {
      "id": "20239993",
      "account": "admin9993",
      "password": "9993"
    },
    {
      "id": "20231116",
      "account": "admin1116",
      "password": "1116"
    },
    {
      "id": "20230001",
      "account": "admin",
      "password": "admin"
    }],
  "msg": "success"
})

Mock.mock('/LineData',"get",{
  "optionData1": [177,388,457,867,937,485,475],
  "optionData2": [374,598,398,587,988,283,575]
})

