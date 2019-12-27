import { BasicLayout } from '../src/layouts'

// export const asyncRouterMap = [
//   {
//     path: '/',
//     name: 'index',
//     component: BasicLayout,
//     meta: { title: '首页' },
//     redirect: '/dashboard/workplace',
//     children: [
//       {
//         //仪表盘
//         path: '/dashboard',
//         name: 'dashboard',
//         redirect: '/dashboard/workplace',
//         component: RouteView,
//         meta: { title: '仪表盘', keepAlive: true, icon: 'dashboard', permission: ['dashboard'] },
//         children: [
//           {
//             //工作台
//             path: '/dashboard/workplace',
//             name: 'Workplace',
//             component: () => import('@/views/dashboard/Workplace'),
//             meta: { title: '工作台', keepAlive: true, permission: ['dashboard'] }
//           }
//         ]
//       }
//     ]
//   },
//   {
//     path: '*', redirect: '/404', hidden: true
//   }
// ]

/*
 * 基础路由
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    // meta: { title: '首页' },
    // redirect: '/dashboard/workplace',
    // children: [
    //   {
    //     //登录
    //     path: 'login',
    //     name: 'login',
    //     component: () => import('@/views/user/Login')
    //   },
    //   {
    //     path: 'register',
    //     name: 'register',
    //     component: () => import('@/views/user/Register')
    //   },
    //   {
    //     path: 'register-result',
    //     name: 'registerResult',
    //     component: () => import('@/views/user/RegisterResult')
    //   }
    // ]
  }
]