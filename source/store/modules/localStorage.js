import Vue from "vue";
const state = () => ({
  localStorage: {},
  storageName: "storage",
});
const getters = {
  count(state) {
    return Object.keys(state.localStorage).length;
  },
  list(state) {
    return Object.keys(state.localStorage);
  },
  isContain: (state) => (id) => {
    return state.localStorage[id] != null;
  },
};
const actions = {
  toggle(context, id) {
    if (context.state.localStorage[id] === true) {
      context.dispatch("deleteItem", id);
    } else {
      context.dispatch("addItem", id);
    }
  },
  set(context) {
    localStorage.setItem(context.state.storageName, JSON.stringify(context.state.localStorage));
  },
  addItem(context, id) {
    context.commit("addItem", id);
    context.dispatch("set");
  },
  deleteItem(context, id) {
    context.commit("deleteItem", id);
    context.dispatch("set");
  },
};
const mutations = {
  setStorageName(state, name) {
    state.storageName = name;
  },
  get(state) {
    let basket = JSON.parse(localStorage.getItem(state.storageName));
    basket = basket == null ? {} : basket;
    for (const key in basket) {
      if (Object.hasOwnProperty.call(basket, key)) {
        const element = basket[key];
        Vue.set(state.localStorage, key, element);
      }
    }
  },
  addItem(state, id) {
    Vue.set(state.localStorage, id, true);
  },
  deleteItem(state, id) {
    Vue.delete(state.localStorage, id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
