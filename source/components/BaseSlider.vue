<template>
  <div class="goodsSlider" v-bind:id="this.sliderID" v-if="currentCount > 0">
    <div class="goodsSlider__arrow" v-bind:id="this.sliderID + '_left'" v-on:click="leftClick">
      <svg>
        <use href="icons/icons.svg#caret-left"></use>
      </svg>
    </div>
    <div
      class="goodsSlider__listWrapper "
      v-bind:id="this.sliderID + '_listWrapper'"
      v-bind:style="{ height: autoPx(style.listWrHeight), width: autoPx(style.listWrWidth) }"
    >
      <div
        class="goodsSlider__list"
        v-bind:id="this.sliderID + '_list'"
        v-bind:style="{
          left: autoPx(style.listLeft),
          transition: style.listTransition,
        }"
      >
        <BaseCard
          class="goodsSlider__listItem"
          v-for="good in this.goodsList"
          v-bind:key="good.id"
          v-bind="good"
          v-on:openCard="$emit('openCard', $event)"
          v-on:putInBasket="$emit('putInBasket', $event)"
          v-on:putInFavorite="$emit('putInFavorite', $event)"
        />
      </div>
    </div>

    <div class="goodsSlider__arrow" v-on:click="rightClick" v-bind:id="this.sliderID + '_right'">
      <svg>
        <use href="icons/icons.svg#caret-right"></use>
      </svg>
    </div>
  </div>
  <div v-else class="goodsSlider_disabled">Вы пока не добавили товары</div>
</template>

<script>
import BaseCard from "./BaseCard.vue";
export default {
  name: "BaseSlider",
  data: function() {
    return {
      style: {
        display: "flex",
        listWrHeight: "100\u0025",
        listWrWidth: "100\u0025",
        listLeft: 0,
        listTransition: "left 0.7s",
      },
      listWidth: 0,
      itemWidth: 0,
      beforeCount: 0,
      currentCount: this.goodsList.length,
      visibleItemsCount: 0,
      visibleItemsWidth: 0,
      leftEdge: 0,
      rightEdge: 0,
    };
  },
  watch: {
    goodsList: function() {
      this.beforeCount = this.currentCount;
      this.currentCount = this.goodsList.length;
      if (this.howChangeCount() === "decreased") {
        if (this.rightEdge === this.listWidth) {
          this.style.listTransition = "";
          this.movePosition(-this.itemWidth);
          setTimeout(() => {
            this.style.listTransition = "left 0.7s";
          }, 200);
        }
      }
    },
  },
  computed: {
    length: function() {
      return this.goodsList.length;
    },
  },
  components: { BaseCard },
  mounted: function() {
    if (this.goodsList.length === 0) {
      this.style.display = "none";
    } else {
      window.addEventListener("resize", () => {
        this.style.listWrWidth = "100\u0025";
      });
      this.style.display = "flex";
      this.setSliderParam();
      this.leftEdge = 0;
      this.rightEdge = this.style.listWrWidth;
    }
  },
  beforeUpdate: function() {},
  updated: function() {
    this.$nextTick(function() {
      setTimeout(() => {
        this.setSliderParam();
      }, 200);
    });
  },
  methods: {
    autoPx: function(value) {
      if (typeof value === "number") {
        return value + "px";
      } else if (typeof value === "string") {
        if (value === "auto" || value === "100\u0025") {
          return value;
        } else {
          console.log("autoPx: ", value, " unnoun string type");
        }
      } else {
        console.log("autoPx: ", value, " another type");
      }
    },
    howChangeCount: function() {
      if (this.currentCount > this.beforeCount) {
        return "increased";
      } else if (this.currentCount == this.beforeCount) {
        return "equal";
      } else {
        return "decreased";
      }
    },
    setSliderParam: function() {
      if (this.goodsList.length > 0) {
        const rootElement = document.getElementById(this.sliderID);
        const leftArrow = document.getElementById(this.sliderID + "_left");
        const rightArrow = document.getElementById(this.sliderID + "_right");
        const listElement = document.getElementById(this.sliderID + "_list");
        const listWrapperElement = document.getElementById(this.sliderID + "_listWrapper");
        const firstElementChild = listElement.firstElementChild;

        const rootWidth = +window.getComputedStyle(rootElement).width.replace("px", "");
        const leftArrowWidth = +window.getComputedStyle(leftArrow).width.replace("px", "");
        const rightArrowWidth = +window.getComputedStyle(rightArrow).width.replace("px", "");
        const maxListWrapperWidth = rootWidth - leftArrowWidth - rightArrowWidth;

        const listWidth = +window.getComputedStyle(listElement).width.replace("px", "");
        const listHeight = +window.getComputedStyle(listElement).height.replace("px", "");
        const itemWidth = +window.getComputedStyle(firstElementChild).width.replace("px", "");
        const itemHeight = +window.getComputedStyle(firstElementChild).height.replace("px", "");
        const itemMargin = +window
          .getComputedStyle(firstElementChild)
          .marginRight.replace("px", "");

        this.listWidth = listWidth;
        this.itemWidth = itemWidth + 2 * itemMargin;

        if (this.howChangeCount() === "increased") {
          if (listWidth > maxListWrapperWidth) {
            this.style.listWrWidth = maxListWrapperWidth;
          } else {
            this.style.listWrWidth = listWidth;
          }
        }
        if (this.howChangeCount() === "equal") {
        }
        if (this.howChangeCount() === "decreased") {
          if (listWidth > maxListWrapperWidth) {
            this.style.listWrWidth = maxListWrapperWidth;
          } else {
            this.style.listWrWidth = listWidth;
          }
        }
        this.style.listWrHeight = listHeight;

        this.visibleItemsCount = Math.trunc(this.style.listWrWidth / this.itemWidth);
        this.visibleItemsWidth = this.visibleItemsCount * this.itemWidth;
      }
    },
    movePosition: function(delta) {
      this.leftEdge += delta;
      this.rightEdge += delta;
      if (this.leftEdge < 0) {
        this.leftEdge = 0;
        this.rightEdge = this.style.listWrWidth;
      }
      if (this.rightEdge > this.listWidth) {
        this.leftEdge = this.listWidth - this.style.listWrWidth;
        this.rightEdge = this.listWidth;
      }
      this.style.listLeft = -Math.trunc(this.leftEdge);
    },
    leftClick: function() {
      this.movePosition(-this.visibleItemsWidth);
    },
    rightClick: function() {
      this.movePosition(this.visibleItemsWidth);
    },
  },
  props: {
    goodsList: Array,
    count: Number,
    sliderID: String,
  },
};
</script>

<style lang="scss">
.goodsSlider {
  &_disabled {
    font-size: 2rem;
    padding: 0.5rem;
    color: #999999;
    text-align: center;
  }
  display: flex;
  padding: 1rem 0rem;
  &__arrow {
    display: flex;
    align-items: center;
    background-color: #eeeeee;
    cursor: pointer;
    svg {
      width: 2rem;
      fill: #888888;
    }
    &:hover {
      svg {
        fill: #333333;
      }
    }
  }
  &__listWrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  &__list {
    position: absolute;
    left: 0px;
    top: 0px;
    display: flex;
    align-items: stretch;
  }
  &__listItem {
    margin: 0rem 1rem;
  }
}
</style>
