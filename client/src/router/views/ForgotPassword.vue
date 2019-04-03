<template>
  <div class="container">
    <div class="notification">
      <figure class="image is-128x128">
        <img class="is-rounded" src="./../../assets/Logo.png">
      </figure>
      <h1>{{title}}</h1>
      <label
        class="label"
      >{{label}}</label>
      <div v-if="show" class="control has-icons-left">
        <input v-on:keyup.enter="send()" v-model="email" class="input" type="email">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
      <div class="field">
        <br>
        <div v-if="show" class="field">
          <a @click="send()" id="own" class="button is-fullwidth">
            <span>
              <strong>Enviar</strong>
            </span>
          </a>
        </div>
        <div v-else class="field">
          <a @click="home()" id="own" class="button is-fullwidth">
            <span>
              <strong>Ir a la pagina principal</strong>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import API from "./../../API";

export default {
    data() {
        return {
            email: '',
            show: true,
            title: 'Esta bien! A todo mundo le puede pasar',
            label: 'Solamente dinos la direccion de correo electronico que usaste para crear tu cuenta y nosotros nos encargaremos de ayudarte a recuperarla'
        }
    },
    methods: {
        send() {
            if(this.email !== '') {
            axios.post(API.forgot, {email: this.email}).then(responsse => {
                this.title = 'Siguiente paso, por favor checa tu correo electronico';
                this.label = 'Si tu correo esta asignado a una cuenta de Mind Money Business, te enviaremos instrucciones para generar una nueva contraseña. Por favor revisa tambien tu bandeja de correo no deseado o spam'
                this.show = false;
            });
        }
        },
        home() {
            this.$router.push({path: '/'});
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
.label {
  color: $white;
  text-align: center;
  font-size: 15px;
}
#own {
  background-color: $panels-color;
  color: $yellow;
}
</style>
