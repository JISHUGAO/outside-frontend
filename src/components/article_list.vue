<template>

    <el-row v-loading.text="loading">

      <el-col :span="18" :offset="3" class="g-article-container">
        <el-row v-for="item in items" class="g-article-item">
          <el-col>
            <div class="g-title">
            <router-link :to="{path:'/article/'+item.id}">{{item.title}}</router-link>
            </div>
            <div class="g-description">{{item.description}}</div>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="18" :offset="3" class="g-pagination" v-if="showPagination">
        <el-pagination class="g-text-center" @current-change="handleCurrentChange" 
          layout="prev, pager, next"
          :total="totalCount" :page-size="size">
        </el-pagination>
      </el-col>

    </el-row>
   
</template>
<script>
  import Api from '../api'
  export default {
    data () {
      return {
        items: '',
        totalCount: 0,
        page: 1,
        size: 0,
        loading: false,
        showPagination: false
      }
    },
    props: [
      'message'
    ],
    methods: {
      getFetch (category, page) {
        this.loading = true
        this.fetch(Api.articles + `?category=${category}&page=${page}`).then(function (data) {
          this.items = data.items
          this.size = data.size
          this.showPagination = !!data.totalCount
          this.totalCount = data.totalCount
          this.loading = false
          this.setBreadcrumb()
        })
       
      },
      getCategory () {
        var category = 0
        if (typeof this.message === 'undefined') {
          category = this.$route.params.id
        }
        return category
      },
      handleCurrentChange(val) {
        this.page = val
        this.getFetch(this.getCategory(), this.page)
      }
    },
    watch: {
      '$route' () {
        this.getFetch(this.getCategory(), this.page)
        this.setBreadcrumb()
      }
    },
    created () {
      this.getFetch(this.getCategory(), this.page)
    }
  }
</script>

<style scoped>
.g-article-item {
  border-bottom: 0.1px solid #d9d9d9;
  padding-bottom: 1rem;
  padding-top:1rem;
}
.g-article-item:last-child {
  border:none;
}
.g-article-container .g-title {
  font-size:1.6rem;
}
.g-article-container .g-description {
  font-size:.8rem;
  color:#a59a9a;
  padding-top: 1rem;
}

</style>