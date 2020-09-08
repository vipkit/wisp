<template>
  <div>
    <el-button
      type="primary"
      size="small"
      class="mr-4"
      :disabled="entries.length < 2"
      @click="sortEntry"
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
  props: ['entries'],
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
      api.sortArticleEntry({ ids }).then(() => {
        this.$emit('refetch')
        this.visible = false
      }, this.$error)
    },
    sortEntry() {
      this.options = this.entries.map(item => {
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
