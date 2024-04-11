import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login'
import MainBox from '../views/MainBox'
import routusConfig from './config'
import store from '@/store'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mainBox',
    name: 'mainBox',
    component: MainBox
  }
  // mainBox的嵌套路由，后面根据权限动态添加
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 每次路由跳转之前都会执行这个函数
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    // 如果授权（已经登录过了）next()
    // 未授权，重定向到login
    if (!localStorage.getItem('token')) {
      next({
        path: '/login'
      })
    } else {
      if (!store.state.isGetterRouter) {
        ConfigRouter()
        next({
          path: to.fullPath
        })
      } else {
        next()
      }
    }
  }
})

const ConfigRouter = () => {
  routusConfig.forEach((item => {
    router.addRoute('mainBox', item)
  }))

  // 将isGetterRouter为true
  store.commit('changeGetterRouter', true)
}

export default router
