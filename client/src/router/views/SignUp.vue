<template>
<div>
  <div v-if="!succesful" class="container">
    <div class="notification">
      <figure class="image is-128x128">
        <img class="is-rounded" src="./../../assets/Logo.png">
      </figure>
      <div class="field">
        <label class="label">Nombre</label>
        <div class="control has-icons-left">
          <input class="input" v-model="newUser.name.name" @focus="clean('name')" @blur="validate('name')" type="text">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
      <p v-if="newUser.name.valid === false" class="help is-danger">{{newUser.name.message}}</p>
      </div>
      <div class="field">
        <label class="label">Correo Electronico</label>
        <div class="control has-icons-left">
          <input class="input" v-model="newUser.email.email" @focus="clean('email')" @blur="validate('email')" type="email">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
        <p v-if="newUser.email.valid === false" class="help is-danger">{{newUser.email.message}}</p>
      </div>
      <div class="field">
        <label class="label">Contraseña</label>
        <div class="control has-icons-left">
          <input class="input" v-model="newUser.password.password" @focus="clean('password')" @blur="validate('password')" type="password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      <p v-if="newUser.password.valid === false" class="help is-danger">{{newUser.password.message}}</p>
      </div>
      <div class="field">
        <a id="own" @click="localSignUp()" class="button is-fullwidth">
          <span>
            <strong>Registrate</strong>
          </span>
        </a>
          <router-link to="/signin">
            <p class="help link">¿Ya tienes una cuenta?</p>
          </router-link>
      </div>
      <div class="field">
        <a @click="localSignUp()" id="twitter" class="button is-fullwidth">
          <span class="icon">
            <i class="fab fa-twitter"></i>
          </span>
          <span>Inicia sesión con Twitter</span>
        </a>
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
  </div>
  <div v-else class="container">
    <div class="notification">
      <figure class="image is-128x128">
        <img class="is-rounded" src="./../../assets/Logo.png">
      </figure>
      <h1>{{error || 'Gracias por querer ser parte de nosotros, en breve recibiras un correo electronico de nuestra parte para concluir con el proceso de registro, por favor revisa tambien la bandeja de correo no deseado o spam'}}</h1>
      <div class="field">
        <a id="own" @click="back()" class="button is-fullwidth">
          <span>
            <strong>Regresar</strong>
          </span>
        </a>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
import API  from "./../../API";

const messages = {
  generic: 'Este campo no puede estar vacio',
  email: 'Este correo electronico no es valido',
  password: 'La contraseña ingresada no es valida'
}
const pattEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const pattPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default {
  data() {
    return {
      succesful: false,
      error: '',
      newUser: {
        name: {
          name: '',
          valid: true,
          message: ''
        },
        email: {
          email: '',
          valid: true,
          message: ''
        },
        password: {
          password: '',
          valid: true,
          message: ''
        }
      }
    }
  },
  beforeCreate(){
    if(this.$store.getters['auth/isLogged'])
      this.$router.push('/');
  },
  created() {
    window.fbAsyncInit = function() {
    FB.init({
      appId      : process.env.VUE_APP_FBAPP,
      cookie     : true,
      xfbml      : true,
      version    : 'v3.2'
    });
    FB.AppEvents.logPageView(); 
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
  },
  methods: {
    checkLoginState() {
      const dos = {
        connected: (authResponse) => {
          let body = { 'access_token': authResponse.accessToken }
          axios.post(API.facebook, body).then(response => {
            response.data.token = response.headers.mmbauth;
            this.$store.commit("auth/setJWT", response.data);
            this.$router.push("/");
          }).catch(error => {
            this.succesful = true;
            this.error = error.response.data;
          });
        },
        login: () => {
          FB.login(function(response) {
            if(response.status === 'connected')
              dos.connected(response.authResponse);
          }, {scope: 'email'});
        }
      }
      FB.getLoginStatus(function(response) {
        dos[response.status === 'not_authorized' || response.status === 'unknown' ? 'login' : response.status](response.authResponse);
      });
    },
    localSignUp() {
      this.validate('name');
      this.validate('email');
      this.validate('password');
      if(this.newUser.name.valid === true && this.newUser.email.valid === true && this.newUser.password.valid === true) {
        let body = {
          name: this.newUser.name.name,
          email: this.newUser.email.email,
          password: this.newUser.password.password
        };
        axios.post(API.signUp, body).then(response => {
          if(response.status === 200) {
            this.succesful = true;
          }
        }).catch(error => {
          this.succesful = true;
          this.error = error.response.data;
        });
      }

    },
    validate(field) {
      if(this.newUser[field][field] === '') {
        this.newUser[field].valid = false;
        this.newUser[field].message = messages.generic;
        return
      }
      switch(field) {
        case 'email':
          if(!pattEmail.test(this.newUser.email.email)) {
            this.newUser.email.valid = false;
            this.newUser.email.message = messages.email;
            return
          }
        case 'password':
          if(!pattPassword.test(this.newUser.password.password)) {
            this.newUser.password.valid = false;
            this.newUser.password.message = messages.password;
            return
          }
      }
      this.newUser[field].valid = true;
      this.newUser[field].message = '';
    },
    clean(field) {
      this.newUser[field].message = '';
    },
    back() {
      if(!this.error) {
        this.$router.push({ path: "/" });
      }
      this.succesful = false;
      this.error = '';
      this.newUser = {
        name: {
          name: '',
          valid: true,
          message: ''
        },
        email: {
          email: '',
          valid: true,
          message: ''
        },
        password: {
          password: '',
          valid: true,
          message: ''
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/design/index.scss";
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

