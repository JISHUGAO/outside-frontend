<template>
  <div>
    <article-list :message="flag"></article-list>
  </div>
</template>

<script>
import ArticleList from './article_list'
export default {
  data () {
    return {
      flag: 'index'
    }
  },
  components: {
    ArticleList
  }
}
</script>
