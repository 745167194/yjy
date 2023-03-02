import request from "../utils/request";

export function getAllAdmin(){
  return request({
    method:'GET',
    url:'/AdminData'
  })
}

export function addAdmin(id,account,password){
  return request({
    method:'POST',
    url:'/AdminData',
    data: {
      "id":id,
      "account":account,
      "password":password
    }
  })
}

export function deleteAdmin(arr) {
  //console.log(arr)
  arr.forEach(element => request.delete('/AdminData/' + element))
  //request.delete('/AdminData/')
  //return
}

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

  /*
  adminList.forEach(element=>{
    if(element.account===account && element.password===password){
      return true
    }
    else return false
  })*/
}
