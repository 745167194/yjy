import request from "../utils/request";

export function TcpIp(data){
  return request({
    url:'/tcpip',
    method:"POST",
    data
  })
}
