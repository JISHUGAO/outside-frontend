<template>
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
    <el-col :span="6" class="g-align-right" v-if="isLogin">
      我登录了
    </el-col>
    <el-col :span="6" class="g-align-right" v-else="isLogin">
      <span>注册</span> | 
      <span>登录</span>
    </el-col>
  </el-row> 
</template>

<script>
  import Api from '../api'
  export default {
    data () {
      return {
        'menus': ''
      }
    },
    methods: {
      clickSelect (index, path) {
        console.log(index)
      }
    },
    computed: {
      isLogin () {
        return this.$store.state.isLogin
      }
    },
    filters: {
      concat (i) {
        return '/category/' + i
      }
    },
    created () {
      this.$http.get(Api.category).then(function (response) {
        return response.json()
      }).then(function (data) {
        if (data.code === 0) {
          this.menus = data.data
        } else {

        }
      })
    }
  }
</script>
