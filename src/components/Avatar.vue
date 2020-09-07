<template>
  <div>
    <div v-if="user && user.profile" class="flex align-center">
      <img
        v-if="user.profile.avatarUrl"
        :src="user.profile.avatarUrl"
        class="avatar m-r-md"
      />
      <img v-else src="@/assets/wx-default-avatar.jpg" class="avatar m-r-md" />
      <span class="data-value">{{ user | nickName }}</span>
    </div>
    <div v-else class="flex align-center">
      <img src="@/assets/wx-default-avatar.jpg" class="avatar m-r-md" />
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
