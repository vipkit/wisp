<template>
  <div>
    <el-button
      type="primary"
      size="small"
      class="mr-4"
      :disabled="banners.length < 2"
      @click="sortBanner"
    >
      排序
    </el-button>
    <el-dialog v-if="visible" :visible.sync="visible" title="排序">
      <SlickList :list="options" @cancel="cancel" @save="save" />
    </el-dialog>
  </div>
</template>
<script>
import SlickList from '@/components/SlickList'
import * as api from './api'

export default {
  components: {
    SlickList,
  },
  props: ['banners'],
  data() {
    return {
      options: [],
      visible: false,
    }
  },
  methods: {
    cancel() {
      this.visible = false
    },
    save(ids) {
      api.sortBanner({ ids }).then(() => {
        this.$emit('refetch')
        this.visible = false
      }, this.$error)
    },
    sortBanner() {
      this.options = this.banners.map(item => {
        return {
          ...item,
        }
      })
      this.visible = true
    },
  },
}
</script>
<style lang="scss" scoped></style>
