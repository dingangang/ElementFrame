<template>
  <div class="page">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
      <div style="text-align: center;">
        <i class="tw-icon icon-arrow1"></i>
        <i class="tw-icon icon-arrow2"></i>
        <i class="tw-icon icon-arrow3"></i>
        <i class="tw-icon icon-arrow4"></i>
      </div>
    </div>
    <ct-chart
      :chartOption="lineDemo.chartOption"
      :dataset="lineDemo.dataset"
      :chartDataMaps="lineDemo.chartDataMaps"
    >
    </ct-chart>
    <ct-chart
      :chartOption="barDemo.chartOption"
      :dataset="barDemo.dataset"
      :chartDataMaps="barDemo.chartDataMaps"
    >
    </ct-chart>
    <ct-chart
      :chartOption="colorBarDemo.chartOption"
      :dataset="colorBarDemo.dataset"
      :chartDataMaps="colorBarDemo.chartDataMaps"
    >
    </ct-chart>
    <ct-chart
      :chartOption="pieDemo.chartOption"
      :dataset="pieDemo.dataset"
      :chartDataMaps="pieDemo.chartDataMaps"
    >
    </ct-chart>
    <ct-chart
      :options="radarDemo.options"
    >
    </ct-chart>
    <ct-chart
      :options="gaugeDemo.options"
    >
    </ct-chart>
    <tw-steps
      v-model="currentStep"
      :steps="steps"
      @steps-change="handleStepsChange"
    ></tw-steps>
  </div>
</template>

<script>
export default {
  name: 'demo',
  created () {
    console.log('demo-this,', this)
    this.getLineData()
    this.getBarData()
    this.getColorBarData()
    this.getPieData()
  },
  mounted () {
    setInterval(() => {
      this.next()
    }, 2500)
  },
  data () {
    return {
      lineDemo: {
        chartOption: {
          title: {
            text: '线图demo数据'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: []
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: []
            }],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: []
        },
        chartDataMaps: [],
        dataset: []
      },
      barDemo: {
        chartOption: {
          title: {
            text: '柱状图demo数据'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: []
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              data: []
            }],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: []
        },
        chartDataMaps: [],
        dataset: []
      },
      colorBarDemo: {
        chartOption: {
          title: {
            text: '单系列多色柱demo数据'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: []
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              data: []
            }],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: []
        },
        chartDataMaps: [],
        dataset: []
      },
      pieDemo: {
        chartOption: {
          title: {
            text: '饼图demo数据'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            data: []
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: []
            }
          ]
        },
        dataset: [],
        chartDataMaps: []
      },
      radarDemo: {
        options: {
          title: {
            text: '其他图表，请根据实际需要，来定义接口需要传输的数据。尽量简洁。'
          },
          tooltip: {},
          legend: {
            data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
          },
          radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              { name: '销售（sales）', max: 6500 },
              { name: '管理（Administration）', max: 16000 },
              { name: '信息技术（Information Techology）', max: 30000 },
              { name: '客服（Customer Support）', max: 38000 },
              { name: '研发（Development）', max: 52000 },
              { name: '市场（Marketing）', max: 25000 }
            ]
          },
          series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '预算分配（Allocated Budget）'
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '实际开销（Actual Spending）'
              }
            ]
          }]
        }
      },
      gaugeDemo: {
        options: {
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {}
            }
          },
          series: [
            {
              name: '业务指标',
              type: 'gauge',
              detail: {
                formatter: '{value}%'
              },
              data: [
                {
                  value: 50,
                  name: '完成率'
                }
              ]
            }
          ]
        }
      },
      active: 0,
      steps: [
        {
          id: 0,
          title: '高一'
        },
        {
          id: 1,
          title: '高二'
        },
        {
          id: 2,
          title: '高三'
        }
      ],
      currentStep: 0

    }
  },
  methods: {
    /**
     * 功能：获取线图demo数据
     */
    getLineData () {
      this.axios.get('/ui-api-line')
        .then(res => {
          console.log('线图demo数据', res)
          this.lineDemo.dataset = res.data.dataset
          this.lineDemo.chartDataMaps = res.data.chartDataMaps
            .map((item, index) => {
              return {
                ...item,
                type: 'line'
              }
            })
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    /**
     * 功能：获取柱状图demo数据
     */
    getBarData () {
      this.axios.get('/ui-api-bar')
        .then(res => {
          console.log('柱状图demo数据', res)
          this.barDemo.dataset = res.data.dataset
          // 新增一些配置
          this.barDemo.chartDataMaps = res.data.chartDataMaps
            .map((item, index) => {
              return {
                ...item,
                type: 'bar',
                barMaxWidth: 20
              }
            })
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    /**
     * 功能：获取单色柱状图demo数据
     */
    getColorBarData () {
      this.axios.get('/ui-api-color-bar')
        .then(res => {
          console.log('单色柱状图demo数据', res)
          this.colorBarDemo.dataset = res.data.dataset
          // 新增一些配置
          this.colorBarDemo.chartDataMaps = res.data.chartDataMaps
            .map((item, index) => {
              return {
                ...item,
                type: 'bar',
                colors: [
                  '#c12e34',
                  '#e6b600',
                  '#0098d9',
                  '#2b821d',
                  '#005eaa',
                  '#339ca8',
                  '#cda819',
                  '#32a487'],
                barMaxWidth: 25
              }
            })
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    /**
     * 功能：饼图demo数据
     */
    getPieData () {
      this.axios.get('/ui-api-pie')
        .then(res => {
          console.log('饼图demo数据', res)
          this.pieDemo.dataset = res.data.dataset
          // 新增一些配置
          this.pieDemo.chartDataMaps = res.data.chartDataMaps
            .map((item, index) => {
              return {
                ...item,
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: true,
                    position: 'center',
                    formatter: (params) => {
                      if (params.dataIndex === 0) {
                        return `{a|${res.data.labelData[0]}\n${res.data.labelData[1]}}`
                      } else {
                        return ''
                      }
                    },
                    rich: {
                      a: {
                        fontSize: 28,
                        textAlign: 'center'
                      }
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                }
              }
            })
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    /**
     * 进度条处理
     */
    next () {
      if (this.active++ > 1) this.active = 0
    },
    /**
     * 处理年级变化
     */
    handleStepsChange (params) {
      console.log('获取事件，参数为->>', params)
    }
  }
}
</script>
