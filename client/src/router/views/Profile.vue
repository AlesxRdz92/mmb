<template>
  <div>
    <bar></bar>
    <div class="container">
      <div class="notification">
        <figure class="image is-128x128">
          <img class="is-rounded" src="https://graph.facebook.com/v2.6/10157752500470839/picture?type=large">
        </figure>
        <div class="field">
          <label class="label">Nombre</label>
          <div class="control has-icons-left">
            <input disabled v-model="user.name" class="input" type="text">
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Correo Electronico</label>
          <div class="control has-icons-left">
            <input v-model="user.email" disabled class="input" type="text">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Domicilio</label>
          <div class="control has-icons-left">
            <input v-model="user.address" class="input" type="text">
            <span class="icon is-small is-left">
              <i class="fas fa-map-marker-alt"></i>
            </span>
          </div>
          <p class="help is-danger">a</p>
        </div>
        <div class="field">
          <label class="label">Telefono</label>
          <div class="control has-icons-left">
            <input v-model="user.phone" class="input" type="tel">
            <span class="icon is-small is-left">
              <i class="fas fa-phone"></i>
            </span>
          </div>
          <p class="help is-danger">a</p>
        </div>
        <div class="field">
        <a id="own" @click="updateProfile()" class="button is-fullwidth">
          <span>
            <strong>Guardar</strong>
          </span>
        </a>
      </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import NavBar from "./../../components/NavBar";
import Foot from "./../../components/Footer";
import axios from 'axios';
import API from "./../../API";

export default {
  name: "Profile",
  components: {
    bar: NavBar,
    foot: Foot
  },
  data() {
    return {
      user: this.$store.getters["auth/userInfo"]
    }
  },
  methods: {
    updateProfile() {
      axios.patch(API.users, {
        address: this.user.address,
        phone: this.user.phone
      },
      {
        headers: {
          mmbauth: this.$store.getters["auth/getJwt"].jwt
        }
      }).then(response => {

      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/design/index.scss";
$footer-background-color: $panels-color;
$button-border-color: $black;
@import "~bulma/sass/elements/_all";
@import "~bulma/sass/layout/_all";

.container {
  width: 450px;
}
h1 {
  color: $yellow;
  text-align: center;
  font-size: 20px;
}
figure {
  margin-left: auto;
  margin-right: auto;
}
#twitter {
  background-color: $twitter-color;
  color: $white;
}
#fb {
  background-color: $fb-color;
  color: $white;
}
#own {
  background-color: $panels-color;
  color: $yellow;
}
.link {
  color: $yellow;
  text-align: right;
}
.icon {
  color: $white;
}
</style>
