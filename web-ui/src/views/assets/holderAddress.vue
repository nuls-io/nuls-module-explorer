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
                        <p class="nowrap">{{ $t("assets.maximum") }}</p>
                        <p class="nowrap">
                            {{ toThousands(assetInfo.totalSupply) }} {{ assetInfo.symbol }}
                        </p>
                    </div>
                    <div class="row-center">
                        <p>{{ $t("assets.decimal_places") }}</p>
                        <p>{{ assetInfo.decimals }}</p>
                    </div>
                    <div class="row-center">
                        <p>{{ $t("assets.Holder") }}</p>
                        <p>{{ toThousands(assetInfo.addresses) }} <span>(+{{ assetInfo.addressesChangeRate }}%)</span></p>
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
                            <img class="img1" :src="assetInfo.iconUrl" alt="" />
                            {{ assetInfo.sourceChainName }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="a_container">
                <p class="a_title">{{ $t("assets.other_information") }}</p>
                <div class="a_content">
                    <div class="row-center" :class="i18n_locale === 'en' ? 'adaptation' : ''">
                        <p>
                            {{ $t("assets.Token_Contract") }}
                        </p>
                        <p class="with-black">
                            <span v-if="assetInfo.contract">{{Selection(assetInfo.contract)}}</span>
                            <span v-else class="blueness">--</span>
                            <img v-if="assetInfo.contract" class="img2" src="./img/copey.png" alt=""
                                @click="Copy(assetInfo.contract)" />
                        </p>
                    </div>
                    <div class="row-center">
                        <p>{{ $t("bottom.website") }}</p>
                        <p class="cur" @click="openUrl(assetInfo.website)" v-if="assetInfo.website">
                            <span>{{ assetInfo.website }}</span>
                        </p>
                        <span>--</span>
                    </div>
                    <div class="row-center">
                        <p>{{ $t("bottom.community") }}</p>
                        <div class="flex-center" v-if="assetInfo.community">
                            <a :href="assetInfo.community.telegram" v-if="assetInfo.community.telegram" target="_blank">
                                <img src="./img/telegram.svg" alt="" />
                            </a>
                            <a :href="assetInfo.community.twitter" v-if="assetInfo.community.twitter" target="_blank">
                                <img src="./img/twitter.svg" alt="" />
                            </a>
                            <a :href="assetInfo.community.medium" v-if="assetInfo.community.medium" target="_blank">
                                <img src="./img/medium.svg" alt="" />
                            </a>
                            <a :href="assetInfo.community.discord" v-if="assetInfo.community.discord" target="_blank">
                                <img src="./img/discord.svg" alt="" />
                            </a>
                        </div>
                        <span v-else>--</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="assetsdetails-account w1200">
            <div class="box address">
                <p>{{$t('assets.holder_address')}}</p>
                <div>
                    <p class="cur" @click="RouteJump(personalInformation.address)">{{ personalInformation.address }}</p>
                    <img @click="Copy(personalInformation.address)" src="./img/copey.png" alt="">
                </div>
            </div>
            <div class="box">
                <p class="title">{{ $t('public.balance') }}</p>
                <p class="syst">{{ toThousands(timesDecimals(personalInformation.balance, assetInfo.decimals) ) }} {{ assetInfo.symbol }}</p>
            </div>
            <div class="box">
                <p class="title">{{ $t('assetInfo.assetInfo27') }}</p>
                <p class="syst" v-if="personalInformation.value">
                    ${{ toThousands(personalInformation.value) }}
                    <span v-if="personalInformation.nulsValue">(≈{{ toThousands(personalInformation.nulsValue) }}NULS)</span>
                </p>
                <p v-else>--</p>
            </div>
        </div>

        <div class="w1200 a_list_container">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="$t('assets.Trading_Information')" name="first">
                    <div class="nei-lian">
                        <holderAddressTrading :assetKey="assetInfo.id" :decimals="assetInfo.decimals">
                        </holderAddressTrading>
                    </div>
                </el-tab-pane>
                <!-- <el-tab-pane name="second">
                    <span slot="label">{{ $t("contractsInfo.contractsInfo0") }}
                        <img class="a_position" src="./img/dunpai.png" alt="" /></span>
                    <Thecode></Thecode>
                </el-tab-pane>
                <el-tab-pane :label="$t('assets.information')" name="fourth">
                    <information></information>
                </el-tab-pane> -->
            </el-tabs>
        </div>
    </div>
</template>
  
<script>
import holderAddressTrading from "./components/holderAddressTrading";
import Thecode from "./components/Thecode";
import SymbolIcon from "@/components/SymbolIcon.vue";
import { _networkInfo } from "@/api/heterogeneousChainConfig";
import {
    getHeaderInfo,
    divisionDecimals,
    toThousands,
    Copy,
    Plus,
    timesDecimals
} from "../../api/util";
export default {
    components: {
        holderAddressTrading,
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
            personalInformation: {}
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
        this.getByAssetKey()
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
        RouteJump(address){
            this.$router.push('/Accounts/info?address='+address)
        },
        async getByAssetKey() {
            const chainId = sessionStorage.getItem('chainId')
            const result = await this.$post(
                "/",
                "getOneHolderByAssetKey",
                [Number(chainId), this.assetId, this.$route.query.address],
                true
            );
            console.log(result, '中间部分请求接口')
            if (result?.result) {
                this.personalInformation = result.result
            }
        },
        async getAssetInfo() {
            const result = await this.$post(
                "/",
                "getChainAssetInfo",
                [this.assetId],
                true
            );
            console.log(result,'$$$$$$$$$$$$')
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
                    border-right: 1px solid #E9E9F8;
                }
            }

            padding-left: 24px;

            .title {
                font-size: 14px;
                color: #4A4F55;
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
                    color: #00DB82;
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
                    border-bottom: 1px solid #E9E9F8;
                }
            }
        }
    }

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
                    }

                    .with-black {
                        color: #000000;
                        .blueness{
                            color: #00db82;
                        }
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
                    line-height: 50px;
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

@media (max-width: 1200px) {
    .w1200 {
        width: initial;
    }

    .assetsdetails {
        padding: 0 .5rem;

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
}</style>