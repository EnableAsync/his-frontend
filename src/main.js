import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './route/index'
import store from './store/index'

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
