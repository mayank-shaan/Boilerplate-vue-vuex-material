/* eslint-disable no-param-reassign */
export default {
  CREATE_TEMP_SESSION(state, userData) {
    state.tempUser = userData;
  },
  CREATE_SESSION(state, userData) {
    state.user = userData;
  },
};
/* eslint-enable no-param-reassign */
