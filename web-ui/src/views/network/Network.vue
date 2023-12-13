<template>
  <div class="network">
    <div class="w1200">
      <p class="network-title font20">{{ $t('assets.Parachain') }}</p>

      <div class="network-container">
        <div class="container-title">
          <img :src="DataNerveNetwork.iconUrl || './img/neverwork.png'" alt="">
          <span class="container-title-title">NerveNetwork</span>
          <!-- <span class="container-label font14">@{{$t('assets.HeterogeneousChain')}}</span> -->
        </div>
        <p class="network-text">
          {{ $t('assets.NerveNetwork') }}
        </p>
        <el-divider></el-divider>
        <div class="network-label">
          <div class="network-label-div border-left">
            <div class="network-label-box">
              <p class="label-box-title">{{ $t('assets.asset_symbol') }}</p>
              <p class="label-shuzi">{{ DataNerveNetwork.name }}</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{ $t('assets.traffic') }}</p>
              <p class="label-shuzi">{{ toThousands(timesDecimals(Number(DataNerveNetwork.nulsChainSupply), DataNerveNetwork.decimals)) }}</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{ $t('assets.Holder') }}</p>
              <p class="label-shuzi">{{ toThousands(DataNerveNetwork.addresses) }}</p>
            </div>
          </div>
          <div class="network-label-div">
            <p class="my-split shogaix"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{ $t('assets.cross-chain') }}</p>
              <p class="label-shuzi">{{ toThousands(DataNerveNetwork.txCount) }}</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{ $t('bottom.website') }}</p>
              <p class="label-shuzi cur network-link" @click="openUrl(DataNerveNetwork.website)">{{ DataNerveNetwork.website }}</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{ $t('bottom.Twitter') }}</p>
              <p class="label-shuzi network-link">@nerve_network</p>
            </div>
          </div>
        </div>
      </div>

      <div class="network-container">
        <div class="container-title">
          <img :src="DataENULS.iconUrl || './img/enuls.png'" alt="">
          <span class="container-title-title">ENULS</span>
          <span class="container-label font14">@{{ $t('assets.HeterogeneousChain') }}</span>
        </div>
        <p class="network-text">
          {{ $t('assets.NerveNetwork') }}
        </p>
        <el-divider></el-divider>
        <div class="network-label">
          <div class="network-label-div border-left">
            <div class="network-label-box">
              <p class="label-box-title">{{ $t('assets.asset_symbol') }}</p>
              <p class="label-shuzi">{{ DataENULS.name }}</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{ $t('assets.traffic') }}</p>
              <p class="label-shuzi">{{ toThousands(timesDecimals(Number(DataENULS.nulsChainSupply), DataENULS.decimals)) }}</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{ $t('assets.Holder') }}</p>
              <p class="label-shuzi">{{ toThousands(DataENULS.addresses) }}</p>
            </div>
          </div>
          <div class="network-label-div">
            <p class="my-split shogaix"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{ $t('assets.cross-chain') }}</p>
              <p class="label-shuzi">{{ toThousands(DataENULS.txCount) }}</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{ $t('bottom.website') }}</p>
              <p class="label-shuzi cur network-link" @click="openUrl(DataENULS.website)">{{ DataENULS.website }}</p>
            </div>
            <p class="my-split"></p>
            <div class="network-label-box">
              <p class="label-box-title">{{ $t('bottom.Twitter') }}</p>
              <p class="label-shuzi network-link">@nuls</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _networkInfo } from "@/api/heterogeneousChainConfig";
