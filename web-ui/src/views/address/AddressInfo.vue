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
            <div class="font18">{{addressInfo.totalBalance}} {{symbol}}</div>
            <ul class="chart_title">
              <li><span></span>{{$t('public.consensusLocking')}} {{addressInfo.totalLocks}}</li>
              <li><span></span>{{$t('public.usablebalance')}} {{addressInfo.balances}}</li>
              <!--<li><span></span>{{$t('public.timeLocking')}}</li>-->
            </ul>
          </div>
        </div>
      </div>
      <div class="top-right fl">
        <h3 class="tabs_title tabs_header capitalize">{{$t('public.basicInfo')}}</h3>
        <ul class="total_ul">
          <li class="tabs_infos capitalize" v-if="isMobile">{{$t('public.balance')}}
            <span class="fr">{{addressInfo.totalBalance}}</span>
          </li>
          <li class="tabs_infos capitalize" v-if="isMobile">{{$t('public.usablebalance')}}
            <span class="fr">{{addressInfo.balances}}</span>
          </li>
          <li class="tabs_infos capitalize" v-if="isMobile">{{$t('public.consensusLocking')}}
            <span class="fr">{{addressInfo.totalLocks}}</span>
          </li>

          <li class="tabs_infos capitalize">{{$t('public.alias')}}
            <span class="fr">{{addressInfo.alias  ? addressInfo.alias : '-' }}</span>
          </li>
          <li class="tabs_infos capitalize">{{$t('public.transactionNo')}}<span
                  class="fr">{{addressInfo.txCount}}</span></li>
          <li class="tabs_infos capitalize">{{$t('public.address')+$t('public.type')}}<span class="fr">{{$t('addressType.'+addressInfo.type)}}</span>
          </li>
          <li class="tabs_infos capitalize">{{$t('addressList.addressList1')}}<span class="fr">{{addressInfo.totalIn}} {{symbol}}</span>
          </li>
          <li class="tabs_infos capitalize">{{$t('addressList.addressList2')}}<span class="fr">{{addressInfo.totalOut}} {{symbol}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="cb"></div>
    <div class="bottoms w1200 cb">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('public.txList')" name="addressFirst">
          <SelectBar v-model="typeRegion" @change="changeType"></SelectBar>
          <!--<i class="iconfont icon-dwonload_gray_icon click ml_20" title="更多功能敬请期待..."></i>-->
          <el-switch class="hide-switch fr" v-model="hideSwitch" v-show="false"
                     :width="32"
                     :inactive-text="$t('block.block1')"
                     @change="hideConsensusList">
          </el-switch>
          <el-table :data="txList" stripe border style="width: 100%;" class="mt_20" v-loading="txListLoading">
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
              <template slot-scope="scope">{{ scope.row.values }}{{scope.row.symbol}}</template>
            </el-table-column>
            <el-table-column :label="$t('public.balance')" width="180" align="left">
              <template slot-scope="scope">{{ scope.row.balance }}{{scope.row.symbol}}</template>
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
          <el-table :data="tokenList" stripe border style="width: 100%" class="mt_20" v-loading="tokenListLoading">
            <el-table-column label="" width="30">
            </el-table-column>
            <el-table-column prop="height" :label="$t('public.height')" width="80" align="left">
              <template slot-scope="scope"><span class="cursor-p click" @click="toUrl('blockInfo',scope.row.height)">{{ scope.row.height }}</span>
              </template>
            </el-table-column>
            <el-table-column label="TXID" min-width="80" align="left">
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
            <el-table-column prop="createTime" :label="$t('public.time')" width="200" align="left"></el-table-column>
            <el-table-column :label="$t('public.amount')" width="180" align="left">
              <template slot-scope="scope">
                <span v-show="scope.row.showValue" class="fCN">+{{ scope.row.value }} </span>
                <span v-show="!scope.row.showValue" class="fred">-{{ scope.row.value}} </span>
                {{ scope.row.symbol }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('public.balance')" width="200" align="left">
              <template slot-scope="scope">{{address === scope.row.fromAddress ? scope.row.fromBalance :
                scope.row.toBalance}}{{scope.row.symbol }}
              </template>
            </el-table-column>
            -
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('addressList.addressList3')" name="addressThree">
          <el-table :data="nrc20List" stripe border style="width: 100%" class="mt_20" v-loading="nrc20ListLoading">
            <el-table-column label="" width="30">
            </el-table-column>
            <el-table-column prop="tokenName" :label="$t('public.passCard')" width="220"
                             align="left"></el-table-column>
            <el-table-column :label="$t('public.abbreviate')" width="220" align="left">
              <template slot-scope="scope">
                <span class="cursor-p click" @click="toUrl('tokenInfo',scope.row.contractAddress)">
                  {{ scope.row.tokenSymbol }}
                  <span v-if="scope.row.status ===3" class="gray">{{$t('public.unavailable')}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('public.contractAddress')" min-width="180" align="left">
              <template slot-scope="scope">
                <span class="cursor-p click" @click="toUrl('contractsInfo',scope.row.contractAddress)">{{ scope.row.contractAddress }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('public.balance')" width="280" align="left">
              <template slot-scope="scope">{{ scope.row.balance }}{{ scope.row.tokenSymbol }}</template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('network.network12')" name="addressFour">
          <el-table :data="holdData" border v-loading="holdDataLoading">
            <el-table-column prop="chainId" :label="$t('network.network0')" min-width="300" align="center">
            </el-table-column>
            <el-table-column prop="assetId" :label="$t('network.network13')" width="290" align="center">
            </el-table-column>
            <el-table-column :label="$t('network.network2')" width="290" align="center">
              <template slot-scope="scope">
                <span class="click" @click="toUrl('networkInfo',scope.row.chainId)">{{ scope.row.symbol }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="balance" :label="$t('network.network14')" width="290" align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="paging">
        <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
                       v-show="pageTotal > pageRows"
                       :total="pageTotal"
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
  import {getLocalTime, superLong, copys, timesDecimals, Plus} from '@/api/util.js'

  export default {
    data() {
      this.colors = ['#769fff', '#9cd05b'];
      this.chartSettings = {
        radius: 78,
        offsetY: 100,
        itemStyle: {
          normal: {
            label: {        //此处为指示线文字
              show: true,
              position: 'inside', //标签的位置
              textStyle: {
                fontWeight: 100,
                fontSize: 10    //文字的字体大小
              },
            },
            labelLine: {    //指示线状态
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
        chartData: {},
        //饼图
        cakeChart: null,
        activeName: 'addressFirst',
        //交易类型
        typeRegion: 0,
        //地址
        address: this.$route.query.address,
        //地址详情
        addressInfo: [],
        addressNumber: [],
        //交易列表
        txList: [],
        pageTotal: 0, //总条数
        pageIndex: 1,//当前页
        pageRows: 5, //显示条数
        //交易列表加载动画
        txListLoading: true,
        //隐藏共识奖励
        hideSwitch: false,
        //token类型
        tokenOptions: [],
        tokenValue: '',
        //token 交易列表
        tokenList: [],
        //token 交易列表分页信息
        tokenListPager: {
          total: 0,
          page: 1,
          rows: 4,
        },
        //token 交易列表加载动画
        tokenListLoading: true,
        //代币列表
        nrc20List: [],
        //代币列表分页信息
        nrc20ListPager: {
          total: 0,
          page: 1,
          rows: 5,
        },
        nrc20ListLoading: false,
        //地址定时器
        addressInterval: null,
        symbol: sessionStorage.hasOwnProperty('symbol') ? sessionStorage.getItem('symbol') : 'NULS',//默认symbol
        holdData: [],//持有跨链资产列表
        holdDataLoading: false,
      }
    },
    components: {
      SelectBar
    },
    created() {
      this.isMobile = /(iPhone|iOS|Android|Windows Phone)/i.test(navigator.userAgent);
      this.getAddressInfo(this.address);
      this.tabNameList();
    },
    mounted() {
      //延迟加载饼状图
      setTimeout(() => {
        this.chartData = {
          columns: ['location', 'value'],
          rows: this.addressNumber
        };
      }, 500);

      //定时获取地址
      this.addressInterval = setInterval(() => {
        this.address = this.$route.query.address;
      }, 500)
    },
    beforeDestroy() {
      //离开界面清除定时器
      if (this.addressInterval) {
        clearInterval(this.addressInterval);
      }
    },
    methods: {

      /**
       * 复制方法
       * @param sting
       **/
      copy(sting) {
        copys(sting);
        this.$message({message: this.$t('public.copysuccess'), type: 'success', duration: 1000});
      },

      /**
       * 获地址详细信息
       */
      getAddressInfo(address) {
        this.$post('/', 'getAccount', [address])
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
                  location: this.$t('public.usablebalance'),
                  value: parseInt(timesDecimals(response.result.balance))
                });
              }
              if (parseInt(response.result.totalLock) > 0) {
                this.addressNumber.push({
                  location: this.$t('public.consensusLocking'),
                  value: parseInt(timesDecimals(response.result.totalLock))
                });
              }

              //循环代币
              for (let item in response.result.tokens) {
                this.tokenOptions[item] = response.result.tokens[item].split(',');
              }
              this.tokenOptions.unshift(["", this.$t('type.0')]);
              this.addressInfo = response.result;
            }
          })
      },

      /**
       * tab 选项
       **/
      handleClick(tab) {
        this.activeName = tab.name;
        this.pageTotal = 0;
        this.pageIndex = 1;
        this.tabNameList();
      },

      /**
       * @disc: 根据tab名称加载数据
       * @params:
       * @date: 2020-07-01 10:54
       * @author: Wave
       */
      tabNameList() {
        if (this.activeName === 'addressFirst') {
          this.txListLoading = true;
          this.getTxListByAddress(this.pageIndex, this.pageRows, this.address, this.typeRegion);
        } else if (this.activeName === 'addressSecond') {
          this.tokenListLoading = true;
          this.getTokenListByAddress(this.pageIndex, this.pageRows, this.address, "")
        } else if (this.activeName === 'addressThree') {
          this.getNrc20ListByAddress(this.pageIndex, this.pageRows, this.address);
        } else {
          this.getAccountCrossLedgerList(this.address);
        }
      },

      /**
       * 根据地址获取交易列表
       */
      getTxListByAddress(page, rows, address, type) {
        this.$post('/', 'getAccountTxs', [page, rows, address, type, -1, -1, 0, 0])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.createTime = moment(getLocalTime(item.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
                item.txHashs = superLong(item.txHash, 15);
                item.values = timesDecimals(item.values);
                item.balance = timesDecimals(item.balance);
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
       * 根据地址获取交易列表 分页
       */
      pagingMethod(e) {
        this.pageIndex = e;
        this.tabNameList();
      },

      /**
       * 根据地址获取Token交易列表
       */
      getTokenListByAddress(page, rows, address, contractAddress) {
        this.$post('/', 'getTokenTransfers', [page, rows, address, contractAddress])
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
       * 选择代币类型
       **/
      changeToken() {
        this.getTokenListByAddress(this.pageIndex, this.pageRows, this.address, this.tokenValue);
      },

      /**
       * 根据地址获取NRC-20列表
       */
      getNrc20ListByAddress(page, rows, address) {
        this.nrc20ListLoading = true;
        this.$post('/', 'getAccountTokens', [page, rows, address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.balance = timesDecimals(item.balance, item.decimals);
              }
              this.nrc20List = response.result.list;
              this.pageTotal = response.result.totalCount;
              this.nrc20ListLoading = false;
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * 持有跨链资产列表
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
              this.holdData = response.result;
              this.pageTotal = response.result.totalCount;
              this.holdDataLoading = false;
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * url 连接跳转
       * @param name
       * @param parmes
       */
      toUrl(name, parmes) {
        let newParmes = {};
        if (name === 'addressInfo') {
          this.address = parmes;
          newParmes = {address: parmes}
        } else if (name === 'blockInfo') {
          newParmes = {height: parmes}
        } else if (name === 'contractsInfo') {
          newParmes = {contractAddress: parmes, tabName: 'first'}
        } else if (name === 'tokenInfo') {
          newParmes = {contractAddress: parmes}
        } else if (name === 'networkInfo') {
          newParmes = {chainId: parmes}
        } else {
          newParmes = {hash: parmes}
        }
        this.$router.push({
          name: name,
          query: newParmes
        })

      },

      /**
       * 获取交易类型
       **/
      changeType(type) {
        this.txListLoading = true;
        this.typeRegion = parseInt(type);
        this.getTxListByAddress(this.pageIndex, this.pageRows, this.address, this.typeRegion, this.hideSwitch);
      },

      /**
       * 隐藏共识奖励
       */
      hideConsensusList() {
        this.txListLoading = true;
        this.getTxListByAddress(this.pageIndex, this.pageRows, this.address, this.typeRegion, this.hideSwitch);
      },

    },

    watch: {
      address: function () {
        // address，当放生变化时，重新获取数据
        this.activeName = 'addressFirst';
        this.addressNumber = [];
        this.txListLoading = true;
        this.getAddressInfo(this.address);
        this.tabNameList();

        //延迟加载饼状图
        setTimeout(() => {
          this.chartData = {
            columns: ['location', 'value'],
            rows: this.addressNumber
          };
        }, 500);
      }
    }
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .address-info {
    //min-height: 800px;
    margin-bottom: 100px;
    .bg-white {
      .title {
        padding-bottom: 60px;
        margin: 40px auto 0;
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
      margin: -24px auto 0;
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
                    background-color: #9cd05b;
                  }
                }
                &:last-child {
                  span {
                    background-color: @Ccolour;
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
</style>
