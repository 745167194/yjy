import Vue from 'vue'
import Vuex from 'vuex'
import admin from "./modules/admin"
/*8import {
  constants
} from 'zlib';*/
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    admin
  }
})
