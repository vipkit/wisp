<template>
  <el-breadcrumb v-if="paths" separator="/">
    <el-breadcrumb-item
      v-for="(path, index) in paths"
      :key="'path' + path.to + index"
      :to="{ name: path.to }"
      >{{ path.name }}</el-breadcrumb-item
    >
    <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    paths: { type: Array, required: true },
    title: { type: String, required: true },
  },
}
</script>
