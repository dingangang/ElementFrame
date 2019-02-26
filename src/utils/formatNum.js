//  格式化数值，加上逗号并转成字符串
function formatNum (strNum) {
  let newStr = ''
  let count = 0
  let str
  if (typeof (strNum) === 'string') {
    return strNum
  }
  if (strNum === undefined) {
    return ''
  }
  if (strNum === null) {
    return null
  }
  str = strNum.toString()
  // 当数字是整数
  if (str.indexOf('.') === -1) {
    for (let i = str.length - 1; i >= 0; i--) {
      if (count % 3 === 0 && count !== 0) {
        newStr = str.charAt(i) + ',' + newStr
      } else {
        newStr = str.charAt(i) + newStr
      }
      count++
    }
    str = newStr
    return str
  } else {
    // 当数字带有小数
    for (let i = str.indexOf('.') - 1; i >= 0; i--) {
      if (count % 3 === 0 && count !== 0) {
        newStr = str.charAt(i) + ',' + newStr
      } else {
        newStr = str.charAt(i) + newStr // 逐个字符相接起来
      }
      count++
    }
    str = newStr + (str + '00').substr((str + '00').indexOf('.'), 3)
    return str
  }
}

export { formatNum }
