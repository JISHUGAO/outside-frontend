<template>
  <el-row>
    <el-col :span="18" :offset="3">
      <el-form :model="form" :rules="rules" ref="form" label-position="top" >
        <el-form-item prop="comment" label="发表评论">
          <el-input v-model="form.content"  type="textarea"></el-input>
        </el-form-item>
        <el-form-item class='g-align-right'>
           <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
      
    </el-col>
  </el-row>
</template>
<script>
  import Api from '../api'
  export default {
    data () {
      var empty = function (rule, value, callback) {
        if (value == '') {
          callback(new Error('请输入评论内容'))
        }
        callback()
      }
      return {
        form: {
          content: ''
        },
        rules: {
          content: [
            {validator: empty, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit () {
        var vm = this
        this.$refs.form.validate(function (valid, v) {
          if (valid) {
            if (vm.$store.state.isLogin) {
              vm.form['article_id'] = vm.getArticleId
              vm.form['user_id'] = vm.$store.state.user.id
              vm.post(Api.pushComment, vm.form).then(function (data) {
          
                var user = vm.$store.state.user
                var commentDetail = {
                  'content': vm.form.content,
                  'user': {
                    'avatar': user.avatar,
                    'nickname': user.nickname,
                  }
                }
                vm.$store.commit('addItem', commentDetail)
                
                vm.form.content = ''
              })
              
            } else {
              vm.$store.dispatch('showLogin')
            }
            
          }
        })
      },
      getArticleId () {
        return this.$route.params.id
      }
    }
  }
</script>