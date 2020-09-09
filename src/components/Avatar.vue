<template>
  <div>
    <div v-if="user" class="flex items-center">
      <img v-if="user.avatarUrl" :src="user.avatarUrl" class="avatar mr-2" />
      <img v-else src="@/assets/wx-default-avatar.jpg" class="avatar mr-2" />
      <span class="data-value">{{ user.nickName }}</span>
    </div>
    <div v-else class="flex items-center">
      <img src="@/assets/wx-default-avatar.jpg" class="avatar mr-2" />
      <span class="data-value">匿名用户</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
