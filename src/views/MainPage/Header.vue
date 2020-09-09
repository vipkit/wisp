<template>
  <el-header class="fixed left-0 right-0 border-bottom header" height="55px">
    <el-row v-if="menus && hasMerchant" type="flex">
      <el-aside width="200px" class="logo justify-center items-center">
        <router-link to="/articles">
          <!-- <img width="128" src="@/assets/logo.png" /> -->
        </router-link>
      </el-aside>
      <div
        style="padding-left: 10px"
        class="flex flex-grow w-full h-full header-nav items-center text-white"
      >
        <div class="flex items-center h-full">
          <router-link
            v-for="menu of menus"
            :key="'menu' + menu.index"
            :to="menu.menuItems[0].paths[0].path"
            class="h-full pb-1 cursor text-base text-center hover:font-bold :opacity-100 hover:text-lg menu-item"
          >
            <div
              :class="[
                {
                  'border-b-2 border-white opacity-100 font-bold pb-2':
                    activeIndex === menu.index,
                },
              ]"
            >
              {{ menu.title }}
            </div>
          </router-link>
        </div>
      </div>
      <div class="flex logo-container px-2 header-nav flex-row-reverse">
        <div class="flex items-center text-white">
          <el-tooltip placement="bottom">
            <div slot="content">
              {{ account }}
            </div>
            <div
              style="max-width: 100px"
              class="text-sm truncate cursor-pointer"
            >
              {{ account }}
            </div>
          </el-tooltip>
          <span class="mx-2">|</span>
          <el-button
            type="text"
            class="text-white hover:text-grey-light"
            @click.native="loginOut"
          >
            退出
          </el-button>
        </div>
      </div>
    </el-row>
  </el-header>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      menus: null,
      activeIndex: null,
    }
  },
  computed: {
    hasMerchant() {
      const account = this.$store.state.account
      return account
    },
    ...mapGetters(['account']),
  },
  watch: {
    '$route.name'() {
      if (this.$route.path === '/') {
        return
      }
      this.initMenus()
    },
    hasMerchant() {
      this.initMenus()
    },
    menus() {
      this.initMenus()
    },
  },
  mounted() {
    this.initMenus()
  },
  methods: {
    async initMenus() {
      if (!this.$store.state || !this.$store.state.menus) return
      const account = this.$store.state.account
      if (!account) {
        return
      }
      const menus = this.$store.state.menus
      this.menus = menus
      const activeNav = this.menus
        .map(item =>
          item.menuItems.map(path =>
            path.paths.map(index => {
              return {
                name: index.name,
                path: index.path,
                firstIndex: item.index,
                secondIndex: path.index,
              }
            })
          )
        )
        .flatMap(item => item.flatMap(path => path))
        .find(menu => this.$route.path.startsWith(menu.path))
      if (!activeNav) {
        return
      }
      this.$store.state.activePath = activeNav ? activeNav.path : '/'
      if (this.$route.name === 'home') {
        return
      }
      menus.map(item => {
        if (item.index === activeNav.firstIndex) {
          const menu = item.menuItems.map(menu => {
            return {
              ...menu,
              paths: menu.paths.map(path => path).filter(path => path),
            }
          })
          this.$store.state.sideMenu = {
            ...item,
            menuItems: menu,
          }
        }
      })
      this.activeIndex = activeNav ? activeNav.firstIndex : null
    },

    loginOut() {
      this.$store.dispatch('signout').then(() => {
        this.$router.push('/login')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  z-index: 9;
}
.logo {
  background: #2882ff;
}
.header-nav {
  background: #5ba0ff;
  height: 54px;
}
.menu-item {
  opacity: 0.9;
  width: 80px;
  margin: 20px 4px 0 4px;
}
.logo-container {
  width: 180px;
}
</style>
