<template>
  <el-header class="fixed left-0 right-0 border-bottom header" height="55px">
    <!-- <el-row v-if="menus && hasMerchant" type="flex"> -->
    <el-row v-if="menus" type="flex">
      <el-aside width="200px" class="center logo">
        <router-link to="/articles">
          <img width="128" src="@/assets/logo.png" />
        </router-link>
      </el-aside>
      <div
        style="padding-left: 10px"
        class="flex flex-grow w-full h-full header-nav items-center text-white"
        :class="[
          {
            'justify-between': showIcon,
          },
        ]"
      >
        <template v-if="showIcon && menusLimit">
          <div class="flex h-full items-center">
            <router-link
              v-for="menu of menusLimit"
              :key="'menus-limit' + menu.index"
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
            <div
              style="width: 50px"
              class="pb-3 h-full cursor-pointer text-center text-base menu-item hover:font-bold :opacity-100 hover:text-lg"
              @click="drawer = true"
            >
              更多
            </div>
          </div>
        </template>
        <div v-if="!showIcon" class="flex items-center h-full">
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
          <img
            v-if="brandImage"
            :src="brandImage"
            class="w-8 h-8 mr-2 rounded-full"
          />
          <el-tooltip placement="bottom">
            <div slot="content">
              {{ brandName ? brandName : userName }}
            </div>
            <div
              style="max-width: 100px"
              class="text-sm truncate cursor-pointer"
            >
              {{ brandName ? brandName : userName }}
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
    <el-drawer
      :append-to-body="true"
      :with-header="false"
      :visible.sync="drawer"
      direction="rtl"
      :size="'300px'"
    >
      <div class="w-full h-full bg-primary-normal text-white">
        <div class="flex flex-wrap">
          <div
            v-for="menu of menus"
            :key="'menu-right' + menu.index"
            class="w-1/2 p-4"
          >
            <div
              :to="menu.menuItems[0].paths[0].path"
              class="pb-1 cursor text-base text-center hover:font-bold :opacity-100 hover:text-lg"
              @click="() => newPath(menu.menuItems[0].paths[0].path)"
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
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </el-header>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      menus: null,
      activeIndex: null,
      drawer: false,
      bodyVisibleWidth: null,
      visible: false,
    }
  },
  computed: {
    hasMerchant() {
      const account = this.$store.state.account
      return account && account.hasMerchant
    },
    ...mapGetters(['userName', 'brandName', 'brandImage', 'merchant']),
    showIcon() {
      if (!this.menus) {
        return
      }
      const headerWidth =
        this.menus.length * 80 + this.menus.length * 8 + 200 + 180 + 10
      return this.bodyVisibleWidth < headerWidth
    },
    menusLimit() {
      if (!this.bodyVisibleWidth) return null
      if (!this.showIcon) return null
      const limitLength = Math.floor(
        (this.bodyVisibleWidth - 380 - 50 - 10) / 88
      )
      const limitMenus = this.menus.slice(0, limitLength)
      return limitMenus
    },
  },
  watch: {
    '$route.name'() {
      if (this.$route.path === '/') {
        return
      }
      this.initMenus()
      // this.getActiveMenu(this.$store.state.menus)
    },
    hasMerchant() {
      this.initMenus()
    },
    merchant() {
      this.initMenus()
    },
    menus() {
      this.initMenus()
    },

    bodyVisibleWidth: {
      handler(newValue, oldValue) {
        this.showIcon
        this.menusLimit
      },
      deep: true,
    },
  },
  mounted() {
    this.initMenus()
    this.bodyVisibleWidth = document.body.clientWidth
    window.onresize = () => {
      return (() => {
        this.bodyVisibleWidth = document.body.clientWidth
      })()
    }
  },
  methods: {
    async initMenus() {
      // const account = this.$store.state.account
      // if (!account || !account.hasMerchant) {
      //   return
      // }
      // let Admission = this.merchant?.profile?.modules || []
      // if (!Admission.length) return
      if (!this.$store.state || !this.$store.state.menus) return

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
        this.$router.push('/')
      })
    },
    newPath(path) {
      this.$router.push(path)
      this.drawer = false
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  z-index: 9;
}
.logo {
  background: $primary-color-darken;
}
.header-nav {
  background: $primary-color;
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
