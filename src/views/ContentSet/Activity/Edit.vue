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
      paths: [{ to: 'ActivityList', name: '活动列表' }],
    }
  },
  setup(ctx, context) {
    const result = useQuery([], () => api.activity(ctx.id))
    return result
  },
  watch: {
    data() {
      const data = this.data
      this.form = {
        ...data,
        merchantId: data.merchant ? data.merchant.id : null,
        isArticle: data.targetType
          ? data.targetType === this.consts.ARTICLE
          : null,
        targetType:
          (!data.targetType || data.targetType) === this.consts.ARTICLE
            ? null
            : data.targetType,
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
          targetId,
          targetType,
          isArticle,
        } = this.form
        const params = {
          id,
          title,
          imageUrl,
          merchantId,
          targetId,
          targetType: isArticle ? this.consts.ARTICLE : targetType,
        }
        api.updateActivity(params).then(() => {
          this.$message.success('成功')
          this.$router.push({ name: 'ActivityList' })
        }, this.$error)
      })
    },
  },
}
</script>
