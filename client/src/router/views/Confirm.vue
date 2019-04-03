<template>
  <div class="container">
    <div class="notification">
      <figure class="image is-128x128">
        <img class="is-rounded" src="./../../assets/Logo.png">
      </figure>
      <h1>{{text}}</h1>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import API from "./../../API";

export default {
  data() {
    return {
      text: ""
    };
  },
  beforeCreate() {
    if (this.$store.getters["auth/isLogged"]) this.$router.push("/");
  },
  created() {
    axios
      .get(API.confirm + this.$route.params.id)
      .then(response => {
        if (response.status === 200) {
            this.text = 'Tu cuenta fue activada satisfactoriamente, en breve seras redireccionado para iniciar sesion';
            setTimeout(() => this.$router.push({ path: "/signin" }), 5000);
        }
      })
      .catch(e => {
        this.text = "Hubo un error al confirmar la cuenta";
        setTimeout(() => this.$router.push({ path: "/" }), 5000);
      });
  }
};
</script>
<style lang="scss">
@import "@/design/index.scss";
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
</style>
