<template>
  <div>
    <bar></bar>
    <p style="margin: 0 auto; text-align: center;" class="title">{{item.name}}</p>
    <div class="tile is-ancestor">
      <div class="tile is-8 is-parent">
        <div class="tile is-child box">
          <figure class="image is-4by3">
            <img @click="change()" v-if="item.photos.length" :src="require('./../../assets' + item.photos[active])" alt="Placeholder image">
          </figure>
        </div>
      </div>
      <div class="tile is-vertical is-parent">
        <div class="tile is-child box">
          <p class="title">${{item.price}} mxn</p>
          <ul v-for="(des, x) in item.description" :key="x">
            <li>
              <span class="icon">
                <i class="fas fa-car"></i>
              </span>{{des}}
            </li>
            <br>
          </ul>
          <br>
          <br>
          <a class="button is-fullwidth">Agendar cita</a>
        </div>
      </div>
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
      active: 0,
      item: {
        _id: "",
        name: "",
        description: "",
        price: "",
        photos: []
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
      this.active = this.active < this.item.photos.length - 1 ? this.active + 1 : 0;
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


