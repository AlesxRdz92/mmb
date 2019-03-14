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
        <a class="navbar-item">Blog</a>
      </div>
      <template v-if="!logged">
        <div class="navbar-end">
          <div class="navbar-item">
            <router-link to="/register">
              <a class="navbar-item">Registrarte</a>
            </router-link>
            <router-link to="/signin">
              <a class="navbar-item">Entrar</a>
            </router-link>
            <router-link to="/">
              <a class="navbar-item">
                <i id="carrito" class="fas fa-shopping-cart"></i>
              </a>
            </router-link>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="navbar-end">
          <div class="navbar-item">
            <p>Bienvenido {{user.name}}</p>
          </div>
          <div class="navbar-item">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">Cuenta</a>
              <div class="navbar-dropdown">
                <a class="navbar-item">Perfil</a>
                <a @click="logout()" class="navbar-item">Salir</a>
              </div>
            </div>
            <router-link to="/">
              <a class="navbar-item">
                <i id="carrito" class="fas fa-shopping-cart"></i>
              </a>
            </router-link>
          </div>
        </div>
      </template>
    </div>
  </nav>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      showNav: false
    };
  },
  computed: {
    logged() {
      return this.$store.getters["auth/isLogged"];
    },
    user() {
      return this.$store.getters["auth/userInfo"];
    }
  },
  methods: {
    logout() {
      this.$store.commit("auth/logout");
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/design/index.scss";
$navbar-background-color: $panels-color;
$navbar-item-color: $gray;
$navbar-item-hover-color: $green;
$navbar-item-hover-background-color: $black;
$navbar-dropdown-arrow: $yellow;
@import "~bulma/sass/components/navbar";
p {
  color: $yellow;
  font-weight: bold;
}
#carrito {
  color: $yellow;
}
</style>


