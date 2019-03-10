<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img src="./../assets/Logo.png" width="30" height="30">
      </a>
      <a
        role="button"
        class="navbar-burger burger"
        @click="showNav = !showNav"
        :class="{ 'is-active': showNav }"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showNav }">
      <div class="navbar-start">
        <a class="navbar-item">Ropa</a>
        <a class="navbar-item">Relojes</a>
        <a class="navbar-item">Autos</a>
        <a class="navbar-item">Bienes Raices</a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link to="/register">
            <a class="navbar-item">Sign Up</a>
          </router-link>
          <router-link to="/signin">
            <a class="navbar-item">Login</a>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      showNav: false
    };
  }
};
</script>
<style lang="scss" scoped>
@import "@/design/index.scss";
$navbar-background-color: $panels-color;
$navbar-item-color: $gray;
$navbar-item-hover-color: $green;
$navbar-item-hover-background-color: $black;
@import "~bulma/sass/components/navbar";
p {
  color: $yellow;
  font-weight: bold;
}
</style>


