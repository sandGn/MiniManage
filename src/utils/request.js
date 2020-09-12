/*
 * axios HTTP 请求封装
 */

import axios from 'axios'
import Vue from 'vue'
import notification from 'ant-design-vue/es/notification'

import { ACCESS_TOKEN } from '../store/mutation-types'
// 创建 axios 实例
const service = axios.create({
    //baseURL: 'http://localhost:5876/', // api base_url
    //baseURL:'http://www.jzyxas.com:8021/',
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 6000 // 请求超时时间
})

const err = (error) => {
    if (error.response) {
        const data = error.response.data
        //const token = Vue.ls.get(ACCESS_TOKEN)
        //403 服务器无权限
        if (error.response.status === 403) {
            notification.error({
                message: 'Forbidden',
                description: data.message
            })
        }
        //401 用户无权限Token
        if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            notification.error({
                message: 'Unauthorized',
                description: 'Authorization verification failed'
            })
            // if (token) {
            //     store.dispatch('Logout').then(() => {
            //         setTimeout(() => {
            //             window.location.reload()
            //         }, 1500)
            //     })
            // }
        }
    }
    return Promise.reject(error)
}
//请求拦截器 request interceptor
service.interceptors.request.use(config => {
    if (!config.headers.changeToken) {
        const token = Vue.ls.get(ACCESS_TOKEN)
        if (token) {
            config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
        }
    }
    return config
}, err)
//响应拦截器 response interceptor
service.interceptors.response.use((response) => {
    return response.data
}, err)

export {
    service as axios
}