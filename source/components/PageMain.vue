<template>
  <div class="mainPage">
    <h2 style="align-self:center">Title</h2>
    <div>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro rerum consequuntur quaerat
      quibusdam, voluptas dolores unde officia architecto aliquam velit aliquid possimus maiores
      incidunt veritatis deserunt eos facilis voluptate voluptatem fugiat a magnam hic eius dolore.
      Incidunt quos debitis officiis quaerat corporis temporibus natus vitae ut! Est recusandae
      voluptates perspiciatis earum sed ipsa obcaecati natus excepturi eaque pariatur nam, facere a
      sunt minima nemo beatae ipsum autem maiores dicta incidunt vel voluptatibus neque tenetur
      voluptatum. Autem suscipit voluptatem ut ad animi. Voluptate odio repellat ratione vel error
      modi vitae eligendi quae alias, dolorem molestiae voluptates velit a eos magnam unde.
    </div>
    <br />
    <h3 style="align-self:center">Товары в корзине</h3>
    <BaseSlider
      v-bind:goodsList="basketList"
      v-bind:sliderID="'slider1'"
      v-on:putInBasket="putInBasket"
      v-on:putInFavorite="putInFavorite"
    />
    <br />
    <h3 style="align-self:center">Товары в избранном</h3>
    <BaseSlider
      v-bind:goodsList="favoriteList"
      v-bind:sliderID="'slider2'"
      v-on:putInBasket="putInBasket"
      v-on:putInFavorite="putInFavorite"
    />
  </div>
</template>

<script>
import BaseSlider from "./BaseSlider.vue";
export default {
  name: "PageMain",
  data: function() {
    return {
      basketList: this.$store.state.mBasketGoods.list,
      favoriteList: this.$store.state.mFavoriteGoods.list,
    };
  },
  components: { BaseSlider },
  methods: {
    putInBasket: function(id) {
      this.$store.dispatch("putInBasket", id);
    },
    putInFavorite: function(id) {
      this.$store.dispatch("putInFavorite", id);
    },
  },
};
</script>

<style lang="scss">
.mainPage {
  display: flex;
  flex-direction: column;
}
</style>
