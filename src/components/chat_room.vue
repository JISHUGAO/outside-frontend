<template>
  <el-dialog title="聊天室" @open="handleOpen" v-model="dialogVisible" size="small" @close="handleClose" custom-class="chat-dialog">
    <div>
        <el-row>
          <!-- 显示聊天窗口和发送输入框  -->
          <el-col :span="16">
            <!-- 聊天框 -->
            <el-row class="chat-record" id="chat-record">
              <el-row v-for="chatRecord in chatRecords">
                <template v-if="chatRecord.me === 1">
                  <el-col justify="end" class="g-align-right">
                  <div>
                    <span class="time">{{chatRecord.time}}</span>
                    <span class="username">{{chatRecord.nickname}}</span>
                    <img src="http://static.localhost.gaoweisong.com/img/default/avatar.jpeg" style="width:2rem;">
                  </div>
                    <div class="content">
                      {{chatRecord.content}}
                    </div>
                  </el-col>
                </template>
                
                <template v-else-if="chatRecord.me === 2">
                  <el-col justify="end" class="g-align-left">
                  <div>
                  <img src="http://static.localhost.gaoweisong.com/img/default/avatar.jpeg" style="width:2rem;">
                    <span class="username">{{chatRecord.nickname}}</span>
                    <span class="time">{{chatRecord.time}}</span>
                    
                    
                  </div>
                    <div class="content">
                      {{chatRecord.content}}
                    </div>
                </el-col>
                </template>


              <!-- 登录信息 -->
                  <el-col :span="12" :offset="6" class="login-message">
                    <span class="username">{{chatRecord.loginMessage}}</span>
                  </el-col>
              </el-row>
                
            </el-row>
            <!-- 输入框 -->
            <el-row class="chat-input">
              <el-row>
                <textarea v-model="msg" @keyup.enter.prevent="handleSend"></textarea>
              </el-row>
                  <el-col>
                    <el-button @click="handleClose">关闭</el-button>
                    <el-button type="primary" @click="handleSend">发送</el-button>
                  </el-col>
                  
                 
            </el-row>
          </el-col>

          <!-- 显示在线人 -->
          <el-col :span="8" class="chat-people">
            <ul v-for="user in userList">
              <li>{{user.nickname}}</li>
            </ul>
          </el-col>
        </el-row>
    </div>
  </el-dialog>
</template>
<script>
  import Api from '../api'
  import moment from 'moment'
  export default {
    data () {
      return {
        msg: '',
        socket: '',
        userList: [],
        chatRecords: []
      }
    },
    computed: {
      dialogVisible () {
        return this.$store.state.dialogChatRoomVisible;
      }
    },
    watch: {
      chatRecords () {
        this.$nextTick(() => {
          document.getElementById('chat-record').scrollTop = document.getElementById('chat-record').scrollHeight;
        })
      }
    },
    methods: {
      handleSend () {
        if (this.msg == '') {
          return
        }
        var data = {
          type: 'say',
          client: 'web',
          content: this.msg
        }
        this.socket.send(JSON.stringify(data))
        this.msg = ''
      },
      say (user, timestamp) {
        user.time = moment(timestamp*1000).format('YYYY-MM-DD HH:MM')
        if (user.id == this.$store.state.user.id) {
          user.me = 1
        } else {
          user.me = 2
        }
        this.chatRecords.push(user)
        
      },
      handleClose () {
        this.$store.state.dialogChatRoomVisible = false
      },
      handleOpen () {
        if (!this.socket) {
          this.socket = this.$store.state.socket
          this.connect()
          // 获取在线列表
          var data = {
            type: 'list',
            client: 'web'
          }
          this.socket.send(JSON.stringify(data))
        }
      },
      someoneLogin (user) {
        if (user.id != this.$store.state.user.id) {
          this.userList.push(user)
        }

        user.me = 3
        user.loginMessage = user.nickname + '上线了'
        this.chatRecords.push(user)
      },
      someoneLogout (user) {
        for (var index in this.userList) {
          if (user.id == this.userList[index].id) {
            this.userList.splice(index, 1)
          }
        }
        user.me = 3
        user.loginMessage = user.nickname + '下线了'
        this.chatRecords.push(user)
      },
      connect () {
        if (!this.$store.state.isLogin) {
          this.socket.close()
          return
        }

        var vm = this
        this.socket.onmessage = function (e) {
          var data = e.data
          if (data == '') {
            return
          }
          var data = JSON.parse(data)
          switch (data.type) {
            case 'login':
              vm.someoneLogin(data.user)
              break;
            case 'list':
              vm.userList = data.client_list
              break;
            case 'say':
              vm.say(data.user, data.timestamp)
              break; 
            case 'logout':
              vm.someoneLogout(data.user)
              break;
          }
        }

        this.socket.onclose = function () {
          if (vm.$store.state.isLogin) {
            vm.connect()
          } else {
            vm.socket.close()
          }
          
        }
      }
    }

  }
</script>
<style>
  .chat-dialog {
    width:30rem; 
  }
  .chat-input {
    width:100%;
    height: 10rem;
    border: none;
    padding-top:1rem;
    outline: none;
    resize: none;
    border-top:1px solid #dedede;
  }
  .chat-input textarea {
    border:none;
    outline: none;
    height:6rem;
    width: 100%;
    resize: none;
  }
  .chat-people {
    border-left: 1px solid #dedede;
    height:30rem;
    padding-left: 1rem;
    overflow-y:auto; 
  }
  .chat-people li {
    padding-top: 0.4rem;
    overflow-x: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .chat-record {
    height:20rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.5rem;
    color: #6b6969;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .chat-record img {
    border-radius: 100%;
    vertical-align: middle;
  }
  .chat-record .content {
    background-color: #5FB878; 
    font-size: 1rem;
    color:#fff ;
    padding:0.5rem;
    border-radius:2%;
    display: inline-block;
  }

  .chat-record .g-align-right .content {
    margin-right: 2.5rem;
  }

  .chat-record .g-align-left .content {
    margin-left: 2.5rem;
  }
  div.login-message{
    text-align: center;
    color:#9a9898;
    border-radius: 10%;
    font-size: 100%;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }
  .login-message .username {
    color:grey;
  }
</style>
