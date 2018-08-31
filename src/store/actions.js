// import Vue from 'vue';
// import router from '../router';

export default {
  createTempSession({ commit }, userData) {
    commit('CREATE_SESSION', userData);
  },
};
