import Component from './Demo.vue'
export default {
  // 混入
  ...Component,
  created () {
    Component.created.bind(this)()
    // 在以下执行更多的created中方法，如要覆盖，请注释上方一行。
  },
  data () {
    return {
      ...Component.data.bind(this)()
      // 如要添加更多data,请在下方添加。
    }
  },
  computed: {
    ...Component.computed
    // 如要添加更多的computed值，请在下方添加。
  },
  methods: {
    ...Component.methods
    // 如要添加更多方法，请在下方添加，同名方法将被覆盖。
  },
  watch: {
    ...Component.watch
    // 如要添加更多watch方法，请在下方添加。
  }
}
