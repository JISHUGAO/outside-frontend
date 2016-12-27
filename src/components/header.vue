<template>
  <div>
    <el-row class="nav">
    <el-col :span="4">
      <h1>G-lab</h1>
    </el-col>
    <el-col :span="14">
        <el-menu default-active="index" class="el-menu-demo" mode="horizontal" :router="true">
              <el-menu-item index="/index" v-on:select="clickSelect">首页</el-menu-item>
              <el-menu-item v-for="menu in menus" :index="menu.id|concat">{{menu.name}}</el-menu-item>
        </el-menu>
    </el-col>
    <!-- 用户登录状态 -->
    <el-col :span="6" class="user g-align-right" v-if="isLogin">
      <div>
        <img :src="user.avatar" class="avatar">
        <span>{{user.nickname}}</span>
        |
        <span @click="logout">退出</span>
      </div>
      
    </el-col>
    <el-col :span="6" class="user g-align-right" v-else="isLogin">
      <span id="register" @click="showRegister">注册</span> | 
      <span id="login" @click="showLogin">登录</span>
    </el-col>
  </el-row> 

  

</template>

<script>
  import Api from '../api'
  import login from './login'
  export default {
    data () {
      return {
        
      }
    },
    components: {
      login
    },
    methods: {
      clickSelect (index, path) {
        console.log(index)
      },
      showLogin () {
        this.$store.dispatch('showLogin')
      },
      showRegister () {
        this.$store.dispatch('showRegister')
      },
      getAvatar () {
        this.$store.state.user.avatar = this.getDefaultAvatar()
      },
      logout () {
        this.$confirm('您确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('logoutAction')
          this.$message({
            type: 'success',
            message: '退出成功'
          });
        }).catch(() => {
                  
        });
      }
    },
    computed: {
      isLogin () {
        return this.$store.state.isLogin
      },
      user () {
        var user = this.$store.state.user
        if (typeof user.avatar == 'undefined' || user.avatar == '') {
          this.getAvatar()
        }
        return this.$store.state.user
      },
      menus () {
        return this.$store.state.menus
      }
    },
    filters: {
      concat (i) {
        return '/category/' + i
      }
    },
    created () {
      this.fetch(Api.category).then(function (d) {
        this.$store.commit('setMenus', d)
      })
    }
  }
</script>
<style scoped="">
  .user {
    font-size: 1rem;
    padding-right: 1rem;
    cursor:pointer;
  }
  .user img {
    display: inline-block;
    vertical-align: middle;
    margin-top: -0.3rem;
  }
</style>