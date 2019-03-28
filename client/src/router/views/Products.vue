<template>
  <div>
    <bar></bar>
    <p style="margin: 0 auto; text-align: center;" class="title is-1">{{tittle}}</p>
    <div v-for="(item, index) in items" :key="index" class="tile is-ancestor">
      <div v-for="(i, o) in item" :key="o" class="tile is-parent">
        <article class="tile is-child box">
          <router-link :to="`/item/${i._id}`">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="require(`./../../assets${i.mainPhoto}.jpeg`)" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left"></div>
                <div class="media-content">
                  <p class="title is-4">{{i.name}}</p>
                </div>
              </div>
              <div class="content">
                {{i.shortDescription}}
              </div>
            </div>
          </div>
          </router-link>
        </article>
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
  name: "Products",
  components: {
    bar: NavBar,
    foot: Foot
  },
  data() {
    return {
      tittle: '',
      tittles: {
        car: 'Autos',
        smartphone: 'Smarthphones'
      },
      items: []
    };
  },
  methods: {},
  created() {
    this.tittle = this.tittles[this.$route.params.id];
    axios.get(API.getItems + this.$route.params.id).then(res => {
      if (res.data.length > 3) {
        for (let i = 0; i < res.data.length; i += 3) {
          this.items.push(res.data.slice(i, i + 3));
        }
      } else {
        this.items = res.data;
      }
    });
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
@import "~bulma/sass/grid/_all";
@import "~bulma/sass/elements/_all";
@import "~bulma/sass/layout/_all";
@import "~bulma/sass/components/_all";
</style>
