import App from "./App.vue";
import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import mixins from "./mixins/index";

// CSS Ant Design
import "ant-design-vue/dist/antd.css";
// Ant Design Component Register

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(Antd);
Vue.mixin(mixins);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
