<template>
  <div class="main">
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: "AppMain",
  mounted: function() {
    this.$store.dispatch("firstStart");
  },
};
</script>

<style lang="scss">
.main {
  width: 100%;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
}
 @media (min-width: 1150px) {
  .main {
    padding: 1rem 0rem;
  }
} 
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
