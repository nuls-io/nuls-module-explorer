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
        <li class="tabs_infos fl"><p>{{$t('tokenInfo.tokenInfo0')}}<span>{{contractsInfo.decimals}}</span></p></li>
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
              <el-table-column :label="$t('public.height')" width="80" align="left">
                <template slot-scope="scope">
                  <span class="cursor-p click"
                        @click="toUrl('blockInfo',scope.row.height)">{{ scope.row.height }}</span>
                </template>
              </el-table-column>
              <el-table-column label="TXID" min-width="100" align="left">
                <template slot-scope="scope">
                  <span class="cursor-p click" @click="toUrl('transactionInfo',scope.row.txHash)">{{ scope.row.txHashs }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('public.sender')" width="360" align="left">
                <template slot-scope="scope">
                  <span class="cursor-p click" @click="toUrl('addressInfo',scope.row.fromAddress)">{{ scope.row.fromAddress }}</span>
                </template>
              </el-table-column>
              <!--<el-table-column prop="" label="" width="50" align="center">
                  <template>》88</template>
                </el-table-column>-->
              <el-table-column :label="$t('public.recipient')" width="360" align="left">
                <template slot-scope="scope"><span class="cursor-p click"
                                                   @click="toUrl('addressInfo',scope.row.toAddress)">{{ scope.row.toAddress }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" :label="$t('public.time')" width="160" align="left"></el-table-column>
              <el-table-column prop="value" :label="$t('public.amount')" width="100" align="left"></el-table-column>
            </el-table>

            <div class="paging">
              <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
                             v-show="pager.total > pager.rows"
                             :total="pager.total"
                             :current-page.sync="pager.page"
                             :page-size="pager.rows"
                             @current-change="accountTxListPage">
              </el-pagination>
            </div>
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
            <div class="paging">
              <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
                             v-show="pager.total > pager.rows"
                             :total="pager.total"
                             :current-page.sync="pager.page"
                             :page-size="pager.rows"
                             @current-change="accountTokensListPage">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import {getLocalTime, superLong, timesDecimals} from '@/api/util.js'
  import axios from 'axios'
  import {CODE_URL} from '@/config'

  export default {
    data() {
      return {
        isMobile: false,
        activeName: 'tokenFirst',
        //合约地址
        contractsAddress: this.$route.query.contractAddress,
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
    components: {},
    created() {
      this.isMobile = /(iPhone|iOS|Android|Windows Phone)/i.test(navigator.userAgent);
    },
    mounted() {
      this.getContractsInfoByContractsAddress(this.contractsAddress);
      this.getAccountTxList(this.pager.page, this.pager.rows, '', this.contractsAddress);
    },
    methods: {

      /**
       * 根据合约地址获取合约详情
       */
      getContractsInfoByContractsAddress(contractsaddress) {
        this.$post('/', 'getContract', [contractsaddress])
          .then((response) => {
            console.log(response);
            if (response.hasOwnProperty("result")) {
              this.getContractAddressInfo(contractsaddress);
              response.result.createTime = moment(getLocalTime(response.result.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              if (response.result.decimals !== 0) {
                response.result.totalSupply = timesDecimals(response.result.totalSupply, response.result.decimals);
              }
              response.result.ownersCount = response.result.owners.length;
              this.contractsInfo = response.result;
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
      async getAccountTxList(page, rows, address, contractsAddress) {
        this.$post('/', 'getTokenTransfers', [page, rows, address, contractsAddress])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.time = moment(getLocalTime(item.time * 1000)).format('YYYY-MM-DD HH:mm:ss');
                item.txHashs = superLong(item.txHash, 6);
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

      /**
       * 获取通证交易列表 分页
       */
      accountTxListPage() {
        this.getAccountTxList(this.pager.page, this.pager.rows, '', this.contractsAddress);
      },

      /**
       * 获取持币账户列表
       */
      async getAccountTokensList(page, rows, contractsAddress) {
        this.$post('/', 'getContractTokens', [page, rows, contractsAddress])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              let totalSupply = parseInt(this.contractsInfo.totalSupply);
              for (let item of response.result.list) {
                item.time = moment(getLocalTime(item.time)).format('YYYY-MM-DD HH:mm:ss');
                if (item.decimals !== 0) {
                  item.balance = timesDecimals(item.balance, item.decimals);
                }
                item.percentage = ((parseInt(item.balance) / totalSupply) * 100).toFixed(5) + '%'
              }
              this.accountTokensList = response.result.list;
              this.pager.total = response.result.totalCount;
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * 获取持币账户列表 分页
       */
      accountTokensListPage() {
        this.getAccountTokensList(this.pager.page, this.pager.rows, this.contractsAddress);
      },

      /**
       * tab 切换
       * @param tab
       */
      handleClick(tab) {
        this.activeName = tab.name;
        if (tab.name === 'tokenFirst') {
          this.pager = {total: 0, page: 1, rows: 8};
          this.getAccountTxList(this.pager.page, this.pager.rows, '', this.contractsAddress);
        } else {
          this.pager = {total: 0, page: 1, rows: 8};
          this.getAccountTokensList(this.pager.page, this.pager.rows, this.contractsAddress);
        }
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
          this.contractsAddress = parmes;
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
