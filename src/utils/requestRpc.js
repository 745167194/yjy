import {JsonRpc} from "jsonrpc-lite/jsonrpc";

const jsonrpc = require('jsonrpc-lite');
// 请求服务器端方法
async function requestRpcPost(id,method, params) {
  //console.log("requestRpc start")
  const requestObject = jsonrpc.request(id, method, params);
  let string = JSON.stringify(requestObject);
  //console.log("sub:","{"+string.substring(17))
  console.log("env:"+process.env.NODE_ENV,"request url:"+process.env.VUE_APP_URL)
  const responseJson =await fetch(process.env.VUE_APP_URL+'/RPC', {
    method: 'POST',
    headers:
      {
        'Content-Type': 'application/json',
        'Accept':'application/json,text/plain,*/*',
      },
    credentials: 'include',//携带cookie
    body: "{"+string.substring(17),   // 使用payload方式，去掉版本号

  }).then(res => {
    //console.log("response????????????????:", res)
    return res.json() //注意生效范围
  })
  //console.log("response Json:", responseJson)
  //console.log("response Json parse:", jsonrpc.parse(await responseJson))
  return jsonrpc.parse(await responseJson)
}
export default requestRpcPost
