// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import store from './store'
import utils from './utils'

// 使用 饿了么vue ui 组件element-ui
Vue.use(ElementUI)
import 'element-ui/lib/theme-default/index.css'
// 使用vue-resource
Vue.use(VueResource)

// 全局设置
Vue.mixin(utils)
//跨域传递cookie
Vue.http.options.credentials = true
/*Vue.http.interceptors.push((request, next) => {
  request.credentials=true;
  next()
})  
*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store,
  created () {
    this.$store.dispatch('loginAction')
  }
})
