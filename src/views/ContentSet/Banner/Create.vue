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
        targetType: null,
        targetId: null,
        isArticle: true,
      },
      paths: [{ to: 'BannerList', name: '轮播图' }],
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          api.createBanner(this.form).then(() => {
            this.$message.success('成功')
            this.$router.push({ name: this.name })
          }, this.$error)
        }
      })
    },
  },
}
</script>

