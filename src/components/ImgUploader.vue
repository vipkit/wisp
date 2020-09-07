<template>
  <div>
    <div v-if="multiple && fileList">
      <el-upload
        v-if="fileList.length <= limit"
        :disabled="disabled"
        action="https://upload.qiniup.com"
        :data="{ token: token }"
        :before-upload="beforeAvatarUpload"
        :on-success="handleMultipleSuccess"
        list-type="picture-card"
        :on-remove="remove"
        :limit="limit"
        :accept="acceptType"
        :file-list="fileList"
      >
        <i class="el-icon-plus" />
      </el-upload>
    </div>
    <el-upload
      v-else-if="type === 'text'"
      :disabled="disabled"
      :accept="acceptType"
      :data="{ token: token }"
      :before-upload="beforeAvatarUpload"
      :show-file-list="false"
      :on-success="handleSuccess"
      action="https://upload.qiniup.com"
    >
      <slot v-if="$slots.default"></slot>
      <span v-else class="primary font-size-sm">{{ text }}</span>
    </el-upload>
    <el-upload
      v-else
      :disabled="disabled"
      class="avatar-uploader"
      accept="image/jpeg,image/png,image/jpg,image/gif"
      :data="{ token: token }"
      :before-upload="beforeAvatarUpload"
      :show-file-list="false"
      :on-success="handleSuccess"
      :class="['uploader', { miniSize: miniSize }]"
      action="https://upload.qiniup.com"
    >
      <i
        v-if="isLoading"
        :style="[
          {
            width: miniSize ? '60px' : width,
            height: miniSize ? '60px' : height,
          },
          { 'line-height': miniSize ? '60px' : height },
        ]"
        class="icon el-icon-loading text-center"
      />
      <img
        v-else-if="value"
        :src="value"
        class="image"
        :style="[
          {
            width: miniSize ? '60px' : width,
            height: miniSize ? '60px' : height,
          },
        ]"
      />
      <i
        v-else
        class="icon el-icon-plus text-center"
        :style="[
          {
            width: miniSize ? '60px' : width,
            height: miniSize ? '60px' : height,
          },
          ,
          { 'line-height': miniSize ? '60px' : height },
        ]"
      />
    </el-upload>
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Array],
      default: '',
    },
    type: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: '点击上传',
    },
    accept: {
      type: String,
      default: 'image',
    },
    size: {
      type: Number,
      default: 1,
    },
    miniSize: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: [Number, String],
      default: 1,
    },
    width: {
      type: String,
      default: '178px',
    },
    height: {
      type: String,
      default: '178px',
    },
  },
  data() {
    return {
      token: '',
      domain: '',
      isLoading: false,
      fileList:
        this.multiple && this.value
          ? this.value.map(url => {
              return {
                url,
              }
            })
          : [],
    }
  },
  computed: {
    acceptType() {
      return {
        excel: '.xlsx,.xlsm,.xltx,.xltm,.xlam,.xlsb',
        image: 'image/jpeg,image/png,image/jpg,image/gif',
      }[this.accept]
    },
  },

  mounted() {
    this.api
      .qiniuToken()
      .then(({ token, domain }) => {
        this.token = token
        this.domain = domain
      })
      .catch(this.$error)
  },
  methods: {
    fetFiles() {
      this.fileList =
        this.multiple &&
        this.value.map(url => {
          return {
            url,
          }
        })
    },
    remove(res) {
      const list = [...this.value]
      let index = ''
      if (res.url) {
        index = list.findIndex(url => url === res.url)
      } else {
        const key = res.response.key

        index = list.findIndex(url => url.indexOf(key) !== -1)
      }
      list.splice(index, 1)
      this.$emit('input', list)
    },
    handleSuccess(res) {
      const imageUrl = `https://${this.domain}/${res.key}`
      this.imageUrl = imageUrl
      this.$emit('input', imageUrl)
      this.$emit('change', imageUrl)
      this.isLoading = false
    },
    handleMultipleSuccess(res) {
      const imageUrl = `https://${this.domain}/${res.key}`
      console.log([...this.value, imageUrl])
      this.$emit('input', [...this.value, imageUrl])
      this.isLoading = false
    },
    beforeAvatarUpload(file) {
      this.isLoading = true
      const limitSize = this.size
      const enableUpload = file.size / 1024 / 1024 < limitSize
      if (!enableUpload) {
        this.isLoading = false
        this.$message.error(`上传文件大小不能超过${limitSize}MB!`)
      }
      return enableUpload
    },
  },
}
</script>

<style lang="scss">
.miniSize {
  width: 60px;
  height: 60px;
  .icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
  }
  .image {
    width: 60px;
    height: 60px;
    display: block;
    object-fit: contain;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/* .uploader {
  :global(.el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: #409eff;
    }
  }
} */
.icon {
  font-size: 28px;
  color: #8c939d;
}
.image {
  display: block;
  object-fit: contain;
}
</style>
