<template>
  <el-container
    v-if="!isLogin && $route.path === '/'"
    class="flex w-full h-full items-center"
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
