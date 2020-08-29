import { axios } from '@/utils/request'
const api = {}
export default api

/**
* 通用 Post 请求 [data] 方式
* @param {String} url
* @param {Object} parameter
*/
export function postAction(url, parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}
/**
* 通用 Post 请求 [params] 方式/参数放URL上
* @param {String} url
* @param {Object} parameter
*/
export function postActionUrl(url, parameter) {
  return axios({
    url: url,
    method: 'post',
    params: parameter
  })
}
/**
* 通用 Get 请求
* @param {String} url
* @param {Object} parameter
*/
export function getAction(url, parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}
/**
* 通用 Put 请求
* @param {String} url
* @param {Object} parameter
*/
export function putAction(url, parameter) {
  return axios({
    url: url,
    method: 'put',
    data: parameter
  })
}
/**
* 通用 Delete 请求
* @param {String} url
* @param {Object} parameter
*/
export function deleteAction(url, parameter) {
  return axios({
    url: url,
    method: 'delete',
    params: parameter
  })
}