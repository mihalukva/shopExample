<template>
  <div class="bodywrapper">
    <AppHeader />
    <AppMain />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: { AppHeader, AppMain, AppFooter },
};
</script>

<style lang="scss">
@font-face {
  font-family: "Lobster";
  src: url("fonts/Lobster-Regular.ttf") format("truetype");
}
html {
  font-size: 12px;
}
@media (min-width: 767px) {
  html {
    font-size: 14px;
  }
}
@media (min-width: 1023px) {
  html {
    font-size: 16px;
  }
}
body {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  justify-content: center;
  margin: 0px;
}
.bodywrapper {
  flex: 0 0 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  max-width: 1150px;
  min-width: 300px;
  min-height: 100vh;
}
</style>
