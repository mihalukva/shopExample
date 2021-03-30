<template>
  <header class="header">
    <router-link class="header__logo" to="/">Shop</router-link>
    <router-link class="header__basket basket" to="/basket">
      <svg class="basket__img">
        <use href="icons/icons.svg#basket"></use>
      </svg>
      <span class="basket__goodsCount">{{ this.$store.getters["mBasket/count"] }}</span>
    </router-link>
    <AppHeaderMenu class="header__menu" />
  </header>
</template>

<script>
import AppHeaderMenu from "./AppHeaderMenu.vue";
export default {
  name: "AppHeader",
  components: { AppHeaderMenu },
};
</script>

<style lang="scss">
.header {
  width: 100%;
  height: 100%;
  background-color: #efefef;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  &__logo {
    padding: 0.5rem;
    display: inline-block;
    font-family: "Lobster";
    font-size: 2rem;
    text-decoration-line: none;
    color: #666666;
  }
  &__menu {
    flex: 1 0 100%;
  }
}

.basket {
  padding: 0.5rem;
  display: inline-flex;
  align-items: flex-start;
  height: 2rem;
  cursor: pointer;
  &__img {
    height: 2rem;
    width: 2rem;
    fill: #666666;
  }
  &__goodsCount {
    width: 1rem;
    height: 1rem;
    font-size: 0.7rem;
    color: #ffffff;
    background-color: #666666;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
