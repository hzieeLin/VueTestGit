import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage'
import HomePage from "@/views/HomePage";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {path: '/home', component: HomePage}
]

const router = new VueRouter({
  routes
})

export default router
