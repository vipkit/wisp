<template>
  <el-container>
    <el-header>
      <BreadCrumb :paths="paths" title="新建" />
    </el-header>
    <el-main class="main">
      <el-form
        ref="form"
        :model="form"
        label-width="140px"
        @submit.prevent.native="submit"
      >
        <Fields :form="form" />
        <el-form-item>
          <el-button size="small" type="primary" native-type="submit"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import Fields from './components/Fields'
import * as api from './api'
import { formatDate } from '@/utils/formatTime.js'

export default {
  components: {
    Fields,
  },
  data() {
    return {
      form: {
        title: null,
        imageUrl: null,
        merchantId: null,
        actionButtonText: null,
        content: null,
        publishAt: null,
        link: null,
        external: false,
        targetType: null,
        targetId: null,
        summary: null,
      },
      paths: [{ to: 'ArticleList', name: '图文内容' }],
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        const { publishAt, external, link, content, ...commmon } = this.form
        const nowTime = formatDate(new Date())
        const params = {
          ...commmon,
          external,
          content: !external ? content : null,
          link: external ? link : null,
          publishAt: publishAt || nowTime,
        }
        api.createArticle(params).then(() => {
          this.$message.success('成功')
          this.$router.push({ name: 'ArticleList' })
        }, this.$error)
      })
    },
  },
}
</script>
