import request from "../utils/request";

export function getLineData(params={}){
  return request({
    method:'GET',
    url:'/LineData',
    params,
  })
}

