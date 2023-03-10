const  Mock  =  require( "mockjs" )

//初始化Slider
const slider1=Mock.mock({
  "number|1-100": 100
})

//修改Slider
function changeSlider(options){
  let num = options.body

  console.log("changeslider",num)
  sessionStorage.setItem('Slider1', num)
  return {
    code:200,
    data: sessionStorage.getItem('Slider1'),
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
  return Slider1
}


//接口
Mock.mock('http://localhost:8080/getSlider',"get",getSlider)
Mock.mock('http://localhost:8080/changeSlider','post',changeSlider)




