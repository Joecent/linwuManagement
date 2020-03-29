// 使数字保留两位小数
export function formatNumber (input) {
  let val
  if (typeof input === 'string') {
    val = parseFloat(input).toFixed(2) + ''
  } else if (typeof input === 'number') {
    val = input.toFixed(2) + ''
  } else {
    val = '数据不符合'
  }
  return val
}
