import request from "../utils/request";

export function changeSlider1(num){
  return request({
    method:'POST',
    url:'/changeSlider',
    data:{
      number:num
    }
  })
}

export function getSlider1(){
  return request({
    method:'GET',
    url:'/getSlider',
  })
}
