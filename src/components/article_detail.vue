<template>
  <div>
    <el-row>
      <el-col :span="18" :offset="3" class="title">
        <h1 class="g-text-center">{{item.title}}</h1>
        <span class="source">
        <a :href="item.source_url" target="_blank">{{item.source_name}}</a>
        <span>{{item.create_by|datetime}}</span>
        </span>
        
      </el-col>
    </el-row>

    <el-row class="content-container">
      <el-col :span="18" :offset="3" class="content" v-html="item.content" >
      </el-col>
    </el-row>

    <comment></comment>
    <comment-list></comment-list>
  </div>
</template>
<script>
  import Api from '../api'
  import moment from 'moment'
  import comment from './comment'
  import commentList from './comment_list'
  export default {
    data () {
      return {
        item: ''
      }
    },
    filters: {
      datetime (timestamp) {
        return moment(timestamp*1000).format('YYYY-MM-DD HH:MM')
      }
    },
    created () {
      this.getFetch(this.$route.params.id)
    },
    methods: {
      getFetch (articleId) {
        this.fetch(Api.article + '?id='+articleId).then(function (data) {
          this.item = data
        })
        
      }
    },
    components: {
      comment,
      commentList
    }
  }
</script>
<style scoped>
  .title h1{
    font-size:2rem;
  }
  .title{
    border-bottom: 1px solid #d9d9d9;
    padding-bottom: 1rem;
  }
  .title .source, .title a{
    margin-left:1rem;
    margin-top:1rem;
    font-size:.8rem;
    color:#6f6e6e;
  }
  .content-container {
    margin:1rem 0;
  }
  .content p{
    text-indent: 2rem;
    padding-bottom: 1rem;
  }
  
</style>