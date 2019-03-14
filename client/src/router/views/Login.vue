<template>
  <div class="container">
    <div class="notification">
      <figure class="image is-128x128">
        <img class="is-rounded" src="./../../assets/Logo.png">
      </figure>
      <div class="field">
        <label class="label">Correo Electronico</label>
        <div class="control has-icons-left">
          <input @focus="clean('email')" class="input" v-model="email.email" type="email">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
        <p v-if="email.valid === false" class="help is-danger">{{email.message}}</p>
      </div>
      <div class="field">
        <label class="label">Contraseña</label>
        <div class="control has-icons-left">
          <input
            @focus="clean('password')"
            class="input"
            v-model="password.password"
            type="password"
          >
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
        <p v-if="password.valid === false" class="help is-danger">{{password.message}}</p>
      </div>
      <div class="field">
        <a @click="localSignIn()" id="own" class="button is-fullwidth">
          <span>
            <strong>Entrar</strong>
          </span>
        </a>
        <p class="help link">¿Has olvidado tu contraseña?</p>
        <router-link to="/register">
          <p class="help link">¿No tienes una cuenta?</p>
        </router-link>
      </div>
      <div class="field">
        <a @click="checkLoginState()" id="fb" class="button is-fullwidth">
          <span class="icon">
            <i class="fab fa-facebook-square"></i>
          </span>
          <span>Inicia sesión con Facebook</span>
        </a>
      </div>
    </div>
    <div class="modal" :class="{'is-active': modal}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <h1>Hubo un error al tratar de ingresar, las credenciales no concuerdan con ninguna cuenta registrada o no has confirmado tu email</h1>
      </div>
      <button class="modal-close is-large" @click="modal = false" aria-label="close"></button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import API from "./../../API";
import { error } from "util";
const pattEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  data() {
    return {
      email: {
        email: "",
        valid: true,
        message: ""
      },
      password: {
        password: "",
        valid: true,
        message: ""
      },
      modal: false
    };
  },
  beforeCreate(){
    if(this.$store.getters['auth/isLogged'])
      this.$router.push('/');
  },
  created() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: process.env.VUE_APP_FBAPP,
        cookie: true,
        xfbml: true,
        version: "v3.2"
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  },
  methods: {
    checkLoginState() {
      const dos = {
        connected: authResponse => {
          let body = { access_token: authResponse.accessToken };
          axios
            .post(API.facebook, body)
            .then(response => {
              //this.succesful = true;
              //this.error = response.data.token;
            })
            .catch(error => {
              //this.succesful = true;
              //this.error = error.response.data;
            });
        },
        login: () => {
          FB.login(
            function(response) {
              if (response.status === "connected")
                dos.connected(response.authResponse);
            },
            { scope: "email" }
          );
        }
      };
      FB.getLoginStatus(function(response) {
        dos[
          response.status === "not_authorized" || response.status === "unknown"
            ? "login"
            : response.status
        ](response.authResponse);
      });
    },
    localSignIn() {
      this.email.valid = true;
      this.password.valid = true;
      this.email.message = "";
      this.password.message = "";
      if (this.email.email === "") {
        this.email.valid = false;
        this.email.message = "Este campo no puede estar vacio";
      } else if (!pattEmail.test(this.email.email)) {
        this.email.valid = false;
        this.email.message = "Este correo electronico no es valido";
      }
      if (this.password.password === "") {
        this.password.valid = false;
        this.password.message = "Este campo no puede estar vacio";
        return;
      }
      let body = {
        email: this.email.email,
        password: this.password.password
      };
      axios
        .post(API.signIn, body)
        .then(response => {
          this.$store.commit("auth/setJWT", response.data);
          this.$router.push("/");
        })
        .catch(error => {
          this.modal = true;
        });
    },
    clean(field) {
      this[field].message = "";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/design/index.scss";
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
</style>
