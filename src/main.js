// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store.js'
import $ from 'jquery'
import global_ from './components/Global.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/jquery.ztree.core.min.js'
import './assets/jquery.ztree.excheck.min.js'
import './assets/jquery.ztree.exhide.min.js'
Vue.config.productionTip = false
Vue.prototype.$ajax = axios;
Vue.prototype.GLOBAL = global_;

Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
console.log(localStorage.getItem('user'))
router.beforeEach((to,from,next) =>{
  store.state.user = localStorage.getItem('user');
  if(to.meta.requireAuth){
    if(store.state.user){ //判断用户是否已登陆
      next();
    }else{
      alert("尚未登录，请先登录");
      next({
        path:'/login',
        query:{redirect: to.fullPath}
      })
    }
  }else{
    next();
  }
})

router.afterEach(route => {
  //每个页面跳转时的动画
})

