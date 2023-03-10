const  Mock  =  require( "mockjs" )

// 生成数据列表
const mockList=[]
const newID =10
//初始化List
  for (let i = 0; i < newID; i++) {
    let listItem = Mock.mock({
      "id": "@increment",
      "name": "@cname",
      "region|1": [
        "项目一",
        "项目二"
      ],
      "date": "@date",
      "time": "@time",
      "delivery": "@boolean",
      "type": [
        "类型一",
        "类型二",
        "类型三",
        "类型四"
      ],
      "resource|1": [
        "魔仙堡能量源",
        "光之国能量源"
      ],
      "desc": "@sentence",
    });
    mockList.push(listItem);
}

  //查询dev，只模拟一次数据，之后使用LocalStorage来存放List
function getDevList() {
  // 若 localStorage 没有数据，则将 Mock 的数据存入
  if (!sessionStorage.getItem('DevList')) {
    sessionStorage.setItem('DevList',JSON.stringify(mockList))
  }
  // 每次获取数据时，再从 localStorage 中拉取数据
  let DevList = JSON.parse(sessionStorage.getItem('DevList'))
  return DevList
}

  //删除dev
 function deleteDev(options){
   let deleteid = options.body//取得参数
   //console.log("deleteid:"+deleteid)
   let DevList = JSON.parse(sessionStorage.getItem('DevList')).filter(function (val) {
     return val.id != deleteid; // 过滤掉对应过来的id对应的相应数据，并重新返回,===类型也要一样
   });
   sessionStorage.setItem('DevList',JSON.stringify(DevList))
   return {
     code: 200,
     msg: '删除成功！',
     data: DevList
   }
 }

//添加dev
function addDev(options){//有一个问题：没有id
  //console.log("传过来的数据"+JSON.parse(options.body));
  let obj = JSON.parse(options.body);//转化为json数据
  //console.log("数据获取"+ obj);
  let DevList = JSON.parse(sessionStorage.getItem('DevList')).concat(obj); // 将前台返回来的数据，拼接到数组中。
  sessionStorage.setItem('DevList',JSON.stringify(DevList))
  return {
    code:200,
    data:DevList,
    msg:'add success'
  }
}

  //修改Dev
function updateDev(options){
  let obj = JSON.parse(options.body);
  let DevList = JSON.parse(sessionStorage.getItem('DevList')).map(val => { // 将需要替换的数据替换掉
    return val.id == obj.id ? obj : val;
  });
  sessionStorage.setItem('DevList',JSON.stringify(DevList))
  return {
    code:200,
    data: DevList,
    msg:"update success"
  }
}



Mock.mock('http://localhost:8080/getDev', "get",getDevList)
Mock.mock('http://localhost:8080/deleteDev','delete',deleteDev)
Mock.mock('http://localhost:8080/addDev','post',addDev)
Mock.mock('http://localhost:8080/updateDev','put',updateDev)

//通配符：Mock.mock(RegExp('http://localhost:8080/deleteDev' + ".*"),'delete',{})



//Layout中的Line，暂时放这儿
Mock.mock('/LineData',"get",{
  "optionData1": [177,388,457,867,937,485,475],
  "optionData2": [374,598,398,587,988,283,575]
})

