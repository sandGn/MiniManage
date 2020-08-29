/*
 * 全局导航守卫
 */
import Vue from 'vue'
import router from './router'
import store from './store'
import { ACCESS_TOKEN } from './store/mutation-types'
import { generateIndexRouter } from './utils/router'


const whiteList = ['login', 'mertregister', 'userregister', 'registerresult']
const defaultRoutePath = '/company/companyinfo'

// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
router.beforeEach((to, from, next) => {
  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === '/user/login') {
      next({ path: defaultRoutePath })
    } else {
      console.log(store.getters.permissionList)
      if (store.getters.permissionList.length === 0) {
        //根据 token 获取 权限
        store.dispatch('GetPermissionList').then(res => {
          const permissionData = res.data.permissions

          let constRoutes = generateIndexRouter(permissionData)
          // 添加主界面路由
          store.dispatch('UpdateAppRouter', { constRoutes }).then(() => {
            // 根据roles权限生成可访问的路由表
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          })
        })
          .catch(() => {
            store.dispatch('Logout').then(() => {
              next({ path: '/user/login', query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    //if (whiteList.indexOf(to.path) !== -1) {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
    }
  }
})

router.afterEach(() => {

})