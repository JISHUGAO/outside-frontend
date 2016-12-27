<template>
  <!-- 注册 -->
  <el-dialog title="注册" v-model="dialogRegisterVisible" @close="handleClose">
  <el-form :model="registerForm" label-width="70px">
    <el-form-item label="用户名" :error="registerFormError.account">
      <el-input v-model="registerForm.account" auto-complete="off" ></el-input>
    </el-form-item>
    <el-form-item label="密码" :error="registerFormError.password">
      <el-input v-model="registerForm.password" type="password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" :error="registerFormError.repeatPassword">
      <el-input v-model="registerForm.repeatPassword" type="password" auto-complete="off"></el-input>
    </el-form-item>
    <el-row>
      <el-button type="primary" @click="handleRegister" :style="{width:'100%'}">注册</el-button>
    </el-row>
  </el-form>
  <div slot="footer" class="dialog-footer">
  </div>
</el-dialog>

</template>
<script>
  import Api from '../api'
  export default {
    data () {
      return {
        'registerForm': {
          'account': '',
          'password': '',
          'repeatPassword': ''
        },
        'registerFormError': {
          'account': '1',
          'password': '2',
          'repeatPassword': '3'
        }
      }
    },
    computed: {
      dialogRegisterVisible () {
        return this.$store.state.dialogRegisterVisible
      }
    },
    methods: {
      handleClose () {
        this.$store.dispatch('closeDialog')
      },
      handleRegister () {
        this.clearFormError(this.registerFormError)
        this.post(Api.register, this.registerForm).then(function(data) {
            this.handleClose();
            this.$store.dispatch('loginAction', data)
        }, function (data) {
            for (var index in data) {
              this.registerFormError[index] = data[index][0]
            }
        })
      },
      clearFormError (formError) {
        for (var index in formError) {
          formError[index] = ''
        }
      },
    }
  }
</script>