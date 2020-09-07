<template>
  <el-container>
    <el-header class="flex justify-between">
      <span>内容列表</span>
      <div class="flex">
        <EditContent :create="true" />
      </div>
    </el-header>
    <el-main class="main">
      <el-table v-if="data" :data="data.items">
        <el-table-column
          fixed="left"
          prop="name"
          min-width="150"
          label="名称"
        />
        <el-table-column
          v-slot="{ row: { imageUrl } }"
          min-width="120"
          label="图片"
        >
          {{ imageUrl }}
        </el-table-column>
        <el-table-column
          v-slot="{ row: { merchant } }"
          min-width="120"
          label="关联商家"
        >
          {{ merchant.name }}
        </el-table-column>
        <el-table-column
          v-slot="{ row: { status } }"
          min-width="120"
          label="状态"
        >
          {{ status }}
        </el-table-column>
        <el-table-column
          v-slot="{ row: { id } }"
          fixed="right"
          label="操作"
          min-width="200"
        >
          <router-link
            class="mr-4"
            :to="{
              name: 'EntryEdit',
              params: { id },
            }"
          >
            <el-link type="primary" class="mr-4">编辑</el-link>
          </router-link>
          <el-link
            :underline="false"
            class="mr-4"
            type="danger"
            @click="deleteBanner(id)"
          >
            上线
          </el-link>
          <el-link
            :underline="false"
            class="mr-4"
            type="danger"
            @click="deleteBanner(id)"
          >
            下线
          </el-link>
          <el-link :underline="false" type="danger" @click="deleteBanner(id)">
            删除
          </el-link>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script>
import { useQuery } from '@baoshishu/vue-query'
import * as api from './api'
import EditContent from './EditContent'

export default {
  components: {
    EditContent,
  },
  setup(ctx, context) {
    const params = { ...context.root.$route.query, perPage: 10 }
    const result = useQuery([], () => api.articlreEntries(params))
    return result
  },
  methods: {
    async deleteBanner(id) {
      await this.$confirm('确定要删除吗')
      api.deleteBanner(id).then(() => {
        this.$message.success('已删除')
        this.refetch()
      }, this.$error)
    },
  },
}
</script>
