import Vue from "vue";
const state = () => ({
  goodsList: [],
});
const getters = {
  count(state) {
    return state.goodsList.length;
  },
  getItem: (state) => (id) => {
    return state.goodsList.find(function(el, ind, ar) {
      if (el.id === id) return el;
    });
  },
  sortByName(state) {
    return state.goodsList.slice().sort(function(a, b) {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
      return 0;
    });
  },
  sortByNameRevers(state) {
    return state.goodsList
      .slice()
      .sort(function(a, b) {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      })
      .reverse();
  },
  sortByPriceIncrease(state) {
    return state.goodsList.slice().sort(function(a, b) {
      return a.price.current_price - b.price.current_price;
    });
  },
  sortByPriceDecrease(state) {
    return state.goodsList
      .slice()
      .sort(function(a, b) {
        return a.price.current_price - b.price.current_price;
      })
      .reverse();
  },
  getAll(state) {
    return state.goodsList;
  },
  getList: (state) => (idList) => {
    return state.goodsList.filter((item) => {
      if (idList.includes(item.id)) {
        return item;
      }
    });
  },
};
const actions = {
  async getDataFromServer(context) {
    const response = await fetch("./download");
    const goodsList = await response.json();
    await context.commit("set", goodsList);
  },
};
const mutations = {
  setFlagList(state, flagList) {
    state.goodsList.forEach((element) => {
      if (flagList.ids.includes(element.id)) {
        Vue.set(element, flagList.name, true)
      } else {
        Vue.set(element, flagList.name, false)
      }
    });
  },
  toggleFlag(state, flag) {
    state.goodsList.find(function(el, ind, ar) {
      if (el.id === flag.id) el[flag.name] = !el[flag.name];
    });
  },
  set(state, data) {
    data.forEach(element => {
      state.goodsList.splice(state.goodsList.length,1,element)
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
