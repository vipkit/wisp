<template>
  <div class="main-wrapper h-screen">
    <HomeHeader />
    <el-container class="relative">
      <SideMenu />
      <el-main
        class="main-content absolute right-0 bottom-0 border-red bg-gray-100"
      >
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Menu from './Menu'
import Header from './Header'
import { mapGetters } from 'vuex'

export default {
  components: {
    SideMenu: Menu,
    HomeHeader: Header,
  },

  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.$store.dispatch('account').then(() => {
        const account = this.$store.state.account
        if (!account) {
          this.$message('没有该账号')
          this.$router.push('/login')
        }
      })
    },
  },
}
</script>
<style scoped>
.main-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.main-content {
  left: 200px;
  top: 55px;
  bottom: 0;
}
</style>
