<template>
  <div>
    <bar></bar>
    <div class="container">
      <div class="notification">
        <figure class="image is-128x128">
          <img
            class="is-rounded"
            src="https://graph.facebook.com/v2.6/10157752500470839/picture?type=large"
          >
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
          <label class="label">Dirección (Calle, número y colonia)</label>
          <div class="control has-icons-left">
            <input v-model="user.address" class="input" type="text">
            <span class="icon is-small is-left">
              <i class="fas fa-map-marker-alt"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Código Postal</label>
          <div class="control has-icons-left">
            <input v-model="user.cp" class="input" type="number">
            <span class="icon is-small is-left">
              <i class="fas fa-map-marker-alt"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Estado</label>
          <div class="control has-icons-left">
            <input v-model="user.state" class="input" type="text">
            <span class="icon is-small is-left">
              <i class="fas fa-map-marker-alt"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Ciudad</label>
          <div class="control has-icons-left">
            <input v-model="user.city" class="input" type="text">
            <span class="icon is-small is-left">
              <i class="fas fa-map-marker-alt"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Telefono</label>
          <div class="control has-icons-left">
            <input v-model="user.phone" class="input" type="tel">
            <span class="icon is-small is-left">
              <i class="fas fa-phone"></i>
            </span>
          </div>
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
    <div class="modal" :class="{'is-active': modal}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <h1>{{info}}</h1>
      </div>
      <button class="modal-close is-large" @click="modal = false" aria-label="close"></button>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import NavBar from "./../../components/NavBar";
import Foot from "./../../components/Footer";
import axios from "axios";
import API from "./../../API";

export default {
  name: "Profile",
  components: {
    bar: NavBar,
    foot: Foot
  },
  data() {
    return {
      user: this.$store.getters["auth/userInfo"],
      modal: false,
      info: ''
    };
  },
  methods: {
    updateProfile() {
      axios
        .patch(
          API.users,
          {
            address: this.user.address,
            phone: this.user.phone,
            cp: this.user.cp,
            state: this.user.state,
            city: this.user.city
          },
          {
            headers: {
              mmbauth: this.$store.getters["auth/getJwt"].jwt
            }
          }
        )
        .then(response => {
          this.modal = true;
          this.info = 'La informacion fue actualizada correctamente';
          this.$store.commit("auth/setData", response.data);
        })
        .catch(error => {
          this.modal = true;
          this.info = 'Hubo un error al tratar de actualizar la informacion, por favor intentelo mas tarde';
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
@import "~bulma/sass/components/modal";
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
