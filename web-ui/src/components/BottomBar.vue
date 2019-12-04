<template>
  <div class="bottom bg-gray">
    <ul class="b_ul w1200">
      <li class="b_li font14 fl capitalize" v-show="symbol ==='NULS'">
        <a href="https://nuls.io/home" target="_blank">{{$t('bottom.website')}}</a>
      </li>
      <li class="b_li font14 fl" v-show="symbol ==='NULS'">
        <a href="https://github.com/nuls-io" target="_blank">Github</a>
      </li>
      <li class="b_li font14 fl capitalize" v-show="symbol ==='NULS'">
        <a href="https://wallet.nuls.io/" arget="_blank">{{$t('bottom.webWallet')}}</a>
      </li>
      <li class="b_li font14 fl capitalize" v-show="symbol ==='NULS'">
        <a href="https://nuls.community/" target="_blank">{{$t('bottom.community')}}</a>
      </li>
      <li class="b_li font14 fl capitalize click" @click="toBugReport" v-show="symbol ==='NULS'">
        {{$t('bottom.about')}}
      </li>
      <li class="b_li font14 fl capitalize click" @click="toExplorer" v-show="symbol ==='NULS'">
        {{$t('bottom.explorer1')}}
      </li>
      <li class="b_li font14 fl capitalize click" @click="toUrl('protocolUpdate')">
        {{$t('protocolUpdate.upgradeProgress')}}
      </li>
      <li class="b_li font14 fr">Copyright @2019 {{symbol}}</li>
    </ul>
  </div>
</template>

<script>
  //import {superLong, timesDecimals} from '@/api/util.js'
  import {RUN_DEV} from '@/config'

  export default {
    data() {
      return {
        height: 0,//当前高度
        symbol: sessionStorage.hasOwnProperty('symbol') ? sessionStorage.getItem('symbol') : 'NULS',//默认symbol
      }
    },
    created() {
      this.getBestBlockHeader();
      this.getNodeNumber();
      this.getNULSNumber();
      document.title = this.symbol + " Explorer";
      //10秒循环一次数据
      setInterval(() => {
        this.getBestBlockHeader();
        this.getNodeNumber();
        this.getNULSNumber();
        this.symbol = sessionStorage.hasOwnProperty('symbol') ? sessionStorage.getItem('symbol') : 'NULS';
        document.title = this.symbol + " Explorer";
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
       * 获取最新高度
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
       * 获取节点数量
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
       * 获取NULS数量信息
       */
      getNULSNumber() {
        this.$post('/', 'getCoinInfo', [])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              this.$store.commit('SET_NULSNUMBER', response.result);
            }
          })
      },

      /**
       *  问题反馈 跳转
       **/
      toBugReport() {
        if (RUN_DEV) {
          window.open('https://nuls.community/d/135-collect-the-bugs-of-the-mainnet-bugs', '_blank');
        } else {
          window.open('https://nuls.community/d/134-collect-the-bugs-of-the-testnet-bugs/2', '_blank');
        }
      },

      /**
       *  1.0 浏览器跳转
       **/
      toExplorer() {
        window.open('https://v1.nulscan.io/', '_blank');
      },

      /**
       * url 连接跳转
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
        color: #2C3856;
        line-height: 60px;
        width: auto;
        margin: 0 12px;
        text-align: center;
        @media screen and (max-width: 1000px) {
          line-height: 45px;
          margin: 0 6px;
        }
        &:first-child {
          margin-left: 0;
          @media screen and (max-width: 1000px) {
            margin: 0 4px;
          }
        }
        &:last-child {
          width: 190px;
          text-align: right;
          color: @Acolor3;
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

        }
      }
    }

  }

</style>
