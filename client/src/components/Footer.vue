<template>
  <footer class="footer">
    <span class="icon is-large">
      <i class="fab fa-facebook-square"></i>
      <i class="fab fa-instagram"></i>
      <i class="fab fa-twitter"></i>
      <i class="fab fa-youtube"></i>
    </span>
    <p class="title"><strong>Mind Money Business</strong></p>
    <p class="sub-title">© 2019 All rights reserverd</p>
  </footer>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "@/design/index.scss";
$footer-background-color: $panels-color;
@import "~bulma/sass/layout/footer";
.footer {
  text-align: center;
}
i {
  color: $yellow;
  margin: 15px;
}
p {
  color: $yellow;
}
.sub-title {
  color: $gray;
}
</style>
