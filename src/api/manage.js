import { axios } from '@/utils/request'
import qs from 'qs'

const api = {
  car: '/v1/pc/car/',
  account: '/v1/pc/account/',
  company: '/v1/pc/company/'
}
export default api

/**
* 获取车辆列表
* @param {Object} parameter
*/
export function getCarList(parameter) {
  return axios({
    url: api.car + 'listcars',
    method: 'get',
    params: parameter
  })
}
/**
* 更新车辆状态
* @param {Object} parameter
*/
export function updateCarEnable(parameter) {
  return axios({
    url: api.car + 'UpdateCarEnable',
    method: 'post',
    data: qs.stringify(parameter)
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
    // }
  })
}
/**
* 删除车辆
* @param {Object} parameter
*/
export function deleteCar(parameter) {
  return axios({
    url: api.car + 'DeleteCar',
    method: 'post',
    data: qs.stringify(parameter)
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
    // }
  })
}
/**
* 添加车辆
* @param {Object} parameter
*/
export function insertCar(parameter) {
  console.log(parameter)
  console.log(qs.stringify(parameter))
  // return axios({
  //   url: api.car + 'InsertCar',
  //   method: 'post',
  //   data: qs.stringify(parameter)
  // })
}



export function getDriverList(parameter) {
  return axios({
    url: api.car + 'ListDrivers',
    method: 'get',
    params: parameter
  })
}
/**
* 添加司机
* @param {Object} parameter
*/
export function insertDriver(parameter) {
  return axios({
    url: api.car + 'InsertDriver',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
/**
* 删除司机
* @param {Object} parameter
*/
export function deleteDriver(parameter) {
  return axios({
    url: api.car + 'DeleteDriver',
    method: 'post',
    data: qs.stringify(parameter)
  })
}





/**
* 获取点检项目列表
* @param {Object} parameter
*/
export function getCheckItemList(parameter) {
  return axios({
    url: api.car + 'ListCheckItems',
    method: 'post',
    params: parameter
  })
}
/**
* 删除点检项目
* @param {Object} parameter
*/
export function deleteCheckItem(parameter) {
  return axios({
    url: api.car + 'DeleteCheckItem',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
/**
* 添加点检项目
* @param {Object} parameter
*/
export function insertCheckItem(parameter) {
  return axios({
    url: api.car + 'InsertCheckItem',
    method: 'post',
    data: qs.stringify(parameter)
  })
}




/**
* 获取点检项目列表
* @param {Object} parameter
*/
export function getMaintenanceItemList(parameter) {
  return axios({
    url: api.car + 'ListMaintenanceItems',
    method: 'post',
    params: parameter
  })
}
/**
* 删除保养项目
* @param {Object} parameter
*/
export function deleteMaintenanceItem(parameter) {
  return axios({
    url: api.car + 'DeleteMaintenanceItem',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
/**
* 添加保养项目
* @param {Object} parameter
*/
export function insertMaintenanceItem(parameter) {
  return axios({
    url: api.car + 'InsertMaintenanceItem',
    method: 'post',
    data: qs.stringify(parameter)
  })
}




/**
* 获取员工列表
* @param {Object} parameter
*/
export function getAccountList(parameter) {
  return axios({
    url: api.account + 'ListAccounts',
    method: 'get',
    params: parameter
  })
}

/**
* 获取角色列表
* @param {Object} parameter
*/
export function getRoleList(parameter) {
  return axios({
    url: api.account + 'ListRoles',
    method: 'get',
    params: parameter
  })
}
/**
* 添加角色
* @param {Object} parameter
*/
export function insertRole(parameter) {
  return axios({
    url: api.account + 'InsertRole',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
/**
* 删除角色
* @param {Object} parameter
*/
export function deleteRole(parameter) {
  return axios({
    url: api.account + 'DeleteRole',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
/**
* 获取用户订购模块权限
* @param {Object} parameter
*/
export function getPermissions(parameter) {
  return axios({
    url: api.account + 'GetPermissions',
    method: 'get',
    params: parameter
  })
}


/**
* 获取用户订购模块权限
* @param {Object} parameter
*/
export function getCompany() {
  return axios({
    url: api.company + 'GetCompany',
    method: 'get'
  })
}


/**
* 获取申请员工列表
* @param {Object} parameter
*/
export function getAccountApplyList(parameter) {
  return axios({
    url: api.company + 'ListAccountApply',
    method: 'get',
    params: parameter
  })
}
/**
* 更新新增员工审核状态
* @param {Object} parameter
*/
export function updateVerify(parameter) {
  return axios({
    url: api.company + 'UpdateCompanyVerify',
    method: 'post',
    data: qs.stringify(parameter)
  })
}


export function get2step(parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}

