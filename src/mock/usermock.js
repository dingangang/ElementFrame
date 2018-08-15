const Mock = require('mockjs')

let Random = Mock.Random

Random.extend({
  constellation: function (date) {
    let constellation = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
    return this.pick(constellation)
  }
})

Mock.mock(/\/api\/data(.*?)/, (params) => {
  return Mock.mock({
    'data|2': [
      {
        'OID|+1': 1,
        'OnlyID|1-109': 1,
        'Params': params.body,
        'constellation': '@constellation'
      }
    ]
  })
})
