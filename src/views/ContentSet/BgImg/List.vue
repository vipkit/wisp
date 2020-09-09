<template>
  <el-container>
    <el-header class="flex justify-between">
      <span>会员背景图</span>
    </el-header>
    <el-main class="main">
      <detail-item title="会员背景图">
        <div>
          <div>
            <el-popover placement="top" width="400">
              <div class="flex justify-center">
                <div>
                  <img :src="form.memberBgImage" />
                </div>
              </div>
              <img
                slot="reference"
                width="200"
                class="cursor-pointer"
                :src="form.memberBgImage + '?imageMogr2/thumbnail/!40p'"
              />
            </el-popover>
          </div>

          <div class="mt-2">
            <span class="text-sm text-gray-600">图片建议尺寸：750*460</span>
          </div>
          <div class="flex my-6">
            <image-uploader
              v-model="form.memberBgImage"
              :type="'text'"
              class="mr-4"
              @change="uploadSuccess"
            >
              <el-button type="primary" size="mini">
                {{ form.memberBgImage ? '修改' : '上传' }}
              </el-button>
            </image-uploader>
            <el-button
              v-if="form.memberBgImage"
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
      defaultUrl: 'https://cdn-images.vipkit.com/Fi-OaIav3eXUMaQHJkh4Y6YmthVY',
      form: {
        memberBgImage: null,
      },
      init: true,
    }
  },
  setup(ctx, context) {
    const result = useQuery([], api.memberBgImage)
    return {
      ...result,
      bgimg: result.data,
    }
  },
  watch: {
    bgimg() {
      if (!this.bgimg) {
        this.uploadSuccess(this.defaultUrl)
        return
      }
      // defaultUrl
      this.form = {
        memberBgImage: this.bgimg,
      }
    },
  },
  methods: {
    handleUploadSuccess() {
      const { memberBgImage } = this.form
      api
        .setMemberBgImage({
          memberBgImage,
        })
        .then(() => {
          if (!this.bgimg && this.init) {
            this.init = false
            this.form = {
              memberBgImage: this.defaultUrl,
            }
            return
          }
          this.$message.success('成功')
          this.refetch()
        }, this.$error)
    },

    uploadSuccess(url) {
      this.form = {
        memberBgImage: url,
      }
      this.handleUploadSuccess()
    },
    async resetBg() {
      await this.$confirm('是否确认重置会员背景图')
      this.form.memberBgImage = this.defaultUrl
      this.handleUploadSuccess()
    },
  },
}
</script>
