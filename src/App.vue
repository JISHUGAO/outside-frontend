<template>
  <div id="app">
    <my-header></my-header>
    
    <el-row>
        <el-col :span="10" :offset="2">
         <el-breadcrumb separator="/" class="g-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="currentPageName">{{currentPageName}}</el-breadcrumb-item>
        </el-breadcrumb>
        </el-col>

        <!-- <el-col :span="5" :push="5">
          <el-input class="g-search"
            placeholder="搜索"
            icon="search"
            size="small"
            v-model="searchKeyword"
            @@keyup.enter="handleSearch">
          </el-input>
        </el-col> -->

    </el-row>
   
    <router-view></router-view>
    <my-footer></my-footer>
    <login></login>
    <register></register>
  </div>
</template>

<script>
import myHeader from './components/header'
import myFooter from './components/footer'
import login from './components/login'
import register from './components/register'
export default {
  name: 'app',
  components: {
    myHeader,
    myFooter,
    login,
    register
  },
  computed: {
    currentPageName () {
      return this.$store.state.currentPageName
    },
    searchKeyword () {
      return this.$store.state.searchKeyword
    }
  },
  methods: {
    handleSearch (event) {
      console.log(event)
    }
  }
}
</script>

<style>
@import './assets/common.css'
</style>
