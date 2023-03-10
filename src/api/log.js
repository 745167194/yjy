import request from "../utils/request";

export function search(time,type){
  return request({//后端分类查询
    method:'GET',
    url:'/searchLog',
    data:{
      "time":time,
      "type":type
    }
  })
  /*  //在接口中分类查询
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
  else return getAllLog()*/
}

export function getAllLog(){
  return request({
    method:'GET',
    url:'/getLog'
  })
}
