<template>
  <div class="goods">
    <BaseCard
      class="goods__item"
      v-for="good in this.goodsList"
      v-bind:key="good.id"
      v-bind="good"
      v-on:openCard="$emit('openCard', $event)"
      v-on:putInBasket="$emit('putInBasket', $event)"
      v-on:putInFavorite="$emit('putInFavorite', $event)"
    />
  </div>
</template>

<script>
import BaseCard from "./BaseCard.vue";
export default {
  name: "PageCatalogGoods",
  components: { BaseCard },
  props: {
    goodsList: Array,
  },
};
</script>

<style lang="scss">
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
}
.goods__item {
  margin: 0.3rem 0rem;
  flex-basis: 100%;
}
@media (min-width: 550px) {
  .goods {
    justify-content: space-between;
  }
  .goods__item {
    flex-basis: 48%;
  }
}
@media (min-width: 767px) {
  .goods__item {
    flex-basis: 32%;
  }
}
@media (min-width: 1023px) {
  .goods__item {
    flex-basis: 24%;
  }
}
</style>
