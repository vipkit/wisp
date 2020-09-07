<template>
  <el-container>
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
      width="500px"
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
          <el-button size="small" type="primary" native-type="submit"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
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
        publishAt: null,
        targetId: null,
      },
      visible: false,
    }
  },
  methods: {
    editContent() {
      this.form = this.create ? this.form : this.info
      this.visible = true
    },
    close() {
      this.$refs.form.resetFields()
      this.visible = false
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { ...common } = this.form
          const params = {
            ...common,
          }
          const action = this.create
            ? api.createArticleEntry
            : api.editArticleEntry
          action(params).then(() => {
            this.$message.success('成功')
            this.$router.push({ name: 'EntryList' })
          }, this.$error)
        }
      })
    },
  },
}
</script>
