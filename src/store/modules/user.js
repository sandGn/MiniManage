
import Vue from 'vue'
import { ACCESS_TOKEN, USER_INFO, USER_NAME, COMPANY_INFO } from '../mutation-types'
import { login, logout } from '../../api/login'
import { queryPermissionsByUser } from '../../api/api'

const user = {
  state: {
    token: '',
    userName: '', //名称
    userInfo: {}, //用户信息
    companyInfo: [],//企业信息
    //roles: [], //角色多个
    permissionList: [],//权限
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          if (response.success) {
            const result = response.data
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_INFO, result.userInfo, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_NAME, result.userInfo.accountName, 7 * 24 * 60 * 60 * 1000)            
            commit('SET_TOKEN', result.token)
            commit('SET_INFO', result.userInfo)
            //commit('SET_COMPANY', result.companyInfo)
            //取默认启用的企业【后期优化多个企业，弹窗选择进入】
            if (result.companyInfo.length > 0) {
              result.companyInfo.forEach(item => {
                if (item.isDefault == 1) {
                  commit('SET_COMPANY', item)
                  Vue.ls.set(COMPANY_INFO, item, 7 * 24 * 60 * 60 * 1000)
                  return
                }
              })          
            }
            resolve(response)
          } else {
            reject(response)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    //获取用户权限
    GetPermissionList({ commit }) {
      return new Promise((resolve, reject) => {
        //let token = Vue.ls.get(ACCESS_TOKEN)
        //let params = { token: token }
        const permissionList = []
        queryPermissionsByUser({}).then((response) => {
          //console.log(JSON.stringify(response))
          const permissionData = response.data.permission
          if (permissionData && permissionData.length > 0) {
            permissionData.forEach(item => {
              if (item.hasThisModule) {
                if (item.children.length > 0) {
                  item.children.forEach(children_item => {
                    permissionList.push(children_item.moduleCode)
                  })
                }
                permissionList.push(item.moduleCode)
              }
            })
            commit('SET_PERMISSIONLIST', permissionList)
          } else {
            return reject('获取权限失败!!!')
          }
          resolve(permissionList)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_INFO', {})
          commit('SET_PERMISSIONLIST', [])
          commit('SET_COMPANY', [])

          Vue.ls.remove(ACCESS_TOKEN)
          Vue.ls.remove(USER_INFO)
          Vue.ls.remove(USER_NAME)
          Vue.ls.remove(COMPANY_INFO)
        })
      })
    },
  },
  mutations: {
    //token
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    //用户信息
    SET_INFO: (state, userInfo) => {
      state.userInfo = userInfo
      state.userName = userInfo.userName
    },
    //企业信息
    SET_COMPANY: (state, companyInfo) => {
      state.companyInfo = companyInfo
    },
    //权限列表
    SET_PERMISSIONLIST: (state, permissionList) => {
      state.permissionList = permissionList
    }
  }
}
export default user