<template>
  <div id="app" class="app">
    <HeaderBar></HeaderBar>
    <router-view></router-view>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar'
import BottomBar from './components/BottomBar'
import axios from 'axios'
import {API_ROOT} from './config'

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
      const params = {"jsonrpc": "2.0", "method": "getChainInfo", "params": [], "id": 5898};
      axios.post(API_ROOT, params)
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            sessionStorage.setItem("chainId",response.result.chainId)
          }else {
            sessionStorage.setItem("chainId","2")
          }
        })
        .catch((error)=>{
          console.log(error);
          sessionStorage.setItem("chainId","2")
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
