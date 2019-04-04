<template>
  <div class="container">
    <div v-if=(!modal) class="notification">
      <figure class="image is-128x128">
        <img class="is-rounded" src="./../../assets/Logo.png">
      </figure>
      <h1>Recupera tu cuenta Mind Money Business</h1>
      <br>
      <div class="field">
        <label class="label">Contraseña</label>
        <div class="control has-icons-left">
          <input class="input" @focus="clean('password')" v-model="password.password" type="password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
        <p v-if="password.message" class="help is-danger">{{password.message}}</p>
      </div>
      <div class="field">
        <label class="label">Confirmar Contraseña</label>
        <div class="control has-icons-left">
          <input class="input" @focus="clean('confirmPassword')" v-model="confirmPassword.confirmPassword" type="password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
        <p v-if="confirmPassword.message" class="help is-danger">{{confirmPassword.message}}</p>
      </div>
      <div class="field">
        <a @click="forgot()" class="button is-fullwidth">
          <span>
            <strong>Confirmar</strong>
          </span>
        </a>
      </div>
    </div>
    <div class="modal" :class="{'is-active': modal}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <h1>{{textModal}}</h1>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import API from "./../../API";

export default {
  data() {
    return {
      textModal: '',
      modal: false,
      password: {
        password: "",
        message: ""
      },
      confirmPassword: {
        confirmPassword: "",
        message: ""
      }
    };
  },
  beforeCreate() {
    if (this.$store.getters["auth/isLogged"]) this.$router.push("/");
  },
  methods: {
    forgot() {
      if(this.password.password.length < 8) {
        return this.password.message = 'La contraseña tiene que contener al menos 8 caracteres'
      }
      if(this.confirmPassword.confirmPassword !== this.password.password) {
        return this.confirmPassword.message = 'Las contraseñas tienen que coincidir'
      }
      axios.post(API.forgot + this.$route.params.token, { password: this.password.password }).then(response => {
        if (response.status === 200) {
          this.modal = true;
          this.textModal = 'Tu contraseña fue actualizada correctamente, en breve seras redireccionado a la pagina de login';
          setTimeout(() => this.$router.push({ path: "/signin" }), 5000);
        }
      }).catch(e => {
        this.modal = true;
          this.textModal = 'El link proporcionado no es valido o expiro';
          setTimeout(() => this.$router.push({ path: "/" }), 5000);
      })
    },
    clean(field) {
      this[field].message = '';
    }
  }
};
</script>
<style lang="scss">
</style>
