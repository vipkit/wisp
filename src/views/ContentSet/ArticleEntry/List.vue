<template>
  <el-container>
    <el-header class="flex justify-between">
      <span>内容列表</span>
      <div class="flex">
        <SortEntry v-if="data" :entries="data.items" @refetch="refetch" />
        <EditContent :create="true" @refetch="refetch" />
      </div>
    </el-header>
    <el-main class="main">
      <el-table v-if="data" :data="data.items">
        <el-table-column
          fixed="left"
          prop="article.title"
          min-width="150"
          label="名称"
        />
        <el-table-column
          v-slot="{ row: { article: { imageUrl } } }"
          min-width="120"
          label="图片"
        >
          <el-popover placement="top" width="400">
            <div class="flex justify-center">
              <div>
                <img :src="imageUrl" />
              </div>
            </div>
            <img
              slot="reference"
              width="200"
              class="cursor-pointer"
              :src="imageUrl + '?imageMogr2/thumbnail/!40p'"
            />
          </el-popover>
        </el-table-column>
        <el-table-column
          v-slot="{ row: { article: { merchant } } }"
          min-width="120"
          label="关联商家"
        >
          {{ merchant.name }}
        </el-table-column>
        <el-table-column
          v-slot="{ row }"
          fixed="right"
          label="操作"
          min-width="240"
        >
          <div class="flex">
            <router-link
              class="mr-4"
              :to="{
                name: 'ArticleEdit',
                params: { id: row.article.id },
              }"
            >
              <el-link type="primary" class="mr-4">编辑图文</el-link>
            </router-link>
            <el-link
              :underline="false"
              type="danger"
              @click="deleteArticleEntry(row.id)"
            >
              删除
            </el-link>
          </div>
        </el-table-column>
      </el-table>
      <Pagination v-if="data && data.total" :total="data.total" />
    </el-main>
  </el-container>
</template>
<script>
import { useQuery } from '@baoshishu/vue-query'
import * as api from './api'
import EditContent from './EditContent'
import SortEntry from './SortEntry'
import { useFetch } from '@/hooks.js'

export default {
  components: {
    EditContent,
    SortEntry,
  },
  setup(props, context) {
    return useFetch(() => ({
      api: api.articlreEntries,
      params: { ...context.root.$route.query },
    }))
  },
  methods: {
    async deleteArticleEntry(id) {
      await this.$confirm('确定要删除吗')
      api.deleteArticleEntry(id).then(() => {
        this.$message.success('已删除')
        this.refetch()
      }, this.$error)
    },
  },
}
</script>
