import fetchMock from 'fetch-mock'
const jsonrpc = require('jsonrpc-lite');

//fetchMock.mock('http://localhost:8080/rpc', analyse)

function analyse(options){

  const successObject = new jsonrpc.SuccessObject("123",{
    msg:'success???????????????????????????????????????'
  })
  console.log("successObject",successObject)
  return JSON.stringify(successObject)
}