<template>
  <div class="token-info bg-gray">
    <div class="bg-white">
      <h4 class="title font20 w1200">{{ contractsInfo.symbol }}</h4>
    </div>
    <div class="w1200 b-info">
      <h3 class="tabs_title tabs_header capitalize">{{ $t('public.basicInfo') }}</h3>
      <ul class="ul">
        <li class="tabs_infos fl">
          <p>
            {{ $t('public.contractAddress') }}
            <router-link
              class="fr click"
              :to="computePath('contractsInfo', contractsInfo.contractAddress, 'first')">
              {{ contractsInfo.contractAddress }}
            </router-link>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>{{ $t('public.status') }}
            <label v-if="isMobile">
              <span>{{ $t('contractStatus.' + contractsInfo.status) }}</span>
            </label>
            <label v-else>
              <router-link
                v-if="contractsInfo.status === 0"
                class="fr click"
                :to="computePath('contractsInfo', contractsInfo.contractAddress, 'second')">
                {{ $t('contractStatus.' + contractsInfo.status) }}
              </router-link>
              <span v-if="contractsInfo.status !== 0">{{ $t('contractStatus.' + contractsInfo.status) }}</span>
            </label>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>{{ $t('public.passCard') }}<span>{{ contractsInfo.tokenName }}</span></p>
        </li>
        <li class="tabs_infos fl">
          <p>{{ $t('public.abbreviate') }}<span>{{ contractsInfo.symbol }}</span></p>
        </li>
        <li class="tabs_infos fl" v-if="tokenType !== 3">
          <p>{{ $t('contracts.contracts3') }}<span>{{ $formatNumber(contractsInfo.totalSupply) }}</span></p>
        </li>
        <li class="tabs_infos fl" v-if="tokenType === 1">
          <p>{{ $t('tokenInfo.tokenInfo0') }}<span>{{ contractsInfo.decimals }}</span></p>
        </li>
        <li class="tabs_infos fl">
          <p>{{ $t('public.transactionNo') }}<span>{{ contractsInfo.transferCount }}</span></p>
        </li>
        <li class="tabs_infos fl">
          <p>{{ $t('tokenInfo.tokenInfo1') }}<span>{{ contractsInfo.ownersCount }}</span></p>
        </li>
        <li class="tabs_infos fl">
          <p class="addvorder">
            {{ $t('public.createAddress') }}
            <router-link
              class="fr click"
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
    <div class="token-info_table">
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="w1200">
          <el-tab-pane :label="$t('tokenInfo.tokenInfo2')" name="tokenFirst">
            <el-table :data="accountTxList" style="width: 100%" class="mt_20">
              <el-table-column :label="$t('public.height')" width="100" align="left">
                <template slot-scope="scope">
                  <router-link
                    class="click"
                    :to="computePath('blockInfo', scope.row.height)">
                    {{ scope.row.height }}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column label="TXID" min-width="120" align="left">
                <template slot-scope="scope">
                  <router-link
                    class="click"
                    :to="computePath('transactionInfo', scope.row.txHash)">
                    {{ superLong(scope.row.txHash) }}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column :label="$t('public.sender')" min-width="150" align="left">
                <template slot-scope="scope">
                  <router-link
                    v-if="scope.row.fromAddress"
                    class="click"
                    :to="computePath('addressInfo', scope.row.fromAddress)">
                    {{ superLong(scope.row.fromAddress) }}
                  </router-link>
                  <span class="cursor-p click" v-else>--</span>
                </template>
              </el-table-column>
              <!--<el-table-column prop="" label="" width="50" align="center">
                    <template>》88</template>
                  </el-table-column>-->
              <el-table-column :label="$t('public.recipient')" min-width="150" align="left">
                <template slot-scope="scope">
                  <router-link
                    class="click"
                    :to="computePath('addressInfo', scope.row.toAddress)">
                    {{ superLong(scope.row.toAddress) }}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="time" :label="$t('public.time')" min-width="140" align="left"></el-table-column>
              <el-table-column prop="tokenId" label="Token ID" min-width="120" align="left"
                v-if="tokenType === 3"></el-table-column>
              <el-table-column prop="value" :label="$t('public.amount')" min-width="100" align="left"
                v-if="tokenType !== 2">
                <template slot-scope="scope">
                  {{ $formatNumber(scope.row.value) }}
                </template>
              </el-table-column>
              <el-table-column prop="tokenId" label="Token ID" min-width="120" align="left" v-else>
                <template slot-scope="scope">
                  #{{ sliceId(scope.row.tokenId) }} 
                  <img class="click" @click="$copy(scope.row.tokenId)" src="../../assets/img/copy.png" alt="">
                </template>
              </el-table-column>
            </el-table>
            <!--<paging :pager="pager" @change="getItemList" v-show="pager.total > pager.rows"></paging>-->
          </el-tab-pane>
          <el-tab-pane :label="$t('tokenInfo.tokenInfo3')" name="tokenSecond">
            <el-table :data="accountTokensList" style="width: 100%" class="mt_20">
              <el-table-column label="" width="30"></el-table-column>
              <el-table-column :label="$t('tokenInfo.tokenInfo4')" width="150" align="left">
                <template slot-scope="scope">{{ scope.$index + (pager.page - 1) * pager.rows + 1 }}</template>
              </el-table-column>
              <el-table-column :label="$t('public.address')" min-width="280" align="left">
                <template slot-scope="scope">
                  <router-link
                    class="click"
                    :to="computePath('addressInfo', scope.row.address)">
                    {{ scope.row.address }}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column :prop="tokenType === 3 ? 'value' : 'balance'" :label="$t('tokenInfo.tokenInfo5')"
                width="250" align="left"></el-table-column>
              <el-table-column v-if="tokenType === 3" prop="tokenId" label="Token ID" width="250"
                align="left"></el-table-column>
              <el-table-column v-else prop="percentage" :label="$t('tokenInfo.tokenInfo6')" width="250"
                align="left"></el-table-column>
            </el-table>
          </el-tab-pane>
          <PagingBar :pager="pager" @change="changeList" />
        </el-tabs>
      </el-col>
    </div>
  </div>
