// import Vue from 'vue';
// import router from '../router';

export default {
  createTempSession({ commit }, userData) {
    commit('CREATE_SESSION', userData);
  },
  changeTheme({ commit }, theme) {
    commit('CHANGE_THEME', theme);
  },
};
