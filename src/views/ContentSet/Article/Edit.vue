<template>
  <el-container>
    <el-header>
      <bread-crumb :paths="paths" title="编辑" />
    </el-header>
    <el-main class="main">
      <el-form
        v-if="form"
        ref="form"
        :model="form"
        label-width="140px"
        @submit.prevent.native="submit"
      >
        <Fields :form="form" />
        <el-form-item>
          <el-button size="small" type="primary" native-type="submit">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import Fields from './components/Fields'
import { useQuery } from '@baoshishu/vue-query'
import * as api from './api'

export default {
  components: {
    Fields,
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      form: null,
      paths: [{ to: 'ArticleList', name: '图文内容' }],
    }
  },
  setup(ctx, context) {
    const result = useQuery([], () => api.article(ctx.id))
    return result
  },
  watch: {
    data() {
      const data = this.data
      console.log(data)
      this.form = {
        ...data,
        merchantId: data.merchant.id,
      }
    },
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        const {
          id,
          title,
          imageUrl,
          merchantId,
          actionButtonText,
          content,
          publishAt,
          link,
          external,
          targetType,
          targetId,
        } = this.form
        const params = {
          id,
          title,
          imageUrl,
          merchantId,
          actionButtonText,
          content,
          publishAt,
          link,
          external,
          targetType,
          targetId,
        }
        api.updateArticle(params).then(() => {
          this.$message.success('成功')
          this.$router.push({ name: 'ArticleList' })
        }, this.$error)
      })
    },
  },
}
</script>
