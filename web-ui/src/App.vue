<template>
  <div id="app" class="app">
    <HeaderBar>
    </HeaderBar>
    <router-view>
    </router-view>
    <BottomBar>
    </BottomBar>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar'
import BottomBar from './components/BottomBar'
import axios from 'axios'
import {API_ROOT,RUN_DEV} from './config'

export default {
  components: {
    HeaderBar,
    BottomBar
  },
  created() {
    if(!sessionStorage.hasOwnProperty("chainId")){
      this.getChains();
    }
  },
  methods: {

    /**
     *  获取链ID
     **/
    getChains() {
      const params = {"jsonrpc": "2.0", "method": "getChainInfo", "params": [], "id": Math.floor(Math.random()*1000)};
      axios.post(API_ROOT, params)
        .then((response) => {
          const data = response.data;
          //console.log(data);
          if (data.hasOwnProperty("result")) {
            sessionStorage.setItem("chainId",data.result.chainId);
            sessionStorage.setItem("symbol",data.result.defaultAsset.symbol);
            sessionStorage.setItem("decimals",data.result.defaultAsset.decimals);
          }else {
            //console.log(data.hasOwnProperty("result"));
            sessionStorage.setItem("chainId",RUN_DEV ? "1":"2");
            sessionStorage.setItem("symbol",'NULS');
            sessionStorage.setItem("decimals",'8');
          }
        })
        .catch((error)=>{
          console.log(error);
          sessionStorage.setItem("chainId",RUN_DEV ? "1":"2");
          sessionStorage.setItem("symbol",'NULS');
          sessionStorage.setItem("decimals",'8');
        })
    }
  }
}
</script>

<style lang="less">
@import "assets/css/base.less";
  .app{
    background-color: #ffffff;
  }
</style>
