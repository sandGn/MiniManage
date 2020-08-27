/*
 * 全局导航守卫
 */
import Vue from 'vue'
import router from './router'
import store from './store'
import { ACCESS_TOKEN } from './store/mutation-types'

const whiteList = ['login','mertregister','userregister','registerresult']
const defaultRoutePath = ''

// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
router.beforeEach((to, from, next) => {
  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    next({ path: defaultRoutePath })
  }else{
    console.log(store.getters.roles.length)
  }
})

router.afterEach(() => {

})