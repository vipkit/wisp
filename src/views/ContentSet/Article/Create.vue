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
import { format } from 'date-fns'

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
        const { publishAt, ...commmon } = this.form
        const nowTime = format(new Date(), 'yy-MM-dd HH:mm:ss')
        const params = {
          ...commmon,
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
