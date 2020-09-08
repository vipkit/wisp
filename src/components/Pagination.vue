<template>
  <Route v-if="total" v-slot="{ query }" class="flex justify-center my-4">
    <el-pagination
      :total="total"
      :current-page="+$route.query.page || 1"
      :page-size="+$route.query.perPage || 10"
      layout="prev, pager, next,sizes"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      @current-change="page => query({ page })"
      @size-change="perPage => query({ perPage })"
    />
  </Route>
</template>

<script>
import Route from './RouteWrapper'
export default {
  components: { Route },
  props: ['total'],
}
</script>

<style lang="scss" scoped></style>
