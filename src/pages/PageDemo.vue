<template>
  <div>
    <el-button @click="handleClick">Click</el-button>
    <child @pfn="handlePfn"></child>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script scoped>
import Child from '@/components/Child'
import ElButton from '../../node_modules/element-ui/packages/button/src/button'

export default{
  props: [],
  methods: {
    handleClick: function () {
      console.log(1)
    },
    handlePfn: function () {
      console.log('from child')
    }
  },
  components: {
    ElButton,
    Child
  }
}
</script>

<style scoped></style>
