<template>
  <div class="token-info bg-gray">
    <div class="bg-white">
      <h4 class="title font20 w1200">{{contractsInfo.symbol}}</h4>
    </div>
    <div class="w1200 b-info">
      <h3 class="tabs_title tabs_header capitalize">{{$t('public.basicInfo')}}</h3>
      <ul class="ul">
        <li class="tabs_infos fl">
          <p>{{$t('public.contractAddress')}}
            <span class="click mobile_s" @click="toUrl('contractsInfo',contractsInfo.contractAddress,'first')">
            {{contractsInfo.contractAddress}}
          </span>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>{{$t('public.status')}}
            <label v-if="isMobile">
              <span>{{$t('contractStatus.'+contractsInfo.status)}}</span>
            </label>
            <label v-else>
              <span class="cursor-p click" v-if="contractsInfo.status ===0"
                    @click="toUrl('contractsInfo',contractsInfo.contractAddress,'second')">{{$t('contractStatus.'+contractsInfo.status)}}</span>
              <span v-if="contractsInfo.status !==0">{{$t('contractStatus.'+contractsInfo.status)}}</span>
            </label>
          </p>
        </li>
        <li class="tabs_infos fl"><p>{{$t('public.passCard')}}<span>{{contractsInfo.tokenName}}</span></p></li>
        <li class="tabs_infos fl"><p>{{$t('public.abbreviate')}}<span>{{contractsInfo.symbol}}</span></p></li>
        <li class="tabs_infos fl"><p>{{$t('contracts.contracts3')}}<span>{{contractsInfo.totalSupply}}</span></p></li>
        <li class="tabs_infos fl" v-if="!isNrc721"><p>{{$t('tokenInfo.tokenInfo0')}}<span>{{contractsInfo.decimals}}</span></p></li>
        <li class="tabs_infos fl"><p>{{$t('public.transactionNo')}}<span>{{contractsInfo.transferCount}}</span></p></li>
        <li class="tabs_infos fl"><p>{{$t('tokenInfo.tokenInfo1')}}<span>{{contractsInfo.ownersCount}}</span></p></li>
        <li class="tabs_infos fl"><p>{{$t('public.createAddress')}}<span class="mobile_s click"
                                                                         @click="toUrl('addressInfo',contractsInfo.creater)">{{contractsInfo.creater}}</span>
        </p></li>
        <li class="tabs_infos fl"><p>{{$t('public.createTime')}}<span>{{contractsInfo.createTime}}</span></p></li>
      </ul>
    </div>
    <div class="token-info_table">
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="w1200">
          <el-tab-pane :label="$t('tokenInfo.tokenInfo2')" name="tokenFirst">
            <el-table :data="accountTxList" stripe border style="width: 100%" class="mt_20">
              <el-table-column :label="$t('public.height')" width="100" align="left">
                <template slot-scope="scope">
                  <span class="cursor-p click"
                        @click="toUrl('blockInfo',scope.row.height)">{{ scope.row.height }}</span>
                </template>
              </el-table-column>
              <el-table-column label="TXID" min-width="120" align="left">
                <template slot-scope="scope">
                  <span class="cursor-p click" @click="toUrl('transactionInfo',scope.row.txHash)">{{ superLong(scope.row.txHash) }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('public.sender')" min-width="180" align="left">
                <template slot-scope="scope">
                  <span class="cursor-p click" @click="toUrl('addressInfo',scope.row.fromAddress)">{{ superLong(scope.row.fromAddress) }}</span>
                </template>
              </el-table-column>
              <!--<el-table-column prop="" label="" width="50" align="center">
                  <template>》88</template>
                </el-table-column>-->
              <el-table-column :label="$t('public.recipient')" min-width="180" align="left">
                <template slot-scope="scope"><span class="cursor-p click"
                                                   @click="toUrl('addressInfo',scope.row.toAddress)">{{ superLong(scope.row.toAddress) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" :label="$t('public.time')" width="170" align="left"></el-table-column>
              <el-table-column prop="value" :label="$t('public.amount')" width="100" align="left" v-if="!isNrc721"></el-table-column>
              <el-table-column prop="tokenId" label="Token ID" width="100" align="left" v-else></el-table-column>
            </el-table>
            <!--<paging :pager="pager" @change="getItemList" v-show="pager.total > pager.rows"></paging>-->
          </el-tab-pane>
          <el-tab-pane :label="$t('tokenInfo.tokenInfo3')" name="tokenSecond">
            <el-table :data="accountTokensList" stripe border style="width: 100%" class="mt_20">
              <el-table-column label="" width="30"></el-table-column>
              <el-table-column :label="$t('tokenInfo.tokenInfo4')" width="150" align="left">
                <template slot-scope="scope">{{scope.$index+(pager.page - 1) * pager.rows + 1}}</template>
              </el-table-column>
              <el-table-column :label="$t('public.address')" min-width="280" align="left">
                <template slot-scope="scope"><span class="cursor-p click"
                                                   @click="toUrl('addressInfo',scope.row.address)">{{ scope.row.address }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="balance" :label="$t('tokenInfo.tokenInfo5')" width="250"
                               align="left"></el-table-column>
              <el-table-column prop="percentage" :label="$t('tokenInfo.tokenInfo6')" width="250"
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
  import {CODE_URL} from '@/config'

  export default {
    data() {
      return {
        isMobile: false,
        activeName: 'tokenFirst',
        //合约地址
        contractAddress: '',
        isNrc721: false, // 是否是nrc721
        //合约详情
        contractsInfo: [],
        //通证交易列表
        accountTxList: [],
        //持币账户列表
        accountTokensList: [],
        //分页数据
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
      // this.isNrc721 = !!this.$route.query.nrc721;
    },
    mounted() {
      this.getContractsInfoByContractsAddress(this.contractAddress);
    },
    methods: {

      /**
       * 根据合约地址获取合约详情
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
              this.isNrc721 = !response.result.nrc20;
              this.contractsInfo = response.result;
              this.getAccountTxList()
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * 调用认证方法, 查询是否已认证
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
            console.log(response.data);
            if (response.data.hasOwnProperty("result")) {
              this.contractsInfo.status = response.data.result.status;
            }
          }).catch((error) => {
          console.log(error);
        })
      },

      /**
       * 获取通证交易列表
       */
      async getAccountTxList() {
        const method = this.isNrc721 ? 'getToken721Transfers' : 'getTokenTransfers';
        const { page, rows } = this.pager;
        this.$post('/', method, [page, rows, '', this.contractAddress])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.time = moment(getLocalTime(item.time * 1000)).format('YYYY-MM-DD HH:mm:ss');
                // item.txHashs = superLong(item.txHash, 6);
                if (item.decimals !== 0) {
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
       * 获取持币账户列表
       */
      async getAccountTokensList() {
        const { page, rows } = this.pager;
        const method = this.isNrc721 ? 'getContractToken721s' : 'getContractTokens';
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
                if (this.isNrc721) {
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
       * tab 切换
       * @param tab
       */
      handleClick(tab) {
        this.activeName = tab.name;
        this.pager = {total: 0, page: 1, rows: 8};
        this.changeList();
      },

      /**
       * url 连接跳转
       * @param name
       * @param parmes
       * @param tabName
       */
      toUrl(name, parmes, tabName) {
        let newQuery = {};
        if (name === 'tokenInfo') {
          this.contractAddress = parmes;
          newQuery = {address: parmes}
        } else if (name === 'addressInfo') {
          newQuery = {address: parmes}
        } else if (name === 'contractsInfo') {
          newQuery = {contractAddress: parmes, tabName: tabName}
        } else if (name === 'blockInfo') {
          newQuery = {height: parmes}
        } else {
          newQuery = {hash: parmes}
        }
        this.$router.push({
          name: name,
          query: newQuery
        })
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
      @media screen and (max-width: 1000px) {
        padding-bottom: 2.5rem;
      }
    }
    .b-info {
      margin-bottom: 20px;
      .ul {
        min-height: 215px;
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
        width: 95%;
        margin: 1rem auto 0;
      }
      .el-tabs__content {
        margin-bottom: 65px;
      }
    }
  }

</style>
