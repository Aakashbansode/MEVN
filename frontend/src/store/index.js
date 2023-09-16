// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    userData: null,
    messages: [],
    jwtToken: null,
  },
  mutations: {
    setUserData(state, data) {
      state.userData = data;
    },
    addMessage(state, message) {
      state.messages.push(message);
    },
    setJwtToken(state, token) {
      state.jwtToken = token;
    },
  },
  actions: {
    // You can define actions here if needed
  },
  modules: {
    // You can create modules for more structured state management
  },
});

export default store;
