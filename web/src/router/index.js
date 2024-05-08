import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress' // 页面加载进度条
import 'nprogress/nprogress.css'
import Home from '../views/Home'
import News from '../views/News'
import New from '../views/New'
import Product from '../views/Product'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/new/:id',
    name: 'New',
    component: New
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条开始
  next()
})

router.afterEach(() => {
  NProgress.done() // 进度条结束
})

export default router
