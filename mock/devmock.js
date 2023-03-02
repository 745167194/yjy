import  TableAPI from '../src/api'
import {HV_NAMES} from "echarts/lib/util/layout";
const  Mock  =  require( "mockjs" )

Mock.mock(TableAPI.table.getAllTableData(), "get",  {
  "code" :  0 ,
  "data":{
    "name": "mock随机",
    "region": "shanghai",
    "date1": "2023-02-13T16:00:00.000Z",
    "date2": "2023-02-24T08:19:40.000Z",
    "delivery": false,
    "type": [
      "类型一",
      "类型二"
    ],
    "resource": "2222",
    "desc": "光之国特供",
  },
  "msg": "success"
})
