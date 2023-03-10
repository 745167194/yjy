import request from "../utils/request";


//获取所有数据
export function getAllTableData(params={}){
  return request({
    methods:'GET',
    url:'/getDev',
    params
  })
}

//删除某数据
export function deleteTable(id){
  return request ({
    method:'DELETE',
    url:'/deleteDev',
    //params:{id}   //http://localhost:8080/deleteDev?id=4   在url中当作参数接收
    data: id  //当作java对象来接收
  })
  //return request.delete('/deleteDev/'+id)
}

//更新数据
export function updateTable(id,data){
  return request({
    method:'PUT',
    url:'/updateDev',
    data,
  })
}

export function addTable(data){
  return request({
    method:'POST',
    url:'/addDev',
    data,
  })
}



