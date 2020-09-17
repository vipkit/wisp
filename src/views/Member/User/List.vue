<template>
  <el-container>
    <el-header class="flex justify-between">
      <span>会员列表</span>
    </el-header>
    <el-main class="main">
      <Route v-slot="{ query, reset }">
        <el-form
          inline
          @submit.native.prevent="query({ ...filters }).catch(refetch)"
        >
          <el-form-item label="创建时间">
            <el-date-picker
              :value="dateRange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              :default-time="['00:00:00', '23:59:59']"
              :editable="false"
              @input="changeDate"
            />
          </el-form-item>
          <el-form-item label="会员手机号">
            <el-input v-model="filters.q" placeholder="会员手机号" />
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
          v-slot="{ row }"
          fixed="left"
          min-width="150"
          label="会员信息"
        >
          <Avatar :user="row" />
        </el-table-column>
        <el-table-column prop="mobile" min-width="150" label="会员手机号" />
        <el-table-column prop="createdAt" min-width="150" label="创建时间" />
      </el-table>
      <Pagination v-if="data && data.total" :total="data.total" />
    </el-main>
  </el-container>
</template>
<script>
import { useFetch } from '@/hooks'
import * as api from './api'

export default {
  setup(props, context) {
    return useFetch(() => ({
      api: api.members,
      params: { ...context.root.$route.query },
    }))
  },
  computed: {
    dateRange() {
      const { createdAtFrom, createdAtTo } = this.filters
      return createdAtFrom && createdAtTo ? [createdAtFrom, createdAtTo] : ''
    },
  },
  methods: {
    changeDate(e) {
      const [createdAtFrom, createdAtTo] = e || ['', '']
      this.filters = {
        ...this.filters,
        createdAtFrom,
        createdAtTo,
      }
    },
  },
}
</script>
