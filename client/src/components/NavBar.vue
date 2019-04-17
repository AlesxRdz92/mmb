<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <figure class="image is-32x32">
          <img class="is-rounded" src="./../assets/Logo.png">
        </figure>
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
        <a class="navbar-item">Smartphones</a>
        <router-link to="/items/car" class="navbar-item">
          Autos
        </router-link>
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
            <figure class="image is-32x32">
                <img class="is-rounded" :src="user.profileImage">
              </figure>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link"><p>{{user.name}}</p></a>
              <div class="navbar-dropdown">
                <router-link to="/profile">
                  <a class="navbar-item">Perfil</a>
                </router-link>
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
$navbar-item-hover-color: $white;
$navbar-item-hover-background-color: $panels-color;
$navbar-dropdown-arrow: $yellow;
$navbar-dropdown-background-color: $panels-color;
$navbar-dropdown-border-top: 2px solid $black;
$navbar-dropdown-item-hover-background-color: $panels-color;
$navbar-dropdown-item-hover-color: $white;
@import "~bulma/sass/components/navbar";
p {
  color: $yellow;
  font-weight: bold;
}
#carrito {
  color: $yellow;
}
</style>


