<template>
  <div class="assetsdetails">
    <div class="w1200">
      <div class="assetsdetails_title">
        <SymbolIcon :icon="assetInfo && assetInfo.symbol" />
        Token {{ assetInfo.name }}({{ assetInfo.symbol }})
      </div>
    </div>

    <div class="assetsdetails_container w1200">
      <div class="a_container">
        <p class="a_title">{{ $t("assets.Overview") }}</p>
        <div class="a_content">
          <div class="row-center">
            <p>{{ $t("assets.maximum") }}</p>
            <p>
              {{ toThousands(assetInfo.totalSupply) }} {{ assetInfo.symbol }}
            </p>
          </div>
          <div class="row-center">
            <p>{{ $t("assets.decimal_places") }}</p>
            <p>{{ assetInfo.decimals }}</p>
          </div>
          <div class="row-center">
            <p>{{ $t("assets.Holder") }}</p>
            <p>{{ toThousands(assetInfo.addresses) }} <span>(+{{assetInfo.addressesChangeRate}}%)</span></p>
          </div>
        </div>
      </div>
      <div class="a_container">
        <p class="a_title">{{ $t("assets.market") }}</p>
        <div class="a_content">
          <div class="row-center">
            <p>{{ $t("assets.Number_of") }}</p>
            <p>{{ toThousands(assetInfo.txCount) }}</p>
          </div>
          <div class="row-center">
            <p>{{ $t("assets.traffic") }}</p>
            <p>{{ toThousands(timesDecimals(Number(assetInfo.nulsChainSupply), assetInfo.decimals)) }}</p>
          </div>
          <div class="row-center">
            <p>{{ $t("assets.source_chain") }}</p>
            <p>
              <img
                class="img1"
                :src="assetInfo.iconUrl"
                alt=""
              />
              {{assetInfo.sourceChainName}}
            </p>
          </div>
        </div>
      </div>
      <div class="a_container">
        <p class="a_title">{{ $t("assets.other_information") }}</p>
        <div class="a_content">
          <div
            class="row-center"
            :class="i18n_locale === 'en' ? 'adaptation' : ''"
          >
            <p>
              {{ $t("assets.Token_Contract", { number: assetInfo.decimals }) }}
            </p>
            <p class="with-black">
              {{ Selection(assetInfo.contract) }}
              <img
                v-if="assetInfo.contract"
                class="img2"
                src="./img/copey.png"
                alt=""
                @click="Copy(assetInfo.contract)"
              />
            </p>
          </div>
          <div class="row-center">
            <p>{{ $t("bottom.website") }}</p>
            <p class="cur" @click="openUrl(assetInfo.website)">
              <span>{{ assetInfo.website }}</span>
            </p>
          </div>
          <div class="row-center">
            <p>{{ $t("bottom.community") }}</p>
            <div class="flex-center" v-if="assetInfo.community">
              <a
                :href="assetInfo.community.telegram"
                v-if="assetInfo.community.telegram"
                target="_blank"
              >
                <img src="./img/telegram.svg" alt="" />
              </a>
              <a
                :href="assetInfo.community.twitter"
                v-if="assetInfo.community.twitter"
                target="_blank"
              >
                <img src="./img/twitter.svg" alt="" />
              </a>
              <a
                :href="assetInfo.community.medium"
                v-if="assetInfo.community.medium"
                target="_blank"
              >
                <img src="./img/medium.svg" alt="" />
              </a>
              <a
                :href="assetInfo.community.discord"
                v-if="assetInfo.community.discord"
                target="_blank"
              >
                <img src="./img/discord.svg" alt="" />
              </a>
            </div>
            <span v-else>--</span>
          </div>
        </div>
      </div>
    </div>

    <div class="w1200 a_list_container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('assets.Trading_Information')" name="first">
          <div class="nei-lian">
            <Trading :assetKey="assetInfo.id" :decimals="assetInfo.decimals"></Trading>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('assets.Holder')">
          <div class="nei-lian">
            <holder :assetKey="assetInfo.id" :decimals="assetInfo.decimals"></holder>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane name="second">
          <span slot="label"
            >{{ $t("contractsInfo.contractsInfo0") }}
            <img class="a_position" src="./img/dunpai.png" alt=""
          /></span>
          <Thecode></Thecode>
        </el-tab-pane> -->
        <!-- <el-tab-pane :label="$t('assets.information')" name="fourth">
          <information></information>
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Holder from "./components/Holder.vue";
import Trading from "./components/Trading";
import Thecode from "./components/Thecode";
import SymbolIcon from "@/components/SymbolIcon.vue";
import { _networkInfo } from "@/api/heterogeneousChainConfig";
import {
  getHeaderInfo,
  divisionDecimals,
  toThousands,
  Copy,
  timesDecimals
} from "../../api/util";
export default {
  components: {
    Trading,
    Holder,
    Thecode,
    SymbolIcon,
  },
  data() {
    return {
      Copy,
      timesDecimals,
      activeName: "first",
      i18n_locale: "cn",
      assetId: "",
      assetInfo: {},
      toThousands,
    };
  },
  watch: {
    "$i18n.locale": {
      handler(newval) {
        this.i18n_locale = newval;
      },
      immediate: true,
    },
    "$route.params": {
      handler(val) {
        const { assetId } = val;
        if (assetId) {
          this.assetId = assetId;
          this.getAssetInfo();
        }
      },
      immediate: true,
    },
  },

  created() {
    if (this.$route.query.tabName) {
      this.activeName = this.$route.query.tabName;
    } else {
      this.activeName = "first";
    }

    getHeaderInfo();
  },
  methods: {
    handleClick(tab) {},
    Selection(val) {
      if (val) {
        return val.slice(0, 9) + "..." + val.slice(-9);
      }
    },
    openUrl(url) {
      window.open(url);
    },
    async getAssetInfo() {
      const result = await this.$post(
        "/",
        "getChainAssetInfo",
        [this.assetId],
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
      console.log(info, "33");

        this.assetInfo = info;
      }
    },
  },
};
</script>

