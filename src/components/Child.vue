<template>
  <div>
    <button @click="handleChild">Child</button>
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
