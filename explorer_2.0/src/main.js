import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/element.js'
import i18n from './i18n'
import {post} from './api/https'
import VeLine from 'v-charts/lib/line.common'
import VePie from 'v-charts/lib/pie.common'
import 'v-charts/lib/style.css'

Vue.component(VeLine.name, VeLine);
Vue.component(VePie.name, VePie);

Vue.config.productionTip = false;
//定义全局变量
Vue.prototype.$post = post;

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
