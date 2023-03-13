const  Mock  =  require( "mockjs" )

function TCPIP(options){
  let data=options.body
  console.log("拦截请求数据：",JSON.parse(data))
  return {
    code:200,
    msg:'send tcpip success'
  }
}

//接口
Mock.mock('http://localhost:8080/tcpip',"post",TCPIP)
