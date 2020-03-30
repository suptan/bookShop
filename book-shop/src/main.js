import Vue from 'vue';
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import App from './App';
import router from './router';
import store from './store';


Vue.config.productionTip = false;
Vue.use(VuejsDialog);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
