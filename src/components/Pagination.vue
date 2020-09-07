<template>
  <el-pagination
    v-if="total"
    :total="total"
    :page-size="currentPerPage"
    :current-page.sync="currentPage"
    class="center m-y-md"
    layout="prev, pager, next,sizes"
    :page-sizes="[10, 20, 30, 40, 50, 100]"
    @current-change="onPageChange"
    @size-change="onPageSizeChange"
  />
</template>

<script>
export default {
  props: {
    total: { type: Number, required: true },
    pageSize: { type: Number, required: false, default: 10 },
    page: { type: Number, required: false, default: 1 },
  },
  data() {
    return {
      currentPage: 1,
      currentPerPage: 10,
    }
  },
  watch: {
    page() {
      this.currentPage = this.page
    },
    pageSize() {
      this.currentPerPage = this.pageSize
    },
  },
  methods: {
    onPageChange: function (page) {
      this.$emit('page-change', page)
    },
    onPageSizeChange: function (size) {
      this.$emit('page-size-change', size)
    },
  },
}
</script>
