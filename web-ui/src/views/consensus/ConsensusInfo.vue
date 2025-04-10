<template>
  <div class="consensus-info bg-gray" v-loading="nodeInfoLoading">
    <div class="bg-white">
      <h2 class="title w1200 font20 fw uppercase">{{nodeInfo.agentId}}</h2>
      <div class="cards w1200">
        <ul class="cards-ul">
          <li class="cards-li fl">
            <h6 class="font14">{{$t('consensusInfo.consensusInfo0')}}</h6>
            <h5 class="font18 fW600 tc">{{times.days}}{{$t('public.day')}} {{times.hours}}{{$t('public.hour')}}
              {{times.minutes}}{{$t('public.minute')}}</h5>
          </li>
          <li class="cards-li fl">
            <h6 class="font14">{{$t('consensusInfo.consensusInfo1')}}</h6>
            <h5 class="font18 fW600 tc">{{nodeInfo.totalPackingCount}}</h5>
          </li>
          <li class="cards-li fl">
            <h6 class="font14">{{$t('public.lostRate')}}</h6>
            <h5 class="font18 fW600 tc">{{nodeInfo.lostRate}}</h5>
          </li>
          <li class="cards-li fl">
            <h6 class="font14">{{$t('consensusInfo.consensusInfo2')}}</h6>
            <h5 class="font18 fW600 tc">{{nodeInfo.roundPackingTime}}</h5>
          </li>
        </ul>
      </div>
    </div>
    <div class="info_tabs w1200">
      <h3 class="tabs_title tabs_header">{{$t('public.basicInfo')}}</h3>
      <ul class="ul">
        <li class="tabs_infos fl">
          <p>{{$t('public.createAddress')}}
            <span>{{nodeInfo.agentAddress}}
              <i class="iconfont icon-copy_icon click" :title="$t('public.copy')"
                 @click="$copy(nodeInfo.agentAddress)"></i>
            </span>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>Hash
            <router-link class="fr click" tag="a" :to="computePath('transactionInfo', nodeInfo.txHash)">
              {{nodeInfo.txHashs}} 
            </router-link>
          </p>
        </li>
        <li class="tabs_infos fl"><p>
          {{$t('public.alias')}}<span>{{ nodeInfo.agentAlias ? nodeInfo.agentAlias : '-' }}</span></p></li>
        <li class="tabs_infos fl">
          <p>
            {{$t('public.packAddress')}}
            <router-link class="fr click" tag="a" :to="computePath('addressInfo', nodeInfo.packingAddress)">
              {{nodeInfo.packingAddress}} 
            </router-link>
          </p>
        </li>
        <li class="tabs_infos fl"><p>{{$t('public.creditValue')}}<span>{{nodeInfo.creditValue}}</span></p></li>
        <li class="tabs_infos fl">
          <p>
            {{$t('public.outAddress')}}
            <router-link class="fr click" tag="a" :to="computePath('addressInfo', nodeInfo.rewardAddress)">
              {{nodeInfo.rewardAddress}} 
            </router-link>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>{{$t('public.bond')}}<span>{{$formatNumber(nodeInfo.deposit)}}<span class="fCN">&nbsp;{{symbol}}</span></span>
          </p>
        </li>
        <li class="tabs_infos fl"><p>{{$t('consensusInfo.consensusInfo3')}}<span>{{nodeInfo.version}}</span></p></li>
        <li class="tabs_infos fl"><p>{{$t('public.proportion')}}<span>{{nodeInfo.commissionRate}}%</span></p></li>
        <li class="tabs_infos fl">
          <p>
            <label>
              {{$t('consensusInfo.consensusInfo14')}}
              <el-tooltip placement="top">
                <div slot="content" class="info">{{$t('consensusInfo.consensusInfo15')}}</div>
                <i class="el-icon-warning"></i>
              </el-tooltip>
            </label>
            <span>
              {{$formatNumber(nodeInfo.agentReward)}}
              <span class="fCN">&nbsp;{{symbol}}</span>
            </span>
          </p>
        </li>
        <li class="tabs_infos fl"><p>{{$t('public.participants')}}<span>{{nodeInfo.depositCount}}</span></p></li>
        <li class="tabs_infos fl">
          <p>
            {{$t('consensusInfo.consensusInfo16')}}
            <span>{{$formatNumber(nodeInfo.commissionReward)}}<span class="fCN">&nbsp;{{symbol}}</span></span>
          </p>
        </li>
        <li class="tabs_infos fl"><p>{{$t('public.createTime')}}<span>{{nodeInfo.time}}</span></p></li>
        <li class="tabs_infos fl">
          <p>
            {{$t('public.allEntrust')}}
            <span>{{$formatNumber(nodeInfo.totalDeposit)}}<span class="fCN">&nbsp;{{symbol}}</span></span>
          </p>
        </li>
      </ul>
    </div>
    <div class="w1200 bg-gray">
      <el-col :span="24">
        <el-tabs v-model="activeNames" @tab-click="handleClicks">
          <el-tab-pane :label="$t('consensusInfo.consensusInfo7')" name="first" v-loading="blockListLoading">
            <el-table :data="blockList" style="width: 100%">
              <el-table-column label="" width="30">
              </el-table-column>
              <el-table-column :label="$t('public.height')" width="100" align="left">
                <template slot-scope="scope">
                  <router-link class="click" tag="a" :to="computePath('blockInfo', scope.row.height)">
                    {{scope.row.height}} 
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('public.time')" min-width="180"
                               align="left"></el-table-column>
              <el-table-column prop="txCount" :label="$t('public.transactionNo')" width="220"
                               align="left"></el-table-column>
              <el-table-column prop="size" :label="$t('public.size')" width="280" align="left"></el-table-column>
              <el-table-column :label="$t('consensusInfo.consensusInfo8') + '('+symbol+')'" width="280" align="left">
                <template slot-scope="scope">{{ $formatNumber(scope.row.reward)}}</template>
              </el-table-column>
            </el-table>
            <div class="paging">
              <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
                             v-show="pager.total > pager.rows"
                             :total="pager.total"
                             :current-page.sync="pager.page"
                             :pager-count="5"
                             :page-size="pager.rows"
                             @current-change="pagesBlockList">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('consensusInfo.consensusInfo9')" name="second">
            <el-table :data="punishList" style="width: 100%">
              <el-table-column label="" width="30"></el-table-column>
              <el-table-column prop="blockHeight" :label="$t('public.height')" width="180"
                               align="left"></el-table-column>
              <el-table-column prop="txid" label="TXID" min-width="250" align="left">txHash
                <template slot-scope="scope">
                  <router-link class="click" tag="a" :to="computePath('transactionInfo', scope.row.txHash)">
                    {{scope.row.txHashs}} 
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('public.time')" width="180" align="left"></el-table-column>
              <el-table-column :label="$t('public.yellowCard')+'/'+ $t('public.redCard')" width="180" align="left">
                <template slot-scope="scope">
                  <i class="iconfont font20"
                     :class="scope.row.type === 1 ? 'icon-huang yellow' : 'icon-hong fred' "></i>
                </template>
              </el-table-column>
              <el-table-column prop="reason" :label="$t('public.reason')" width="200" align="left"></el-table-column>
            </el-table>
            <div class="paging">
              <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
                             v-show="pager.total > pager.rows"
                             :total="pager.total"
                             :pager-count="5"
                             :current-page.sync="pager.page"
                             :page-size="pager.rows"
                             @current-change="pagesPunishList">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('consensusInfo.consensusInfo10')" name="three">
            <el-table :data="consensusDeposit" style="width: 100%">
              <el-table-column label="" width="30"></el-table-column>
              <el-table-column :label="$t('consensusInfo.consensusInfo11')" min-width="250" align="left">
                <template slot-scope="scope">
                  <router-link class="click" tag="a" :to="computePath('addressInfo', scope.row.address)">
                    {{scope.row.address}} 
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('consensusInfo.consensusInfo12')" width="220"
                               align="left"></el-table-column>
              <el-table-column :label="$t('public.amount')+ '('+symbol+')'" width="220" align="left">
                <template slot-scope="scope">{{ $formatNumber(scope.row.amount) }}</template>
              </el-table-column>
            </el-table>
            <div class="paging">
              <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
                             v-show="pager.total > pager.rows"
                             :total="pager.total"
                             :pager-count="5"
                             :current-page.sync="pager.page"
                             :page-size="pager.rows"
                             @current-change="pagesConsensusDepositList">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('consensusInfo.consensusInfo13')" name="four">
            <el-select v-model="depositValue" @change="changeDepositTypeo" class="mb_20">
              <el-option v-for="item in depositTypeo" :key="item.value" :label="$t('history.'+item.label)"
                         :value="item.value"></el-option>
            </el-select>
            <el-table :data="consensusCancelDeposit" style="width: 100%">
              <el-table-column label="" width="30"></el-table-column>
              <el-table-column label="TXID" width="200" align="left">
                <template slot-scope="scope">
                  <router-link class="click" tag="a" :to="computePath('transactionInfo', scope.row.txHash)">
                    {{scope.row.agentHashs}} 
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column :label="$t('public.height')" width="100" align="left">
                <template slot-scope="scope">
                  <router-link class="click" tag="a" :to="computePath('blockInfo', scope.row.blockHeight)">
                    {{scope.row.blockHeight}} 
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column :label="$t('public.address')" min-width="300" align="left">
                <template slot-scope="scope">
                  <router-link class="click" tag="a" :to="computePath('addressInfo', scope.row.address)">
                    {{scope.row.address}} 
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('public.time')" width="160" align="left"></el-table-column>
              <el-table-column :label="$t('public.join') +'/'+ $t('public.quit')" width="100" align="left">
                <template slot-scope="scope">{{ scope.row.type === 0 ? $t('public.join'):$t('public.quit') }}</template>
              </el-table-column>
              <el-table-column :label="$t('public.amount')+ '('+symbol+')'" width="140" align="left">
                <template slot-scope="scope">{{ $formatNumber(scope.row.amount)}}</template>
              </el-table-column>
              <el-table-column :label="$t('public.fee')+ '('+symbol+')'" width="110" align="left">
                <template slot-scope="scope">{{ scope.row.fee}}</template>
              </el-table-column>
            </el-table>
            <div class="paging">
              <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
                             v-show="pager.total > pager.rows"
                             :total="pager.total"
                             :pager-count="5"
                             :current-page.sync="pager.page"
                             :page-size="pager.rows"
                             @current-change="pagesConsensusCancelDepositList">
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
  import {getLocalTime, superLong, timeDifference, divisionDecimals} from '@/api/util.js'
  import { NSymbol, NDecimals } from '@/constants/constants'

  export default {
    data() {
      return {
        symbol: NSymbol,
        decimals: NDecimals,
        activeNames: this.$route.query.tabName || 'first',
        //Node information
        nodeInfo: [],
        nodeInfoLoading: true,
        times: {days: 0, hours: 0, minutes: 0},
        //Block List
        blockList: [],
        //Load animation from block list
        blockListLoading: true,
        //Punishment List
        punishList: [],
        //Delegation List
        consensusDeposit: [],
        //Entrustment History List
        consensusCancelDeposit: [],

        //Historical commission type
        depositTypeo: [
          {value: 2, label: '0'},
          {value: 0, label: '1'},
          {value: 1, label: '2'}
        ],
        depositValue: 2,

        pager: {
          total: 0,
          page: 1,
          rows: 5,
        }
      }
    },
    components: {},
    created() {
      this.getNodeInfo(this.$route.query.hash);
    },
    mounted() {
      setTimeout(() => {
        if (this.activeNames === 'first') {
          this.getBlockList(this.pager.page, this.pager.rows, false, this.nodeInfo.packingAddress)
        } else {
          this.getConsensusDepositList(this.pager.page, this.pager.rows, this.nodeInfo.txHash)
        }
      }, 800);
    },
    methods: {

      /**
       * Get node details
       * @param hash
       */
      getNodeInfo(hash) {
        this.$post('/', 'getConsensusNode', [hash])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              response.result.time = moment(getLocalTime(response.result.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              response.result.roundPackingTime = moment(getLocalTime(response.result.roundPackingTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              this.times = timeDifference(response.result.createTime * 1000);
              response.result.txHashs = superLong(response.result.txHash, 20);

              response.result.deposit = divisionDecimals(response.result.deposit, this.decimals);
              response.result.totalDeposit = divisionDecimals(response.result.totalDeposit, this.decimals);
              response.result.totalReward = divisionDecimals(response.result.totalReward, this.decimals);
              response.result.commissionReward = divisionDecimals(response.result.commissionReward, this.decimals);
              response.result.agentReward = divisionDecimals(response.result.agentReward, this.decimals);

              this.nodeInfo = response.result;
              this.nodeInfoLoading = false;
            }
          }).catch((error) => {
          console.log(error)
        })
      },


      /**
       * Get block list
       */
      getBlockList(pager, rows, boolean, packAddress) {
        this.$post('/', 'getBlockHeaderList', [pager, rows, boolean, packAddress])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.createTime = moment(getLocalTime(item.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
                item.txhashs = superLong(item.agentHash, 20);
                item.reward = divisionDecimals(item.reward, this.decimals);
              }
              this.blockList = response.result.list;
              this.pager.total = response.result.totalCount;
              this.blockListLoading = false;
            }
          })
      },

      /**
       * Get block list paging
       */
      pagesBlockList() {
        this.blockListLoading = true;
        this.getBlockList(this.pager.page, this.pager.rows, false, this.nodeInfo.packingAddress)
      },

      /**
       * Get punishment list
       */
      getPunishList(pager, rows, type, agentAddress) {
        this.$post('/', 'getPunishList', [pager, rows, type, agentAddress])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.createTime = moment(getLocalTime(item.time * 1000)).format('YYYY-MM-DD HH:mm:ss');
                item.txHashs = superLong(item.txHash, 20);
              }
              this.punishList = response.result.list;
              this.pager.total = response.result.totalCount;
            }
          })
      },

      /**
       * Get punishment list paging
       */
      pagesPunishList() {
        this.getPunishList(this.pager.page, this.pager.rows, 0, this.nodeInfo.agentAddress);
      },

      /**
       * List of Commissions
       */
      getConsensusDepositList(pager, rows, hash) {
        this.$post('/', 'getConsensusDeposit', [pager, rows, hash])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.createTime = moment(getLocalTime(item.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
                item.amount = divisionDecimals(item.amount, this.decimals);
              }
              this.consensusDeposit = response.result.list;
              this.pager.total = response.result.totalCount;
            }
          })
      },

      /**
       * List of Commissions paging
       */
      pagesConsensusDepositList() {
        this.getConsensusDepositList(this.pager.page, this.pager.rows, this.nodeInfo.txHash)
      },

      /**
       * Obtain the delegation history list
       */
      getConsensusCancelDepositList(pager, rows, hash, type) {
        this.$post('/', 'getAllConsensusDeposit', [pager, rows, hash, type])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {

              for (let item of response.result.list) {
                item.createTime = moment(getLocalTime(item.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
                item.agentHashs = superLong(item.txHash, 10);
                item.amount = divisionDecimals(item.amount, this.decimals);
                item.fee = divisionDecimals(item.fee, this.decimals);
              }
              this.consensusCancelDeposit = response.result.list;
              this.pager.total = response.result.totalCount;
            }
          })
      },

      /**
       * Obtain the delegation history list paging
       */
      pagesConsensusCancelDepositList() {
        this.getConsensusCancelDepositList(this.pager.page, this.pager.rows, this.nodeInfo.txHash, this.depositValue)
      },

      /**
       * Selection of historical commission types
       **/
      changeDepositTypeo(e) {
        this.depositValue = e;
        this.getConsensusCancelDepositList(this.pager.page, this.pager.rows, this.nodeInfo.txHash, this.depositValue)
      },

      /**
       * Paging function
       **/
      pagesList() {
        //this.pager={total: 0, page: 1, rows: 5,};
        if (this.activeNames === 'first') {
          this.getBlockList(this.pager.page, this.pager.rows, this.nodeInfo.packingAddress, false)
        } else if (this.activeNames === 'second') {
          this.getPunishList(this.pager.page, this.pager.rows, 0, this.nodeInfo.agentAddress)
        } else if (this.activeNames === 'three') {
          this.getConsensusDeposit(this.pager.page, this.pager.rows, this.nodeInfo.txHash)
        } else {
          this.getConsensusCancelDeposit(this.pager.page, this.pager.rows, this.nodeInfo.txHash, this.depositValue)
        }
      },

      computePath(name, parmes) {
        let query = {};
        if (name === 'addressInfo') {
          query = {address: parmes}
        } else if (name === 'transactionInfo') {
          query = {hash: parmes}
        } else if (name === 'tokenInfo') {
          query = {contractAddress: parmes}
        } else {
          query = {height: parmes}
        }
        return { name, query }
      },

      /**
       * tab switch
       * @param tab
       */
      handleClicks(tab) {
        this.activeNames = tab.name;
        if (tab.name === 'first') {
          this.pager = {total: 0, page: 1, rows: 5,};
          this.getBlockList(this.pager.page, this.pager.rows, false, this.nodeInfo.packingAddress)
        } else if (tab.name === 'second') {
          this.pager = {total: 0, page: 1, rows: 5,};
          this.getPunishList(this.pager.page, this.pager.rows, 0, this.nodeInfo.agentAddress)
        } else if (tab.name === 'three') {
          this.pager = {total: 0, page: 1, rows: 5,};
          this.getConsensusDepositList(this.pager.page, this.pager.rows, this.nodeInfo.txHash)
        } else {
          this.pager = {total: 0, page: 1, rows: 4,};
          this.getConsensusCancelDepositList(this.pager.page, this.pager.rows, this.nodeInfo.txHash, this.depositValue)
        }
      },

    },
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .consensus-info {
    .el-pagination{
      white-space: wrap;
      height: initial;
    }
    .bg-white {
      background: initial;
      @media screen and (max-width: 1000px) {
        height: 15rem;
      }
      .cards{
        height: 100px;
      }
      .title {
        margin: 0 auto;
        padding: 24px 0;
        @media screen and (max-width: 1000px) {
          margin: 1rem auto;
        }
      }
    }
    .info_tabs {
      margin: 0 auto 20px;
      .ul {
        min-height: 290px;
      }
      h3{
        margin: 0;
      }
      @media screen and (max-width: 1000px) {
        .ul {
          li {
            p {
              font-size: 0.7rem;
              span {
                font-size: 0.75rem;
                i {
                  font-size: 0.8rem;
                }
              }
            }
          }
        }

        h3 {
          padding: 0 0 0 1rem;
        }
      }
    }
    .el-tabs {
      margin-bottom: 120px;
    }

  }
  
  @media (max-width: 1200px){
    .cards{
      padding: 0 .5rem;
      .cards-ul{
        display: flex;
        justify-content: space-between;
        .cards-li{
          width: 24%;
          margin: 0;
        }
      }
    }
    .el-tabs{
      padding: 0 .5rem;
    }
    .consensus-info{
      .bg-white{
        .title{
          padding-left: .5rem;
          padding-right: .5rem;
        }
      }
    }
    .info_tabs{
      padding: 0 .5rem;
      .ul{
        .tabs_infos{
          width: 50%;
          @media (max-width: 568px) {
              p{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                span{
                  float: initial;
                }
              }
          }
        }
      }
    }

    .w1200{
      width: initial;
    }
  }

@media (max-width: 1000px){
  .consensus-info{
    .bg-white{
      height: initial;
      .title{
        margin: 0;
      }
    }
  }
}
@media (max-width:686px){
.consensus-info{
  .bg-white{
    .cards{
      height: initial;
    }
  }
}

  .cards{
    .cards-ul{
      flex-wrap: wrap;
      .cards-li{
        width: 100% !important;
        margin-bottom: 12px;
      }
    }
  }
}
</style>
