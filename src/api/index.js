import * as table from "./table";
import * as account from "./account";
import requestRpc from "../utils/requestRpc";

export default {
  async CallRpc(id, method, json) {
    //console.log("exampleCall start")
    console.log(json ? json : null)
    const response = await requestRpc(id, method, json ? json : {});
    //console.log("requestRpc end and response:",response)
    if (response.type === 'response') {
      console.log('Result:', response.result);
    } else {
      console.log('Error:', response.error);
    }
  },

  account,
  table
}
