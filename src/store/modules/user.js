
import Vue from 'vue'
import { ACCESS_TOKEN, USER_INFO } from '../mutation-types'
import { login, logout } from '../../api/user'
import store from '../index'
import router from '../../router/index'


const user = {
  state: {
    token: '',
    user_name: '',
    roles: [], //角色多个
    permissionList: [],//权限
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          if (response.code === '200') {
            const result = response.data
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_INFO, result.userInfo, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_INFO', result.userInfo)

            resolve(response)
          } else {
            reject(response)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  mutations: {

  }
}
export default user