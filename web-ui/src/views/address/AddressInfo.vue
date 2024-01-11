<template>
  <div class="address-info bg-gray">
    <div class="bg-white">
      <div class="title font24 w1200">{{address}}
        <i class="iconfont icon-copy_icon click" :title="$t('public.copy')" @click="copy(address)"></i>
      </div>
    </div>
    <div class="top w1200">
      <div class="top-left fl">
        <h3 class="tabs_title tabs_header capitalize">{{$t('addressList.addressList0')}}</h3>
        <div class="pie fl">
          <!-- <div id="mountNode"></div>-->
          <ve-pie height="300px"
                  :legend-visible="false"
                  :settings="chartSettings"
                  :colors="colors"
                  :data="chartData">
          </ve-pie>
          <div class="a_total">
            <div class="font14 capitalize">{{$t('public.balance')}}</div>
            <div class="font18">{{$toThousands(addressInfo.totalBalance)}} {{symbol}}</div>
            <ul class="chart_title">
              <li><span></span>{{$t('public.consensusLocking')}} {{$toThousands(addressInfo.totalLocks)}}</li>
              <li><span></span>{{$t('public.usablebalance')}} {{$toThousands(addressInfo.balances)}}</li>
              <!--<li><span></span>{{$t('public.timeLocking')}}</li>-->
            </ul>
          </div>
        </div>
      </div>
      <div class="top-right fl">
        <h3 class="tabs_title tabs_header capitalize">{{$t('public.basicInfo')}}</h3>
        <ul class="total_ul">
          <li class="tabs_infos capitalize" v-if="isMobile">{{$t('public.balance')}}
            <span class="fr">{{$toThousands(addressInfo.totalBalance)}}</span>
          </li>
          <li class="tabs_infos capitalize" v-if="isMobile">{{$t('public.usablebalance')}}
            <span class="fr">{{$toThousands(addressInfo.balances)}}</span>
          </li>
          <li class="tabs_infos capitalize" v-if="isMobile">{{$t('public.consensusLocking')}}
            <span class="fr">{{$toThousands(addressInfo.totalLocks)}}</span>
          </li>

          <li class="tabs_infos capitalize">{{$t('public.alias')}}
            <span class="fr">{{addressInfo.alias  ? addressInfo.alias : '-' }}</span>
          </li>
          <li class="tabs_infos capitalize">{{$t('public.transactionNo')}}<span
                  class="fr">{{$toThousands(addressInfo.txCount)}}</span></li>
          <li class="tabs_infos capitalize">{{$t('public.address')+$t('public.type')}}<span class="fr">{{$t('addressType.'+addressInfo.type)}}</span>
          </li>
          <li class="tabs_infos capitalize">{{$t('addressList.addressList1')}}<span class="fr">{{$toThousands(addressInfo.totalIn)}} {{symbol}}</span>
          </li>
          <li class="tabs_infos capitalize">{{$t('addressList.addressList2')}}<span class="fr">{{$toThousands(addressInfo.totalOut)}} {{symbol}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="cb"></div>
    <div class="bottoms w1200 cb">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('public.txList')" name="addressFirst">
          <SelectBar v-model="typeRegion" @change="changeType"></SelectBar>
          <el-table :data="txList" style="width: 100%;" class="mt_20" v-loading="txListLoading">
            <el-table-column :label="$t('public.height')" width="90" align="left">
              <template slot-scope="scope"><span class="cursor-p click" @click="toUrl('blockInfo',scope.row.height)">{{ scope.row.height }}</span>
              </template>
            </el-table-column>
            <el-table-column label="TXID" min-width="250" align="left">
              <template slot-scope="scope">
                <span class="cursor-p click"
                      @click="toUrl('transactionInfo',scope.row.txHash)">{{ scope.row.txHashs }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" :label="$t('public.time')" width="160" align="left"></el-table-column>
            <el-table-column :label="$t('public.type')" width="150" align="left">
              <template slot-scope="scope">
                <span>{{ $t('type.'+scope.row.type) }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('public.amount')" width="180" align="left">
              <template slot-scope="scope">{{ $toThousands(scope.row.values) }}{{scope.row.symbol}}</template>
            </el-table-column>
            <el-table-column :label="$t('public.balance')" min-width="180" align="left">
              <template slot-scope="scope">{{ $toThousands(scope.row.balance) }}{{scope.row.symbol}}</template>
            </el-table-column>
            <el-table-column :label="$t('public.fee')" width="150" align="left">
              <template slot-scope="scope">{{ scope.row.fees }}{{symbol}}</template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('public.tokenTrading')" name="addressSecond">
          <el-select v-model="tokenValue" @change="changeToken">
            <el-option v-for="item in tokenOptions" :key="item[0]" :label="item[1]" :value="item[0]">
            </el-option>
          </el-select>
          <el-table :data="tokenList" style="width: 100%" class="mt_20" v-loading="tokenListLoading">
            <el-table-column label="" width="30">
            </el-table-column>
            <el-table-column prop="height" :label="$t('public.height')" width="80" align="left">
              <template slot-scope="scope"><span class="cursor-p click" @click="toUrl('blockInfo',scope.row.height)">{{ scope.row.height }}</span>
              </template>
            </el-table-column>
            <el-table-column label="TXID" width="200" align="left">
              <template slot-scope="scope">
                <span class="cursor-p click"
                      @click="toUrl('transactionInfo',scope.row.txHash)">{{ scope.row.txHashs }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('public.sender')" width="150" align="left">
              <template slot-scope="scope">
                <span class="cursor-p click" @click="toUrl('addressInfo',scope.row.fromAddress)">{{ scope.row.fromAddresss }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('public.recipient')" width="150" align="left">
              <template slot-scope="scope">
                <span class="cursor-p click" @click="toUrl('addressInfo',scope.row.toAddress)">{{ scope.row.toAddresss }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" :label="$t('public.time')" width="160" align="left"></el-table-column>
            <el-table-column :label="$t('public.amount')" width="180" align="left">
              <template slot-scope="scope">
                <span v-show="scope.row.showValue" class="fCN">+{{ $toThousands(scope.row.value) }} </span>
                <span v-show="!scope.row.showValue" class="fred">-{{ $toThousands(scope.row.value)}} </span>
                {{ scope.row.symbol }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('public.balance')" width="200" align="left">
              <template slot-scope="scope">{{address === scope.row.fromAddress ? $toThousands(scope.row.fromBalance) :
                $toThousands(scope.row.toBalance)}} {{scope.row.symbol }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('addressList.addressList3')" name="addressThree">
          <el-table :data="nrc20List" style="width: 100%" class="mt_20" v-loading="nrc20ListLoading">
            <el-table-column label="" width="30"></el-table-column>
            <el-table-column prop="tokenName" :label="$t('public.passCard')" width="120"
                             align="left"></el-table-column>
            <el-table-column :label="$t('public.abbreviate')" width="120" align="left">
              <template slot-scope="scope">
                <span class="cursor-p click" @click="toUrl('tokenInfo',scope.row.contractAddress, scope.row.address)">
                  {{ scope.row.tokenSymbol }}
                  <span v-if="scope.row.status ===3" class="gray">{{$t('public.unavailable')}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('public.contractAddress')" min-width="180" align="left">
              <template slot-scope="scope">
                <div class="cursor-p click flex-center" @click="toUrl('contractsInfo',scope.row.contractAddress)">
                  {{ scope.row.contractAddress }}
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('public.balance')" width="180" align="left">
              <template slot-scope="scope">{{ $toThousands(scope.row.balance) }}{{ scope.row.tokenSymbol }}</template>
            </el-table-column>
            <el-table-column :label="$t('public.usablebalance')" width="180" align="left">
              <template slot-scope="scope">{{ $toThousands(scope.row.available) }}{{ scope.row.tokenSymbol }}</template>
            </el-table-column>
            <el-table-column :label="$t('public.consensusLocking')" width="180" align="left">
              <template slot-scope="scope">{{ $toThousands(scope.row.lock) }}{{ scope.row.tokenSymbol }}</template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('addressList.addressList4')" name="addressFour">
          <el-table :data="nrc721List" style="width: 100%" class="mt_20" v-loading="nrc721ListLoading">
            <el-table-column label="" width="30">
            </el-table-column>
            <el-table-column prop="tokenName" :label="$t('public.passCard')" width="160"
                             align="left"></el-table-column>
            <el-table-column :label="$t('public.abbreviate')" width="160" align="left">
              <template slot-scope="scope">
                <span class="cursor-p click" @click="toUrl('tokenInfo',scope.row.contractAddress)">
                  {{ scope.row.tokenSymbol }}
                  <span v-if="scope.row.status ===3" class="gray">{{$t('public.unavailable')}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('public.contractAddress')" min-width="160" align="left">
              <template slot-scope="scope">
                <div class="cursor-p click flex-center" @click="toUrl('contractsInfo',scope.row.contractAddress)">
                  {{ scope.row.contractAddress }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Token ID" width="120" align="left">
              <template slot-scope="scope">#{{ scope.row.tokenID }}</template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('addressList.addressList5')" name="addressFive">
          <el-table :data="nrc1155List" style="width: 100%" class="mt_20" v-loading="nrc1155ListLoading">
            <el-table-column label="" width="30">
            </el-table-column>
            <el-table-column prop="tokenName" :label="$t('public.passCard')" width="160"
                             align="left"></el-table-column>
            <el-table-column :label="$t('public.abbreviate')" width="160" align="left">
              <template slot-scope="scope">
                <span class="cursor-p click" @click="toUrl('tokenInfo',scope.row.contractAddress)">
                  {{ scope.row.tokenSymbol }}
                  <span v-if="scope.row.status ===3" class="gray">{{$t('public.unavailable')}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('public.contractAddress')" min-width="160" align="left">
              <template slot-scope="scope">
                <div class="cursor-p click flex-center" @click="toUrl('contractsInfo',scope.row.contractAddress)">
                  {{ scope.row.contractAddress }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Token ID" width="120" align="left">
              <template slot-scope="scope">
                <p>#{{ scope.row.tokenId }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="value" :label="$t('tokenInfo.tokenInfo5')" width="120" align="left" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('network.network12')" name="addressSix">
          <el-table :data="holdData" v-loading="holdDataLoading">
            <el-table-column prop="chainId" :label="$t('network.network0')" min-width="100" align="center">
            </el-table-column>
            <el-table-column prop="assetId" :label="$t('network.network13')" min-width="100" align="center">
            </el-table-column>
            <el-table-column :label="$t('network.network2')" min-width="120" align="center">
              <template slot-scope="scope">
                <!-- <span class="click" @click="toUrl('ParachainsInfo',scope.row.chainId)">{{ scope.row.symbol }}</span> -->
                <span class="click" @click="toUrl('holderAddress',scope.row)">{{ scope.row.symbol }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="balance" :label="$t('network.network14')" min-width="160" align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="paging">
        <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
                       v-show="pageTotal > pageRows"
                       :total="pageTotal"
                       :pager-count=5
                       :current-page.sync="pageIndex"
                       :page-size="pageRows"
                       @current-change="pagingMethod">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import SelectBar from '@/components/SelectBar';
  import {getLocalTime, superLong, copys, timesDecimals, Plus,Minus} from '@/api/util.js'

  export default {
    data() {
      this.colors = ['#45E3A4', '#FFBC58'];
      this.chartSettings = {
        radius: 78,
        offsetY: 100,
        itemStyle: {
          normal: {
            label: {        //This is the indicator line text
              show: true,
              position: 'inside', //Position of labels
              textStyle: {
                fontWeight: 100,
                fontSize: 10    //Font size of text
              },
            },
            labelLine: {    //Indicator line status
              show: true,
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          }
        },
      };
      return {
        isMobile: true,
        chartData: {
          columns: ['location', 'value'],
          rows: []
        },
        //Pie chart
        cakeChart: null,
        activeName: 'addressFirst',
        //Transaction type
        typeRegion: 0,
        //Address Details
        addressInfo: [],
        addressNumber: [],
        //Transaction List
        txList: [],
        pageTotal: 0, //Total number of entries
        pageIndex: 1,//Current page
        pageRows: 5, //Display number of items
        //Transaction list loading animation
        txListLoading: true,
        //tokentype
        tokenOptions: [],
        tokenValue: '',
        //token Transaction List
        tokenList: [],
        //token Transaction list pagination information
        tokenListPager: {
          total: 0,
          page: 1,
          rows: 4,
        },
        //token Transaction list loading animation
        tokenListLoading: true,
        //Token List
        nrc20List: [],
        //Token List Paging Information
        nrc20ListPager: {
          total: 0,
          page: 1,
          rows: 5,
        },
        nrc20ListLoading: false,
        //Address Timer
        addressInterval: null,
        symbol: sessionStorage.hasOwnProperty('symbol') ? sessionStorage.getItem('symbol') : 'NULS',//defaultsymbol
        holdData: [],//Holding cross chain asset list
        holdDataLoading: false,
        nrc721List: [],
        nrc721ListLoading: false,
        nrc1155List: [],
        nrc1155ListLoading: false
      }
    },
    components: {
      SelectBar
    },
    computed: {
      address() {
        return this.$route.query.address
      }
    },
    
    watch: {
      address: {
        handler(val) {
          if (!val) return;
          console.log(123456, val)
          // addressWhen releasing changes, retrieve data again
          this.activeName = 'addressFirst';
          this.addressNumber = [];
          this.txListLoading = true;
          this.tabNameList();
          this.getAddressInfo()
        },
        immediate: true
      },
      "$i18n.locale"(){
        const data = [...this.chartData.rows]
        data.map(v=>{
          if (v.keySting==='usable') {
            v.key = this.$t('public.usablebalance')
          } else if (v.keySting==='locking') {
            v.key = this.$t('public.consensusLocking')
          }
        })
        this.chartData.rows = data
      },
    },
  
    created() {
      this.isMobile = /(iPhone|iOS|Android|Windows Phone)/i.test(navigator.userAgent);
      // this.getAddressInfo(this.address);
      // this.tabNameList();
    },
    mounted() {
      setTimeout(() => {
        this.chartData = {
          columns: ['key', 'value'],
          rows: this.addressNumber
        };
      }, 500);
    },
    beforeDestroy() {
      //Leave the interface to clear the timer
      if (this.addressInterval) {
        clearInterval(this.addressInterval);
      }
    },
    methods: {

      /**
       * Copy Method
       * @param sting
       **/
      copy(sting) {
        copys(sting);
      },

      /**
       * Obtain detailed address information
       */
      getAddressInfo() {
        this.$post('/', 'getAccount', [this.address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              response.result.totalBalance = timesDecimals(response.result.totalBalance);
              response.result.balances = timesDecimals(response.result.balance);
              response.result.totalLock = Plus(response.result.timeLock, response.result.consensusLock).toString();
              response.result.totalLocks = timesDecimals(response.result.totalLock);
              response.result.timeLock = timesDecimals(response.result.timeLock);
              response.result.consensusLock = timesDecimals(response.result.consensusLock);
              response.result.totalIn = timesDecimals(response.result.totalIn);
              response.result.totalOut = timesDecimals(response.result.totalOut);

              if (parseInt(response.result.balance) > 0) {
                this.addressNumber.push({
                  keySting: 'usable',
                  key: this.$t('public.usablebalance'),
                  value: parseInt(timesDecimals(response.result.balance))
                });
              }
              if (parseInt(response.result.totalLock) > 0) {
                this.addressNumber.push({
                  keySting: 'locking',
                  key: this.$t('public.consensusLocking'),
                  value: parseInt(timesDecimals(response.result.totalLock))
                });
              }

              //Circular token
              for (let item in response.result.tokens) {
                this.tokenOptions[item] = response.result.tokens[item].split(',');
              }
              this.tokenOptions.unshift(["", this.$t('type.0')]);
              this.addressInfo = response.result;

              this.chartData = {
                columns: ['key', 'value'],
                rows: this.addressNumber
              };
            }
          })
      },

      /**
       * tab option
       **/
      handleClick(tab) {
        this.activeName = tab.name;
        this.pageTotal = 0;
        this.pageIndex = 1;
        this.tabNameList();
      },

      /**
       * @disc: according totabName loading data
       * @params:
       * @date: 2020-07-01 10:54
       * @author: Wave
       */
      tabNameList() {
        if (this.activeName === 'addressFirst') {
          this.txListLoading = true;
          this.getTxListByAddress();
        } else if (this.activeName === 'addressSecond') {
          this.tokenListLoading = true;
          this.getTokenListByAddress()
        } else if (this.activeName === 'addressThree') {
          this.getNrc20ListByAddress();
        } else if (this.activeName === 'addressFour') {
          this.getNrc721ListByAddress()
        } else if (this.activeName === 'addressFive') {
          this.getNrc1155ListByAddress()
        } else {
          this.getAccountCrossLedgerList(this.address);
        }
      },

      /**
       * Obtain transaction list based on address
       */
      getTxListByAddress() {
        this.$post('/', 'getAccountTxs', [this.pageIndex, this.pageRows, this.address, this.typeRegion, -1, -1, 0, 0])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.createTime = moment(getLocalTime(item.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
                item.txHashs = superLong(item.txHash, 12);
                item.values = timesDecimals(item.values, item.decimals);
                item.balance = timesDecimals(item.balance, item.decimals);
                item.fees = timesDecimals(item.fee.value);
              }
              this.txList = response.result.list;
              this.pageTotal = response.result.totalCount;
              this.txListLoading = false;
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * Obtain transaction list based on address paging
       */
      pagingMethod(e) {
        this.pageIndex = e;
        this.tabNameList();
      },

      /**
       * Obtain based on addressTokenTransaction List
       */
      getTokenListByAddress() {
        this.$post('/', 'getTokenTransfers', [this.pageIndex, this.pageRows, this.address, this.tokenValue])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.createTime = moment(getLocalTime(item.time * 1000)).format('YYYY-MM-DD HH:mm:ss');
                item.fromAddresss = superLong(item.fromAddress, 6);
                item.toAddresss = superLong(item.toAddress, 6);
                item.value = timesDecimals(item.value, item.decimals);
                item.fromBalance = timesDecimals(item.fromBalance, item.decimals);
                item.toBalance = timesDecimals(item.toBalance, item.decimals);
                item.txHashs = superLong(item.txHash, 10);
                item.showValue = this.address === item.toAddress;
              }
              this.tokenList = response.result.list;
              this.pageTotal = response.result.totalCount;
              this.tokenListLoading = false;
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * Select token type
       **/
      changeToken() {
        this.pageTotal = 0;
        this.pageIndex = 1;
        this.getTokenListByAddress();
      },

      /**
       * Obtain based on addressNRC-20list
       */
      getNrc20ListByAddress() {
        this.nrc20ListLoading = true;
        this.$post('/', 'getAccountTokens', [this.pageIndex, this.pageRows, this.address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                // item.balance = timesDecimals(item.balance, item.decimals);
                item.available = timesDecimals(Minus(item.balance, item.lockedBalance), item.decimals)
                item.balance = timesDecimals(item.balance, item.decimals);
                item.lock = timesDecimals(item.lockedBalance, item.decimals);
              }
              // console.log(response.result.list, 'NRC-20list')
              this.nrc20List = response.result.list;
              this.pageTotal = response.result.totalCount;
              this.nrc20ListLoading = false;
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * Obtain based on addressNRC-721list
       */
      getNrc721ListByAddress() {
        this.nrc721ListLoading = true;
        this.$post('/', 'getAccountToken721s', [this.pageIndex, this.pageRows, this.address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              const list = []
              for (let item of response.result.list) {
                // item.balance = timesDecimals(item.balance, item.decimals);
                item.tokenIDs = item.tokenSet.join(', ');
                item.tokenSet.map(v => {
                  list.push({
                    tokenName: item.tokenName,
                    tokenSymbol: item.tokenSymbol,
                    contractAddress: item.contractAddress,
                    tokenID: v
                  })
                })
              }
              // console.log(list, 'NRC-721list')
              this.nrc721List = list;
              this.pageTotal = response.result.totalCount;
              this.nrc721ListLoading = false;
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      getNrc1155ListByAddress() {
        this.nrc1155ListLoading = true;
        this.$post('/', 'getAccountToken1155s', [this.pageIndex, this.pageRows, this.address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              // console.log(response.result.list, 'NRC-1155list')
              this.nrc1155List = response.result.list;
              this.pageTotal = response.result.totalCount;
              this.nrc1155ListLoading = false;
            }
          }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * Holding cross chain asset list
       */
      getAccountCrossLedgerList(address) {
        this.holdDataLoading = true;
        this.$post('/', 'getAccountCrossLedgerList', [address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result) {
                item.balance = timesDecimals(item.totalBalance, item.decimals);
              }
              // console.log(response.result, 'Holding cross chain asset list')
              this.holdData = response.result;
              this.pageTotal = response.result.totalCount;
              this.holdDataLoading = false;
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * url Connection jump
       * @param name
       * @param parmes
       */
      toUrl(name, parmes) {
        let newParmes = {};
        if (name === 'addressInfo') {
          // this.address = parmes;
          // newParmes = {address: parmes}
          this.$router.push({
            name: name,
            query: {address: parmes}
          })
          return;
        } else if (name === 'blockInfo') {
          newParmes = {height: parmes}
        } else if (name === 'contractsInfo') {
          newParmes = {contractAddress: parmes, tabName: 'first'}
        } else if (name === 'tokenInfo') {
          newParmes = {contractAddress: parmes, address: this.$route.query.address}
        } else if (name === 'holderAddress') {
          this.$router.push({
            path: '/assets/holderAddress/'+parmes.assetKey,
            query: { address: parmes.address },
          })
          return false
        } else {
          newParmes = {hash: parmes}
        }
        this.$router.push({
          name: name,
          query: newParmes
        })

      },

      /**
       * Obtain transaction type
       **/
      changeType(type) {
        this.pageTotal = 0;
        this.pageIndex = 1;
        this.txListLoading = true;
        this.typeRegion = parseInt(type);
        this.getTxListByAddress();
      },

    }
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .address-info {
    //min-height: 800px;
    margin-bottom: 100px;
    .bg-white {
      background: initial;
      .title {
        padding: 24px 0;
        margin: 0 auto 0;
        font-size: 20px;
        color: #000000;
        font-weight: bold;
        .click {
          margin-left: 20px;
        }
        @media screen and (max-width: 1000px) {
          padding: 0 0 1.8rem 0.5rem;
          font-size: 0.9rem;
          .click {
            margin-left: 1rem;
            font-size: 0.9rem;
          }
        }
      }
    }
    .top {
      margin: 0 auto 0;
      height: 255px;
      @media screen and (max-width: 1000px) {
        height: auto;
      }
      .top-left, .top-right {
        width: 590px;
        height: 255px;
        border: @BD1;
        border-radius: 3px;
        background-color: @Bcolour1;
        @media screen and (max-width: 1000px) {
          width: 95%;
          height: auto;
        }
        .tabs_title {
          padding: 0 0 0 30px;
        }
      }
      .top-left {
        @media screen and (max-width: 1000px) {
          display: none;
        }
        .pie {
          width: 100%;
          margin: -5px 0 0 -150px;
          .a_total {
            margin: -270px 0 0 500px;
            width: 230px;
            .font14 {
              margin-bottom: 10px;
            }
            .chart_title {
              margin: 20px 0 0 0;
              li {
                font-size: 14px;
                line-height: 30px;
                span {
                  width: 10px;
                  height: 10px;
                  background-color: #769fff;
                  display: block;
                  float: left;
                  line-height: 20px;
                  margin: 10px 5px 0 0;
                  border-radius: 5px;
                }
                &:first-child {
                  span {
                    background-color: #FFBC58;
                  }
                }
                &:last-child {
                  span {
                    background-color: #45E3A4;
                  }
                }
              }

            }
          }
        }
      }
      .top-right {
        margin: 0 0 0 20px;
        @media screen and (max-width: 1000px) {
          margin: 0 0 0 2.5%;
        }
        .total_ul {
          margin: 0 20px;
          li {
            border-bottom: @BD1;
            padding: 0 10px;
            color: @Acolor3;
            &:last-child {
              border-bottom: 0
            }
            span {
              color: @Mcolour;
            }
            .click {
              color: @Ccolour;
            }
          }
        }
      }
    }

    .bottoms {
      margin: 30px auto 14px;
      @media screen and (max-width: 1000px) {
        margin: 1.5rem auto 1.5rem ;
        width: 95%;
      }
      .el-icon-download {
        margin-left: 10px;
        font-size: 20px;
      }
      .hide-switch {
        margin: 10px 0 0 0;
        @media screen and (max-width: 1000px) {
          margin: 0.5rem 0.5rem 0 0;
        }
      }
    }
  }

  @media (max-width: 1220px){
    .address-info{
      padding: 0 .5rem;
      .top{
        display: flex;
        justify-content: space-between;
        .top-left,.top-right{
          width: 49%;
          margin:  0;
        }
      }
      .w1200{
        width: initial;
      }
    }
  }
  @media(max-width: 1000px){
    .address-info{
      .top{
        .top-right{
          width: 100%;
        }
      }
      .bg-white{
        .title{
          padding: 24px 0;
          font-size: 16px;
          color: #000000;
        }
      }
    }
  }
  @media(max-width: 686px){
    .address-info{
      .bg-white{
        .title{
          padding: 24px 0;
          font-size: 14px;
        }
      }
    }
  }
</style>
