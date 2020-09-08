import Mock from 'mockjs2'
import { builder, getBody } from '../util'
const username = ['admin', 'mert', 'user', 'account'] //管理员，代理商，商户,用户
const password = ['e10adc3949ba59abbe56e057f20f883e']               //密码

/**
* 登录
*/
const login = (options) => {
  console.log('登录参数', options)
  const body = getBody(options)
  console.log('mock: body', body)
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', '403')
  }
  return builder({
    //用户信息
    'userInfo': {
      'id': Mock.mock('@guid'),
      'companyId': Mock.mock('@guid'),
      'unionid': Mock.mock('@guid'),
      'userinfoId': Mock.mock('@guid'),
      'openid': Mock.mock('@guid'),
      'accountName': 'Sand',
      'createTime': Mock.mock('@datetime'),
      'updatedTime': Mock.mock('@datetime'),
      'realname': '真实姓名',
      'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      'isEnable': 1, //0禁用 1启用
      'isDelete': 0,//0否 1是
      'mobile': '15911111111',
      'email': 'sand.mail@foxmail.com',
    },
    //企业信息 数组多个公司多列
    'companyInfo': [{
      'id': Mock.mock('@guid'),
      'companyName': '九州易行科技有限公司',
      'telephone ': '15911111111',
      'address': '广东省汕头市龙湖区嵩山路118号潮人创意园A栋718室内',
      'createTime': Mock.mock('@datetime'),
      'updatedTime': Mock.mock('@datetime'),
    }],
    'token': '4291d7da9005377ec9aec4a71ea837f'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

/**
* 根据token 获取用户权限
*/
const getUserPermissionByToken = (options) => {
  console.log(options)
  //const queryParameters = getQueryParameters(options)
  return builder({
    'permission': [
      //企业管理
      {
        'children': [
          {
            'children': [{}],
            'id': Mock.mock('@guid'),
            'parentId': Mock.mock('@guid'),
            'moduleCode': 'COMPANY_DETAIL',
            'moduleName': '企业信息',
            'moduleFulename': '企业管理-企业信息',
            'hasThisModule': true,
            'isDelete': 0,
            'sortNo': 1
          }
        ],
        'id': Mock.mock('@guid'),
        'parentId': Mock.mock('@guid'),
        'moduleCode': 'COMPANY_MANAGE',
        'moduleName': '企业管理',
        'moduleFulename': '企业管理',
        'hasThisModule': true,
        'isDelete': 0,
        'sortNo': 1
      },
      //员工管理
      {
        'children': [
          {
            'children': [],
            'id': Mock.mock('@guid'),
            'parentId': Mock.mock('@guid'),
            'moduleCode': 'ACCOUNT_AUDIT_LIST',
            'moduleName': '员工申请列表',
            'moduleFulename': '员工管理-员工申请列表',
            'hasThisModule': true,
            'isDelete': 0,
            'sortNo': 1
          },
          {
            'children': [],
            'id': Mock.mock('@guid'),
            'parentId': Mock.mock('@guid'),
            'moduleCode': 'ACCOUNT_LIST',
            'moduleName': '员工列表',
            'moduleFulename': '员工管理-员工列表',
            'hasThisModule': true,
            'isDelete': 0,
            'sortNo': 2
          },
          {
            'children': [],
            'id': Mock.mock('@guid'),
            'parentId': Mock.mock('@guid'),
            'moduleCode': 'ACCOUNT_DUTY_LIST',
            'moduleName': '岗位管理',
            'moduleFulename': '员工管理-岗位管理',
            'hasThisModule': true,
            'isDelete': 0,
            'sortNo': 3
          },
        ],
        'id': Mock.mock('@guid'),
        'parentId': Mock.mock('@guid'),
        'moduleCode': 'ACCOUNT_MANAGE',
        'moduleName': '员工管理',
        'moduleFulename': '员工管理',
        'hasThisModule': true,
        'isDelete': 0,
        'sortNo': 2
      },
      //车辆管理
      {
        'children': [
          {
            'children': [],
            'id': Mock.mock('@guid'),
            'parentId': Mock.mock('@guid'),
            'moduleCode': 'CAR_LIST',
            'moduleName': '车辆列表',
            'moduleFulename': '车辆管理-车辆列表',
            'hasThisModule': true,
            'isDelete': 0,
            'sortNo': 1
          },
          {
            'children': [],
            'id': Mock.mock('@guid'),
            'parentId': Mock.mock('@guid'),
            'moduleCode': 'CAR_DRIVER_LIST',
            'moduleName': '司机管理',
            'moduleFulename': '车辆管理-司机管理',
            'hasThisModule': true,
            'isDelete': 0,
            'sortNo': 2
          },
          {
            'children': [],
            'id': Mock.mock('@guid'),
            'parentId': Mock.mock('@guid'),
            'moduleCode': 'CAR_SETTING',
            'moduleName': '车辆设置',
            'moduleFulename': '车辆管理-车辆设置',
            'hasThisModule': true,
            'isDelete': 0,
            'sortNo': 3
          },
          {
            'children': [],
            'id': Mock.mock('@guid'),
            'parentId': Mock.mock('@guid'),
            'moduleCode': 'CAR_RECORD',
            'moduleName': '车辆记录',
            'moduleFulename': '车辆管理-车辆记录',
            'hasThisModule': true,
            'isDelete': 0,
            'sortNo': 4
          },
        ],
        'id': Mock.mock('@guid'),
        'parentId': Mock.mock('@guid'),
        'moduleCode': 'CAR_MANAGE',
        'moduleName': '车辆管理',
        'moduleFulename': '车辆管理',
        'hasThisModule': true,
        'isDelete': 0,
        'sortNo': 3
      },
      //食堂管理
      {
        'children': [],
        'id': Mock.mock('@guid'),
        'parentId': Mock.mock('@guid'),
        'moduleCode': 'CANTEEN_MANAGE',
        'moduleName': '食堂管理',
        'moduleFulename': '食堂管理',
        'hasThisModule': true,
        'isDelete': 0,
        'sortNo': 4
      },
      //宿舍管理
      {
        'children': [],
        'id': Mock.mock('@guid'),
        'parentId': Mock.mock('@guid'),
        'moduleCode': 'DORMITORY_MANAGE',
        'moduleName': '宿舍管理',
        'moduleFulename': '宿舍管理',
        'hasThisModule': true,
        'isDelete': 0,
        'sortNo': 5
      },
      //卫生管理
      {
        'children': [],
        'id': Mock.mock('@guid'),
        'parentId': Mock.mock('@guid'),
        'moduleCode': 'HYGIENE_MANAGE',
        'moduleName': '卫生管理',
        'moduleFulename': '卫生管理',
        'hasThisModule': true,
        'isDelete': 0,
        'sortNo': 6
      },
      //订单管理
      {
        'children': [
          {
            'children': [],
            'id': Mock.mock('@guid'),
            'parentId': Mock.mock('@guid'),
            'moduleCode': 'ORDER_LIST',
            'moduleName': '订单列表',
            'moduleFulename': '订单管理-订单列表',
            'hasThisModule': true,
            'isDelete': 0,
            'sortNo': 1
          },
        ],
        'id': Mock.mock('@guid'),
        'parentId': Mock.mock('@guid'),
        'moduleCode': 'ORDER_MANAGE',
        'moduleName': '订单管理',
        'moduleFulename': '订单管理',
        'hasThisModule': true,
        'isDelete': 0,
        'sortNo': 7
      },
      //系统管理
      {
        'children': [
          {
            'children': [],
            'id': Mock.mock('@guid'),
            'parentId': Mock.mock('@guid'),
            'moduleCode': 'ACTION_LOG_LIST',
            'moduleName': '操作日志',
            'moduleFulename': '系统管理-操作日志',
            'hasThisModule': true,
            'isDelete': 0,
            'sortNo': 1
          },
        ],
        'id': Mock.mock('@guid'),
        'parentId': Mock.mock('@guid'),
        'moduleCode': 'SYSTEM_MANAGE',
        'moduleName': '系统管理',
        'moduleFulename': '系统管理',
        'hasThisModule': true,
        'isDelete': 0,
        'sortNo': 8
      },
    ],
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

/**
* 注销
*/
const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}
Mock.mock(/\/login/, 'post', login) //登录
Mock.mock(/\/sys\/permission/, 'get', getUserPermissionByToken) //根据token 获取用户权限
Mock.mock(/\/sys\//, 'post', logout) //根据token 获取用户权限