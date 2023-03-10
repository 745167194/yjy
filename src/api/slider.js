import request from "../utils/request";

export function changeSlider1(num){
  return request({
    method:'POST',
    url:'/changeSlider',
    data:{
      slider1:num
    }
  })
}

export function getSlider1(){
  return request({
    method:'GET',
    url:'/getSlider',
  })
}
