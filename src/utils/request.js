//前端接口封装，请求url中相同的部分可封装起来
import axios from "axios";

const request = axios.create({
  baseURL:'http://localhost:3008',
})

export default request
