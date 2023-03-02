import request from "../utils/request";


//获取所有数据
export function getAllTableData(params={}){
  return request({
    methods:'GET',
    url:'/Datatable',
    params
  })
}

//删除某数据
export function deleteTable(id){
  return request.delete('/Datatable/'+id)
}

//更新数据
export function updateTable(id,data){
  return request({
    method:'PUT',
    url:'/Datatable/'+id,
    data,
  })
}



