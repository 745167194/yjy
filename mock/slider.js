const  Mock  =  require( "mockjs" )

//初始化Slider
let slider1=Mock.mock({
  "number|1-100": 100
})

//修改Slider

function changeSlider(options){
  let num = options.body
  sessionStorage.setItem('Slider1',num)
  //console.log("后台接收到了value值：",JSON.parse(sessionStorage.getItem('Slider1')).number)
  return {
    code:200,
    msg:"change success"
  }
}

//查询admin，只模拟一次数据，之后使用LocalStorage来存放List
function getSlider() {
  // 若 localStorage 没有数据，则将 Mock 的数据存入
  if (!sessionStorage.getItem('Slider1')) {
    sessionStorage.setItem('Slider1',JSON.stringify(slider1))
  }
  // 每次获取数据时，再从 localStorage 中拉取数据
  let Slider1 = JSON.parse(sessionStorage.getItem('Slider1'))
  return {
    code :200,
    data:Slider1,
    msg:"get number success"
  }
}


//接口
Mock.mock('http://localhost:8080/getSlider',"get",getSlider)
Mock.mock('http://localhost:8080/changeSlider','post',changeSlider)




