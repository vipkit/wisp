<template>
  <div>
    <el-form-item label="发布时间" prop="time">
      <el-date-picker
        v-model="form.time"
        type="datetimerange"
        :picker-options="pickerOptions"
        :editable="false"
        value-format="yyyy-MM-dd HH:mm:ss"
        :default-time="['00:00:00', '23:59:59']"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="changeTime"
      />
    </el-form-item>
    <el-form-item
      label="图文内容"
      prop="articleIds"
      :rules="[{ required: true, message: '请选择图文内容' }]"
    >
      <el-select
        v-if="articles"
        v-model="form.articleIds"
        :multiple="true"
        :clearable="true"
        @change="changeArticle"
      >
        <el-option v-if="articles.length" value="all" label="全部" />
        <el-option
          v-for="(article, index) of articles"
          :key="index"
          :label="article.title"
          :value="article.id"
        />
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
import { useQuery } from '@baoshishu/vue-query'

export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      articles: [],
      minDate: '',
      pickerOptions: {
        onPick: ({ minDate }) => {
          this.minDate = minDate
        },
        disabledDate: time => {
          if (!this.minDate) return
          const minDate =
            this.minDate.getFullYear() +
            '-' +
            (this.minDate.getMonth() + 1) +
            '-' +
            this.minDate.getDate() +
            ' 23:59:59'

          let curDate = new Date(minDate).getTime()
          let oneWeek = 7 * 24 * 3600 * 1000
          let oneDay = 24 * 3600 * 1000
          let last = curDate - oneWeek - oneDay
          let pre = curDate + oneWeek
          return time.getTime() < last || time.getTime() > pre
        },
      },
    }
  },
  setup(ctx, context) {
    const params = {
      perPage: 999,
    }
    return useQuery([], () => context.root.api.articles({ params }))
  },
  watch: {
    data() {
      this.articles = this.data.items
    },
  },
  methods: {
    changeTime(e) {
      this.minDate = ''
      const [publishAtFrom, publishAtTo] = e || []
      const params = {
        publishAtFrom,
        publishAtTo,
        perPage: 999,
      }
      this.form.articleIds = []
      this.api.articles({ params }).then(({ items }) => {
        this.articles = items
      }, this.$error)
    },
    changeArticle(e) {
      if ([...e].includes('all')) {
        this.form.articleIds = this.articles.map(item => item.id)
      }
    },
  },
}
</script>
<style scoped></style>
