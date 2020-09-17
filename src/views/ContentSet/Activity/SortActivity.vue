<template>
  <div>
    <el-button
      type="primary"
      size="small"
      class="mr-4"
      :disabled="activities.length < 2"
      @click="sortEntry"
    >
      排序
    </el-button>
    <el-dialog
      v-if="visible"
      :visible.sync="visible"
      width="500px"
      title="排序"
    >
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
  props: ['activities'],
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
      api.sortActivity({ ids }).then(() => {
        this.$emit('refetch')
        this.visible = false
      }, this.$error)
    },
    sortEntry() {
      this.options = this.activities.map(item => {
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
