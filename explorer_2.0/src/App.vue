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
  import {DEFAULT_CHAIN_ID} from "./config"

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
        this.$post('/', 'getChainInfo', [])
                .then((response) => {
                  //console.log(response);
                  if (response.hasOwnProperty("result")) {
                    sessionStorage.setItem("chainId",response.result.chainId)
                  }else {
                    sessionStorage.setItem("chainId",DEFAULT_CHAIN_ID)
                  }
                })
                .catch((error)=>{
                  console.log(error);
                  sessionStorage.setItem("chainId",DEFAULT_CHAIN_ID)
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