<template>
  <div class="tw-chart">
    <v-chart
      v-if="chartVisible"
      :options="formatOptions || options"
      :theme="theme"
      :initOptions="initOptions"
      :group="group"
      :autoresize="autoresize"
      :watchShallow="watchShallow"
      :manualUpdate="manualUpdate"
      :style="{height: height}"
      ></v-chart>
    <div
      v-if="!chartVisible"
      :style="{height: height}"
    >
      无数据样式
    </div>
  </div>
</template>

<script>
// echarts全部内部事件集合，这里只选取点击事件监听，其他的有需要再打开
const EVENTS = [
  // 'legendselectchanged',
  // 'legendselected',
  // 'legendunselected',
  // 'legendunscroll',
  // 'datazoom',
  // 'datarangeselected',
  // 'timelinechanged',
  // 'timelineplaychanged',
  // 'restore',
  // 'dataviewchanged',
  // 'magictypechanged',
  // 'geoselectchanged',
  // 'geoselected',
  // 'geounselected',
  // 'pieselectchanged',
  // 'pieselected',
  // 'pieunselected',
  // 'mapselectchanged',
  // 'mapselected',
  // 'mapunselected',
  // 'axisareaselected',
  // 'focusnodeadjacency',
  // 'unfocusnodeadjacency',
  // 'brush',
  // 'brushselected',
  // 'rendered',
  // 'finished',
  // 'dblclick',
  // 'mouseover',
  // 'mouseout',
  // 'mousemove',
  // 'mousedown',
  // 'mouseup',
  // 'globalout',
  // 'contextmenu',
  'click'
]

export default {
  name: 'ct-chart',
  created () {
    // 按分辨率确定主题,主题文件需预先注册好
    switch (window.screen.width) {
      case 4096:
        this.theme = 'shine4k'
        break
      default:
        this.theme = 'shine'
    }
    if (!this.options) {
      this.buildOptions()
      let watched = ['dataset', 'chartDataMaps']
      watched.forEach(prop => {
        this.$watch(prop, () => {
          this.buildOptions()
        }, { deep: true })
      })
    }
  },
  mounted () {
    this.bindEvent()
  },
  props: {
    options: {
      type: Object
    },
    chartOption: {
      type: Object
    },
    dataset: {
      type: Array,
      default: () => []
    },
    chartDataMaps: {
      type: Array
    },
    initOptions: Object,
    group: String,
    autoresize: {
      type: Boolean,
      default: true
    },
    watchShallow: Boolean,
    manualUpdate: Boolean,
    height: {
      type: String,
      default: '300px'
    }
  },
  data () {
    return {
      formatOptions: undefined,
      currentChartOption: this.chartOption,
      theme: 'shine'
    }
  },
  computed: {
    chartVisible () {
      if (this.options) {
        return this.options.series && this.options.series.length > 0
      }
      if (this.formatOptions) {
        return this.formatOptions.series && this.formatOptions.series.length > 0 && this.dataset.length > 0
      }
      return false
    }
  },
  methods: {
    /**
     * 功能：监听echarts原生事件，并发送至父组件
     * @param {Object} param echarts事件自带的参数
     */
    bindEvent () {
      let $vm = this
      if ($vm.$children.length !== 0) {
        EVENTS.forEach(event => {
          $vm.$children[0].$on(event, param => {
            $vm.$emit(event, param)
          })
        })
      }
    },
    /**
     * 功能：根据传入的chartOption和dataset来组装图表options,
     */
    buildOptions () {
      if (!this.options) {
        if (this.dataset.length > 0) {
          let tChartOption = Object.assign({}, this.currentChartOption)

          // 获取legend数据
          if (tChartOption.legend) {
            tChartOption.legend.data = []
            this.chartDataMaps.forEach(chartDataMap => {
              if (chartDataMap.type === 'pie') {
                tChartOption.legend = {
                  ...tChartOption.legend,
                  data: this.dataset.map(data => {
                    return {
                      name: data.name,
                      icon: data.legendIcon ? `image://${chartDataMap.legendIcon}` : 'rect'
                    }
                  })
                }
              } else {
                // 非饼图和雷达图时读取系列
                tChartOption.legend = {
                  ...tChartOption.legend,
                  data: [...tChartOption.legend.data, {
                    name: chartDataMap.name,
                    icon: chartDataMap.legendIcon ? `image://${chartDataMap.legendIcon}` : 'rect'
                  }]
                }
              }
            })
          }

          // 轴线配置,直角坐标系配置
          if (tChartOption.xAxis || tChartOption.yAxis) {
            if (tChartOption.xAxis && tChartOption.xAxis instanceof Array) {
              tChartOption.xAxis = [
                ...tChartOption.xAxis.map(axis => {
                  if (axis.type === 'category') {
                    return {
                      ...axis,
                      data: this.dataset.map(data => data.name)
                    }
                  }
                  return {
                    ...axis
                  }
                })
              ]
            } else {
              tChartOption.xAxis = {
                ...tChartOption.xAxis,
                data: this.dataset.map(data => data.name)
              }
            }
            if (tChartOption.yAxis && tChartOption.yAxis instanceof Array) {
              tChartOption.yAxis = [
                ...tChartOption.yAxis.map(axis => {
                  if (axis.type === 'category') {
                    return {
                      ...axis,
                      data: this.dataset.map(data => data.name)
                    }
                  }
                  return axis
                })

              ]
            } else {
              tChartOption.yAxis = {
                ...tChartOption.yAxis,
                data: this.dataset.map(data => data.name)
              }
            }
          }

          // 获取series数据
          tChartOption.series = this.chartDataMaps
            .map((chartDataMap, index) => {
              switch (chartDataMap.type) {
                // 柱状图配置
                case 'bar':
                  if (!chartDataMap.colors) {
                    return {
                      ...chartDataMap,
                      data: this.dataset.map((data, i) => {
                        return {
                          value: data[chartDataMap.dataKey]
                        }
                      })
                    }
                  } else {
                    // 单系列颜色变化
                    return {
                      ...chartDataMap,
                      data: this.dataset.map((data, i) => {
                        return {
                          value: data[chartDataMap.dataKey],
                          itemStyle: {
                            color: chartDataMap.colors[i]
                          }
                        }
                      })
                    }
                  }
                // 线图配置
                case 'line':
                  return {
                    ...chartDataMap,
                    data: this.dataset.map((data, i) => {
                      return {
                        value: data[chartDataMap.dataKey]
                      }
                    })
                  }
                // 饼图配置
                case 'pie':
                  return {
                    ...chartDataMap,
                    data: this.dataset.map((data, i) => {
                      return {
                        name: data.name,
                        value: data[chartDataMap.dataKey]
                      }
                    })
                  }
                // 雷达图配置
                case 'radar':
                  return {
                    ...chartDataMap,
                    data: Object.keys(this.dataset[0]).filter(item => item !== 'name')
                      .map((data, i) => {
                        return {
                          name: data.name,
                          value: this.dataset.map(item => {
                            return item[data]
                          })
                        }
                      })
                  }
              }
            })
          this.formatOptions = tChartOption
        } else {
          // 数据置空了
          this.formatOptions = {
            ...this.currentChartOption
          }
        }
      }
    }
  }
}
</script>

<style>
.tw-chart {
  position: relative;
}
.tw-chart .echarts {
  width: 100%;
}
</style>
