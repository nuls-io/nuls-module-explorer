<template>
  <div class="assetsdetails_container w1200">
      <div class="a_container">
        <p class="a_title">{{ $t("assets.Overview") }}</p>
        <div class="a_content">
          <div class="row-center">
            <p>{{ $t("assets.maximum") }}</p>
            <p>
              {{ $toThousands(info.totalSupply) }} {{ info.symbol }}
            </p>
          </div>
          <div class="row-center">
            <p>{{ $t("assets.decimal_places") }}</p>
            <p>{{ info.decimals }}</p>
          </div>
          <div class="row-center">
            <p>{{ $t("assets.Holder") }}</p>
            <p>{{ $toThousands(info.addresses) }} <span>(+{{info.addressesChangeRate}}%)</span></p>
          </div>
        </div>
      </div>
      <div class="a_container">
        <p class="a_title">{{ $t("assets.market") }}</p>
        <div class="a_content">
          <div class="row-center">
            <p>{{ $t("assets.Number_of") }}</p>
            <p>{{ $toThousands(info.txCount) }}</p>
          </div>
          <div class="row-center">
            <p>{{ $t("assets.traffic") }}</p>
            <p>{{ $toThousands(info.nulsChainSupply) }}</p>
          </div>
          <div class="row-center">
            <p>{{ $t("assets.assetId") }}</p>
            <p class="with-black">
              {{ info.id }}
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
              {{ $t("assets.source_chain") }}
            </p>
            
            <p>

              <img
                class="img1"
                :src="info.sourceChainLogo"
                alt=""
                v-if="info.sourceChainLogo"
              />
              <img class="img1" src="../img/errorimg.png" alt="" v-else>
              <a v-if="info.contract" class="click" target="_blank" :href="info.contractUrl">{{ superLong(info.contract, 5) }}</a>
              <span v-else>{{ info.sourceChainName }}</span>
            </p>
          </div>
          <div class="row-center">
            <p>{{ $t("bottom.website") }}</p>
            <p class="cur" @click="openUrl(info.website)" v-if="info.website">
              <span>{{ info.website }}</span>
            </p>
            <p v-else>
              <span style="color: #000000;">--</span>
            </p>
          </div>
          <div class="row-center">
            <p>{{ $t("bottom.community") }}</p>
            <div class="flex-center" v-if="info.community">
              <a
                :href="info.community.telegram"
                v-if="info.community.telegram"
                target="_blank"
              >
                <img src="../img/telegram.svg" alt="" />
              </a>
              <a
                :href="info.community.twitter"
                v-if="info.community.twitter"
                target="_blank"
              >
                <img src="../img/twitter.svg" alt="" />
              </a>
              <a
                :href="info.community.medium"
                v-if="info.community.medium"
                target="_blank"
              >
                <img src="../img/medium.svg" alt="" />
              </a>
              <a
                :href="info.community.discord"
                v-if="info.community.discord"
                target="_blank"
              >
                <img src="../img/discord.svg" alt="" />
              </a>
            </div>
            <span v-else style="color:#000000;">--</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { superLong } from '@/api/util'
export default {
  props: ['info'],
  data() {
    this.superLong = superLong
    return {
      //
    }
  },
  methods: {
    openUrl() {

    }
  }
}
</script>

<style lang="less">
  .assetsdetails_container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .a_container {
      width: 387px;
      background: #ffffff;
      border-radius: 12px;
      margin-bottom: 20px;
      .a_title {
        font-size: 16px;
        color: #000000;
        line-height: 50px;
        border-bottom: 1px solid #e9e9f8;
        padding-left: 24px;
        font-weight: 550;
      }

      .a_content {
        padding: 0 24px;

        .row-center {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
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
            white-space: nowrap;

          }
          .with-black{
            color: #000000;
          }

          span {
            color: #00db82;
          }

          .img1 {
            display: block;
            width: 20px;
            height: 20px;
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
          line-height: 50px;
        }
      }
    }
  }
</style>