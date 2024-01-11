import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './i18n'
import {post} from './api/https'
import JSONView from 'vue-json-viewer'
import axios from "axios";
import { toThousands, copys } from './api/util'
import {API_ROOT, RUN_DEV} from "./config";
import { Message } from 'element-ui';

Vue.use(JSONView);
Vue.config.productionTip = false;
Vue.prototype.$post = post;
Vue.prototype.$toThousands = toThousands
Vue.prototype.$copy = function(str) {
  copys(str)
  Message({
    offset: 70,
    message: this.$t("public.copysuccess"),
    type: "success",
    duration: 1000,
    customClass: 'success-tip'
  })
}


async function getChainInfoBeforeRender() {
  if (!sessionStorage.hasOwnProperty("chainId")) {
    const params = {"jsonrpc": "2.0", "method": "getChainInfo", "params": [], "id": Math.floor(Math.random() * 1000)};
    try {
      const res = await axios.post(API_ROOT, params);
      const data = res.data;
      if (data.hasOwnProperty("result")) {
        sessionStorage.setItem("chainId", data.result.chainId);
        sessionStorage.setItem("symbol", data.result.defaultAsset.symbol);
        sessionStorage.setItem("decimals", data.result.defaultAsset.decimals);
      } else {
        sessionStorage.setItem("chainId", RUN_DEV ? "1" : "2");
        sessionStorage.setItem("symbol", 'NULS');
        sessionStorage.setItem("decimals", '8');
      }
    } catch (e) {
      sessionStorage.setItem("chainId", RUN_DEV ? "1" : "2");
      sessionStorage.setItem("symbol", 'NULS');
      sessionStorage.setItem("decimals", '8');
    }
  }
  new Vue({
    store,
    router,
    i18n,
    render: h => h(App)
  }).$mount('#app');
}

getChainInfoBeforeRender();

/*new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');*/
