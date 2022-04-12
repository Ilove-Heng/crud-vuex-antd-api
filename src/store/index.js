import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import userData from "@/store/modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    provinces: [],
    districts: [],
    commune: [],
  },
  getters: {
    getProvinces: (state) => {
      return state.provinces;
    },
    getDistricts: (state) => {
      return state.districts;
    },
    getCommunes: (state) => {
      return state.commune;
    },
  },
  mutations: {
    GET_PROVINCE(state, data) {
      state.provinces = data;
    },
    GET_DISTRICT(state, data) {
      state.districts = data;
    },
    GET_COMMUNE(state, data) {
      state.commune = data;
    },
  },
  actions: {
    // province
    fetchProvinces: ({ commit }) => {
      axios.get("http://laravelapi.local/api/provinces").then((response) => {
        // console.log(response.data.data);
        // console.log(response.data.data);
        commit("GET_PROVINCE", response.data.data);
      });
    },
    // district
    fetchDistricts: ({ commit }, payload) => {
      axios
        .get("http://laravelapi.local/api/districts/" + payload)
        .then((response) => {
          // console.log("vuex");
          // console.log(payload);
          // console.log(response.data.data);
          commit("GET_DISTRICT", response.data.data);
        });
    },

    // communce
    fetchcommunes: ({ commit }, payload) => {
      axios
        .get("http://laravelapi.local/api/communces/" + payload)
        .then((response) => {
          // console.log("vuex");
          // console.log(commit);
          // console.log(response.data);
          commit("GET_COMMUNE", response.data);
        });
    },
  },
  modules: {
    userData,
  },
});
