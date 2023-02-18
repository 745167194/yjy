import Vue from 'vue'
import Vuex from 'vuex'
/*8import {
  constants
} from 'zlib';*/
Vue.use(Vuex);

//定义全局state对象，存放所有组件都要使用的公共数据
//取之前页面的state值，没有则new一个
const state = sessionStorage.getItem('state')?JSON.parse(sessionStorage.getItem('state')):{//第二个不加''
  admin: {
    name: ''//APP中可save
  }
};

//监听stste对象的最新状态（计算属性）
const getters = {
  getAdmin(state) {
    return state.admin;
  }
};

//唯一一个可以修改state值的函数(同步执行，阻塞的)
const mutations = {
  updateAdmin(state, admin) {
    state.admin = admin;
  }
};

//异步执行mutation的方法
const actions = {
  asyncUpdateAdmin(context,admin){
    context.commit("updateAdmin",admin);//提交(方法，参数)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
