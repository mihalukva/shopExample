<template>
  <div class="basketItem">
    <div class="basketItem__img">
      <img v-bind:src="image.preview" alt="" />
    </div>
    <div class="basketItem__code">Код товара: {{ code }}</div>
    <div class="basketItem__title">{{ title }}</div>
    <div class="basketItem__price">{{ price.current_price }}</div>
    <div class="basketItem__trashIcon" v-on:click="$emit('deleteItem', id)">
      <svg>
        <use href="icons/icons.svg#trash"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
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
    old_price: {
      type: Number,
      default: 0,
    },
    current_price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss">
.basketItem {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #eeeeee;
  div {
    padding: 0.5rem;
  }
  &__img {
    max-width: 70px;
    img {
      width: 100%;
      height: auto;
    }
  }
  &__code {
    font-size: 1rem;
    color: #888888;
    flex: 0 1 70px;
  }
  &__title {
    order: -1;
    flex: 0 0 100%;
  }
  &__price {
    font-size: 1.5rem;
    &:after {
      content: "₽";
    }
    flex: 0 0 50px;
  }
  &__trashIcon {
    flex: 0 0 2rem;
    svg {
      fill: #888888;
      width: 2rem;
      height: 2rem;
    }
    &:hover {
      svg {
        fill: #444444;
      }
    }
    cursor: pointer;
  }
}

@media (min-width: 500px) {
  .basketItem {
    flex-wrap: nowrap;
    &__title {
      order: 0;
      flex: 0 1 auto;
    }
    &__code {
      font-size: 0.7rem;
      color: #888888;
      flex: 0 1 70px;
    }
    &__price {
      font-size: 1rem;
    }
  }
}
</style>
