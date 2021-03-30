<template>
  <div class="basketPage">
    <div class="basketPage__backLink" v-on:click="closeBasket">
      Вернуться к покупкам
    </div>
    <div class="basketPage__title">
      Корзина
    </div>
    <div class="basketPage__goodsList  goodsList">
      <h3 class="goodsList__title">Список покупок</h3>
      <BaseBasketItem
        class="goodsList__item"
        v-for="good in goodsList"
        v-bind:key="good.id"
        v-bind="good"
        v-on:deleteItem="deleteItem"
      />
      <div class="goodsList__total totalItem">
        <h2 class="totalItem__title">Итого:</h2>
        <div class="totalItem__price">
          {{ this.totalPrice }}
        </div>
      </div>
    </div>
    <BaseOrderForm class="basketPage__orderForm" v-on:submitBtnClick="submitBtnClick" />
    <BaseFullScreanMessage v-show="orderAccepted" v-on:closeMsg="closeMsg">
      Ваш заказ принят.
    </BaseFullScreanMessage>
  </div>
</template>

<script>
import BaseBasketItem from "./BaseBasketItem.vue";
import BaseFullScreanMessage from "./BaseFullScreanMessage.vue";
import BaseOrderForm from "./BaseOrderForm.vue";

export default {
  name: "PageBasket",
  components: { BaseBasketItem, BaseFullScreanMessage, BaseOrderForm },
  data: function() {
    return {
      orderAccepted: false,
      goodsList: this.$store.state.mBasketGoods.list,
    };
  },
  computed: {
    totalPrice: function() {
      return this.goodsList.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue.price.current_price;
      }, 0);
    },
  },
  methods: {
    closeMsg: function() {
      this.orderAccepted = true;
      this.$router.back();
    },
    sendData: function(sendingObject) {
      fetch("./upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendingObject),
      }).then((response) => {
        if (response.status === 200) {
          this.orderAccepted = true;
          this.$store.dispatch("clearBasket");
        }
      });
    },
    submitBtnClick: function(submitingData) {
      submitingData.goods = this.goodsList.map((arrEl) => {
        return arrEl.code;
      });
      this.sendData(submitingData);
    },
    deleteItem: function(id) {
      this.$store.dispatch("putInBasket", id);
    },
    closeBasket: function() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
.basketPage {
  &__backLink {
    font-size: 1rem;
    color: #888888;
    cursor: pointer;
    margin-top: 1rem;
  }
  &__title {
    font-size: 2rem;
    margin-top: 1rem;
  }
  &__orderForm {
    margin-top: 1rem;
  }
}

.goodsList {
  margin-top: 1rem;
  &__item {
    margin-bottom: 1rem;
  }
  &__total {
  }
}
.totalItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__title {
  }
  &__price {
    font-size: 2rem;
    font-variant-numeric: slashed-zero;
    &:after {
      content: "₽";
    }
  }
}
</style>
