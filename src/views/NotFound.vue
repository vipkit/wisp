<template>
  <div class="not-found">
    <div class="wrap-container columns center">
      <div class="columns center">
        <div class="reminder m-b-md"></div>
        <div class="grey">没有找到这个页面哦</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.not-found {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
}
.wrap-container {
  width: 100%;
  height: 100%;
}
.reminder {
  width: 200px;
  height: 170px;
  background: url('../assets/404.png') no-repeat;
}
</style>
