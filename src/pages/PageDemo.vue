<template>
  <div>
    <button @click="handleClick">Click</button>
    <child @pfn="handlePfn"></child>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script scoped>
import Child from '@/components/Child'

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
    Child
  }
}
</script>

<style scoped></style>
