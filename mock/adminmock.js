const  Mock  =  require( "mockjs" )
const mockList=[]

//初始化List
for (let i = 0; i < 10; i++) {
  let listItem = Mock.mock(    {
    "id": "@id",
    "account": "admin",
    "password": "admin"
  });
  mockList.push(listItem);
}

//添加admin
function addAdmin(options){//有一个问题：没有id
  //console.log("传过来的数据"+JSON.parse(options.body));
  let obj = JSON.parse(options.body);//转化为json数据
  //console.log("数据获取"+ obj);
  let AdminList = JSON.parse(sessionStorage.getItem('AdminList')).concat(obj); // 将前台返回来的数据，拼接到数组中。
  sessionStorage.setItem('AdminList',JSON.stringify(AdminList))
  return {
    code:200,
    data:AdminList,
    msg:'add success'
  }
}

//删除一个admin
function deleteAdmin(options){
  let deleteArr = options.body//取得参数
  //console.log("deleteArr:",deleteArr)
  let AdminList = JSON.parse(sessionStorage.getItem('AdminList')).filter(val => !deleteArr.includes(val.id))
  sessionStorage.setItem('AdminList',JSON.stringify(AdminList))
  return {
    code: 200,
    msg: '删除成功！',
    data: AdminList
  }
}

//修改Dev
function updateAdmin(options){
  let obj = JSON.parse(options.body);
  let AdminList = JSON.parse(sessionStorage.getItem('AdminList')).map(val => { // 将需要替换的数据替换掉
    return val.id == obj.id ? obj : val;
  });
  sessionStorage.setItem('AdminList',JSON.stringify(AdminList))
  return {
    code:200,
    data: AdminList,
    msg:"update success"
  }
}

//查询admin，只模拟一次数据，之后使用LocalStorage来存放List
function getAdminList() {
  // 若 localStorage 没有数据，则将 Mock 的数据存入
  if (!sessionStorage.getItem('AdminList')) {
    sessionStorage.setItem('AdminList',JSON.stringify(mockList))
  }
  // 每次获取数据时，再从 localStorage 中拉取数据
  let AdminList = JSON.parse(sessionStorage.getItem('AdminList'))
  return AdminList
}


//接口
Mock.mock('http://localhost:8080/getAllAdmin',"get",getAdminList)
Mock.mock('http://localhost:8080/addAdmin','post',addAdmin)
Mock.mock('http://localhost:8080/deleteAdmin','delete',deleteAdmin)
Mock.mock('http://localhost:8080/updateAdmin','put',updateAdmin)



