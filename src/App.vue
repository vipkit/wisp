<template>
  <div id='app'>
    <img src='~/assets/logo.png' />
    <div id='nav'>
      <router-link to='/'> Home</router-link>
      <router-link to='/about'>about </router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
};
</script>
