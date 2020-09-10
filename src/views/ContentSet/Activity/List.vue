<template>
  <el-container>
    <el-header class="flex justify-between">
      <span>活动列表</span>
      <div class="flex">
        <SortActivity v-if="data" :activities="data.items" @refetch="refetch" />
        <router-link :to="{ name: 'ActivityCreate' }">
          <el-button type="primary" size="small">新建活动</el-button>
        </router-link>
      </div>
    </el-header>
    <el-main class="main">
      <el-table v-if="data" :data="data.items">
        <el-table-column
          fixed="left"
          prop="title"
          min-width="150"
          label="名称"
        />
        <el-table-column
          v-slot="{ row: { imageUrl } }"
          min-width="150"
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
              width="120"
              class="cursor-pointer"
              :src="imageUrl + '?imageMogr2/thumbnail/!40p'"
            />
          </el-popover>
        </el-table-column>
        <el-table-column
          v-slot="{ row: { merchant } }"
          min-width="120"
          label="关联商家"
        >
          {{ merchant ? merchant.name : '无' }}
        </el-table-column>
        <el-table-column min-width="120" label="状态"> 已发布 </el-table-column>
        <el-table-column
          v-slot="{ row: { id } }"
          fixed="right"
          label="操作"
          min-width="150"
        >
          <router-link
            class="mr-4"
            :to="{
              name: 'ActivityEdit',
              params: { id },
            }"
          >
            <el-link type="primary" class="mr-4">编辑</el-link>
          </router-link>
          <el-link :underline="false" type="danger" @click="deleteActivity(id)">
            删除
          </el-link>
        </el-table-column>
      </el-table>
      <Pagination v-if="data && data.total" :total="data.total" />
    </el-main>
  </el-container>
</template>
<script>
import { useQuery } from '@baoshishu/vue-query'
import * as api from './api'
import SortActivity from './SortActivity'
import { useFetch } from '@/hooks.js'

export default {
  components: {
    SortActivity,
  },
  setup(props, context) {
    return useFetch(() => ({
      api: api.activities,
      params: { ...context.root.$route.query },
    }))
  },
  methods: {
    async deleteActivity(id) {
      await this.$confirm('确定要删除吗')
      api.deleteActivity({ id }).then(() => {
        this.$message.success('已删除')
        this.refetch()
      }, this.$error)
    },
  },
}
</script>
