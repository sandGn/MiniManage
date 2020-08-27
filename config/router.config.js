/*
 * 路由配置管理
 */
import { BasicLayout, UserLayout, PageView } from '../src/layouts'


export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/company',
    children: [
      //企业信息
      {
        path:'/company',
        name:'company',
        component: () => import('@/views/company/Company'),
        meta:{ title: '企业信息', keepAlive: true, icon: 'solution', permission: ['company'] }
      },
      // 用户管理
      {
        path: '/user',
        name: 'user',
        redirect: '/user/userlist',
        component: PageView,
        meta: { title: '员工管理', keepAlive: true, icon: 'team', permission: ['user'] },
        children: [
          {
            //员工信息
            path: '/user/userlist',
            name: 'Userlist',
            component: () => import('@/views/user/Userlist'),
            meta: { title: '员工信息', keepAlive: true, permission: ['user'] }
          },
          {
            //角色管理
            path: '/user/rolelist',
            name: 'Rolelist',
            component: () => import('@/views/user/Rolelist'),
            meta: { title: '角色管理', keepAlive: true, permission: ['user'] }
          },
          // {
          //   //权限管理
          //   path: '/user/permissionlist',
          //   name: 'Permissionlist',
          //   component: () => import('@/views/user/Permissionlist'),
          //   meta: { title: '权限管理', keepAlive: true, permission: ['user'] }
          // },
        ]
      },
      {
        path: '/car',
        name: 'car',
        redirect: '/car/carlist',
        component: PageView,
        meta: { title: '车辆管理', keepAlive: true, icon: 'car', permission: ['car'] },
        children: [
          {
            //车辆信息
            path: '/car/carlist',
            name: 'Carlist',
            component: () => import('@/views/car/Carlist'),
            meta: { title: '车辆信息', keepAlive: true, permission: ['car'] }
          },
          {
            //司机管理
            path: '/car/driverlist',
            name: 'Driverlist',
            component: () => import('@/views/car/Driverlist'),
            meta: { title: '司机管理', keepAlive: true, permission: ['car'] }
          },
          {
            //点检项目管理
            path: '/car/checkitem',
            name: 'Checkitem',
            component: () => import('@/views/car/Checkitem'),
            meta: { title: '点检项目管理', keepAlive: true, permission: ['car'] }
          },
          {
            //保养项目管理
            path: '/car/maintenanceitem',
            name: 'Maintenanceitem',
            component: () => import('@/views/car/Maintenanceitem'),
            meta: { title: '保养项目管理', keepAlive: true, permission: ['car'] }
          },
        ]
      },
      {
        path: '/alert',
        name: 'alert',
        redirect: '/alert/alert',
        component: PageView,
        meta: { title: '预警提醒', keepAlive: true, icon: 'alert', permission: ['alert'] },
        children: [],
      },
      {
        path: '/order',
        name: 'order',
        redirect: '/order/',
        component: PageView,
        meta: { title: '订单管理', keepAlive: true, icon: 'pay-circle', permission: ['order'] },
        children: [],
      },
      {
        path: '/sys',
        name: 'sys',
        redirect: '/sys/setting',
        component: PageView,
        meta: { title: '系统工具', keepAlive: true, icon: 'setting', permission: ['sys'] },
        children: [],
      }





      // // 仪表盘-模板
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   redirect: '/dashboard/workplace',
      //   component: RouteView,
      //   meta: { title: '员工管理', keepAlive: true, icon: 'dashboard', permission: ['dashboard'] },
      //   children: [
      //     {
      //       //工作台
      //       path: '/dashboard/workplace',
      //       name: 'Workplace',
      //       component: () => import('@/views/dashboard/Workplace'),
      //       meta: { title: '员工信息', keepAlive: true, permission: ['dashboard'] }
      //     }
      //   ]
      // }
    ]
  }
]

/**
 * 基础路由 无需权限全局可访问
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/login/Login')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404')
  }
]