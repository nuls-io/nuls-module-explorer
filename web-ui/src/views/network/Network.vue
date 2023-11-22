<template>
  <div class="network">
    <div class="w1200">
      <p class="network-title font20">{{$t('assets.Parachain')}}</p>

      <div class="network-container">
        <div class="container-title">
          <img src="./img/neverwork.png" alt="">
          <span class="container-title-title">NerveNetwork</span>
          <!-- <span class="container-label font14">@{{$t('assets.HeterogeneousChain')}}</span> -->
        </div>
        <p class="network-text">
          {{$t('assets.NerveNetwork')}}
        </p>
        <el-divider></el-divider>
        <div class="network-label">
          <div class="network-label-div border-left">
            <div class="network-label-box">
              <p class="label-box-title">{{$t('assets.asset_symbol')}}</p>
              <p class="label-shuzi">NVT</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{$t('assets.traffic')}}</p>
              <p class="label-shuzi">10,942,500.98735767</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{$t('assets.Holder')}}</p>
              <p class="label-shuzi">12,309</p>
            </div>
          </div>
          <div class="network-label-div">
            <p class="my-split shogaix"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{$t('assets.cross-chain')}}</p>
              <p class="label-shuzi">139,300</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{$t('bottom.website')}}</p>
              <p class="label-shuzi cur network-link" @click="openUrl('http://nerve.network/')">http://nerve.network/</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{$t('bottom.Twitter')}}</p>
              <p class="label-shuzi network-link">@nerve_network</p>
            </div>
          </div>
        </div>
      </div>

      <div class="network-container">
        <div class="container-title">
          <img src="./img/enuls.png" alt="">
          <span class="container-title-title">ENULS</span>
          <span class="container-label font14">@{{$t('assets.HeterogeneousChain')}}</span>
        </div>
        <p class="network-text">
          {{$t('assets.NerveNetwork')}}
        </p>
        <el-divider></el-divider>
        <div class="network-label">
          <div class="network-label-div border-left">
            <div class="network-label-box">
              <p class="label-box-title">{{$t('assets.asset_symbol')}}</p>
              <p class="label-shuzi">NULS</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{$t('assets.traffic')}}</p>
              <p class="label-shuzi">10,942,500.98735767</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{$t('assets.Holder')}}</p>
              <p class="label-shuzi">12,309</p>
            </div>
          </div>
          <div class="network-label-div">
            <p class="my-split shogaix"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{$t('assets.cross-chain')}}</p>
              <p class="label-shuzi">139,300</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{$t('bottom.website')}}</p>
              <p class="label-shuzi cur network-link" @click="openUrl('http://nuls.io')">http://nuls.io</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{$t('bottom.Twitter')}}</p>
              <p class="label-shuzi network-link">@nuls</p>
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
    this.getHoldData()
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    openUrl(url){
      window.open(url)
    },
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
          .shogaix{
            display: none;
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

@media (max-width:1220px) {
  .network{
    .w1200{
      width: initial;
      padding: 0 .5rem;
    }
  }
}
@media (max-width:686px) {
  .network{
    .w1200{
      .network-container{
        .network-label{
          flex-direction: column;
          .network-label-div{
            width: 100%;
            .shogaix{
              display: block;
            }
          }
          .border-left{
            border: none;
          }
        }
      }
    }
  }
}
</style>
