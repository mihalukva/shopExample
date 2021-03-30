<template>
  <menu class="menu">
    <BaseMenuItem name="PageMain" title="Главная" link="/" />
    <BaseMenuItem name="PageCatalog" title="Котолог товаров" link="/catalog" />
    <BaseMenuItem name="PageAbout" title="О компании" link="/about" />
  </menu>
</template>
<script>
import BaseMenuItem from "./BaseMenuItem.vue";
export default {
  name: "AppHeaderMenu",
  components: { BaseMenuItem },
};
</script>

<style lang="scss">
.menu {
  font-family: "Lobster";
  display: flex;
  background-color: #4e5567;
  padding: 0px;
  margin: 0px;
}
</style>
