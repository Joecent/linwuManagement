// 正则判断是否为正确的手机号
export const isPhone = (phone) => {
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[3678])[0-9]{8}$/
  return reg.test(phone)
}

export default {
  isPhone
}
