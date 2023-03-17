const jsonrpc = require('jsonrpc-lite');

// 请求服务器端方法
async function requestRpcPost(id,method, params) {
  //console.log("requestRpc start")
  const requestObject = jsonrpc.request(id, method, params);
  //console.log("requestObject:", requestObject)
  const responseJson =await fetch('http://localhost:8080/RPC', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(requestObject),   // 使用payload方式
  }).then(res => {
    //console.log("response????????????????:", res)
    return res.json() //注意生效范围
  })
  //console.log("response Json:", responseJson)
  //console.log("response Json parse:", jsonrpc.parse(await responseJson))
  return jsonrpc.parse(await responseJson)
}
export default requestRpcPost
