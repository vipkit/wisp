function updateQuery(vm, params) {
  if (params == null) {
    if (Object.keys(vm.$route.query).length) {
      return vm.$router.push({
        query: {},
      })
    }
  } else {
    params = {
      ...vm.$route.query,
      ...params,
    }
    for (let key in params) {
      if (params[key] === '') {
        delete params[key]
      }
    }
    return vm.$router.push({
      query: {
        ...params,
      },
    })
  }
}

const Route = {
  methods: {
    query(params) {
      return updateQuery(this, params)
    },
    reset() {
      return updateQuery(this, null)
    },
  },
  render() {
    return this.$scopedSlots.default({
      query: this.query,
      reset: this.reset,
    })
  },
}
export default Route
