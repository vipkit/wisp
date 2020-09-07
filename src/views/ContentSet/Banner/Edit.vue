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
      paths: [{ to: 'BannerList', name: '轮播图' }],
    }
  },
  setup(ctx, context) {
    const result = useQuery([], () => api.banner(ctx.id))
    return result
  },
  watch: {
    data() {
      this.form = this.data
    },
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        const { id, name, linkCode, linkCodeData, image } = this.form
        if (linkCode === this.consts.GOODS && !linkCodeData) {
          this.$message('请先选择商品编号')
          return
        }
        const params = {
          id,
          name,
          linkCode,
          linkCodeData:
            linkCode === this.consts.GOODS_CATEGORY
              ? linkCodeData && linkCodeData.length
                ? linkCodeData[linkCodeData.length - 1].toString()
                : null
              : linkCodeData,
          image,
        }
        api.wxBannerEdit(params).then(() => {
          this.$message.success('成功')
          this.$router.push({ name: this.name })
        }, this.$error)
      })
    },
  },
}
</script>
