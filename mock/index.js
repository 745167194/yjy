const Mock = require('mockjs'); // 导入依赖模块

var Random = Mock.Random
//let id = Mock.mock('@id')//生成一串随机id
//console.log(id);//
Mock.mock('/mock/test', 'get', {
  message: 'success',
  opinionData2: ['556', '111', '567','765','234','988','544'],//要与data中的数据名称一样
  //opinionData1: this.getData,//随机生成一个整数数组，涵盖0，不涵盖1000,但以字符串形式
})


// 返回一个函数
/*
module.exports = function(app){
  // 监听 http 请求
  console.log("进入mock方法")
  //app.get注册一个路由处理程序 接收到对 HTTP  GET请求user/userinfo时调用该程序。
  app.get('/user/userinfo', function(rep, res){//get请求，post请求改为app.post即可
    console.log("进入app get")
    // 设置要返回的数据
    let json = {
      id: "@id()",                    // 得到随机的id
      username: "@cname()",           // 随机生成中文名字
      date: "@date()",                // 随机生成日期
      avatar: "@image('200x200','red','#fff','avatar')",  // 生成图片
      description: "@paragraph()",    // 描述
      ip: "@ip()",                    // ip地址
      email: "@email()",              // email
    }
    res.json(Mock.mock(json));
    console.log("返回数据")
  });
}
*/
