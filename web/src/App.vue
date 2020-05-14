<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { rem, throttle } from "./utils";

export default {
  name: "App",
  computed: {
    adaptRem() {
      return throttle(rem, 50);
    },
  },
  mounted() {
    rem();
    window.addEventListener("resize", this.adaptRem);
  },
  destroyed() {
    window.removeEventListener("resize", this.adaptRem);
  },
};
</script>
