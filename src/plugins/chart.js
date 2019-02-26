import Vue from 'vue'
// import ECharts from 'vue-echarts/components/ECharts'
import ECharts from 'vue-echarts'

// 手动添加图表依赖减少项目体积，支持列表可以在 echarts/echarts.all.js 中查看
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/sankey'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/graphic'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/legendScroll'
// 启用svg渲染时，图表组件添加以下依赖,并传入{renderer:'svg'},移动端和低性能时SVG渲染有优势
// import 'zrender/lib/vml/vml'
// import 'zrender/lib/svg/svg'

// 注册主题
import shine from '../assets/echart-theme/shine.json'
import shine4k from '../assets/echart-theme/shine4k.json'
ECharts.registerTheme('shine', shine)
ECharts.registerTheme('shine4k', shine4k)

Vue.component('v-chart', ECharts)
