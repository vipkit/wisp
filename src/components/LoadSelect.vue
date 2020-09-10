<template>
  <div>
    <el-select
      v-loadmore="loadMore"
      :value="value"
      filterable
      remote
      :filter-method="handleSearch"
      :loading="loading"
      clearable
      v-bind="$attrs"
      style="width: 350px"
      @focus="focus"
      @clear="clear"
      v-on="$listeners"
    >
      <el-option
        v-for="(option, index) in data"
        :key="index"
        :label="type === 'coupon' ? couponLabel(option) : goodsLabel(option)"
        :value="option[dictValue].toString()"
      />
      <!-- 此处加载中的value可以随便设置，只要不与其他数据重复即可 -->
      <el-option v-if="hasMore" disabled label="加载中..." value="-1" />
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: '',
    },
    // 列表数据
    data: {
      type: Array,
      default: () => [],
    },
    dictLabel: {
      type: String,
      default: 'name',
    },
    dictValue: {
      type: String,
      default: 'id',
    },
    // 调用页数的接口
    request: {
      type: Function,
      default: () => {},
    },
    // 传入的页码
    page: {
      type: [Number, String],
      default: 1,
    },
    // 是否还有更多数据
    hasMore: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      keyword: '', // 存储关键字用
      loading: false,
    }
  },
  methods: {
    // 请求下一页的数据
    loadMore() {
      // 如果没有更多数据，则不请求
      if (!this.hasMore) {
        return
      }
      // 如果intercept属性为true则不请求数据，
      if (this.loadMore.intercept) {
        return
      }

      this.loadMore.intercept = true
      const params = {
        page: this.page + 1,
        // more: true,
        q: this.keyword,
      }
      this.request(params).then(() => {
        if (this.hasMore) {
          this.loadMore.intercept = false
        }
      })
    },
    // 选中下拉框没有数据时，自动请求第一页的数据
    focus() {
      if (!this.data.length) {
        this.request({ page: 1 })
      }
    },
    handleSearch(keyword) {
      this.keyword = keyword
      this.loading = true
      this.request({
        page: 1,
        keyword: keyword,
      }).then(() => {
        this.loading = false
      })
    },
    // 删除选中时，如果请求了关键字，则清除关键字再请求第一页的数据
    clear() {
      if (this.keyword) {
        this.keyword = ''
        this.request({ page: 1 })
      }
    },
    goodsLabel: function (value) {
      const label = value.code + ' | ' + value.name + ' | ' + '已上架'
      return label
    },
    couponLabel: function (value) {
      const label =
        value.code +
        ' | ' +
        value.name +
        ' | ' +
        this.consts.ActivityTypeEnum[value.activityType] +
        ' ｜ ' +
        '正在进行'

      return label
    },
  },
}
</script>
