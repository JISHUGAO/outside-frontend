import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../components/index'
import ArticleList from '../components/article_list'
import ArticleDetail from '../components/article_detail'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/', redirect: '/index'},
    {path: '/index', component: Index},
    {path: '/category/:id', component: ArticleList, name: 'category'},
    {path: '/article/:id', component: ArticleDetail, name: 'article'}
  ]
})



export default router
