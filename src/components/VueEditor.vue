<template>
  <VueEditor v-model="content" :image-provider="imageProvider" :width="width" />
</template>

<script>
import VueEditor from '@baoshishu/vue-editor'
import { qiniuToken } from '@/api'

export default {
  components: {
    VueEditor,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '600px',
      required: false,
    },
  },
  data() {
    return {
      imageProvider: () =>
        qiniuToken().then(data => ({
          token: data.token,
          domain: data.domain,
          name: 'qiniu',
          modifier: ({ width, height, url }) => {
            const maxWidth = 750
            if (width < maxWidth) {
              return url
            } else {
              return `${url}?imageMogr2/thumbnail/${maxWidth}x`
            }
          },
        })),
      content: this.value,
    }
  },
  watch: {
    value(newVal) {
      this.content = newVal
    },
    content(newVal) {
      this.$emit('input', newVal)
    },
  },
}
</script>
