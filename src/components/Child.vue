<template>
  <div>
    <el-button type="success" @click="handleChild">Child</el-button>
  </div>
</template>

<script scoped>

export default{
  props: [],
  methods: {
    handleChild: function () {
      this.$emit('pfn')
    }
  }
}
</script>

<style scoped></style>
