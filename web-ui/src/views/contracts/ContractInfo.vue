<template>
  <div class="contracts-info bg-gray">
    <div class="bg-white">
      <h4 class="font20 w1200">
        {{ contractsAddress }}
        <img class="cur" src="../../assets/img/Icon.png" alt="" :title="$t('public.copy')"
          @click="$copy(contractsAddress)">
      </h4>
    </div>
    <div class="w1200 b-info">
      <h3 class="tabs_title tabs_header">{{ $t('public.basicInfo') }}</h3>
      <ul class="ul">
        <li class="tabs_infos fl">
          <p>{{ $t('assets.Contract_address') }}
            <router-link
              class="fr click mobile_s"
              :to="computePath('addressInfo', contractsInfo.creater)">
              {{ contractsInfo.contractAddress }}
            </router-link>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>
            {{ $t('public.status') }}
            <span>{{ $t('contractStatus.' + contractsInfo.status) }}</span>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>{{ $t('public.passCard') }}
            <router-link
              class="fr click"
              :to="computePath('tokenInfo', contractsAddress)">
              {{ contractsInfo.tokenName || '-' }}
            </router-link>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>{{ $t('public.abbreviate') }}
            <span>{{ contractsInfo.symbol || '-' }}</span>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>
            {{ $t('home.home3') }}
            <span>{{ $formatNumber(contractsInfo.totalSupply) }}</span>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>
            {{ $t('tokenInfo.tokenInfo0') }}
            <span>{{ contractsInfo.decimals }}</span>
          </p>
        </li>

        <li class="tabs_infos fl">
          <p>{{ $t('public.transactionNo') }}<span>{{ contractsInfo.transferCount }}</span></p>
        </li>
        <li class="tabs_infos fl">
          <p>{{ $t('tokenInfo.tokenInfo1') }}<span>{{ contractsInfo.ownersCount }}</span></p>
        </li>
        <li class="tabs_infos fl">
          <p>{{ $t('public.createAddress') }}
            <router-link
              class="fr click mobile_s"
              :to="computePath('addressInfo', contractsInfo.creater)">
              {{ contractsInfo.creater }}
            </router-link>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>{{ $t('public.createTime') }}<span>{{ contractsInfo.createTime }}</span></p>
        </li>
      </ul>
    </div>

    <div class="w1200 contracts-tab">
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="$t('public.transactionList')" name="first">
            <!-- <SelectBar v-model="contractsTypeRegion" :typeOptions="contractsStatusOptions" typeName="type"
                       @change="changeType"></SelectBar> -->
            <el-table :data="contractsTxList" style="width: 100%;margin-top: 14px">
              <el-table-column prop="height" :label="$t('public.height')" width="100" align="left">
                <template slot-scope="scope">
                  <router-link
                    class="click"
                    :to="computePath('blockInfo', scope.row.blockHeight)">
                    {{ scope.row.blockHeight }}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column :label="$t('public.contractMethod')" width="150" align="left">
                <template slot-scope="scope">
                  <span>{{ titleCase(scope.row.contractMethod) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="TXID" min-width="280" align="left">
                <template slot-scope="scope">
                  <router-link
                    class="click"
                    :to="computePath('transactionInfo', scope.row.txHash)">
                    {{ scope.row.txHashs }}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="time" :label="$t('public.time')" width="180" align="left"></el-table-column>
              <el-table-column prop="type" :label="$t('public.type')" width="180" align="left">
                <template slot-scope="scope">{{ titleCase($t('type.' + scope.row.type))  }}</template>
              </el-table-column>
              <el-table-column :label="$t('public.fee')" width="180" align="left">
                <template slot-scope="scope">{{ scope.row.fee.value }} {{ scope.row.fee.symbol }}</template>
              </el-table-column>
            </el-table>
            <paging :pager="pager" @change="pagesList" v-show="pager.total > pager.rows"></paging>

          </el-tab-pane>
          <el-tab-pane v-if="!isMobile" name="second"
            :disabled="contractsInfo.status === -1 || contractsInfo.status === 3">
            <span slot="label">
              {{ $t('public.contract') }}
              <img v-if="contractsInfo.status == 2" src="./img/Certification.svg" class="authenticate" alt="" srcset="">
            </span>
            <div v-if="activeName === 'second'">
              <NewCodeInfo :certificationTime="certificationTime"></NewCodeInfo>
            </div>
          </el-tab-pane>

          <el-tab-pane :label="$t('transactionInfo.transactionInfo9')" name="three" v-if="false">
            <el-table :data="modeList" style="width: 100%" class="mt_20">
              <el-table-column label="" width="30"></el-table-column>
              <el-table-column prop="name" label="Method" width="280" align="left"></el-table-column>
              <el-table-column prop="height" label="Parameter" min-width="280" align="left">
                <template slot-scope="scope">
                  <span v-for="(item, index) in scope.row.params" :key="index">{{ item }}-</span>
                </template>
              </el-table-column>
              <el-table-column prop="returnType" label="Return Type" width="280" align="left"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import paging from '@/components/pagingBar';
import SelectBar from '@/components/SelectBar';
import CodeInfo from '@/views/contracts/CodeInfo';
import { getLocalTime, superLong, divisionDecimals, timesDecimals ,titleCase } from '@/api/util.js'
import axios from 'axios'
import { CODE_URL } from '@/config'
import NewCodeInfo from './NewCodeInfo'
import { NSymbol, NDecimals, NULSDecimals, NKey } from '@/constants/constants'

export default {
  data() {
    return {
      titleCase,
      timesDecimals,
      symbol: sessionStorage.hasOwnProperty('symbol') ? sessionStorage.getItem('symbol') : 'NULS',//symbol
      decimals: sessionStorage.hasOwnProperty('decimals') ? Number(sessionStorage.getItem('decimals')) : 8,//decimals
      isMobile: false,
      activeName: this.$route.query.tabName,
      //Contract address
      contractsAddress: this.$route.query.contractAddress,
      //Contract details
      contractsInfo: [],
      //Contract transaction type
      contractsStatusOptions: [
        { value: 0, label: '0' },
        { value: 15, label: '15' },
        { value: 16, label: '16' },
        { value: 17, label: '17' },
        { value: 18, label: '18' },
      ],
      contractsTypeRegion: 0,
      //Contract Transaction List
      contractsTxList: [],
      //Method List
      modeList: [],
      //Paging data
      pager: {
        total: 0,
        page: 1,
        rows: 15,
      },
      certificationTime: "null",
      //Address Timer
      contractAddressInterval: null,
    }
  },
  components: {
    paging,
    CodeInfo,
    SelectBar,
    NewCodeInfo
  },
  watch: {
    contractsAddress: function () {
      // contractsAddressWhen releasing changes, retrieve data again
      //console.log('new: %s, old: %s', val, oldVal);
      this.activeName = 'first';
      this.getContractsInfoByContractsAddress(this.contractsAddress);
      this.contractsTypeRegion = 0;
      this.pager = { total: 0, page: 1, rows: 15, };
      this.getConsensusTxList(this.pager.page, this.pager.rows, this.contractsTypeRegion, this.contractsAddress);
    }
  },
  created() {
    this.isMobile = /(iPhone|iOS|Android|Windows Phone)/i.test(navigator.userAgent);
    this.getContractsInfoByContractsAddress(this.contractsAddress);
    this.getConsensusTxList(this.pager.page, this.pager.rows, this.contractsTypeRegion, this.contractsAddress);
  },
  mounted() {
    //Timed address acquisition
    this.contractAddressInterval = setInterval(() => {
      this.contractsAddress = this.$route.query.contractAddress;
    }, 500)
  },
  beforeDestroy() {
    //Leave the interface to clear the timer
    if (this.contractAddressInterval) {
      clearInterval(this.contractAddressInterval);
    }
  },
  methods: {
    /**
     * Get the status values of sub components
     * @param contractStatus
     **/
    contractStatus(contractStatus) {
      this.contractsInfo.status = contractStatus
    },

    /**
     * Obtain contract details based on the contract address
     * @param address
     */
    getContractsInfoByContractsAddress(address) {
      this.$post('/', 'getContract', [address])
        .then((response) => {
          //console.log(response);
          //console.log(response.result.status);
          if (response.hasOwnProperty("result")) {
            this.getContractAddressInfo(address);
            response.result.createTime = moment(getLocalTime(response.result.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
            if (response.result.owners != null) {
              response.result["ownersCount"] = response.result.owners.length;
            } else {
              response.result["ownersCount"] = 0;
            }
            response.result.totalSupply = divisionDecimals(response.result.totalSupply, response.result.decimals)
            this.contractsInfo = response.result;
            this.modeList = response.result.methods;
          }
        }).catch((error) => {
          console.log(error)
        })
    },

    /**
     * Calling authentication methods
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
              // console.log(response.data.result.certificationTime, 'Calling authentication methods')
              this.certificationTime = response.data.result.certificationTime;
              this.contractsInfo.status = response.data.result.status;
            }
          }).catch((error) => {
            console.log(error);
          })
      } else {
        this.contractsInfo.status = 0;
      }
    },

    /**
     *  Sort by data type
     *  @param type
     **/
    changeType(type) {
      this.contractsTypeRegion = parseInt(type);
      this.pagesList();
    },

    /**
     * Obtain contract transaction records
     * @param page
     * @param rows
     * @param type
     * @param contractsAddress
     */
    async getConsensusTxList(page, rows, type, contractsAddress) {
      this.$post('/', 'getContractTxList', [page, rows, type, contractsAddress])
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            for (let item of response.result.list) {
              item.time = moment(getLocalTime(item.time * 1000)).format('YYYY-MM-DD HH:mm:ss');
              item.txHashs = superLong(item.txHash, 20);
              const feeKey = item.fee.chainId + '-' + item.fee.assetId
              const decimals = feeKey === NKey ? NDecimals : item.fee.decimals
              const symbol = feeKey === NKey ? NSymbol : item.fee.symbol
              item.fee.value = divisionDecimals(item.fee.value, decimals);
              item.fee.symbol = symbol
            }
            this.contractsTxList = response.result.list;
            this.pager.total = response.result.totalCount;
          }
        }).catch((error) => {
          console.log(error)
        })
    },

    /**
     * Paging function
     **/
    pagesList() {
      this.getConsensusTxList(this.pager.page, this.pager.rows, this.contractsTypeRegion, this.contractsAddress);
    },

    handleClick() {
      //console.log(tab, event);
    },

    computePath(name, params) {
      let query = {};
      if (name === 'addressInfo') {
        query = { address: params }
      } else if (name === 'transactionInfo') {
        query = { hash: params }
      } else if (name === 'tokenInfo') {
        query = { contractAddress: params ,state: true}
      } else {
        query = { height: params }
      }
      return { name, query }
    }
  },
}
</script>

<style lang="less">
.contracts-info {

  //min-height: 950px;
  .bg-white {
    background: initial;

    h4 {
      color: #000000;
      font-weight: 600;
      padding: 24px 0;

      img {
        width: 14px;
        height: 14px;
      }
    }
  }

  .b-info {
    h3 {
      margin: 0;
      background: #FFFFFF;
      color: #000000;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }

    .ul {
      min-height: 214px;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;

      li {
        background: #FFFFFF;

        p {
          border-bottom: 1px solid #E9E9F8;
          position: relative;
          z-index: 999;
        }

        @media screen and (max-width: 1000px) {
          .mobile_s {
            font-size: 0.8rem;
          }
        }
      }
    }
  }

  .contracts-tab {
    margin-top: 24px;

    .el-col {
      margin-bottom: 100px;
    }

    .el-tabs {
      padding: 16px 24px 24px;
      border-radius: 12px;
      background: #FFFFFF;

      .authenticate {
        position: relative;
        top: -6px;
      }

      .el-tabs__header {
        .el-tabs__nav-wrap {
          .el-tabs__item {
            color: #000000;
          }

          .el-tabs__active-bar {
            background: #00DB82;
          }

          .is-active {
            color: #00DB82;
            font-weight: 550;
          }
        }
      }
    }

    margin: 1rem auto 0;
  }

  .el-tabs__content {
    margin-bottom: 0;
  }
}

@media (max-width:1220px) {
  .w1200 {
    width: initial;
  }

  .contracts-info {
    padding: 0 .5rem;

    @media (max-width: 600px) {
      .bg-white h4 {
        font-size: 14px;
      }
    }

    .b-info .ul .tabs_infos,
    .info_tabs .ul .tabs_infos {
      width: 50%;
    }
  }
}

@media(max-width: 600px) {

  .b-info .ul .tabs_infos p,
  .info_tabs .ul .tabs_infos p {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    white-space: nowrap;
  }
}</style>