import {
  divisionDecimals,
  timesDecimals,
  toThousands
} from "../../api/util";
export default {
  data() {
    return {
      toThousands,
      timesDecimals,
      chainId: 2,
      DataNerveNetwork: {},
      DataENULS: {}
    }
  },
  created() {
    // this.getHoldData()
    this.getInfo()
    if(this.chainId != 2){
      this.getAssetInfo('9-1', 'NerveNetwork')
      this.getAssetInfo('1-1', 'ENULS')
    }else{
      this.getAssetInfo('5-1', 'NerveNetwork')
      this.getAssetInfo('2-1', 'ENULS')
    }
    this.getAssetInfo()
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    getInfo() {
      this.$post('/', 'getInfo', [])
        .then((response) => {
          console.log(response.result);
          if (response.hasOwnProperty('result')) {
            this.chainId = response.result.chainId;
          }
        }).catch((error) => {
          console.log(error);
        })
    },
    async getAssetInfo(id, type) {
      const result = await this.$post(
        "/",
        "getChainAssetInfo",
        [id],
        true
      );
      if (result.result) {
        const info = result.result;
        info.totalSupply = divisionDecimals(info.totalSupply, info.decimals);
        info.inAmount = divisionDecimals(info.inAmount, info.decimals);
        info.outAmount = divisionDecimals(info.outAmount, info.decimals);
        const origin = Object.values(_networkInfo).find(
          (v) => v.chainId === info.sourceChainId
        );
        if (origin) {
          info.originNetwork = origin.name;
          info.originNetworkLogo = origin.logo;
        }
        info.community = info.community ? JSON.parse(info.community) || {} : "";
        if(type === 'NerveNetwork'){
          this.DataNerveNetwork = info
        }else{
          this.DataENULS = info
        }
        console.log(info, "33");
      }
    },
    openUrl(url) {
      window.open(url)
    },
    /**
     * @disc: 查询平行链信息
     * @params:
     * @date: 2020-06-30 19:36
     * @author: Wave
     */
    // getHoldData() {
    //   this.$post('/', 'getOtherChainList', [])
    //     .then((response) => {
    //       //console.log(response);
    //       if (response.hasOwnProperty("result")) {
    //         for (let item of response.result) {
    //           item.defaultAsset.initCoins = Number(timesDecimals(item.defaultAsset.initCoins, item.defaultAsset.decimals))
    //         }
    //         this.holdData = response.result;
    //         this.pageTotal = response.result.length
    //       }
    //     }).catch((error) => {
    //       console.log(error)
    //     })
    // },

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

  .w1200 {
    .network-title {
      color: #000000;
      font-weight: 600;
      padding: 24px 0;
    }

    .network-container {
      border-radius: 12px;
      border: 1px solid #EBEBF4;
      background: #FFFFFF;
      padding: 24px 0;
      margin-bottom: 20px;

      .network-label {
        display: flex;

        .network-label-div {
          padding: 0 24px;
          width: 50%;

          .my-split {
            height: 1px;
            background: #E9E9F8;
            margin: 16px 0;
          }

          .shogaix {
            display: none;
          }

          .network-label-box {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .label-box-title {
              font-size: 14px;
              color: #4A4F55;
            }

            .label-shuzi {
              font-size: 14px;
              color: #000000;
            }

            .network-link {
              color: #00DB82;
              font-size: 14px;
            }
          }
        }

        .border-left {
          border-right: 1px solid #E9E9F8;
        }
      }

      .network-text {
        font-size: 14px;
        margin-top: 16px;
        margin-bottom: 24px;
        color: #000000;
        word-break: break-all;
        padding: 0 24px;
      }

      .container-title {
        display: flex;
        align-items: center;
        padding: 0 24px;

        .container-label {
          color: #8291A4;
          margin-left: 12px;
        }

        img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin-right: 12px;
        }

        .container-title-title {
          font-size: 18px;
          color: #000000;
          font-weight: 600;
        }
      }
    }
  }
}

@media (max-width:1220px) {
  .network {
    .w1200 {
      width: initial;
      padding: 0 .5rem;
    }
  }
}

@media (max-width:686px) {
  .network {
    .w1200 {
      .network-container {
        .network-label {
          flex-direction: column;

          .network-label-div {
            width: 100%;

            .shogaix {
              display: block;
            }
          }

          .border-left {
            border: none;
          }
        }
      }
    }
  }
}
</style>
