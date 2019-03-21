<template>
  <div>
    <bar></bar>
      <p style="margin: 0 auto; text-align: center;" class="title is-1">Coches</p>
      <div class="tile is-ancestor">
        <div v-for="index in elements" :key="index" class="tile is-parent">
          <article class="tile is-child box">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img
                  src="./../../assets/maxresdefault.jpeg"
                  alt="Placeholder image"
                >
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                </div>
                <div class="media-content">
                  <p class="title is-4">BMW M2</p>
                </div>
              </div>

              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
              </div>
            </div>
          </div>
          </article>
        </div>
      </div>
      <div class="tile is-ancestor">
        <div v-for="index in 2" :key="index" class="tile is-parent">
          <article class="tile is-child box">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img
                  src="./../../assets/maxresdefault.jpeg"
                  alt="Placeholder image"
                >
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                </div>
                <div class="media-content">
                  <p class="title is-4">BMW M2</p>
                </div>
              </div>

              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
              </div>
            </div>
          </div>
          </article>
        </div>
      </div>
      <div class="tile is-ancestor">
        <div v-for="index in 1" :key="index" class="tile is-parent">
          <article class="tile is-child box">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img
                  src="./../../assets/maxresdefault.jpeg"
                  alt="Placeholder image"
                >
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                </div>
                <div class="media-content">
                  <p class="title is-4">BMW M2</p>
                </div>
              </div>

              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
              </div>
            </div>
          </div>
          </article>
        </div>
      </div>
    <foot></foot>
  </div>
</template>
<script>
import NavBar from "./../../components/NavBar";
import Foot from "./../../components/Footer";

export default {
  name: "Products",
  components: {
    bar: NavBar,
    foot: Foot
  },
  data() {
    return {
      elements: [
        {
          tittle: "M2",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus nec iaculis mauris.$470,000",
          flip: false
        },
        {
          tittle: "M2",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus nec iaculis mauris.$470,000",
          flip: false
        },
        {
          tittle: "M2",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus nec iaculis mauris.$470,000",
          flip: false
        }
      ]
    };
  },
  methods: {}
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
.is-child {
 cursor: pointer; 
}
</style>
