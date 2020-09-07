<template>
  <el-container
    class="flex w-full h-full items-center"
    v-if="!isLogin && $route.path === '/'"
  >
    <Login />
  </el-container>
  <MainPage v-else />
</template>
<script>
import Login from '@/views/Account/Login.vue'
import MainPage from '@/views/MainPage'
import { mapState } from 'vuex'

export default {
  components: {
    MainPage: MainPage,
    Login,
  },
  computed: {
    ...mapState(['isLogin']),
  },
}
</script>
