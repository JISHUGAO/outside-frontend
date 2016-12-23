// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import store from './store'

// 使用 饿了么vue ui 组件element-ui
Vue.use(ElementUI)
import 'element-ui/lib/theme-default/index.css'
// 使用vue-resource
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})
