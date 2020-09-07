<template>
  <el-container>
    <el-header class="flex justify-between">
      <span>会员背景图</span>
    </el-header>
    <el-main class="main">
      <detail-item title="会员背景图">
        <div>
          <div>
            <div v-if="form.erweihuoHeaderBg">
              <el-popover placement="top" width="400">
                <div class="flex justify-center">
                  <div>
                    <img :src="form.imageUrl" />
                  </div>
                </div>
                <img
                  slot="reference"
                  width="200"
                  class="cursor-pointer"
                  :src="form.imageUrl + '?imageMogr2/thumbnail/!40p'"
                />
              </el-popover>
            </div>
            <span v-else class="data-value">无</span>
          </div>
          <div class="mt-2">
            <span class="text-sm text-gray-600">图片建议比例：750px*130px</span>
          </div>
          <div class="flex my-6">
            <image-uploader v-model="form.imageUrl" :type="'text'" class="mr-4">
              <el-button type="primary" size="mini">{{
                form.erweihuoHeaderBg ? '修改' : '上传'
              }}</el-button>
            </image-uploader>
            <el-button
              v-if="form.imageUrl"
              type="primary"
              size="mini"
              plain
              @click="resetBg"
              >重置</el-button
            >
          </div>
        </div>
      </detail-item>
    </el-main>
  </el-container>
</template>
<script>
import { useQuery } from '@baoshishu/vue-query'
import * as api from './api'

export default {
  data() {
    return {
      form: {
        imageUrl: null,
      },
    }
  },
  //   setup(ctx, context) {
  //     const result = useQuery([], () => api.bgimg(params))
  //     return {
  //       bgimg: result.data,
  //     }
  //   },
  watch: {
    bgimg() {
      this.form = {
        imageUrl: this.bgimg,
      }
    },
  },
  methods: {
    handleUploadSuccess() {
      const { imageUrl } = this.form
      api
        .setBgImg({
          imageUrl,
        })
        .then(() => {
          this.$message.success('成功')
          this.refetch()
        }, this.$error)
    },
    async resetBg() {
      await this.$confirm('是否确认重置会员背景图')
      this.form.imageUrl = ''
      this.handleUploadSuccess()
    },
  },
}
</script>