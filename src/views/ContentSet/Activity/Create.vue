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
      },
      paths: [{ to: 'ArticleList', name: '图文内容' }],
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { linkCode, linkCodeData, ...common } = this.form
          if (linkCode === this.consts.GOODS && !linkCodeData) {
            this.$message('请先选择商品编号')
            return
          }
          const params = {
            ...common,
            linkCode,
            linkCodeData:
              linkCode === this.consts.GOODS_CATEGORY
                ? linkCodeData && linkCodeData.length
                  ? linkCodeData[linkCodeData.length - 1].toString()
                  : null
                : linkCodeData,
          }
          api.wxBannerAdd(params).then(() => {
            this.$message.success('成功')
            this.$router.push({ name: this.name })
          }, this.$error)
        }
      })
    },
  },
}
</script>

