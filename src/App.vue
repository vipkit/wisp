<template>
  <div id="app">
    <div class="mb-4">hello wolrd</div>
    <a-button @click="click" type="primary">click me</a-button>
    <img src="~/assets/logo.png" />
    <div id="nav">
      <router-link to="/"> Home</router-link>
      <router-link to="/about">about </router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    click() {
      console.log("click me");
      [1].map(x => console.log(x));
    },
  },
};
</script>
