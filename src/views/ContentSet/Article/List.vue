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
      <Route v-slot="{ query, reset }">
        <el-form
          inline
          @submit.native.prevent="query({ ...filters }).catch(refetch)"
        >
          <el-form-item label="标题">
            <el-input v-model="filters.q" placeholder="标题" />
          </el-form-item>
          <el-form-item label="关联商家">
            <el-select v-model="filters.merchantId" placeholder="请选择">
              <el-option
                v-for="(merchant, index) of merchants"
                :key="index"
                :label="merchant.name"
                :value="merchant.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button native-type="submit" type="primary" size="mini"
              >查询</el-button
            >
            <el-button size="mini" @click="reset((filters = {}))"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </Route>
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
          min-width="150"
          label="关联商家"
        >
          {{ merchant.name }}
        </el-table-column>
        <el-table-column
          v-slot="{ row: { id } }"
          fixed="right"
          label="操作"
          min-width="120"
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
      <Pagination v-if="data && data.total" :total="data.total" />
    </el-main>
  </el-container>
</template>
<script>
import * as api from './api'
import { useFetch } from '@/hooks'

export default {
  setup(props, context) {
    const { data: merchants } = useFetch(() => ({
      api: context.root.api.merchants,
    }))
    return {
      merchants,
      ...useFetch(() => ({
        api: context.root.api.articles,
        params: { ...context.root.$route.query },
      })),
    }
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
