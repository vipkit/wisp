export default {
  watch: {
    '$route.query'() {
      this.initData()
    },
  },
  data() {
    return {
      page: 1,
      perPage: 10,
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    pageChange(page) {
      this.updateQuery({ page: page || 1 })
    },
    pageSizeChange(perPage) {
      this.updateQuery({ page: 1, perPage })
    },
  },
}
