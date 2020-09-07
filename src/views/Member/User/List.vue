<template>
  <el-container>
    <el-header class="flex justify-between">
      <span>会员列表</span>
    </el-header>
    <el-main class="main">
      <el-table v-if="data" :data="data.items">
        <el-table-column fixed="left" prop="id" min-width="150" label="id" />
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
    const result = useQuery([], () => api.members(params))

    return result
  },
}
</script>
