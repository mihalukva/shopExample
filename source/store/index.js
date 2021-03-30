import Vue from "vue";
import Vuex, { createLogger } from "vuex";
import MBasket from "./modules/localStorage.js";
import MFavorite from "./modules/localStorage.js";
import goods from "./modules/goods.js";
import MLocalStorageGoods from "./modules/localStorageGoods.js";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mBasket: MBasket,
    mFavorite: MFavorite,
    mGoods: goods,
    mBasketGoods: MLocalStorageGoods,
    mFavoriteGoods: MLocalStorageGoods,
  },
  state: {
    currentGoodId: "",
    currentGood: {},
  },
  mutations: {
    setCurrentGoodId(state, id) {
      state.currentGoodId = id;
    },
    setCurrentGood(state, good) {
       for (const key in state.currentGood) {
        if (Object.hasOwnProperty.call(state.currentGood, key)) {
          Vue.delete(state.currentGood,key);
        }
      }
      for (const key in good) {
        if (Object.hasOwnProperty.call(good, key)) {
          const element = good[key];
          Vue.set(state.currentGood,key,element)
        }
      }
    },
  },
  actions: {
    setCurrentGoodId(context, id) {
      context.commit("setCurrentGoodId", id);
      context.dispatch("setCurrentGood");
    },
    setCurrentGood(context) {
      context.commit(
        "setCurrentGood",
        context.getters["mGoods/getItem"](context.state.currentGoodId)
      );
    },
    clearBasket(context, id) {
      let clearList = context.getters["mBasket/list"];
      clearList.forEach((element) => {
        context.dispatch("putInBasket", element);
      });
    },
    putInBasket(context, id) {
      context.commit("mGoods/toggleFlag", { name: "isInBasket", id: id });
      context.dispatch("mBasket/toggle", id);
      context.dispatch("mBasketGoods/toggle", context.getters["mGoods/getItem"](id));
      context.dispatch("setCurrentGood");
    },
    putInFavorite(context, id) {
      context.commit("mGoods/toggleFlag", { name: "isInFavorite", id: id });
      context.dispatch("mFavorite/toggle", id);
      context.dispatch("mFavoriteGoods/toggle", context.getters["mGoods/getItem"](id));
      context.dispatch("setCurrentGood");
    },
    async firstStart(context) {
      context.commit("mBasket/setStorageName", "Basket");
      context.commit("mFavorite/setStorageName", "Favorite");
      context.commit("mBasket/get");
      context.commit("mFavorite/get");
      await context.dispatch("mGoods/getDataFromServer");
      context.commit("mGoods/setFlagList", {
        name: "isInBasket",
        ids: context.getters["mBasket/list"],
      });
      context.commit("mGoods/setFlagList", {
        name: "isInFavorite",
        ids: context.getters["mFavorite/list"],
      });

      let basketIdList = context.getters["mBasket/list"];
      let basketGoodsList = context.getters["mGoods/getList"](basketIdList);
      context.dispatch("mBasketGoods/addList", basketGoodsList);

      let favoriteIdList = context.getters["mFavorite/list"];
      let favoriteGoodsList = context.getters["mGoods/getList"](favoriteIdList);
      context.dispatch("mFavoriteGoods/addList", favoriteGoodsList);

      context.dispatch("setCurrentGood");
    },
  },
});
