<template>
  <div id="app" :class="{'index-bg': $route.path === '/class-evaluation3'}">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  created () {
    // 展会项目禁用右键点击
    // document.oncontextmenu = function () { return false }
    // document.onselectstart = function () { return false }
    // 链接websocket服务器
    this.initWebsoket()
  },
  destroyed () {
    this.ws.close()
    clearInterval(this.heartCheck.timeoutObj)
  },
  data () {
    return {
      ws: null,
      heartCheck: {
        timeout: 60000,
        timeoutObj: null
      }
    }
  },
  methods: {
    /**
     * 链接websocket服务器
     */
    initWebsoket () {
      this.ws = new WebSocket('ws://120.78.171.78:8181')
      let $vm = this
      this.ws.onopen = function () {
        console.log('%c App connects to wsServer success.', 'color: green')
        $vm.wsKeepConnect()
      }
      this.ws.onmessage = function (e) {
        $vm.wsReset()
        console.log('from server: ' + e.data)
        // 排除控制器页面
        if ($vm.$route.name !== 'controller') {
          if (e.data === 'class-evaluation1') {
            $vm.$router.push('class-evaluation1')
          }
        }
      }
    },
    /**
     * 保持连接
     */
    wsKeepConnect () {
      let $vm = this
      this.heartCheck.timeoutObj = setInterval(() => {
        if ($vm.ws.readyState === 1) {
          $vm.ws.send('HeartBeat')
        }
      }, $vm.heartCheck.timeout)
    },
    /**
     * 重置心跳确认包
     */
    wsReset () {
      clearInterval(this.heartCheck.timeoutObj)
      this.wsKeepConnect()
    }
  }
}
</script>

<style>
</style>
