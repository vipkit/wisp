<template>
  <el-container>
    <el-header class="flex justify-between">
      <span>商家列表</span>
    </el-header>
    <el-main class="main">
      <el-table v-if="merchants" :data="merchants">
        <el-table-column
          v-slot="{ row }"
          fixed="left"
          min-width="120"
          label="品牌信息"
        >
          <Avatar :user="{ nickName: row.name, avatarUrl: row.brandImage }" />
        </el-table-column>
        <el-table-column
          v-slot="{ row: { companyName } }"
          min-width="150"
          label="商家名称"
        >
          {{ companyName }}
        </el-table-column>
        <el-table-column
          v-slot="{ row: { city } }"
          min-width="100"
          label="所在城市"
        >
          {{ city.name }}
        </el-table-column>
        <el-table-column
          v-slot="{ row: { brandDescription } }"
          min-width="200"
          label="品牌简介"
        >
          {{ brandDescription || '无' }}
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
