<template>
  <div class="card">
    <div class="card__img">
      <img v-bind:src="image.preview" alt="" />
    </div>
    <div class="card__code">{{ code }}</div>
    <div class="card__title">{{ title }}</div>
    <div class="card__body">
      <div v-bind:class="[price.old_price != null ? '' : 'card__oldPrice_hide', 'card__oldPrice']">
        {{ Math.round(price.old_price) }}
      </div>
      <div class="card__price">{{ Math.round(price.current_price) }}</div>

      <div class="card__basketBtn" v-on:click="$emit('putInBasket', id)">
        <svg class="icon-basic">
          <use
            v-bind:href="
              isInBasket === true ? 'icons/icons.svg#cart-fill' : 'icons/icons.svg#cart'
            "
          ></use>
        </svg>
      </div>
      <div class="card__likeBtn" v-on:click="$emit('putInFavorite', id)">
        <svg class="icon-basic">
          <use
            v-bind:href="
              isInFavorite === true ? 'icons/icons.svg#heart-fill' : 'icons/icons.svg#heart'
            "
          ></use>
        </svg>
      </div>
    </div>
    <div v-bind:class="[price.old_price != null ? '' : 'card__discount_false', 'card__discount']">
      Скидка
    </div>
    <div class="card__hover"></div>
    <router-link v-bind:to="'/card/' + id" class="card__openBlock">
      <svg class="icon-basic">
        <use href="icons/icons.svg#arrows-fullscreen"></use>
      </svg>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "BaseCard",
  props: {
    id: {
      type: [String, Number],
      default: 0,
    },
    image: {
      type: Object,
      default: {},
    },
    code: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    price: {
      type: Object,
      default: {},
    },
    description: {
      type: String,
      default: "",
    },
    isInBasket: Boolean,
    isInFavorite: Boolean,
  },
};
</script>

<style lang="scss">
.card {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  border: 1px solid #eeeeee;
  padding: 0.5rem;
  max-width: 550px;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  &__hover {
    z-index: 1;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.02);
    opacity: 0;
  }
  &:hover {
    .card__hover {
      opacity: 1;
    }
  }
  &__openBlock {
    z-index: 2;
    position: absolute;
    top: 0%;
    left: 100%;
    transform: translate(-100%, 0%);
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eeeeee;
    border-radius: 0.5rem;
  }
}

.card__img {
  width: 100%;
  height: auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  img {
    width: 100%;
    height: auto;
  }
  width: 200px;
  height: 200px;
}
.card__code {
  margin-top: 1rem;
  color: #888888;
  font-size: 0.6rem;
  height: 1rem;
}
.card__title {
  font-size: 0.8rem;
  margin: 10px 0px;
  flex: 1 1 auto;
}
.card__body {
  display: flex;
  align-items: center;
}
.card__oldPrice {
  display: block;
  margin-right: 10px;
  color: #888888;
  text-decoration: line-through;
  font-weight: 300;
  &:after {
    content: "₽";
  }
}
.card__oldPrice_hide {
  display: none;
}
.card__price {
  flex: 1 1 auto;
  &:after {
    content: "₽";
  }
}
.card__discount {
  display: block;
  color: white;
  background-color: #eb5757;
  padding: 5px 20px;
  position: absolute;
  top: 10px;
  left: 0px;
}
.card__discount_false {
  display: none;
}

.card__basketBtn {
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 2;
}
.card__likeBtn {
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
  z-index: 2;
}

.icon-basic {
  width: 1.5rem;
  height: 1.5rem;
  fill: #666666;
  &:hover {
    fill: #333333;
  }
}
</style>
