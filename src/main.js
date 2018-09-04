// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import VueMasonry from 'vue-masonry-css';
import { VueMasonryPlugin } from 'vue-masonry';
import VueResource from 'vue-resource';

import App from './App';
import router from './router';
import store from './store';

require('../node_modules/vuetify/dist/vuetify.min.css');
require('../node_modules/swiper/dist/css/swiper.css');
require('../node_modules/swiper/dist/css/swiper.css');


Vue.config.productionTip = false;

// Vue.use(Vuetify, {});
Vue.use(Vuetify, {
  theme: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
});

Vue.use(require('vue-moment'));

Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(VueMasonry);
Vue.use(VueMasonryPlugin);

Vue.http.options.emulateJSON = true;
const http = Vue.http;
export default http;

/* eslint-disable no-new */
new Vue({
  store,
  el: '#root',
  router,
  components: { App },
  template: '<App/>',
});
