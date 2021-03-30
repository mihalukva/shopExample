<template>
  <div class="cardBig" v-if="!isEmpty">
    <div class="cardBig__slider slider">
      <div class="slider__bigImage">
        <img v-bind:src="this.currentImage" alt="" />
      </div>
      <div class="slider__miniImages miniImages">
        <div
          class="miniImages__item"
          v-for="img in good.image.full"
          v-bind:key="img"
          v-on:click="changeMainImg(img)"
        >
          <img v-bind:src="img" alt="" />
          <div class="miniImages__selectImgBlock"></div>
        </div>
      </div>
    </div>
    <div class="cardBig__body bigCardBody">
      <div class="bigCardBody__title">{{ good.title }}</div>
      <div class="bigCardBody__code">Арт. {{ good.code }}</div>

      <div class="bigCardBody__price">
        <span class="bigCardBody__oldprice">{{ good.price.old_price }}</span>
        <span class="bigCardBody__currentprice">{{ good.price.current_price }}</span>
      </div>
      <button class="bigCardBody__basketBtn" v-on:click="putInBasket(good.id)">
        {{ good.isInBasket ? "Удалить из корзины" : "В корзину" }}
      </button>
      <button class="bigCardBody__favoriteBtn" v-on:click="putInFavorite(good.id)">
        {{ good.isInFavorite ? "Удалить из избранного" : "В избранное" }}
      </button>
    </div>
    <div class="cardBig__description">
      <h2>Описание</h2>
      {{ good.description }}
    </div>
    <div class="cardBig__closeBtn" v-on:click="closeBtnClick">
      <svg>
        <use href="icons/icons.svg#x"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    this.$store.dispatch("setCurrentGoodId", this.$route.params.id);
    return {
      good: this.$store.state.currentGood,
      currentImage: "",
    };
  },
  watch:{
    good:function(newVal,oldVal){
      this.currentImage =  this.isEmpty  ? "" : newVal.image.full[0];
    }
  },
  computed: {
    isEmpty: function() {
      return Object.keys(this.good).length === 0;
    }
  },
   mounted: function() {
    this.currentImage = this.isEmpty ? "" : this.good.image.full[0];
  }, 
  methods: {
    putInBasket: function(id) {
      this.$store.dispatch("putInBasket", id);
    },
    putInFavorite: function(id) {
      this.$store.dispatch("putInFavorite", id);
    },
    closeBtnClick: function() {
      this.$router.back();
    },
    changeMainImg: function(img) {
      this.currentImage = img;
    },
  },
  props: {
    id: {
      type: [String, Number],
      default: 0,
    },
  },
};
</script>

<style lang="scss">
.cardBig {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &__slider {
    flex: 0 0 90%;
    padding: 10px;
  }
  &__body {
    flex: 0 0 95%;
    padding: 10px;
  }
  &__description {
    flex: 0 0 95%;
    padding: 10px;
    text-align: justify;
  }
  &__closeBtn {
    position: absolute;
    top: 0%;
    left: 100%;
    transform: translate(-100%, 0%);
    cursor: pointer;
    width: 5rem;
    height: 5rem;
    background-color: #eeeeee;
    border-radius: 0.5rem;
    svg {
      width: 5rem;
      height: 5rem;
      fill: #666666;
      &:hover {
        fill: #333333;
      }
    }
  }
}
.slider {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &__bigImag {
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: auto;
  }
}
.miniImages {
  display: flex;
  justify-content: center;
  &__item {
    flex: 0 1 100px;
    border: 1px solid #eeeeee;
    margin: 0.5rem;
    position: relative;
  }
  &__selectImgBlock {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.04);
    opacity: 0;
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  }
}

.bigCardBody {
  display: flex;
  flex-direction: column;

  &__title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  &__code {
    font-size: 0.7rem;
    color: #888888;
    margin-bottom: 2rem;
  }
  &__price {
    margin-bottom: 1rem;
  }
  &__oldprice {
    font-size: 1.5rem;
    &:after {
      content: "₽";
    }
    text-decoration-line: line-through;
    margin-right: 1rem;
    color: #666666;
  }
  &__currentprice {
    font-size: 1.5rem;
    &:after {
      content: "₽";
    }
  }
  &__basketBtn {
    background-color: #ff8a07;
    border: none;
    height: 2rem;
    border-radius: 0.3rem;
    margin-bottom: 1rem;
    min-width: fit-content;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  }
  &__favoriteBtn {
    background-color: #a9a9a9;
    border: none;
    height: 2rem;
    border-radius: 0.3rem;
    margin-bottom: 2rem;
    min-width: fit-content;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  }

  &__descriptiontitle {
    align-self: center;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
  &__description {
    text-indent: 2rem;
    text-align: justify;
  }
}

@media (min-width: 767px) {
  .cardBig {
    justify-content: flex-start;
    &__slider {
      flex: 0 0 45%;
      padding: 10px;
    }
    &__body {
      flex: 0 0 45%;
      padding: 10px;
    }
    &__description {
      flex: 0 0 90%;
    }
    &__closeBtn {
      width: 3rem;
      height: 3rem;
      svg {
        width: 3rem;
        height: 3rem;
      }
    }
  }
}
@media (min-width: 1023px) {
}
</style>
