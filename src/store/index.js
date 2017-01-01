import Vue from 'vue'
import Vuex from 'vuex'
import cookies from 'cookies-js'
import commentList from './comment_list'
import Api from '../api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user:{

    },
    dialogLoginVisible: false,
    dialogRegisterVisible: false,
    dialogChatRoomVisible: false,
    currentPageName: '',
    menus: '',
    searchKeyword: '',
    socket: ''
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
      //关闭WebSocket
      if (context.state.socket) {
        context.state.socket.close()
      }
    },
    loginAction (context, info) {
      context.commit('loginAction', info)
      // 连接WebSocket
      if (context.state.isLogin) {
        context.state.socket = new WebSocket(Api.chatAddress)
        context.state.socket.onopen = function () {
          var user = context.state.user
          var data = {
            type: 'login',
            client: 'web',
            data: user
          }
          context.state.socket.send(JSON.stringify(data))
        }
      }
      
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
