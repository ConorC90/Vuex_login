import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// import VuexPersist from 'vuex-persist';

// const vuexPersist = new VuexPersist({
//   key: 'my-app',
//   storage: sessionStorage
// })

// const store = new Vuex.Store({
//   //...initialization
//   plugins: [vuexPersist.plugin]
// })

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggingIn: false,
    loginError: null,
    loginSuccessful: false,
    token: localStorage.getItem("token") || ""
  },
  mutations: {
    loginStart: state => (state.loggingIn = true),
    loginStop: (state, res) => {
      state.loggingIn = false;
      if (res) {
        console.log(res.status);
        if (res.status === 200) {
          state.loginSuccessful = true;
        }
        if (
          res.status === 300 ||
          res.status === 301 ||
          res.status === 302 ||
          res.status === 304 ||
          res.status === 305
        ) {
          state.loginError = res.data.Message;
          state.loginSuccessful = false;
        }
      }
    }
  },
  actions: {
    doLogin({ commit }, loginData) {
      commit("loginStart");

      axios
        .post("https://stage.apis.chatbot.gavagai.io/api/v1/login", loginData)

        .then(res => {
          commit("loginStop", res);
          const token = res.data.access_token;
          localStorage.setItem("token", token);
          console.log(token);
          // console.log(res);
        })
        .catch(error => {
          commit("loginStop", error.response);
          localStorage.removeItem("token");
        });
    }
  }
});
