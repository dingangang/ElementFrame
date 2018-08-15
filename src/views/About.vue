<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="test">Let's do something cool</div>
    <p>Welcome {{this.$store.state.userName}}</p>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <div>
      <i class="xadd"></i>
    </div>
    <div>{{test}}</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  created () {
    this.$axios.post('/api/data', {
      id: 77778
    }).then((res) => {
      this.test = res.data
    }, (res) => {
      console.warn(res)
    })
  },
  data () {
    return {
      test: ''
    }
  }
}
</script>
