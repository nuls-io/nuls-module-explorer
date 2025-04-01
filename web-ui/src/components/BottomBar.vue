<template>
  <div class="bottom bg-gray black-background">
    <ul class="b_ul w1200">
      <li class="b_li font14 fl capitalize">
        <a href="https://nuls.io/home" target="_blank">{{$t('bottom.website')}}</a>
      </li>
      <li class="b_li font14 fl">
        <a href="https://github.com/nuls-io" target="_blank">GitHub</a>
      </li>
      <li class="b_li font14 fl capitalize">
        <!-- <a href="https://wallet.nuls.io/" arget="_blank">{{$t('bottom.webWallet')}}</a> -->
        <a href=" https://nuls.io/wallets/" arget="_blank">{{$t('bottom.webWallet')}}</a>
      </li>
      <li class="b_li font14 fl capitalize">
        <!-- <a href="https://bbs.nuls.io/" target="_blank">{{$t('bottom.community')}}</a> -->
        <a href=" https://forum.nuls.io/" target="_blank">{{$t('bottom.community')}}</a>
      </li>
      <li class="b_li font14 fl capitalize click">
        <a href="https://github.com/nuls-io/nuls-module-explorer/issues" target="_blank">{{$t('bottom.about')}}</a>
      </li>
      <li class="b_li font14 fl capitalize click">
        <router-link tag="a" :to="{ name: 'protocolUpdate'}">
          {{$t('protocolUpdate.upgradeProgress')}}
        </router-link>
      </li>
      <li class="b_li font14 fr">Copyright 2017-2025 © All rights Reserved. NULS AI</li>
    </ul>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        height: 0,//Current height
      }
    },
    created() {
      this.getBestBlockHeader();
      this.getNodeNumber();
      this.getNULSNumber();
      //10Cycle data every second
      setInterval(() => {
        this.getBestBlockHeader();
        this.getNodeNumber();
        this.getNULSNumber();
      }, 10000);
    },
    mounted() {
      let that = this;
      let IntervalName = setInterval(function () {
        that.getBestBlockHeader();
        that.getNodeNumber();
        that.getNULSNumber();
        if (that.height !== 0) {
          clearInterval(IntervalName);
        }
      }, 1000);
    },
    methods: {

      /**
       * Get the latest altitude
       */
      getBestBlockHeader() {
        this.$post('/', 'getBestBlockHeader', [])
          .then((response) => {
            //console.log(response)
            if (response.hasOwnProperty("result")) {
              this.height = response.result.height;
              this.$store.commit('SET_HEIGHT', response.result.height);
            } else {
              this.height = 0;
            }
          }).catch((error) => {
          this.height = 0;
          console.log(error);
        })
      },

      /**
       * Obtain the number of nodes
       */
      getNodeNumber() {
        this.$post('/', 'getConsensusNodeCount', [])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              this.$store.commit('SET_NODENUMBER', response.result);
            }
          })
      },

      /**
       * obtainNULSQuantity information
       */
      getNULSNumber() {
        this.$post('/', 'getCoinInfo', [])
          .then((response) => {
            if (response.hasOwnProperty("result")) {
              this.$store.commit('SET_NULSNUMBER', response.result);
            }
          })
      },

      /**
       *  1.0 Browser redirection
       **/
      toExplorer() {
        window.open('https://v1.nulscan.io/', '_blank');
      },

      /**
       * url Connection jump
       * @param name
       * @param parmes
       */
      toUrl(name) {
        this.$router.push({
          name: name,
        })
      }

    }
  }
</script>

<style lang="less">
  @import "./../assets/css/style";
  .bottom {
    border-top: @BD1;
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 9898;
    .b_ul {
      .b_li {
        color: #FFFFFF;
        line-height: 60px;
        width: auto;
        margin: 0 20px;
        text-align: center;
        @media screen and (max-width: 1000px) {
          line-height: 45px;
          margin: 0 6px;
        }
        @media (min-width: 1000px) and (max-width: 1100px) {
          margin: 0 10px;
        }
        &:first-child {
          margin-left: 0;
          @media screen and (max-width: 1000px) {
            margin: 0 4px;
          }
        }
        &:last-child {
          //width: 190px;
          text-align: right;
          color: #FFFFFF;
          margin-right: 0;
          @media screen and (max-width: 1000px) {
            display: none;
          }
        }
        @media screen and (max-width: 1000px) {
          font-size: 0.7rem;
        }
        a {
          cursor: pointer;
          color: #FFFFFF;
        }
      }
    }

  }
  .black-background{
    background-color: #000000 !important;
  }

  @media (max-width: 1220px){
    .black-background{
      .w1200{
        width: initial;
      }
      padding-left: .5rem;
      padding-right: .5rem;
    }
  }
</style>
