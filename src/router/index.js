import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../components/index'
import ArticleList from '../components/article_list'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/', redirect: '/index'},
    {path: '/index', component: Index},
    {path: '/category/:id', component: ArticleList}
  ]
})

export default router
