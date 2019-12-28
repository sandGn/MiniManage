/*
 * 监控屏幕宽度
 */

import enquireJs from 'enquire.js'

export const DEVICE_TYPE = {
  DESKTOP: 'desktop', //桌面
  TABLET: 'tablet',   //平板
  MOBILE: 'mobile'    //手机
}

export const deviceEnquire = function (callback) {
  const matchDesktop = {
    match: () => {
      callback && callback(DEVICE_TYPE.DESKTOP)
    }
  }

  const matchLablet = {
    match: () => {
      callback && callback(DEVICE_TYPE.TABLET)
    }
  }

  const matchMobile = {
    match: () => {
      callback && callback(DEVICE_TYPE.MOBILE)
    }
  }
  /*
    * enquireJs.register(mediaQuery, handler).
    * mediaQuery: 字符串，需要响应的媒体。
    * handler: 函数或对象。
    * handler Object:
    * match: 函数。媒体匹配时的回调。
  */
  // screen and (max-width: 1087.99px)
  enquireJs
    .register('screen and (max-width: 576px)', matchMobile)
    .register('screen and (min-width: 576px) and (max-width: 1199px)', matchLablet)
    .register('screen and (min-width: 1200px)', matchDesktop)
}