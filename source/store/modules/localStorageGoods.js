import Vue from "vue";
const state = () => ({
  list: [],
});

const mutations = {
  addItem(state, item) {
    state.list.splice(state.list.length, 1, item);
  },
  deleteItem(state, position) {
    state.list.splice(position, 1);
  },
};

const actions = {
  addList(context, arr) {
    arr.forEach((element) => {
      context.commit("addItem", element);
    });
  },
  toggle(context, item) {
    if (context.getters["isContain"](item.id)) {
      context.commit("deleteItem", context.getters["findIndex"](item.id));
    } else {
      context.commit("addItem", item);
    }
  },
};
const getters = {
  getAll(state) {
    return state.list;
  },
  count(state) {
    return state.goodsList.length;
  },
  findIndex: (state) => (id) => {
    return state.list.findIndex(function(el, ind, ar) {
      if (el.id === id) return true;
    });
  },
  isContain: (state) => (id) => {
    let index = state.list.findIndex(function(el, ind, ar) {
      if (el.id === id) return true;
    });
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
