import Vue from 'vue'
import Vuex from 'vuex'
import cookies from 'cookies-js'
import commentList from './comment_list'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user:{

    },
    dialogLoginVisible: false,
    dialogRegisterVisible: false,
    currentPageName: '',
    menus: '',
    searchKeyword: ''
  },
  mutations: {
    loginAction (state, info = {}) {
      if (info.id) {
        state.isLogin = true
        state.user = info
        var json = JSON.stringify(info)
        cookies.set('userInfo', json)
      } else {
        var jsonStr = cookies.get('userInfo')
        if (jsonStr) {
          var json = JSON.parse(jsonStr)
          if (json) {
            state.isLogin = true
            state.user = json
          }
        }
        
      }
      
    },
    logout (state) {
      state.isLogin = false
      state.user = ''
      var jsonStr = cookies.get('userInfo')
      if (jsonStr) {
        cookies.set('userInfo', '')
      }
    },
    changeLogin (state, visible) {
      state.dialogLoginVisible = visible
    },
    changeRegister (state, visible) {
      state.dialogRegisterVisible = visible
    },
    setMenus (state, menus) {
      state.menus = menus
    }
  },
  actions: {
    logoutAction (context) {
      context.commit('logout')
    },
    loginAction (context, info) {
      context.commit('loginAction', info)
    },
    showLogin (context) {
      context.commit('changeLogin', true)
      context.commit('changeRegister', false)
    },
    showRegister (context) {
      context.commit('changeLogin', false)
      context.commit('changeRegister', true)
    },
    closeDialog (context) {
      context.commit('changeLogin', false)
      context.commit('changeRegister', false)
    }
  },
  modules: {
    commentList
  }

})
