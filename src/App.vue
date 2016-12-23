<template>
  <div id="app">
    <my-header></my-header>
    <el-row class="g-breadcrumb">
        <el-col :span="20" :offset="2">
         <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        
        </el-col>
    </el-row>
   
</el-breadcrumb>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myHeader from './components/header'
import myFooter from './components/footer'
export default {
  name: 'app',
  components: {
    myHeader,
    myFooter
  }
}
</script>

<style>
@import './assets/common.css'
</style>
