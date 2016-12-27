<template>
  <!-- 登录 -->
  <el-dialog title="登录"  v-model="dialogLoginVisible" @close="handleClose" size="tiny">
  <el-form :model="loginForm"  label-width="60px">
    <el-form-item label="用户名" :error="loginFormError.account">
      <el-input v-model="loginForm.account" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :error="loginFormError.pwd">
      <el-input v-model="loginForm.pwd" auto-complete="off"></el-input>
    </el-form-item>
    <el-row>
      <el-button type="primary" @click="handleLogin" :style="{width:'100%'}">登录</el-button>
    </el-row>
  </el-form>
  <div slot="footer" class="dialog-footer"></div>
</el-dialog>
</template>
<script>
  import Api from '../api'
  export default {
    data () {
      return {
        'loginForm': {
          'account': '',
          'pwd': ''
        },
        'loginFormError': {
          'account': '',
          'pwd': ''
        }
      }
    },
    computed: {
      dialogLoginVisible () {
        return this.$store.state.dialogLoginVisible
      }
    },
    methods: {
      clearFormError (formError) {
        for (var index in formError) {
          formError[index] = ''
        }
      },
      handleClose () {
        this.$store.dispatch('closeDialog')
      },
      handleLogin () {
        this.clearFormError(this.loginFormError)
        this.post(Api.login, this.loginForm).then(function (data) {
          console.log(data)
            this.$store.dispatch('loginAction', data)
            this.handleClose()
        }, function (data) {
            for (var index in data) {
              this.loginFormError[index] = data[index][0]
            }
        })
        
      }
    }
  }
</script>