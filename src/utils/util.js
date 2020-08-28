/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
  if (!(typeof obj == 'object')) {
    return
  }

  for (let key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)
      && (obj[key] == null || obj[key] == undefined || obj[key] === '')) {
      delete obj[key]
    }
  }
  return obj
}

/**
 * 时间格式化
 * @param value
 * @param fmt
 * @returns {*}
 */
export function formatDate(value, fmt) {
  let regPos = /^\d+(\.\d+)?$/
  if (regPos.test(value)) {
    //如果是数字
    let getDate = new Date(value)
    let o = {
      'M+': getDate.getMonth() + 1,
      'd+': getDate.getDate(),
      'h+': getDate.getHours(),
      'm+': getDate.getMinutes(),
      's+': getDate.getSeconds(),
      'q+': Math.floor((getDate.getMonth() + 3) / 3),
      'S': getDate.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  } else {
    //TODO
    value = value.trim()
    return value.substr(0, fmt.length)
  }
}

/**
 * 随机生成字符串
 * @param length 字符串的长度
 * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
 * @return string 生成的字符串
 */
export function randomString(length, chats) {
  if (!length) length = 1
  if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm'
  let str = ''
  for (let i = 0; i < length; i++) {
    let num = randomNumber(0, chats.length - 1)
    str += chats[num]
  }
  return str
}

/**
 * 随机生成uuid
 * @return string 生成的uuid
 */
export function randomUUID() {
  let chats = '0123456789abcdef'
  return randomString(32, chats)
}
/**
 * 随机生成数字
 *
 * 示例：生成长度为 12 的随机数：randomNumber(12)
 * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
 *
 * @param1 最小值 | 长度
 * @param2 最大值
 * @return int 生成后的数字
 */
export function randomNumber() {
  // 生成 最小值 到 最大值 区间的随机数
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  if (arguments.length === 1) {
    let [length] = arguments
    // 生成指定长度的随机数字，首位一定不是 0
    let nums = [...Array(length).keys()].map((i) => (i > 0 ? random(0, 9) : random(1, 9)))
    return parseInt(nums.join(''))
  } else if (arguments.length >= 2) {
    let [min, max] = arguments
    return random(min, max)
  } else {
    return Number.NaN
  }
}

/**
 * 
 * 获取最近天数
 */
export function timeForMat(count) {
  // 拼接时间
  let time1 = new Date()
  time1.setTime(time1.getTime() - (24 * 60 * 60 * 1000)) //不包含今天
  //time1.setTime(time1.getTime())
  let Y1 = time1.getFullYear()
  let M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
  let D1 = (time1.getDate() > 10 ? time1.getDate() : '0' + time1.getDate())
  let timer1 = Y1 + '-' + M1 + '-' + D1 + '%20%00:00:00' // 当前时间

  let time2 = new Date()
  time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count))
  let Y2 = time2.getFullYear()
  let M2 = ((time2.getMonth() + 1) > 10 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
  let D2 = (time2.getDate() > 10 ? time2.getDate() : '0' + time2.getDate())
  let timer2 = Y2 + '-' + M2 + '-' + D2 + '%20%23:59:99' // 之前的7天或者30天
  if (count === 0) {
    return {
      t1: timer2 = Y2 + '-' + M2 + '-' + D2 + '%20%00:00:00',
      t2: timer2 = Y2 + '-' + M2 + '-' + D2 + '%20%23:59:99'
    }
  } else {
    return {
      t1: timer1,
      t2: timer2
    }
  }
}