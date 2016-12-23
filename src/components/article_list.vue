<template>
  <el-row :gutter="20"  v-loading.text="loading">
  <el-col :span="18" :offset="3" class="g-article-container">
    <el-row v-for="item in items" class="g-article-item">
      <el-col>
        <div class="g-title">{{item.title}}</div>
        <div class="g-description">{{item.description}}</div>
      </el-col>
      
    </el-row>
    
   
  </el-col>
  </el-row>
</template>
<script>
  import Api from '../api'
  export default {
    data () {
      return {
        items: '',
        page: 1,
        loading: false
      }
    },
    props: [
      'message'
    ],
    methods: {
      fetch (category, page) {
        this.loading = true;
        this.$http.get(Api.article + `?category=${category}&page=${page}`).then(function (response) {
            return response.json()
          }).then(function (data) {
            if (data.code === 0) {
              this.items = data.data
            }
            this.loading = false;
          })
      },
      getCategory () {
        var category = 0
        if (typeof this.message === 'undefined') {
          category = this.$route.params.id
        }
        return category
      }
    },
    mounted () {
      this.fetch(this.getCategory(), this.page)
    },
    beforeRouteEnter (to, from, next) {
      console.log(to)
      console.log(from)
      next(function (vm) {
        console.log(123123)
      })
    }
  }
</script>