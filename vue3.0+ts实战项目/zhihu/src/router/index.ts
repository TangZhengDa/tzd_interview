import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routerHistory = createWebHistory()
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  }
]

const router = createRouter({
  history: routerHistory,
  routes
})

export default router
