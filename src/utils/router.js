// 动态生成路由
export function generateIndexRouter(data) {
  let indexRouter = [{
    path: '/',
    name: 'dashboard',
    //component: () => import('@/components/layouts/BasicLayout'),
    component: resolve => require(['@/components/layouts/TabLayout'], resolve),
    meta: { title: '首页' },
    redirect: '/dashboard/analysis',
    children: [
      ...generateChildRouters(data)
    ]
  }, {
    'path': '*', 'redirect': '/404', 'hidden': true
  }]
  return indexRouter
}
// 生成嵌套路由（子路由）
function generateChildRouters(data) {
  console.log(data)
  const routers = []
  return routers
}