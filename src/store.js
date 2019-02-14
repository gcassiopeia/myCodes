/**
 * Created by 15791 on 2018/11/9.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const key = 'user';
const type = 'type';
const store = new Vuex.Store({
  state: function () {
    return {
      user : null,
      type : null
    }
  },
  getters:{
    getName: function (state) {
      if(state.user) {
        state.user = JSON.parse(localStorage.getItem(key))
      }
      return state.user
    },
      getType: function (state) {
        if (state.type) {
          state.type = JSON.parse(localStorage.getItem(type))
        }
        return state.type
      }
  },
  mutations:{
    $_setStorage: function (state,obj) {
      state.user = obj.name
      state.type = obj.type
      localStorage.setItem(key, JSON.stringify(obj.name))
      localStorage.setItem(type, JSON.stringify(obj.type))
    },
    $_removeStorage: function (state) {
      state.user = null
      state.type = null
      localStorage.removeItem(key)
      localStorage.removeItem(type)
    }
  }
})
export default store;
