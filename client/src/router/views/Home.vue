<template>
  <div class="hello">
    <bar></bar>
    <div class="container">
      <div class="trax">
        <div class="tile is-ancestor">
          <div class="tile is-vertical is-8">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <img src="./../../assets/maxresdefault.jpeg" alt="" id="vieja"/>
              </article>
            </div>
            <div class="tile">
              <div class="tile is-parent is-vertical">
                <article class="tile is-child box">
                  <p class="title">Vision</p>
                  <p>Lograr que Mind Money Business sea símbolo de un estilo de vida de éxito en el ámbito emprendedor y empresarial.</p>
                  <!-- Put any content you want -->
                </article>
                <article class="tile is-child box">
                  <p class="title">Mision</p>
                  <p>Buscamos inspirar a nuestros clientes a alcanzar sus sueños ofreciendoles el estilo de vida que merecen al mejor precio.</p>
                  <!-- Put any content you want -->
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <p class="title">TOP Productos</p>
                  <!-- Put any content you want -->
                </article>
              </div>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">¿Quienes somos?</p>
              <p>Somos un grupo de empresarios, comerciantes e intermediarios en negociaciones, productos, y servicios. Trabajando siempre de la mano de gente conocida por nosotros, gente calificada, honesta, trabajadora, y distinguidos comerciantes y empresarios.</p>
              <br>
              <p>Hacemos que la gente se identifique con nuestra filosofía de lujo, empresarial, emprendimiento, y éxito. Para lograr de esta manera que nuestro logotipo sea un EMBLEMA para la gente de Aguascalientes y todo México.</p>
              <br>
              <p>La mente es el con qué, el dinero es el cómo, y los negocios son el para qué.</p>
              <br>
              <p>Mind Money Business, emblema de éxito hidrocálido.</p>
              <!-- Put any content you want -->
            </article>
          </div>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import NavBar from "./../../components/NavBar";
import Foot from "./../../components/Footer";

export default {
  name: "Home",
  components: {
    bar: NavBar,
    foot: Foot
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/design/index.scss";
$title-color: $yellow;
$box-background-color: $black;
$box-color: $white;
@import "~bulma/sass/grid/_all";
@import "~bulma/sass/elements/_all";
@import "~bulma/sass/layout/_all";

#uno {
  color: $yellow;
}
#trax {
  color: $green;
}
#normal {
  color: $white;
}
#otro {
  color: $gray;
}
.trax {
  padding: 1.25rem 2.5rem 1.25rem 1.5rem;
}
</style>
