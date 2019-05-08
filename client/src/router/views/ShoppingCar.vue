<template>
    <div>
        <bar></bar>
        <foot></foot>
    </div>
</template>
<script>
import NavBar from "./../../components/NavBar";
import Foot from "./../../components/Footer";

export default {
  name: "Car",
  components: {
    bar: NavBar,
    foot: Foot
  }
};
</script>
<style lang="scss">
</style>
