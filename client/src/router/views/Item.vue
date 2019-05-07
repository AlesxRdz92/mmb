<template>
  <div>
    <bar></bar>
    <p style="margin: 0 auto; text-align: center;" class="title">{{item.name}}</p>
    <div class="tile is-ancestor">
      <div class="tile is-8 is-parent">
        <div class="tile is-child box">
          <figure class="image is-4by3">
            <img
              @click="change()"
              v-if="item.photos.length"
              :src="require('./../../assets' + item.photos[active])"
              alt="Placeholder image"
            >
          </figure>
        </div>
      </div>
      <div class="tile is-vertical is-parent">
        <div class="tile is-child box">
          <p class="title">{{price}}</p>
          <ul v-for="(des, x) in item.description" :key="x">
            <li>
              <span class="icon">
                <i :class="activeIcon"></i>
              </span>
              {{des}}
            </li>
            <br>
          </ul>
          <br>
          <br>
          <a v-if="item.justDate" @click="action()" class="button is-fullwidth">Agendar cita</a>
          <a v-else class="button is-fullwidth">Agregar a carrito</a>
        </div>
      </div>
    </div>
    <div class="modal" :class="{'is-active': modal}">
      <div class="modal-background"></div>
      <div v-if="loggedIn" class="modal-content">
        <div class="field">
          <label class="label">Telefono</label>
          <div class="control has-icons-left">
            <input v-model="user.phone" class="input" type="tel">
            <span class="icon is-small is-left">
              <i class="fas fa-phone"></i>
            </span>
          </div>
        </div>
        <label class="label">Fecha y hora</label>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input v-model="date.date" class="input" type="date" placeholder="Name">
                <span class="icon is-small is-left">
                  <i class="fas fa-calendar-week"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left has-icons-right">
                <input v-model="date.time" class="input" type="time">
                <span class="icon is-small is-left">
                  <i class="fas fa-clock"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="field">
          <a @click="agendar()" class="button is-fullwidth">
            <span>
              <strong>Agendar</strong>
            </span>
          </a>
        </div>
      </div>
      <div v-else class="modal-content">
        <label class="label">Lo sentimos! Tienes que iniciar sesion para poder agendar una cita con nosotros.</label>
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
  name: "Item",
  components: {
    bar: NavBar,
    foot: Foot
  },
  data() {
    return {
      user: this.$store.getters["auth/userInfo"],
      loggedIn: this.$store.getters["auth/isLogged"],
      modal: false,
      date: {
        date: "",
        time: ""
      },
      icons: {
        car: "fas fa-car",
        watch: "fas fa-clock",
        smartphone: "fas fa-mobile"
      },
      active: 0,
      item: {
        _id: "",
        name: "",
        description: "",
        price: 0,
        photos: [],
        justDate: false,
        category: "",
        currency: ""
      }
    };
  },
  created() {
    axios.get(API.getOne + this.$route.params.id).then(res => {
      this.item = res.data;
    });
  },
  methods: {
    change() {
      this.active =
        this.active < this.item.photos.length - 1 ? this.active + 1 : 0;
    },
    action() {
      if (this.item.justDate === true) {
        this.modal = true;
      } else {
      }
    },
    agendar() {
      if(this.user.phone === '')
        return
      if(this.date.date === '')
        return
      if(this.date.time === '')
        return
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
          this.$store.commit("auth/setData", response.data);
          axios
            .post(
              API.dates,
              {
                time: this.date.time,
                date: this.date.date,
                item: this.item._id
              },
              {
                headers: {
                  mmbauth: this.$store.getters["auth/getJwt"].jwt
                }
              }
            )
            .then(res => {
              this.modal = false;
              this.date.date = '';
              this.date.time = '';
            });
        });
    }
  },
  computed: {
    activeIcon() {
      return this.icons[this.item.category];
    },
    price() {
      return new Intl.NumberFormat("es-419", {
        style: "currency",
        currency: this.item.currency || "USD"
      }).format(this.item.price);
    }
  }
};
</script>
<style lang="scss">
@import "@/design/index.scss";
$title-color: $yellow;
$box-background-color: $black;
$box-color: $white;
$card-background-color: $panels-color;
$card-color: $white;
$button-background-color: $panels-color;
$button-border-color: $yellow;
$button-color: $white;
$button-hover-color: $yellow;
$button-hover-border-color: $white;
@import "~bulma/sass/grid/_all";
@import "~bulma/sass/elements/_all";
@import "~bulma/sass/layout/_all";
@import "~bulma/sass/components/_all";
.icon {
  color: $yellow;
}
</style>


