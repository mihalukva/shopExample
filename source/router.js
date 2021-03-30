import VueRouter from "vueRouter";
import Vue from "vue";

import PageAbout from "./components/PageAbout.vue";
import PageMain from "./components/PageMain.vue";
import PageCatalog from "./components/PageCatalog.vue";
import PageCard from "./components/PageCard.vue";
import PageBasket from "./components/PageBasket.vue";

Vue.use(VueRouter);

const routes = [
  {path:"/about", component:PageAbout},
  {path:"/", component:PageMain},
  {path:"/catalog", component:PageCatalog},
  {path:"/card/:id", component:PageCard},
  {path:"/basket", component:PageBasket}
];
export default new VueRouter({ mode: "history", routes });
