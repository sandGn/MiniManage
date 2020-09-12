
import { axios } from '../utils/request'

/**
* 登录
* @param {Object} parameter
*/
export function login(parameter) {
  return axios({
    url: '/account/login',
    method: 'post',
    data: parameter,
  })
}
/**
* 退出登录
*/
export function logout() {
  return axios({
    url: '/account/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}