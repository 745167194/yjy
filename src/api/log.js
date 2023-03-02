import request from "../utils/request";

export function search(time,type){
  console.log("time:"+time+",type:"+type)
  if(type==='All' && time!==null){
    return request({
      method:'GET',
      url:'/LogData?time='+time  //?前面是url,后面是参数
    })
  }
  else if(type!=='All'&&time!==null){
    return request({
      method:'GET',
      url:'/LogData?time='+time+'&type='+type  //?前面是url,后面是参数
    })
  }
  else if(type!=='All'&&time===null) {
    return request({
      method: 'GET',
      url: '/LogData?type=' + type  //?前面是url,后面是参数
    })
  }
  else return getAll()
  /*
  return request({
    method:'GET',
    url:'/LogData?type='+type
  })
*/
}

export function getAll(){
  return request({
    method:'GET',
    url:'/LogData'
  })
}
