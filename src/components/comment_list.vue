<template>
  <el-row class="comment_container">
    <el-col :span="18" :offset="3">
      <el-row class="comment_title">
      最新评论
      </el-row>
      <el-row class="comment_content">
          <template v-if="items">
            <el-row v-for="item in items" class="item">
              <el-col :span="1">
                <img :src="item.user.avatar" @error="getAvatar(item.user)" class="avatar">
              </el-col>
              <el-col :span="10" class="item-right">
                <el-row :style="{marginTop:'3px', fontSize:'.8rem'}">{{item.user.nickname}}</el-row>
                <el-row class="content">
                {{item.content}}
                </el-row>
              </el-col>
            </el-row>
          </template>

          <template v-else>
          <el-col class="g-text-center">
            没有评论，快来评论吧
          </el-col>
          </template>
      </el-row>

    </el-col>

    <template v-if="showPagination">
      <el-col :span="18" :offset="3" class="g-pagination">
        <el-pagination class="g-text-center" @current-change="handleCurrentChange" 
          layout="prev, pager, next"
          :total="totalCount" :page-size="size">
        </el-pagination>
      </el-col>
    </template>
    
  </el-row>
</template>
<script>
  import Api from '../api'
  export default {
    data () {
      return {
        page: 1,
        totalCount: 0,
        size: 0,
        showPagination: false
      }
    },
    computed: {
      items () {
        return this.$store.state.commentList.items
      }
    },
    methods: {
      getFetch (articleId, page) {
        this.fetch(Api.comments + `?article_id=${articleId}&page=${page}`).then(function (data) {
          this.$store.commit('setList', data.items)
          this.showPagination = !!data.totalCount
          this.size = data.size
          this.totalCount = data.totalCount
        })
      },
      getArticleId () {
        return this.$route.params.id
      },
      getAvatar (user) {
        user.avatar = this.getDefaultAvatar()
      },
      handleCurrentChange (val) {
        this.page = val
        this.getFetch(this.getArticleId(), this.page)
      }
    },
    created () {
      this.getFetch(this.getArticleId(), this.page)
    }
  }
</script>
<style>
  .comment_title {
    border-bottom: 1px solid #b9b8b8;
    padding: .5rem 0;
    color: #e2a7a7;
  }
  .comment_content {
    margin-top: 1rem;
  }
  .comment_content .item {
    margin-top: 1rem;
  }
  .comment_content .item .content {
    margin-top:1rem;
  }
  .comment_content .item-right {
    margin-left: 1rem;
  }
  .comment_container {
    margin-bottom: 4rem;
  }
</style>