const  Mock  =  require( "mockjs" )
const request = require("../src/utils/request");

// 生成数据列表
const mockList=[]
const newID =10
//初始化List
for (let i = 0; i < newID; i++) {
  let listItem = Mock.mock({
    "id": "@increment",
    "time": "@date",
    "type|1": ["System","Config","Storage","Record","Alarm Event","Account","Security"],
    "username": "@name",
    "content": "@sentence"
  },);
  mockList.push(listItem);
}

//查询dev，只模拟一次数据，之后使用LocalStorage来存放List
function getLogList() {
  // 若 localStorage 没有数据，则将 Mock 的数据存入
  if (!sessionStorage.getItem('LogList')) {
    sessionStorage.setItem('LogList',JSON.stringify(mockList))
  }
  // 每次获取数据时，再从 localStorage 中拉取数据
  let LogList = JSON.parse(sessionStorage.getItem('LogList'))
  return LogList
}

//查询Log  按时间，按类别
function searchLog(options) {
  // 若 localStorage 没有数据，则将 Mock 的数据存入
  let LogList = JSON.parse(sessionStorage.getItem('LogList'))
  let searchList=[]
  let type=JSON.parse(options.body).type
  let time=JSON.parse(options.body).time
  if(type=='All' && time!=null){//只查时间
    LogList.forEach(Element=>{
      console.log(Element)
      if(Element.time==time){
        searchList.push(Element)
      }
    })
    console.log("All+time",searchList)
    return searchList
  }
  else if(type!='All'&&time!=null){//查时间和类型
    LogList.forEach(Element=>{
      if(Element.time==time && Element.type==type){
        searchList.push(Element)
      }
    })
    console.log(searchList)
    return searchList
  }
  else if(type!='All' && time==null) {//只查类型
    LogList.forEach(Element=>{
      if(Element.type==type){
        searchList.push(Element)
      }
    })
    console.log(searchList)
    return searchList
  }
  else return LogList
}



Mock.mock('http://localhost:8080/getLog', "get",getLogList)
Mock.mock('http://localhost:8080/searchLog','get',searchLog)

