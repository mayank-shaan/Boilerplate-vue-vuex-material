/* eslint-disable no-param-reassign */
export default {
  CREATE_TEMP_SESSION(state, userData) {
    state.tempUser = userData;
  },
  CREATE_SESSION(state, userData) {
    state.user = userData;
  },
  CHANGE_THEME(state, theme) {
    state.theme = theme;
  },
};
/* eslint-enable no-param-reassign */
