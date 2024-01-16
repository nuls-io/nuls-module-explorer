<template>
  <div class="assetsdetails">
    <div class="w1200">
      <div class="assetsdetails_title">
        <SymbolIcon :icon="assetInfo && assetInfo.iconUrl || assetInfosymbol" />
        Token {{ assetInfo.name }}({{ assetInfo.symbol }})
      </div>
    </div>

    <AssetOverview :info="assetInfo" />

    <Holder v-if="address" :info="holderInfo" />

    <div class="w1200 a_list_container">
      <template v-if="!address">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="$t('assets.Trading_Information')" name="first">
            <div class="nei-lian">
              <Trading
                :assetKey="assetInfo.id"
                :decimals="assetInfo.decimals"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('assets.Holder')">
            <div class="nei-lian">
              <Holders
                :assetKey="assetInfo.id"
                :decimals="assetInfo.decimals"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>

      <template v-else>
        <el-tabs value="txInfoWithAddress">
          <el-tab-pane
            :label="$t('assets.Trading_Information')"
            name="txInfoWithAddress"
          >
            <AddressTxInfo
              :assetKey="assetInfo.id"
              :decimals="assetInfo.decimals"
              :address="address"
            />
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
import AssetOverview from "./components/AssetOverview.vue";
import Holder from "./components/Holder.vue";
import Holders from "./components/Holders.vue";
import Trading from "./components/Trading";
import SymbolIcon from "@/components/SymbolIcon.vue";
import AddressTxInfo from './components/AddressTxInfo';
import { _networkInfo } from "@/api/heterogeneousChainConfig";
import {
  divisionDecimals,
  toThousands,
  Copy,
  timesDecimals,
} from "../../api/util";
export default {
  components: {
    AssetOverview,
    Holder,
    Trading,
    Holders,
    SymbolIcon,
    AddressTxInfo
  },
  data() {
    return {
      Copy,
      timesDecimals,
      activeName: "first",
      i18n_locale: "cn",
      assetId: "",
      address: "",
      assetInfo: {},
      holderInfo: {},
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
      async handler(val, old = {}) {
        const { assetId, address } = val;
        console.log(val, 33333);
        const { assetId: oldAssetId, address: oldAddress } = old;
        this.address = address || "";
        if (assetId && assetId !== oldAssetId) {
          this.assetId = assetId;
          await this.getAssetInfo();
        }
        if (address && address !== oldAddress) {
          this.getHolderInfo();
        }
      },
      immediate: true,
    },
  },

  created() {
    //
  },
  methods: {
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
        info.nulsChainSupply = divisionDecimals(
          info.nulsChainSupply,
          info.decimals
        );
        info.inAmount = divisionDecimals(info.inAmount, info.decimals);
        info.outAmount = divisionDecimals(info.outAmount, info.decimals);
        const origin = Object.values(_networkInfo).find(
          (v) => v.sourceChainId === info.sourceChainId
        );
        if (origin) {
          info.originNetwork = origin.name;
          info.originNetworkLogo = origin.logo;
          console.log(info, origin, 33)
          info.contractUrl = this.calContractUrl(info.contract, origin.origin, info.sourceChainId)
        }
        info.community = info.community ? JSON.parse(info.community) || {} : "";
        console.log(info, "33");

        this.assetInfo = info;
      }
    },
    calContractUrl(contract, origin, sourceChainId) {
      if (!contract) {
        return ''
      }
      if (sourceChainId === -1 || sourceChainId === -2) {
         // NULS
        return  `${origin}/token/info?contractAddress=${contract}`
      } else {
        return `${origin}/address/${contract}`
      }
    },
    async getHolderInfo() {
      const result = await this.$post("/", "getOneHolderByAssetKey", [
        this.assetId,
        this.address,
      ]);
      const info = result.result;
      if (info) {
        this.holderInfo = {
          address: info.address,
          balance: divisionDecimals(info.balance, this.assetInfo.decimals),
          value: info.value,
          nulsValue: info.nulsValue,
          symbol: this.assetInfo.symbol,
        };
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
    .el-tabs {
      .el-tabs__content {
        overflow: initial;
      }
      .nei-lian {
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
        display: block;
      }
    }
  }
}

@media (max-width: 1200px) {
  .w1200 {
    width: initial;
  }
  .assetsdetails {
    padding: 0 0.5rem;
    .assetsdetails_container {
      .a_container {
        width: 49%;
      }
    }
  }
}

@media (max-width: 568px) {
  .assetsdetails {
    .assetsdetails_container {
      .a_container {
        width: 100%;
      }
    }
  }
}
</style>
