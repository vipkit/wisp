<template>
  <el-container>
    <el-header class="flex justify-between">
      <span>商家列表</span>
    </el-header>
    <el-main class="main">
      <el-table v-if="merchants" :data="merchants">
        <el-table-column
          fixed="left"
          prop="name"
          min-width="150"
          label="品牌信息"
        />
        <el-table-column
          v-slot="{ row: { name } }"
          min-width="120"
          label="商家名称"
        >
          {{ name }}
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script>
import { useQuery } from '@baoshishu/vue-query'

export default {
  setup(ctx, context) {
    const result = useQuery([], context.root.api.merchants)
    return { ...result, merchants: result.data }
  },
}
</script>
