<template>
  <div>
    <el-form-item label="发布时间" prop="publishAt">
      <el-date-picker
        v-model="form.publishAt"
        type="datetime"
        :editable="false"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="发布时间"
      />
    </el-form-item>
    <el-form-item
      label="图文内容"
      prop="articleId"
      :rules="[{ required: true, message: '请选择图文内容' }]"
    >
      <el-select v-model="form.articleId">
        <el-option
          v-for="(article, index) of articles"
          :key="index"
          :label="article.name"
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
  setup(ctx, context) {
    const params = {
      perPage: 99,
    }
    const articles = useQuery([], () => context.root.api.articles(params))
    return {
      ...articles,
      articles: articles.items,
    }
  },
  methods: {},
}
</script>
<style scoped></style>
