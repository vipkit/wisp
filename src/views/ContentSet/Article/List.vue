<template>
  <el-container>
    <el-header class="flex justify-between">
      <span>图文内容</span>
      <div class="flex">
        <router-link :to="{ name: 'ArticleCreate' }">
          <el-button type="primary" size="small">新建图文内容</el-button>
        </router-link>
      </div>
    </el-header>
    <el-main class="main">
      <el-table v-if="data" :data="data.items">
        <el-table-column
          fixed="left"
          prop="title"
          min-width="150"
          label="标题"
        />
        <el-table-column
          v-slot="{ row: { external } }"
          min-width="120"
          label="图文类型"
        >
          {{ external ? '公众号文章' : '自建图文' }}
        </el-table-column>
        <el-table-column
          v-slot="{ row: { merchant } }"
          min-width="120"
          label="关联商家"
        >
          {{ merchant.name }}
        </el-table-column>
        <el-table-column
          v-slot="{ row: { type } }"
          min-width="120"
          label="关联小程序"
        >
          {{ type }}
        </el-table-column>
        <el-table-column
          v-slot="{ row: { id } }"
          fixed="right"
          label="操作"
          min-width="200"
        >
          <router-link
            :to="{
              name: 'ArticleEdit',
              params: { id },
            }"
          >
            <el-link type="primary" class="mr-4">编辑</el-link>
          </router-link>
          <el-link :underline="false" type="danger" @click="deleteArticle(id)">
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

export default {
  setup(ctx, context) {
    const params = { ...context.root.$route.query, perPage: 10 }
    const result = useQuery([], () => context.root.api.articles(params))
    return result
  },
  methods: {
    async deleteArticle(id) {
      await this.$confirm('确定要删除吗')
      api.deleteArticle({ id }).then(() => {
        this.$message.success('已删除')
        this.refetch()
      }, this.$error)
    },
  },
}
</script>
