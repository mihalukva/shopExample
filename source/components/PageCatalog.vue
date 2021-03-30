<template>
  <div class="catalog">
    <PageCatalogSort
      v-bind:isSortByName="isSortByName"
      v-bind:isSortByPrice="isSortByPrice"
      v-bind:goodsCount="goodsCount"
      v-on:sortByName="sortByName"
      v-on:sortByPrice="sortByPrice"
    />
    <PageCatalogGoods
      v-bind:goodsList="this.goodsList"
      v-on:putInBasket="putInBasket"
      v-on:putInFavorite="putInFavorite"
    />
  </div>
</template>

<script>
import PageCatalogSort from "./PageCatalogSort.vue";
import PageCatalogGoods from "./PageCatalogGoods.vue";

export default {
  name: "PageCatalog",
  components: { PageCatalogGoods, PageCatalogSort },
  data: function() {
    return {
      goodsList: this.$store.getters["mGoods/getAll"],
      isSortByName: null,
      isSortByPrice: null,
      goodsCount: this.$store.getters["mGoods/count"],
    };
  },
  methods: {
    putInBasket: function(id) {
      this.$store.dispatch("putInBasket", id);
    },
    putInFavorite: function(id) {
      this.$store.dispatch("putInFavorite", id);
    },
    sortByName: function() {
      this.isSortByName = this.isSortByName === null ? true : !this.isSortByName;
      if (this.isSortByName === true) {
        this.goodsList = this.$store.getters["mGoods/sortByName"];
      } else {
        this.goodsList = this.$store.getters["mGoods/sortByNameRevers"];
      }
      this.isSortByPrice = null;
    },
    sortByPrice: function() {
      this.isSortByPrice = this.isSortByPrice === null ? true : !this.isSortByPrice;
      if (this.isSortByPrice === true) {
        this.goodsList = this.$store.getters["mGoods/sortByPriceIncrease"];
      } else {
        this.goodsList = this.$store.getters["mGoods/sortByPriceDecrease"];
      }
      this.isSortByName = null;
    },
  },
};
</script>

<style lang="scss">
.catalog {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}
</style>
