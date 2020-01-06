import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './i18n'
import {post} from './api/https'
import JSONView from 'vue-json-viewer'

Vue.use(JSONView);

Vue.config.productionTip = false;
//定义全局变量
Vue.prototype.$post = post;

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
