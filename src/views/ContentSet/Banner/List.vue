<template>
  <el-container>
    <el-header class="flex justify-between">
      <span>轮播图</span>
      <div class="flex">
        <SortBanner v-if="data" :banners="data.items" @refetch="refetch" />
        <router-link :to="{ name: 'BannerCreate' }">
          <el-button type="primary" size="small">新建轮播图</el-button>
        </router-link>
      </div>
    </el-header>
    <el-main class="main">
      <Route v-slot="{ query, reset }">
        <el-form
          inline
          @submit.native.prevent="query({ ...filters }).catch(refetch)"
        >
          <el-form-item label="状态">
            <el-select v-model="filters.status" placeholder="请选择">
              <el-option
                v-for="(key, value) of consts.ProviderBannerStatusEnum"
                :key="value"
                :label="key"
                :value="value"
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
        <el-table-column
          v-slot="{ row: { status } }"
          min-width="120"
          label="状态"
        >
          {{ consts.ProviderBannerStatusEnum[status] }}
        </el-table-column>
        <el-table-column
          v-slot="{ row: { id, status } }"
          fixed="right"
          label="操作"
          min-width="150"
        >
          <router-link
            class="mr-4"
            :to="{
              name: 'BannerEdit',
              params: { id },
            }"
          >
            <el-link type="primary">编辑</el-link>
          </router-link>
          <el-link
            v-if="[consts.DRAFT, consts.OFFLINE].includes(status)"
            :underline="false"
            class="mr-4"
            type="primary"
            @click="onlineBanner(id)"
          >
            上线
          </el-link>
          <el-link
            v-if="[consts.ONLINE].includes(status)"
            :underline="false"
            type="warning"
            @click="offlineBanner(id)"
          >
            下线
          </el-link>
          <el-link
            v-if="[consts.DRAFT, consts.OFFLINE].includes(status)"
            :underline="false"
            type="danger"
            @click="deleteBanner(id)"
          >
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
import SortBanner from './SortBanner'
import { useFetch } from '@/hooks'

export default {
  components: {
    SortBanner,
  },
  setup(props, context) {
    return useFetch(() => ({
      api: api.banners,
      params: { ...context.root.$route.query },
    }))
  },
  methods: {
    async deleteBanner(id) {
      await this.$confirm('确定要删除吗')
      api.deleteBanner({ id }).then(() => {
        this.$message.success('已删除')
        this.refetch()
      }, this.$error)
    },
    async onlineBanner(id) {
      await this.$confirm('确定要发布吗')
      api.changeBannerStatus({ id, status: this.consts.ONLINE }).then(() => {
        this.$message.success('已发布')
        this.refetch()
      }, this.$error)
    },
    async offlineBanner(id) {
      await this.$confirm('确定要下线吗')
      api.changeBannerStatus({ id, status: this.consts.OFFLINE }).then(() => {
        this.$message.success('已下线')
        this.refetch()
      }, this.$error)
    },
  },
}
</script>
