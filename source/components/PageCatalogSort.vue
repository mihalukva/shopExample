<template>
  <div class="sortBlock">
    <div class="sortBlock__goodsCount">
      Найдено товаров:
      <span>
        {{ this.goodsCount }}
      </span>
    </div>
    <div class="sortBlock__property">
      Сортировка:{{ "\xA0" }}
      <span
        class="sortBlock__item"
        v-bind:class="{
          sortBlock__item_increase: this.isSortByName === true,
          sortBlock__item_decrease: this.isSortByName === false,
        }"
        v-on:click="$emit('sortByName')"
      >
        <span style="text-decoration-line: underline">Наименование</span>
      </span>
      {{ "\xA0 \u22C5 \xA0" }}
      <span
        class="sortBlock__item"
        v-bind:class="{
          sortBlock__item_increase: this.isSortByPrice === true,
          sortBlock__item_decrease: this.isSortByPrice === false,
        }"
        v-on:click="$emit('sortByPrice')"
      >
        <span style="text-decoration-line: underline"> Цена </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageCatalogSort",
  props: {
    isSortByName: Boolean,
    isSortByPrice: Boolean,
    goodsCount: Number,
  },
};
</script>

<style lang="scss">
.sortBlock {
  font-size: 0.7rem;
  border: 1px solid #eeeeee;
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
  margin-bottom: 1rem;
  &__item {
    cursor: pointer;
    &_increase {
      &::before {
        content: "\2191";
      }
    }
    &_decrease {
      &::before {
        content: "\2193";
      }
    }
  }
}
@media (min-width: 450px) {
  .sortBlock {
    font-size: 1rem;
  }
}
.sortBlock__goodsCount {
  flex: 1 1 auto;
}
.sortBlock__property {
  display: flex;
}
.sortBlock__price_increase {
}
</style>
