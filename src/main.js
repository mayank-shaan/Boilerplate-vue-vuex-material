// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import VueMasonry from 'vue-masonry-css';
import { VueMasonryPlugin } from 'vue-masonry';

import App from './App';
import router from './router';
import store from './store';


require('../node_modules/vuetify/dist/vuetify.min.css');
require('../node_modules/swiper/dist/css/swiper.css');
require('../node_modules/swiper/dist/css/swiper.css');

Vue.use(require('vue-moment'));


Vue.config.productionTip = false;

Vue.use(Vuetify, {});
Vue.use(Vuex);
Vue.use(VueMasonry);
Vue.use(VueMasonryPlugin);

/* eslint-disable no-new */
new Vue({
  store,
  el: '#root',
  router,
  components: { App },
  template: '<App/>',
});
