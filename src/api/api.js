const Mock = require('mockjs')

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

if (process.env.NODE_ENV === 'development') {
  /** daa-ui-api */

  // 生活服务2 就餐时间分布
  Mock.mock(/ui-api-daily-service\/meal-time/, {
    'dataset|10': [{
      name: '@TIME("MM月dd日")',
      grade1: '@INTEGER(0,300)',
      grade2: '@INTEGER(0,300)',
      grade3: '@INTEGER(0,300)'
    }],
    'chartDataMaps|3': [
      {
        'name|+1': ['高一', '高二', '高三'],
        'dataKey|+1': ['grade1', 'grade2', 'grade3']
      }
    ]
  })

  // 生活服务2-各年级消费总金额趋势
  Mock.mock(/ui-api-daily-service\/consume-trend/, {
    'dataset|5': [
      {
        'name': '@DATE("yyyy-MM-dd")',
        grade1: '@INTEGER(1000, 5000)',
        grade2: '@INTEGER(1000, 5000)',
        grade3: '@INTEGER(1000, 5000)'
      }
    ],
    'chartDataMaps|3': [
      {
        'name|+1': ['高一', '高二', '高三'],
        'dataKey|+1': ['grade1', 'grade2', 'grade3']
      }
    ]
  })
  // 生活服务2-消费金额对比
  Mock.mock(/ui-api-daily-service\/consume-compare/, {
    'dataset|3': [{
      'name|+1': ['高一', '高二', '高三'],
      breakfast: '@FLOAT(10,18,2,2)',
      lunch: '@FLOAT(10,18,2,2)',
      dinner: '@FLOAT(10,18,2,2)',
      others: '@FLOAT(10,18,2,2)'
    }],
    'chartDataMaps|4': [
      {
        'name|+1': ['早餐', '中餐', '完成', '其他'],
        'dataKey|+1': ['breakfast', 'lunch', 'dinner', 'others']
      }
    ]
  })

  // 生活服务1-三餐人均消费
  Mock.mock(/ui-api-daily-service\/consume-average/, {
    'dataset|3': [{
      'name|+1': ['早餐', '中餐', '晚餐'],
      value: '@FLOAT(5,35,2)'
    }],
    chartDataMaps: [
      {
        name: '消费情况',
        dataKey: 'value'
      }
    ]
  })

  // 生活服务1 消费类型占比
  Mock.mock(/ui-api-daily-service\/consume-type/, {
    'dataset|3': [{
      'name|+1': ['餐厅', '商店', '其他'],
      value: '@INTEGER(1000,30000)'
    }],
    chartDataMaps: [
      {
        name: '消费占比',
        dataKey: 'value'
      }
    ]
  })

  // 生活服务1 -消费分布-桑基图
  Mock.mock(/ui-api-daily-service\/sankey-chart/, {
    dataset: [{
      name: '高三',
      value: '@INTEGER(300,1000)'
    }, {
      name: '高二',
      value: '@INTEGER(300,1000)'
    }, {
      name: '高一',
      value: '@INTEGER(300,1000)'
    }, {
      name: '早餐',
      value: '@INTEGER(300,1000)'
    }, {
      name: '中餐',
      value: '@INTEGER(300,1000)'
    }, {
      name: '晚餐',
      value: '@INTEGER(300,1000)'
    }, {
      name: '餐厅消费',
      value: '@INTEGER(1000,3000)'
    }, {
      name: '超市消费',
      value: '@INTEGER(300,1000)'
    }, {
      name: '其他消费',
      value: '@INTEGER(300,1000)'
    }],
    links: [
      {
        source: '高三',
        target: '超市消费',
        value: '@INTEGER(100,500)'
      },
      {
        source: '高三',
        target: '其他消费',
        value: '@INTEGER(100,500)'
      },
      {
        source: '高三',
        target: '餐厅消费',
        value: '@INTEGER(100,500)'
      },
      {
        source: '高二',
        target: '超市消费',
        value: '@INTEGER(100,500)'
      },
      {
        source: '高二',
        target: '其他消费',
        value: '@INTEGER(100,500)'
      },
      {
        source: '高二',
        target: '餐厅消费',
        value: '@INTEGER(100,500)'
      },
      {
        source: '高一',
        target: '超市消费',
        value: '@INTEGER(100,500)'
      },
      {
        source: '高一',
        target: '其他消费',
        value: '@INTEGER(100,500)'
      },
      {
        source: '高一',
        target: '餐厅消费',
        value: '@INTEGER(100,500)'
      },
      {
        source: '餐厅消费',
        target: '早餐',
        value: '@INTEGER(100,500)'
      },
      {
        source: '其他消费',
        target: '早餐',
        value: '@INTEGER(100,500)'
      },
      {
        source: '超市消费',
        target: '早餐',
        value: '@INTEGER(100,500)'
      },
      {
        source: '餐厅消费',
        target: '中餐',
        value: '@INTEGER(100,500)'
      },
      {
        source: '其他消费',
        target: '中餐',
        value: '@INTEGER(100,500)'
      },
      {
        source: '超市消费',
        target: '中餐',
        value: '@INTEGER(100,500)'
      },
      {
        source: '餐厅消费',
        target: '晚餐',
        value: '@INTEGER(100,500)'
      },
      {
        source: '其他消费',
        target: '晚餐',
        value: '@INTEGER(100,500)'
      },
      {
        source: '超市消费',
        target: '晚餐',
        value: '@INTEGER(100,500)'
      }

    ]
  })

  // 生活服务1 -总体信息
  Mock.mock(/ui-api-daily-service\/total-info/, {
    'data|3': [
      {
        'label|+1': ['服务人次', '消费金额', '次均消费'],
        'totalValue|+1': ['@INTEGER(2000,10000)人', '@FLOAT(2000,9000,2,2)', '@FLOAT(5,20,2,2)'],
        'icon|+1': ['xservice', 'xmoney', 'xconsume'],
        'unit|+1': ['', '¥', '¥'],
        'details|3': [{
          'location|+1': ['餐厅', '商店', '其他'],
          'value|+1': [
            '@INTEGER(2000,10000)', '@INTEGER(2000,10000)', '@INTEGER(2000,10000)',
            '@FLOAT(2000,9000,2,2)', '@FLOAT(2000,9000,2,2)', '@FLOAT(2000,9000,2,2)',
            '@FLOAT(10,123,2,2)', '@FLOAT(10,123,2,2)', '@FLOAT(10,123,2,2)'
          ]
        }]
      }
    ]
  })

  // 课堂评价3 最近表现
  Mock.mock(/ui-api-class-evaluation3-recent-performance$/, {
    dataset: [
      {
        id: '@ID()',
        event: '表扬给某同学，遵守纪律',
        initiator: '2018-12-12 16:28 由某老师点评全班',
        point: 1,
        status: 'rise'
      },
      {
        id: '@ID()',
        event: '表扬给某同学，积极回答问题',
        initiator: '刚刚 由某老师点评',
        point: 1,
        status: 'rise'
      },
      {
        id: '@ID()',
        event: '批评给某同学，注意力不集中',
        initiator: '2018-12-10 16:28 由某老师点评',
        point: 1,
        status: 'decline'
      },
      {
        id: '@ID()',
        event: '表扬给某同学，遵守纪律',
        initiator: '2018-12-12 16:28 由某老师点评全班',
        point: 1,
        status: 'rise'
      },
      {
        id: '@ID()',
        event: '表扬给某同学，积极回答问题',
        initiator: '刚刚 由某老师点评',
        point: 1,
        status: 'rise'
      },
      {
        id: '@ID()',
        event: '批评给某同学，注意力不集中',
        initiator: '2018-12-10 16:28 由某老师点评',
        point: 1,
        status: 'decline'
      }
    ]
  })

  // 课堂评价3 本周得分曲线
  Mock.mock(/ui-api-class-evaluation3-week-point$/, {
    'dataset|7': [{
      'name|+1': ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      'value': '@INTEGER(0,10)'
    }],
    text: '周三表现好',
    chartDataMaps: [
      {
        name: '得分',
        dataKey: 'value'
      }
    ]
  })

  // 课堂评价3 本周排名变化
  Mock.mock(/ui-api-class-evaluation3-rank-change$/, {
    rankChange: '@INTEGER(0,20)',
    'status|1': ['rise', 'decline'],
    'dataset|2': [
      {
        'name|+1': ['上周', '本周'],
        value: '@INTEGER(0, 40)'
      }
    ],
    chartDataMaps: [
      {
        name: '排名变化',
        dataKey: 'value'
      }
    ]
  })

  // 课堂评价3 个人表现
  Mock.mock(/ui-api-class-evaluation3-personal-performance$/, {
    personalPerformance: {
      positiveRatio: '@INTEGER(0,100)%',
      weekRank: '@INTEGER(0,10)',
      weekPoint: '@INTEGER(0,10)/@INTEGER(30,50)',
      over: '@INTEGER(0,100)'
    }
  })
  // 课堂评价3 个人排名
  Mock.mock(/ui-api-class-evaluation3-personal-ranking$/, {
    personalRanking: {
      name: '@CNAME',
      range: '本周(2018-12-12~2018-12-19)',
      weekTotal: '@INTEGER(0,10)',
      weekRank: '@INTEGER(0,10)',
      classAverage: '@INTEGER(0,10)'
    }
  })

  // 课堂评价3 累计点评
  // 饼图demo
  Mock.mock(/ui-api-class-evaluation3-cumulative-comments$/, {
    weekTotalPoint: '@INTEGER(0,100)',
    commentByText: '@INTEGER(0,100)',
    dataset: [
      {
        name: '表扬',
        value: '@INTEGER(80,100)',
        change: '@INTEGER(-0,10)'
      },
      {
        name: '待改进',
        value: '@INTEGER(0,20)',
        change: '@INTEGER(-10,0)'
      }
    ]
  })

  // 课堂评价1 数据表格
  Mock.mock(/ui-api-class-evaluation2-table$/, {
    'tableData|5': [
      {
        className: '@CWORD(3,7)班',
        classNumber: '@INTEGER(500,800)',
        accessTeacherNumber: '@INTEGER(0,10)',
        totalScore: '@INTEGER(0, 100)',
        chainRatio: '@INTEGER(3,10)%',
        evaluationTimes: '@INTEGER(0, 100)'
      }
    ]
  })

  // 课堂评价2 班级评价雷达图
  Mock.mock(/ui-api-class-evaluation2-radar$/, {
    'dataset|5': [
      {
        'name|+1': ['综合素养', '思想品德', '学业水平', '作业表现', '课堂表现'],
        value: '@INTEGER(0,100)'
      }
    ],
    'indicator|5': [
      {
        'name|+1': ['综合素养', '思想品德', '学业水平', '作业表现', '课堂表现'],
        max: 100
      }
    ],
    chartDataMaps: [
      {
        name: '得分',
        dataKey: 'value'
      }
    ]
  })

  // 课堂评价2 班级评价线图
  Mock.mock(/ui-api-class-evaluation2-line$/, {
    'dataset|5-10': [
      {
        name: '@CWORD(3,7)班',
        time1: '@INTEGER(1000, 5000)',
        time2: '@INTEGER(1000, 5000)',
        time3: '@INTEGER(1000, 5000)',
        time4: '@INTEGER(1000, 5000)',
        time5: '@INTEGER(1000, 5000)'
      }
    ],
    chartDataMaps: [
      {
        name: '@DATE("MM月dd日")',
        dataKey: 'time1'
      },
      {
        name: '@DATE("MM月dd日")',
        dataKey: 'time2'
      },
      {
        name: '@DATE("MM月dd日")',
        dataKey: 'time3'
      },
      {
        name: '@DATE("MM月dd日")',
        dataKey: 'time4'
      },
      {
        name: '@DATE("MM月dd日")',
        dataKey: 'time5'
      }
    ]
  })

  // 课堂评价1 数据表格
  Mock.mock(/ui-api-class-evaluation1-table$/, {
    'tableData|5-8': [
      {
        grade: '@CWORD(3,5)年级',
        gradeNumber: '@INTEGER(500,800)',
        accessRate: '@INTEGER(0,100)%',
        totalScore: '@INTEGER(0, 100)',
        chainRatio: '@INTEGER(3,10)%'
      }
    ]
  })

  // 课堂评价1 年级评价雷达图
  Mock.mock(/ui-api-class-evaluation1-radar$/, {
    'dataset|5': [
      {
        'name|+1': ['注意力集中', '举手答题', '积极思考', '遵守纪律', '帮助他人'],
        value: '@INTEGER(0,100)'
      }
    ],
    'indicator|5': [
      {
        'name|+1': ['注意力集中', '举手答题', '积极思考', '遵守纪律', '帮助他人'],
        max: 100
      }
    ],
    chartDataMaps: [
      {
        name: '得分',
        dataKey: 'value'
      }
    ]
  })

  // 课堂评价1 年级评价线图
  Mock.mock(/ui-api-class-evaluation1-line$/, {
    'dataset|5-10': [
      {
        name: '@DATE("MM-dd")',
        grade1: '@INTEGER(1000, 5000)',
        grade2: '@INTEGER(1000, 5000)',
        grade3: '@INTEGER(1000, 5000)'
      }
    ],
    chartDataMaps: [
      {
        name: '高一',
        dataKey: 'grade1'
      },
      {
        name: '高二',
        dataKey: 'grade2'
      },
      {
        name: '高三',
        dataKey: 'grade3'
      }
    ]
  })

  // 教学评价3 教师详情
  Mock.mock(/ui-api-teaching-evaluation3-teacher$/, {
    teacherName: '@CNAME',
    'headTeacherPoint|5': [
      {
        time: '@DATE("yyyy")学年',
        className: '@CWORD(5,6)班',
        subject: '@CWORD(2)科目',
        point: '@FLOAT(-9,10,2,2)',
        rank: '@INTEGER(1,10)',
        totalPoint: '@FLOAT(-9,10,2,2)',
        totalRank: '@INTEGER(1,10)'
      }
    ],
    'subjectPoint|5': [
      {
        time: '@DATE("yyyy")学年',
        className: '@CWORD(5,6)班',
        subject: '@CWORD(2)科目',
        point: '@FLOAT(-9,10,2,2)',
        rank: '@INTEGER(1,10)',
        totalPoint: '@FLOAT(-9,10,2,2)',
        totalRank: '@INTEGER(1,10)'
      }
    ]
  })

  // 教学评价3 教师积分排名
  Mock.mock(/ui-api-teaching-evaluation3-rank$/, {
    'dataset|10': [
      {
        'rank|+1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        name: '@CNAME',
        number: '@INTEGER(30,100)',
        max: 100
      }
    ]
  })

  // 教学评价2 积分top5 趋势
  Mock.mock(/ui-api-teaching-evaluation2-top5$/, {
    'dataset|5': [{
      name: '@CWORD(5,7)班',
      teacher: '@CNAME',
      test1: '@INTEGER(-8,8)',
      test2: '@INTEGER(-8,8)',
      test3: '@INTEGER(-8,8)',
      test4: '@INTEGER(-8,8)',
      test5: '@INTEGER(-8,8)'
    }],
    chartDataMaps: [
      {
        name: '@CWORD(5,10)月考',
        dataKey: 'test1'
      },
      {
        name: '@CWORD(5,10)月考',
        dataKey: 'test2'
      },
      {
        name: '@CWORD(5,10)月考',
        dataKey: 'test3'
      },
      {
        name: '@CWORD(5,10)月考',
        dataKey: 'test4'
      },
      {
        name: '@CWORD(5,10)月考',
        dataKey: 'test5'
      }
    ]
  })

  // 教学评价1 教学指标完成情况
  Mock.mock(/ui-api-teaching-evaluation1-completion-index$/, {
    'dataset|8-15': [
      {
        name: '@INTEGER(1,100)班',
        complete: '@INTEGER(20,70)',
        index: '@INTEGER(20, 70)',
        point: '@INTEGER(-8,10)'
      }
    ],
    chartDataMaps: [
      {
        name: '完成',
        dataKey: 'complete'
      },
      {
        name: '指标',
        dataKey: 'index'
      },
      {
        name: '积分',
        dataKey: 'point'
      }
    ]
  })

  // 教学评价1 上线情况
  Mock.mock(/ui-api-teaching-evaluation1-pass-score$/, {
    'dataset|3': [
      {
        'classify|+1': ['理科', '文科', '未分科'],
        studentNum: '@INTEGER(800, 1200)',
        resultNum: '@INTEGER(800, 1200)',
        topUniversityScore: 600,
        topUniversityNum: '@INTEGER(8, 120)',
        topUniversityRate: '2%',
        firstTierUniversityScore: 500,
        firstTierUniversityNum: '@INTEGER(300, 720)',
        onlyFirstTierUniversityNum: '@INTEGER(300, 720)',
        firstTierUniversityRate: '61%',
        otherNum: '@INTEGER(400, 500)',
        'classes|2': [
          {
            'className|+1': ['理科A班', '理科B班'],
            studentNum: '@INTEGER(400, 500)',
            resultNum: '@INTEGER(400, 500)',
            topUniversityScore: 600,
            topUniversityNum: '@INTEGER(8, 65)',
            topUniversityRate: '2%',
            firstTierUniversityScore: '@INTEGER(150, 320)',
            firstTierUniversityNum: '@INTEGER(100, 276)',
            onlyFirstTierUniversityNum: 200,
            firstTierUniversityRate: '61%'
          }
        ]
      }
    ]
  })

  // 课堂到课情况
  Mock.mock(/ui-api-class-dynamic1-arrive-details$/, {
    'dataset|10': [{
      id: '@ID()',
      'name': '@CWORD(5,8)班某科目',
      teacherName: '@CNAME',
      arrivedStudent: '@INTEGER(45,55)',
      totalStudent: 55
    }],
    'currentClass|1': ['第五节课', '第六节课']
  })

  // 课堂动态1 到课到岗动态

  Mock.mock(/ui-api-class-dynamic1-arrive-status$/, {
    'dataset|3': [
      {
        'name|+1': ['高一', '高二', '高三'],
        data: '@INTEGER(10,50)',
        teacherRate: '@FLOAT(80,99,1,1)',
        studentRate: '@FLOAT(80,99,1,1)'
      }
    ],
    'currentClass|1': ['第五节课', '第六节课']
  })

  // 课堂动态1 上课前3分钟到课率趋势
  Mock.mock(/ui-api-class-dynamic1-arrive-early$/, {
    'dataset|3-6': [
      {
        name: '@DATE("MM-dd")',
        studentRate: '@INTEGER(0, 100)',
        teacherRate: '@INTEGER(0, 100)'
      }
    ],
    'chartDataMaps|2': [
      {
        'name|+1': ['教师到岗率', '学生到岗率'],
        'dataKey|+1': ['teacherRate', 'studentRate']
      }
    ]
  })

  // 线图demo
  Mock.mock(/ui-api-line$/, {
    'dataset|3-6': [
      {
        'name|+1': ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        type1: '@INTEGER(0,100)',
        type2: '@INTEGER(0,100)',
        type3: '@INTEGER(0,100)',
        type4: '@INTEGER(0,100)',
        type5: '@INTEGER(0,100)'
      }
    ],
    'chartDataMaps|5': [
      {
        'name|+1': ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        'dataKey|+1': ['type1', 'type2', 'type3', 'type4', 'type5']
      }
    ]
  })

  // 柱状图demo
  Mock.mock(/ui-api-bar$/, {
    'dataset|3-6': [
      {
        'name|+1': ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        type1: '@INTEGER(0,100)',
        type2: '@INTEGER(0,100)',
        type3: '@INTEGER(0,100)',
        type4: '@INTEGER(0,100)',
        type5: '@INTEGER(0,100)'
      }
    ],
    'chartDataMaps|5': [
      {
        'name|+1': ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        'dataKey|+1': ['type1', 'type2', 'type3', 'type4', 'type5']
      }
    ]
  })

  // 单色柱状图demo
  Mock.mock(/ui-api-color-bar$/, {
    'dataset|3-6': [
      {
        'name|+1': ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        type1: '@INTEGER(0,100)'
      }
    ],
    chartDataMaps: [
      {
        'name|+1': ['邮件营销'],
        'dataKey|+1': ['type1']
      }
    ]
  })

  // 饼图demo
  Mock.mock(/ui-api-pie$/, {
    'labelData': ['label', 888],
    'dataset|3-5': [
      {
        'name|+1': ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        type1: '@INTEGER(0,100)'
      }
    ],
    chartDataMaps: [
      {
        'name|+1': ['访问来源', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        'dataKey|+1': ['type1']
      }
    ]
  })
  /** daa-ui-api-end */

  /** yhz-ui-api */

  Mock.mock(/ui-api-pie1$/, {
    'labelData': ['开机率', '80%'],
    'dataset|2': [
      {
        'name|+1': ['邮件营销', 'gg'],
        type1: '@INTEGER(0,100)'
      }
    ],
    chartDataMaps: [
      {
        'name|+1': ['访问来源', 'gg'],
        'dataKey|+1': ['type1']
      }
    ]
  })

  Mock.mock(/ui-api-gauge$/, {
    'labelData': ['开机率', '80%'],
    'dataset|2': [
      {
        'name|+1': ['邮件营销', 'gg'],
        type1: '@INTEGER(0,100)'
      }
    ],
    chartDataMaps: [
      {
        'name|+1': ['访问来源', 'gg'],
        'dataKey|+1': ['type1']
      }
    ]
  })

  Mock.mock(/ui-api-network-speed$/, {
    chartDataMaps: [
      {
        'name': '访问来源',
        'value': '@INTEGER(0,100)'
      }
    ]
  })
  /** yhz-ui-api-end */
}