</template>
  
<script>
import PagingBar from '@/components/pagingBar';
import moment from 'moment'
import { fixNumber, getLocalTime, superLong, timesDecimals } from '@/api/util.js';
import axios from 'axios'
import { CODE_URL } from '@/config'

export default {
  data() {
    return {
      isMobile: false,
      activeName: 'tokenFirst',
      //Contract address
      contractAddress: '',
      tokenType: 0, // 0 - wrongtoken, 1 - NRC20, 2 - NRC721, 3 - NRC1155
      //Contract details
      contractsInfo: [],
      //Token transaction list
      accountTxList: [],
      //List of Coin Holding Accounts
      accountTokensList: [],
      //Paging data
      pager: {
        total: 0,
        page: 1,
        rows: 8,
      }
    }
  },
  components: {
    PagingBar
  },
  created() {
    this.isMobile = /(iPhone|iOS|Android|Windows Phone)/i.test(navigator.userAgent);
    this.contractAddress = this.$route.query.contractAddress;
  },
  mounted() {
    this.getContractsInfoByContractsAddress(this.contractAddress);
  },
  methods: {

    /**
     * Obtain contract details based on the contract address
     */
    getContractsInfoByContractsAddress(contractAddress) {
      this.$post('/', 'getContract', [contractAddress])
        .then((response) => {
          console.log(response);
          if (response.hasOwnProperty("result")) {
            this.getContractAddressInfo(contractAddress);
            response.result.createTime = moment(getLocalTime(response.result.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
            if (response.result.decimals !== 0) {
              response.result.totalSupply = timesDecimals(response.result.totalSupply, response.result.decimals);
            }
            response.result.ownersCount = response.result.owners.length;
            this.tokenType = response.result.tokenType
            this.contractsInfo = response.result;
            this.getAccountTxList()
          }
        }).catch((error) => {
          console.log(error)
        })
    },

    /**
     * Calling authentication methods, Check if it has been authenticated
     * @param contractAddress
     **/
    async getContractAddressInfo(contractAddress) {
      const params = {
        "jsonrpc": "2.0",
        "method": 'getContractAddressInfo',
        "params": [Number(sessionStorage.getItem('chainId')), contractAddress],
        "id": Math.floor(Math.random() * 1000)
      };
      axios.post(CODE_URL, params)
        .then((response) => {
          // console.log(response.data);
          if (response.data.hasOwnProperty("result")) {
            this.contractsInfo.status = response.data.result.status;
          }
        }).catch((error) => {
          console.log(error);
        })
    },

    /**
     * Obtain a list of token transactions
     */
    async getAccountTxList() {
      const method = this.tokenType === 1 ? 'getTokenTransfers' : this.tokenType === 2 ? 'getToken721Transfers' : 'getToken1155Transfers'
      const { page, rows } = this.pager;
      let prest ;
      if(this.$route.query?.state){
        prest = [page, rows, '', this.contractAddress]
      }else{
        prest = [page, rows, '', this.contractAddress, '']
      }
      this.$post('/', method, prest)
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            for (let item of response.result.list) {
              item.time = moment(getLocalTime(item.time * 1000)).format('YYYY-MM-DD HH:mm:ss');
              // item.txHashs = superLong(item.txHash, 6);
              if (item.decimals) {
                item.value = timesDecimals(item.value, item.decimals);
              }
            }
            this.accountTxList = response.result.list;
            this.pager.total = response.result.totalCount;
          }
        }).catch((error) => {
          console.log(error)
        })
    },

    changeList() {
      if (this.activeName === 'tokenFirst') {
        this.getAccountTxList();
      } else {
        this.getAccountTokensList();
      }
    },
    superLong(str, len = 6) {
      return superLong(str, len)
    },


    /**
     * Obtain a list of coin holding accounts
     */
    async getAccountTokensList() {
      const { page, rows } = this.pager;
      const method = this.tokenType === 1 ? 'getContractTokens' : this.tokenType === 2 ? 'getContractToken721s' : 'getContractToken1155s'
      this.$post('/', method, [page, rows, this.contractAddress])
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            let totalSupply = parseInt(this.contractsInfo.totalSupply);
            for (let item of response.result.list) {
              item.time = moment(getLocalTime(item.time)).format('YYYY-MM-DD HH:mm:ss');
              if (item.decimals !== 0) {
                item.balance = timesDecimals(item.balance, item.decimals);
              }
              if (this.tokenType !== 1) {
                item.balance = item.tokenCount
              }
              item.percentage = fixNumber((parseInt(item.balance) / totalSupply) * 100, 5) + '%'
            }
            this.accountTokensList = response.result.list;
            this.pager.total = response.result.totalCount;
          }
        }).catch((error) => {
          console.log(error)
        })
    },

    /**
     * tab switch
     * @param tab
     */
    handleClick(tab) {
      this.activeName = tab.name;
      this.pager = { total: 0, page: 1, rows: 8 };
      this.changeList();
    },

    computePath(name, params, tabName) {
      let query = {};
      if (name === 'tokenInfo') {
        this.contractAddress = params;
        query = { address: params }
      } else if (name === 'addressInfo') {
        query = { address: params }
      } else if (name === 'contractsInfo') {
        query = { contractAddress: params, tabName: tabName }
      } else if (name === 'blockInfo') {
        query = { height: params }
      } else {
        query = { hash: params }
      }
      return { name, query }
    },
    sliceId(id) {
      id = id + ''
      if (id.length > 15) {
        return id.slice(0, 15) + '...'
      }
      return id;
    }
  },
}
</script>
  
<style lang="less">
@import "./../../assets/css/style";

.token-info {

  //min-height: 900px;
  .bg-white {
    margin: 20px auto 0;
    padding-bottom: 10px;
    background: initial;

    @media screen and (max-width: 1000px) {
      padding-bottom: 2.5rem;
    }
  }

  .b-info {
    margin-bottom: 20px;

    .ul {
      // min-height: 215px;
      overflow: hidden;

      li {
        @media screen and (max-width: 1000px) {
          .mobile_s {
            font-size: 0.75rem;
          }
        }
      }
    }
  }

  .token-info_table {
    margin-top: 20px;

    @media screen and (max-width: 1000px) {
      margin: 1rem auto 0;
    }

    .el-tabs__content {
      margin-bottom: 65px;
    }
  }
}

@media (max-width: 1200px) {
  .token-info {
    .w1200 {
      width: initial;
    }

    .b-info {
      .ul {
        .tabs_infos {
          width: 100%;
          border-right: none;

          .addvorder {
            border-bottom: 1px solid #DFE4EF;
          }
        }
      }
    }

    padding: 0 .5rem;
  }
}</style>
