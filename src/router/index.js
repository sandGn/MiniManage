/*
 * 路由器模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { constantRouterMap } from '../../config/router.config'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  //routes: constantRouterMap.concat(asyncRouterMap)
  routes: constantRouterMap
})

export default router
