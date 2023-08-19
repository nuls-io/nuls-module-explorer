<template>
  <div class="network">
    <div class="w1200">
      <p class="network-title font20">平行链</p>

      <div class="network-container">
        <div class="container-title">
          <img src="../../assets/img/destroyed.svg" alt="">
          <span class="container-title-title">NerveNetwork</span>
          <span class="container-label font14">@异构链</span>
        </div>
        <p class="network-text">
          NerveNetwork aims to connect all isolated blockchains and establish a cross-chain asset exchange network, providing all necessary underlying support for the DeFi ecosystem. Let every digital asset holder experience a truly safe, free and transparent DeFi service.
        </p>

        <el-divider></el-divider>

        <div class="network-label">
          <div class="network-label-div border-left">
            <div class="network-label-box">
              <p class="label-box-title">主链资产符号</p>
              <p class="label-shuzi">NVT</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">NULS网络流通量</p>
              <p class="label-shuzi">10,942,500.98735767</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">持有人</p>
              <p class="label-shuzi">12,309</p>
            </div>
          </div>
          <div class="network-label-div">
            <div class="network-label-box">
              <p class="label-box-title">跨链交易次数</p>
              <p class="label-shuzi">139,300</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">官网</p>
              <p class="label-shuzi network-link">http://nerve.network/</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">推特</p>
              <p class="label-shuzi network-link">@nerve_network</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timesDecimals } from '@/api/util.js'

export default {
  data() {
    return {
      
    }
  },
  created() {

  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {

    /**
     * @disc: 查询平行链信息
     * @params:
     * @date: 2020-06-30 19:36
     * @author: Wave
     */
    getHoldData() {
      this.$post('/', 'getOtherChainList', [])
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            for (let item of response.result) {
              item.defaultAsset.initCoins = Number(timesDecimals(item.defaultAsset.initCoins, item.defaultAsset.decimals))
            }
            this.holdData = response.result;
            this.pageTotal = response.result.length
          }
        }).catch((error) => {
          console.log(error)
        })
    },

    /**
     * url 连接跳转
     * @param name
     * @param parmes
     */
    toUrl(name, parmes) {
      let newParmes = { chainId: parmes };
      this.$router.push({
        name: name,
        query: newParmes
      })
    },

  },
}
</script>

<style lang="less">
.network {
  background-color: #F9FAFD;
  .w1200{
    .network-title{
      color: #000000;
      font-weight: 600;
      padding: 24px 0;
    }
    .network-container{
      border-radius: 12px;
      border: 1px solid #EBEBF4;
      background: #FFFFFF;
      padding: 24px 0;
      margin-bottom: 20px;
      .network-label{
        display: flex;
        .network-label-div{
          padding: 0 24px;
          width: 50%;
          .my-split{
            height: 1px;
            background: #E9E9F8;
            margin: 16px 0;
          }
          .network-label-box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .label-box-title{
              font-size: 14px;
              color: #4A4F55;
            }
            .label-shuzi{
              font-size: 14px;
              color: #000000;
            }
            .network-link{
              color: #00DB82;
              font-size: 14px;
            }
          }
        }
        .border-left{
          border-right: 1px solid #E9E9F8;
        }
      }
      .network-text{
        font-size: 14px;
        margin-top: 16px;
        margin-bottom: 24px;
        color: #000000;
        word-break: break-all;
        padding: 0 24px;
      }
      .container-title{
        display: flex;
        align-items: center;
        padding: 0 24px;
        .container-label{
          color: #8291A4;
          margin-left: 12px;
        }
        img{
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin-right: 12px;
        }
        .container-title-title{
          font-size: 18px;
          color: #000000;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
