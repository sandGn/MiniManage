import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ui库
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

// mock
import '../mock'

// 本地存储插件
import VueStorage from 'vue-ls'
import config from '../config/defaultSettings'
import './permission' // 导航守卫 权限控制

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(VueStorage, config.storageOptions)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
