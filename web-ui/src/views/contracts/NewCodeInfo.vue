<template>
    <div class="NewCodeInfo">
        <div class="info-button">
            <div :class="infoActive == 1 ? 'info-active' : ''" @click="setActive(1)">{{$t('assets.the_contract')}}</div>
            <div :class="infoActive == 2 ? 'info-active' : ''" @click="setActive(2)">{{$t('assets.write_contract')}}</div>
            <div :class="infoActive == 3 ? 'info-active' : ''" @click="setActive(3)">{{$t('assets.sourceCode')}}</div>
        </div>

        <readContract :infoActive="infoActive" v-if="infoActive !== 3"></readContract>

        <CodeInfo v-if="infoActive === 3" :status="contractsInfo.status"
            :certificationTime="certificationTime" v-on:contractStatus="contractStatus"></CodeInfo>
    </div>
</template>

<script>
import { getChainId, getHeaderInfo ,getLocalTime} from '../../api/util'
import readContract from './components/readContract.vue'
import {CODE_URL} from '@/config'
import axios from 'axios'
import CodeInfo from './CodeInfo.vue'
import moment from 'moment'
export default {
    props:['certificationTime'],
    components: {
        readContract,
        CodeInfo
    },
    data() {
        return {
            infoActive: 1, //1读合约，2写合约，3方法
            //合约详情
            contractsInfo: {},
        }
    },
    watch:{
        certificationTime:{
            handler(newval){
                this.certificationTime = moment(getLocalTime(newval)).format('YYYY-MM-DD HH:mm:ss');
            },
            immediate: true
        }
    },
    created() {
        if (this.$route.query.infoActive) {
            this.infoActive = this.$route.query.infoActive
        } else {
            this.infoActive = 1
        }
        this.getContractsInfoByContractsAddress(this.$route.query.contractAddress);
        getHeaderInfo()
    },
    methods: {
        /**
     * 获取子组件的状态值
     * @param contractStatus
     **/
        contractStatus(contractStatus) {
            this.contractsInfo.status = contractStatus
        },
        /**
         * 根据合约地址获取合约详情
         * @param address
        */
        getContractsInfoByContractsAddress(address) {
            const params = { "jsonrpc": "2.0", "method": 'getContract', "params": [Number(getChainId()), address], "id": Math.floor(Math.random() * 1000) };
            axios.post('/', params)
                .then((response) => {
                    console.log(response, '=response.data.result')
                    if (response.data.hasOwnProperty("result")) {
                        this.getContractAddressInfo(address);
                        response.data.result.createTime = moment(getLocalTime(response.data.result.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
                        
                        this.contractsInfo = response.data.result;
                    }
                }).catch((error) => {
                    console.log(error)
                })
        },
        /**
       * 调用认证方法
       * @param contractsAddress
       **/
        async getContractAddressInfo(contractsAddress) {
            const params = {
                "jsonrpc": "2.0",
                "method": 'getContractAddressInfo',
                "params": [Number(sessionStorage.getItem('chainId')), contractsAddress],
                "id": Math.floor(Math.random() * 1000)
            };
            if (CODE_URL) {
                axios.post(CODE_URL, params)
                    .then((response) => {
                        if (response.data.hasOwnProperty("result")) {
                            this.contractsInfo.status = response.data.result.status;
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
            } else {
                this.contractsInfo.status = 0;
            }

        },
        setActive(val) {
            this.infoActive = val
        }
    }
}
</script>

<style lang="less" scoped>
.NewCodeInfo {

    .nabox-wallet {
        width: 160px;
        height: 36px;
        border-radius: 8px;
        border: 1px solid #EBEBF4;
        background: #F2F7FF;
        font-size: 14px;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 12px;

        .info-error,
        .info-success {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #F64141;
            margin-right: 8px;
        }

        .info-success {
            background: #00DB82;
        }
    }

    .info-button {
        display: flex;
        align-items: center;

        div {
            cursor: pointer;
            padding: 6px 10px;
            background: #F2F7FF;
            color: #000000;
            font-size: 14px;
            width: fit-content;
            margin-right: 16px;
            border-radius: 6px;
        }

        .info-active {
            background: #00DB82;
            color: #FFFFFF;
        }
    }
}

@media (max-width:1220px) {
    .w1200 {
        width: initial;
    }
}
</style>