import Mock from 'mockjs2'


//if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
console.log('mock 加载中')
require('./services/user')
// require('./services/shop')
// require('./services/account')
// require('./services/agent')
// require('./services/market')
// require('./services/audit')
// require('./services/mchrange')
// require('./services/content')
// require('./services/power')
// require('./services/product')
// require('./services/datareport')
Mock.setup({
  timeout: 800
})
console.log('mock 加载完成')
//}