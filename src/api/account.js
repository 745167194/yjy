import request from "../utils/request";
import requestRpc from "../utils/requestRpc";


export function getAllAdmin(){
  return request({
    method:'GET',
    url:'/getAllAdmin'
  })
}
/*
export function addAdmin(id,account,password){
  return request({
    method:'POST',
    url:'/addAdmin',
    data: {
      "id":id,
      "account":account,
      "password":password
    }
  })
}

export function deleteAdmin(arr) {
  //arr.forEach(element => request.delete('/AdminData/' + element))
  return request({
    method:'DELETE',
    url:'/deleteAdmin',
    data:arr
  })


}
/*
export function exist(account,password){
  this.getAllAdmin().then(res=>{
    let adminList=res.data
    adminList.forEach(element=>{
      if(element.account===account && element.password===password){
        return true
      }
      else return false
    })
  })
}
*/


