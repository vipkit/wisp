<template>
  <div>
    <div v-if="create">
      <el-button type="primary" size="small" @click="editContent">
        新建
      </el-button>
    </div>
    <el-link v-else :underline="false" type="primary" @click="editContent">
      编辑
    </el-link>
    <el-dialog
      :title="create ? '新建' : '编辑'"
      :visible.sync="visible"
      width="600px"
      :before-close="close"
    >
      <el-form
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
    </el-dialog>
  </div>
</template>
<script>
import Fields from './components/Fields'
import * as api from './api'

export default {
  components: {
    Fields,
  },
  props: {
    info: {
      type: Object,
      default: null,
    },
    create: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        time: [],
        articleIds: [],
      },
      visible: false,
    }
  },
  methods: {
    editContent() {
      const info = this.info
      this.form = this.create
        ? this.form
        : { id: info.id, articleIds: info.articleIds }
      this.visible = true
    },
    close() {
      this.$refs.form.resetFields()
      this.visible = false
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { id, articleIds } = this.form
          const params = {
            id,
            articleIds,
          }
          const action = this.create
            ? api.createArticleEntry
            : api.editArticleEntry
          action(params).then(() => {
            this.$message.success('成功')
            this.$emit('refetch')
            this.close()
          }, this.$error)
        }
      })
    },
  },
}
</script>
