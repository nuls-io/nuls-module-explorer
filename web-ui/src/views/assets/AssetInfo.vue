<template>
  <div class="assetsdetails">
    <div class="w1200">
      <div class="assetsdetails_title">
        <SymbolIcon :icon="assetInfo && assetInfo.iconUrl || assetInfo.symbol" />
        Token {{ assetInfo.name }}({{ assetInfo.symbol }})
      </div>
    </div>

    <AssetOverview :info="assetInfo" />

    <template v-if="address">
      <Holder :info="holderInfo" />
    </template>
    <!-- <Holder v-if="address" :info="holderInfo" /> -->

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
import {
  divisionDecimals,
  toThousands,
  Copy,
  timesDecimals,
  timesDecimals1
} from "../../api/util";
import { NSymbol, NKey, calDecimalsAndSymbol, NDiffDeciamsl } from '@/constants/constants'

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
    this.isNULS = false
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
        console.log(val, old, 21341342);
        if (!val) return;
        const { assetId, address } = val;
        const { assetId: oldAssetId, address: oldAddress } = old;
        this.address = address || "";
        this.isNULS === assetId === NKey
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
        const { decimals, symbol } = calDecimalsAndSymbol(info)
        if (info.sourceChainName === 'NULS') {
          info.sourceChainName = 'NULS AI'
          info.sourceChainLogo = 'https://nuls-cf.oss-us-west-1.aliyuncs.com/icon/NAI.png'
          info.name = 'NULS AI'
        }
        info.decimals = decimals
        info.sourceChainName = info.sourceChainName === 'NULS' ? NSymbol : info.sourceChainName
        info.totalSupply = divisionDecimals(info.totalSupply, decimals);
        info.symbol = symbol
        info.nulsChainSupply = divisionDecimals(
          info.nulsChainSupply,
          decimals
        );
        info.inAmount = divisionDecimals(info.inAmount, decimals);
        info.outAmount = divisionDecimals(info.outAmount, decimals);
        info.contractUrl = this.calContractUrl(info)
        info.community = info.community ? JSON.parse(info.community) || {} : "";
        console.log(info, "33");

        this.assetInfo = info;
      }
    },
    calContractUrl(info) {
      if (!info) return '';
      const { contract, sourceChainId, sourceChainExplorerUrl } = info;
      if (!contract || !sourceChainExplorerUrl) {
        return ''
      }
      const origin = sourceChainExplorerUrl.endsWith('/') ? sourceChainExplorerUrl : sourceChainExplorerUrl + '/'
      if (sourceChainId === -1 || sourceChainId === -2) {
         // NULS
        return  `${origin}token/info?contractAddress=${contract}`
      } else {
        return `${origin}address/${contract}`
      }
    },
    calContractUrl1(contract, origin, sourceChainId) {
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
          nulsValue: timesDecimals1(info.nulsValue, NDiffDeciamsl),
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

        .is-active {
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
