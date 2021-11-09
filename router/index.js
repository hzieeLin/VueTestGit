import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/view/Home/Home.vue'
import User from '@/view/User/User.vue'
Vue.use(VueRouter)

const routes = [
  // 先定义首页的路由
  { path: '/', component: Home },
  // 定义我的路由
  { path: '/user', component: User }
]

const router = new VueRouter({
  routes
})

export default router
