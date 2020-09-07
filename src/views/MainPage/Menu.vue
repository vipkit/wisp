<template>
  <el-aside v-if="sideMenu && activePath" width="200" class="sidenav">
    <el-menu
      :collapse="false"
      :unique-opened="true"
      :default-active="activePath"
      :router="true"
      class="menu"
    >
      <el-submenu
        v-for="item in sideMenu.menuItems"
        :key="'二级菜单' + item.index"
        :index="item.index"
      >
        <span slot="title">
          <component :is="item.icon"></component>
          {{ item.title }}
        </span>
        <router-link
          v-for="path in item.paths"
          :key="'三级菜单' + path.path"
          :to="path.path"
          :class="[
            {
              'active-menu': activePath == path.path,
            },
          ]"
        >
          <el-menu-item :index="path.path">
            {{ path.name }}
          </el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
    <el-menu router> </el-menu>
  </el-aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['sideMenu', 'activePath']),
    // ...mapGetters(['newMessage', 'merchant', 'flowApplyMessage']),
  },
}
</script>

<style lang="scss" scoped>
.sidenav {
  width: 200px;
  position: fixed;
  top: 55px;
  left: 0;
  height: calc(100vh - 55px);
}

.menu {
  min-height: calc(100vh - 54px);
}

.menu-home-active {
  color: #f0f3fa;
  background: #5ba0ff !important;

  .icon {
    path {
      fill: #f0f3fa;
    }
  }
}

.menu-home {
  background: #f0f3fa;
  border-radius: 15px;
  width: 140px;
  height: 40px;

  &:hover {
    color: #f0f3fa;
    background: #5ba0ff;

    .icon {
      path {
        fill: #f0f3fa;
      }
    }
  }
}

.el-submenu {
  .el-menu-item {
    padding-left: 50px !important; // 覆盖element ui
  }
}

.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;

  path {
    fill: #5ba0ff;
  }
}
</style>
