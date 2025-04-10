<template>
  <div class="assetsdetails-account w1200">
    <div class="box address">
      <p>{{ $t("assets.holder_address") }}</p>
      <div>
        <!-- <p class="cur" @click="RouteJump(info.address)">
          {{ info.address }}
        </p> -->
        <router-link
          tag="a"
          :to="{
            path: '/address/info',
            query: { address: info.address },
          }"
          class="click"
        >
          {{ info.address }}
        </router-link>
        <img @click="$copy(info.address)" src="../img/copey.png" alt="" />
      </div>
    </div>
    <div class="box">
      <p class="title">{{ $t("public.balance") }}</p>
      <p class="syst">
        {{ $formatNumber(info.balance) }}
        {{ info.symbol }}
      </p>
    </div>
    <div class="box">
      <p class="title">{{ $t("assetInfo.assetInfo27") }}</p>
      <p class="syst" v-if="info.value > 0">
        ${{ $formatNumber(info.value) }}
        <span v-if="info.nulsValue > 0"
          >(≈{{ $formatNumber(info.nulsValue) }} {{ symbol }})</span
        >
      </p>
      <p v-else>--</p>
    </div>
  </div>
</template>

<script>
import { NSymbol } from '@/constants/constants';
export default {
  props: ["info"],
  data() {
    this.symbol = NSymbol
    return {
      
    }
  }
};
</script>

<style lang="less">
.assetsdetails-account {
  display: flex;
  align-items: center;
  background: #ffffff;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 12px;

  .box {
    width: 30%;

    @media (min-width: 1000px) {
      &:not(:last-child) {
        border-right: 1px solid #e9e9f8;
      }
    }

    padding-left: 24px;

    .title {
      font-size: 14px;
      color: #4a4f55;
      margin: 0;
    }

    .syst {
      font-size: 14px;
      margin-top: 8px;
      color: #000000;
    }
  }

  .address {
    width: 40%;

    p {
      font-size: 14px;
      color: #000000;
    }

    div {
      display: flex;
      align-items: center;
      margin-top: 8px;

      p {
        color: #00db82;
      }

      img {
        width: 12px;
        height: 12px;
        margin-left: 6px;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 1000px) {
    flex-direction: column;

    .address {
      width: 100%;
    }

    .box {
      padding: 16px 20px;
      width: 100%;

      .title {
        padding: 0;
      }

      &:not(:last-child) {
        border-bottom: 1px solid #e9e9f8;
      }
    }
  }
}
</style>