<style lang="less">
.assetsdetails {
  background-color: #f9fafd;
  padding-bottom: 100px;
  .a_list_container {
    border-radius: 12px;
    background: #ffffff;
    margin-top: 24px;
    margin-bottom: 100px;
    .el-tabs{
      .el-tabs__content{
        overflow: initial;
      }
      .nei-lian{
        padding: 0 24px;
      }
    }
  }
  .el-tabs {
    .a_position {
      position: relative;
      top: -6px;
    }
    .el-tabs__header {
      .el-tabs__nav-wrap {
        .el-tabs__nav-scroll {
          padding: 0 24px;
        }
        .el-tabs__item {
          color: #000000;
        }

        .el-tabs__active-bar {
          background: #00db82;
        }

        .is-active {
          color: #00db82;
          font-weight: 550;
        }
      }
    }
  }

  .assetsdetails_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .a_container {
      width: 387px;
      height: 199px;
      background: #ffffff;
      border-radius: 12px;
      margin-bottom: 20px;
      .a_title {
        font-size: 16px;
        color: #000000;
        line-height: 50px;
        border-bottom: 1px solid #e9e9f8;
        padding-left: 24px;
      }

      .a_content {
        padding: 0 24px;

        .row-center {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          color: #000000;
          line-height: 50px;
          .flex-center {
            a {
              margin-left: 10px;
            }
          }
          &:not(:last-child) {
            border-bottom: 1px solid #e9e9f8;
          }

          p {
            display: flex;
            align-items: center;
          }
          .with-black{
            color: #000000;
          }

          span {
            color: #00db82;
          }

          .img1 {
            width: 20px;
            border-radius: 50%;
            margin-right: 6px;
          }

          .img2 {
            width: 14px;
            margin-left: 6px;
          }
        }
        .adaptation {
          display: flex;
          flex-wrap: wrap;
          line-height: 28px;
        }
      }
    }
  }

  .w1200 {
    .assetsdetails_title {
      padding: 24px 0;
      font-size: 20px;
      color: #000000;
      font-weight: 600;
      display: flex;
      align-items: center;
      img {
        width: 28px;
        margin-right: 6px;
      }
    }
  }
}

@media (max-width: 1200px){
  .w1200{
    width: initial;
  }
  .assetsdetails{
    padding: 0 .5rem;
    .assetsdetails_container{
      .a_container{
        width: 49%;
      }
    }
  }
}

@media (max-width: 568px){
  .assetsdetails{
    .assetsdetails_container{
      .a_container{
        width: 100%;
      }
    }
  } 
}
</style>