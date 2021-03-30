<template>
  <router-link v-bind:to="link" class="menu__item">{{ title }}</router-link>
</template>

<script>
export default {
  name: "BaseMenuItem",
  props: {
    title: String,
    link: String,
  },
};
</script>

<style lang="scss">
.menu__item {
  color: #c8d1e2;
  padding: 0.5rem 0.5rem;
  text-decoration-line: none;
  &:hover {
    cursor: pointer;
    background-color: #69728a;
    color: #ffffff;
  }
}
@media (min-width: 424px) {
  .menu__item {
    padding: 0.5rem 1rem;
  }
}
</style>
