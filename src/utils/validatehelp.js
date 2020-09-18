//表单验证



// 验证是否数字
export function validateNumber(rule, value, callback) {
  if (!value || new RegExp(/^[0-9]*[1-9][0-9]*$/).test(value)) {
    callback()
  } else {
    callback('请输入正整数!')
  }
}
// 验证手机电话号码
export function validatePhone(rule, value, callback) {
  if (!value) {
    callback()
  } else {
    if (new RegExp(/^1[0-9]{10}$/).test(value)) {
      callback()
    } else {
      callback('请输入正确格式的手机号码!')
    }
  }
}