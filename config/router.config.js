/*
 * 路由配置管理
 */
import { BasicLayout, UserLayout, PageView, RouteView } from '../src/layouts'

/**
 * 动态路由
 * @type {[null,null]}
 */
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/company',
    children: [
      //企业管理
      {
        path: '/company',
        name: 'company',
        redirect: '/company/companyinfo',
        component: RouteView,
        meta: { title: '企业管理', keepAlive: true, icon: 'solution', permission: ['COMPANY_MANAGE'] },
        children: [
          //企业信息
          {
            path: '/company/companyinfo',
            name: 'CompanyInfo',
            component: () => import('@/views/company/CompanyInfo'),
            meta: { title: '企业信息', keepAlive: true, permission: ['COMPANY_DETAIL'] },
          }
        ],
      },
      // 用户/员工管理
      {
        path: '/account',
        name: 'account',
        redirect: '/account/accountauditlist',
        component: PageView,
        meta: { title: '员工管理', keepAlive: true, icon: 'team', permission: ['ACCOUNT_MANAGE'] },
        children: [
          // 员工申请列表
          {
            path: '/account/accountauditlist',
            name: 'AccountAuditList',
            component: () => import('@/views/account/AccountAuditList'),
            meta: { title: '员工申请列表', keepAlive: true, permission: ['ACCOUNT_AUDIT_LIST'] }
          },
          //员工列表
          {
            path: '/account/accountlist',
            name: 'AccountList',
            component: () => import('@/views/account/AccountList'),
            meta: { title: '员工列表', keepAlive: true, permission: ['ACCOUNT_LIST'] }
          },
          //岗位管理
          {
            path: '/user/dutylist',
            name: 'DutyList',
            component: () => import('@/views/account/DutyList'),
            meta: { title: '岗位管理', keepAlive: true, permission: ['ACCOUNT_DUTY_LIST'] }
          },
        ]
      },
      //车辆管理
      {
        path: '/car',
        name: 'car',
        redirect: '/car/carlist',
        component: PageView,
        meta: { title: '车辆管理', keepAlive: true, icon: 'car', permission: ['CAR_MANAGE'] },
        children: [
          //车辆列表
          {
            path: '/car/carlist',
            name: 'CarList',
            component: () => import('@/views/car/CarList'),
            meta: { title: '车辆列表', keepAlive: true, permission: ['CAR_LIST'] }
          },
          //司机管理
          {
            path: '/car/driverlist',
            name: 'DriverList',
            component: () => import('@/views/car/DriverList'),
            meta: { title: '司机列表', keepAlive: true, permission: ['CAR_DRIVER_LIST'] }
          },
          //车辆设置 【点检、保养项目设置】
          {
            path: '/car/carsetting',
            name: 'CarSetting',
            component: () => import('@/views/car/CarSetting'),
            meta: { title: '车辆设置', keepAlive: true, permission: ['CAR_SETTING'] }
          },
          //车辆记录 【出入车、点检、保养、加油...】
          {
            path: '/car/carrecord',
            name: 'CarRecord',
            component: () => import('@/views/car/CarRecord'),
            meta: { title: '车辆记录', keepAlive: true, permission: ['CAR_RECORD'] }
          }
        ]
      },
      //食堂管理
      {
        path: '/canteen',
        name: 'canteen',
        //redirect: '/canteen',
        component: PageView,
        meta: { title: '食堂管理', keepAlive: true, icon: 'alert', permission: ['CANTEEN_MANAGE'] },
        children: [],
      },
      //宿舍管理
      {
        path: '/dormitory',
        name: 'dormitory',
        //redirect: '/dormitory',
        component: PageView,
        meta: { title: '宿舍管理', keepAlive: true, icon: 'alert', permission: ['DORMITORY_MANAGE'] },
        children: [],
      },
      //卫生管理
      {
        path: '/hygiene',
        name: 'hygiene',
        //redirect: '/dormitory',
        component: PageView,
        meta: { title: '卫生管理', keepAlive: true, icon: 'alert', permission: ['HYGIENE_MANAGE'] },
        children: [],
      },
      //订单管理
      {
        path: '/order',
        name: 'order',
        redirect: '/order/orderlist',
        component: PageView,
        meta: { title: '订单管理', keepAlive: true, icon: 'pay-circle', permission: ['ORDER_MANAGE'] },
        children: [
          // 订单列表
          {
            path: '/order/orderlist',
            name: 'OrderList',
            component: () => import('@/views/order/OrderList'),
            meta: { title: '订单列表', keepAlive: true, permission: ['ORDER_LIST'] }
          },
        ],
      },
      //系统管理
      {
        path: '/system',
        name: 'system',
        redirect: '/system/actionloglist',
        component: PageView,
        meta: { title: '系统管理', keepAlive: true, icon: 'setting', permission: ['SYSTEM_MANAGE'] },
        children: [
          // 操作日志
          {
            path: '/system/actionloglist',
            name: 'ActionLogList',
            component: () => import('@/views/system/ActionLogList'),
            meta: { title: '操作日志', keepAlive: true, permission: ['ACTION_LOG_LIST'] }
          },
        ],
      }
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
        component: () => import('@/views/user/Login')
      },
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404')
  }
]