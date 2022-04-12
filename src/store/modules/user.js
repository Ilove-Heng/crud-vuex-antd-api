import axios from "axios";
import router from "@/router";

/* eslint-disable */

export default {
  namespaced: true,

  state: {
    users: [],
    totalPage: 0,
    page: 1,
  },

  getters: {
    getUsers: (state) => {
      return state.users;
    },
    getTotalPage: (state) => {
      return state.totalPage;
    },
  },

  mutations: {
    GET_USER(state, payload) {
      state.users = payload;
    },
    GET_PAGE_NUM: (state, payload) => {
      state.totalPage = payload;
    },
  },

  actions: {
    // getAllUsers
    fetchUsers: ({ commit }) => {
      let url = "";
      const query = router.currentRoute.query;
      if (query.page !== undefined && query.page) url += `?page=${query.page}`;
      axios
        .get("http://laravelapi.local/api/users" + url)
        .then((response) => {
          // state.users = response.data.users;
          console.log(
            "🚀 : response.data.meta.total",
            response.data.meta.total
          );
          commit("GET_USER", response.data.data);
          commit("GET_PAGE_NUM", response.data.meta.total);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //Register User
    registerUsers: ({ dispatch }, payload) => {
      // console.log(payload);
      let formData = new FormData();
      formData.append("profile", payload.profile);
      formData.append("name", payload.name);
      formData.append("email", payload.email);
      formData.append("password", payload.password);
      formData.append("province_id", payload.province_id);
      formData.append("district_id", payload.district_id);
      formData.append("commune_id", payload.commune_id);

      const user = axios.post("http://laravelapi.local/api/users", formData);
      user.then((response) => {
        // console.log(response.data);
        dispatch("fetchUsers", response.data.data); // make real time update
      });
      return user;
    },

    // show User
    actionGetOneUser({ dispatch }, id) {
      axios.get("http://laravelapi.local/api/users/" + id + "/edit");
    },

    // update user
    actionUpdateOneUser({ dispatch }, payload) {
      // console.log(payload.id);
      axios
        .post("http://laravelapi.local/api/users/" + payload.id, payload)
        .then(() => {
          dispatch("fetchUsers");
        });
    },

    // delete User
    DeleteOneUser({ dispatch }, payload) {
      axios
        .delete("http://laravelapi.local/api/users/" + payload)
        .then((result) => {
          // console.warn(result);
          dispatch("fetchUsers");
        });
    },
  },
};
