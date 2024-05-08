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
      /**
       * 因为每次路由跳转都会触发这个方法，所以我们需要判断当前情况下
       * 路由有没有动态设置过，如果动态设置过了，就直接执行路由跳转，
       * 如果没有动态设置过，则需要进行动态设置路由。
       * 
       * 如果在之前已经设置过动态路由的情况下，还继续执行 ConfigRouter()
       * 函数，就会导致 mainBox 里面的路由越来越多，而且还是重复的。
       * 
       * 动态设置目的是为了路由鉴权
       * */ 
      if (!store.state.isGetterRouter) {
        // 如果路由还未被动态设置
        
        // 删除所有的嵌套路由，或者直接删掉mainBox
        /**
         * 删除mainBox的目的：
         *  第一次进来使用 非admin 角色，这时是没有新增/编辑权限的。然后
         *  退出时，并没有走按钮退出，而是走的地址栏输入login路由跳转退出。退出后
         *  再次使用 admin 角色进入，这时就有了新增/编辑权限。然后继续走地址栏
         *  退出，然后再次用 非admin 进入。由于上一次使用的是 admin 进去，
         *  并且没有走按钮退出，导致 动态路由里面还存在了 admin权限 的路由，
         *  所以这时候 非admin 又可以通过地址栏访问到 admin的路由了。
         * */ 
        router.removeRoute('mainBox')
        ConfigRouter()
        next({
          path: to.fullPath
        })
      } else {
        // 路由已动态设置
        next()
      }
    }
  }
})

const ConfigRouter = () => {
  if (!router.hasRoute('mainBox')) {
    router.addRoute({
      path: '/mainBox',
      name: 'mainBox',
      component: MainBox
    })
  }

  routusConfig.forEach((item => {
    checkPermission(item) && router.addRoute('mainBox', item)
  }))

  // 将isGetterRouter为true
  store.commit('changeGetterRouter', true)
}

const checkPermission = item => {
  // 当用户从地址栏输入权限路由时，进行权限拦截
  if (item?.requireAdmin) {
    return store.state.userInfo.role === 1
  }

  return true
}

export default router
