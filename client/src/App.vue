<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  beforeCreate() {
    debugger
    console.log(this.$store.getters['auth/isLogged']);
  }
}
</script>

<style lang="scss">
@import '@/design/index.scss';
body {
  background-color: $black;
}
</style>
