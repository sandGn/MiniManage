/**
* 通用 API 请求
*/
import { getAction } from './index'

//根据用户token获取权限
const queryPermissionsByUser = (params) => getAction('/sys/permission/getUserPermissionByToken', params)

export {
  queryPermissionsByUser
}