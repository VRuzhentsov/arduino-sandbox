import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

import router from './router';

Vue.use(VueRouter);

const vm = new Vue({
  router,
  el: '#main',
  components: {
    App,
  },
});
