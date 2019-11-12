<template>
  <div class="consensus-info bg-gray" v-loading="nodeInfoLoading">
    <div class="bg-white">
      <h2 class="title w1200 font16 fw uppercase">{{nodeInfo.agentId}}</h2>
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
                 @click="copy(nodeInfo.agentAddress)"></i>
            </span>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>Hash<span class="click" @click="toUrl('transactionInfo',nodeInfo.txHash)">{{nodeInfo.txHashs}} </span></p>
        </li>
        <li class="tabs_infos fl"><p>
          {{$t('public.alias')}}<span>{{ nodeInfo.agentAlias ? nodeInfo.agentAlias : '-' }}</span></p></li>
        <li class="tabs_infos fl">
          <p>{{$t('public.packAddress')}}
            <span class="click" @click="toUrl('addressInfo',nodeInfo.packingAddress)">{{nodeInfo.packingAddress}}</span>
          </p>
        </li>
        <li class="tabs_infos fl"><p>{{$t('public.creditValue')}}<span>{{nodeInfo.creditValue}}</span></p></li>
        <li class="tabs_infos fl">
          <p>{{$t('public.outAddress')}}
            <span class="click" @click="toUrl('addressInfo',nodeInfo.rewardAddress)">{{nodeInfo.rewardAddress}}</span>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>{{$t('public.bond')}}<span>{{nodeInfo.deposit}}<span class="fCN">&nbsp;{{symbol}}</span></span>
          </p>
        </li>
        <li class="tabs_infos fl"><p>{{$t('consensusInfo.consensusInfo3')}}<span>{{nodeInfo.version}}</span></p></li>
        <li class="tabs_infos fl"><p>{{$t('public.proportion')}}<span>{{nodeInfo.commissionRate}}%</span></p></li>
        <li class="tabs_infos fl">
          <p>
            {{$t('consensusInfo.consensusInfo14')}}
            <el-tooltip placement="top">
              <div slot="content" class="info">{{$t('consensusInfo.consensusInfo15')}}</div>
              <i class="el-icon-warning"></i>
            </el-tooltip>
            <span>
              {{nodeInfo.agentReward}}
              <span class="fCN">&nbsp;{{symbol}}</span>
            </span>
          </p>
        </li>
        <li class="tabs_infos fl"><p>{{$t('public.participants')}}<span>{{nodeInfo.depositCount}}</span></p></li>
        <li class="tabs_infos fl">
          <p>
            {{$t('consensusInfo.consensusInfo16')}}
            <span>{{nodeInfo.commissionReward}}<span class="fCN">&nbsp;{{symbol}}</span></span>
          </p>
        </li>
        <li class="tabs_infos fl"><p>{{$t('public.createTime')}}<span>{{nodeInfo.time}}</span></p></li>
        <li class="tabs_infos fl">
          <p>
            {{$t('public.allEntrust')}}
            <span>{{nodeInfo.totalDeposit}}<span class="fCN">&nbsp;{{symbol}}</span></span>
          </p>
        </li>
      </ul>
    </div>
    <div class="w1200 bg-gray">
      <el-col :span="24">
        <el-tabs v-model="activeNames" @tab-click="handleClicks">
          <el-tab-pane :label="$t('consensusInfo.consensusInfo7')" name="first" v-loading="blockListLoading">
            <el-table :data="blockList" stripe border style="width: 100%">
              <el-table-column label="" width="30">
              </el-table-column>
              <el-table-column :label="$t('public.height')" width="100" align="left">
                <template slot-scope="scope"><span class="cursor-p click" @click="toUrl('blockInfo',scope.row.height)">{{ scope.row.height }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('public.time')" min-width="180"
                               align="left"></el-table-column>
              <el-table-column prop="txCount" :label="$t('public.transactionNo')" width="220"
                               align="left"></el-table-column>
              <el-table-column prop="size" :label="$t('public.size')" width="280" align="left"></el-table-column>
              <el-table-column :label="$t('consensusInfo.consensusInfo8') + '('+symbol+')'" width="280" align="left">
                <template slot-scope="scope">{{ scope.row.reward}}</template>
              </el-table-column>
            </el-table>
            <div class="paging">
              <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
                             v-show="pager.total > pager.rows"
                             :total="pager.total"
                             :current-page.sync="pager.page"
                             :page-size="pager.rows"
                             @current-change="pagesBlockList">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('consensusInfo.consensusInfo9')" name="second">
            <el-table :data="punishList" stripe border style="width: 100%">
              <el-table-column label="" width="30"></el-table-column>
              <el-table-column prop="blockHeight" :label="$t('public.height')" width="180"
                               align="left"></el-table-column>
              <el-table-column prop="txid" label="TXID" min-width="250" align="left">txHash
                <template slot-scope="scope"><span class="cursor-p click"
                                                   @click="toUrl('transactionInfo',scope.row.txHash)">{{ scope.row.txHashs }}</span>
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
                             :current-page.sync="pager.page"
                             :page-size="pager.rows"
                             @current-change="pagesPunishList">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('consensusInfo.consensusInfo10')" name="three">
            <el-table :data="consensusDeposit" stripe border style="width: 100%">
              <el-table-column label="" width="30"></el-table-column>
              <el-table-column :label="$t('consensusInfo.consensusInfo11')" min-width="250" align="left">
                <template slot-scope="scope"><span class="cursor-p click"
                                                   @click="toUrl('addressInfo',scope.row.address)">{{ scope.row.address }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('consensusInfo.consensusInfo12')" width="220"
                               align="left"></el-table-column>
              <el-table-column :label="$t('public.amount')+ '('+symbol+')'" width="220" align="left">
                <template slot-scope="scope">{{ scope.row.amount }}</template>
              </el-table-column>
            </el-table>
            <div class="paging">
              <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
                             v-show="pager.total > pager.rows"
                             :total="pager.total"
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
            <el-table :data="consensusCancelDeposit" stripe border style="width: 100%">
              <el-table-column label="" width="30"></el-table-column>
              <el-table-column label="TXID" width="200" align="left">
                <template slot-scope="scope">
                  <span class="cursor-p click" @click="toUrl('transactionInfo',scope.row.txHash)">
                    {{ scope.row.agentHashs }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('public.height')" width="100" align="left">
                <template slot-scope="scope">
                  <span class="cursor-p click" @click="toUrl('blockInfo',scope.row.blockHeight)">
                    {{ scope.row.blockHeight }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('public.address')" min-width="300" align="left">
                <template slot-scope="scope">
                  <span class="cursor-p click" @click="toUrl('addressInfo',scope.row.address)">
                    {{ scope.row.address }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('public.time')" width="160" align="left"></el-table-column>
              <el-table-column :label="$t('public.join') +'/'+ $t('public.quit')" width="100" align="left">
                <template slot-scope="scope">{{ scope.row.type === 0 ? $t('public.join'):$t('public.quit') }}</template>
              </el-table-column>
              <el-table-column :label="$t('public.amount')+ '('+symbol+')'" width="140" align="left">
                <template slot-scope="scope">{{ scope.row.amount}}</template>
              </el-table-column>
              <el-table-column :label="$t('public.fee')+ '('+symbol+')'" width="110" align="left">
                <template slot-scope="scope">{{ scope.row.fee}}</template>
              </el-table-column>
            </el-table>
            <div class="paging">
              <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
                             v-show="pager.total > pager.rows"
                             :total="pager.total"
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
  import {getLocalTime, superLong, copys, timeDifference, divisionDecimals} from '@/api/util.js'

  export default {
    data() {
      return {
        symbol: sessionStorage.hasOwnProperty('symbol') ? sessionStorage.getItem('symbol') : 'NULS',//symbol
        decimals: sessionStorage.hasOwnProperty('decimals') ? Number(sessionStorage.getItem('decimals')) : 8,//decimals
        activeNames: this.$route.query.tabName || 'first',
        //节点信息
        nodeInfo: [],
        nodeInfoLoading: true,
        times: {days: 0, hours: 0, minutes: 0},
        //出块列表
        blockList: [],
        //出块列表加载动画
        blockListLoading: true,
        //惩罚列表
        punishList: [],
        //委托列表
        consensusDeposit: [],
        //委托历史列表
        consensusCancelDeposit: [],

        //历史委托类型
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
       * 获取节点详情
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
       * 复制方法
       * @param sting
       **/
      copy(sting) {
        copys(sting);
        this.$message({message: this.$t('public.copysuccess'), type: 'success', duration: 1000});
      },

      /**
       * 获取块列表
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
       * 获取块列表 分页
       */
      pagesBlockList() {
        this.blockListLoading = true;
        this.getBlockList(this.pager.page, this.pager.rows, false, this.nodeInfo.packingAddress)
      },

      /**
       * 获取惩罚列表
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
       * 获取惩罚列表 分页
       */
      pagesPunishList() {
        this.getPunishList(this.pager.page, this.pager.rows, 0, this.nodeInfo.agentAddress);
      },

      /**
       * 获委托列表
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
       * 获委托列表 分页
       */
      pagesConsensusDepositList() {
        this.getConsensusDepositList(this.pager.page, this.pager.rows, this.nodeInfo.txHash)
      },

      /**
       * 获取委托历史列表
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
       * 获取委托历史列表 分页
       */
      pagesConsensusCancelDepositList() {
        this.getConsensusCancelDepositList(this.pager.page, this.pager.rows, this.nodeInfo.txHash, this.depositValue)
      },

      /**
       * 历史委托类型选择
       **/
      changeDepositTypeo(e) {
        this.depositValue = e;
        this.getConsensusCancelDepositList(this.pager.page, this.pager.rows, this.nodeInfo.txHash, this.depositValue)
      },

      /**
       * 分页功能
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

      /**
       * url 连接跳转
       * @param name
       * @param height
       */
      toUrl(name, parmes) {
        let newQuery = {};
        if (name === 'addressInfo') {
          newQuery = {address: parmes}
        } else if (name === 'transactionInfo') {
          newQuery = {hash: parmes}
        } else if (name === 'tokenInfo') {
          newQuery = {contractAddress: parmes}
        } else {
          newQuery = {height: parmes}
        }
        this.$router.push({
          name: name,
          query: newQuery
        })
      },

      /**
       * tab 切换
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
    //min-height: 1000px;
    //margin-bottom: 100px;
    .bg-white {
      height: 170px;
      @media screen and (max-width: 1000px) {
        height: 15rem;
      }
      .title {
        margin: 20px auto;
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
      @media screen and (max-width: 1000px) {
        margin: 0 2.5% 1rem;
        width: 95%;
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
      margin-bottom: 60px;
    }

  }

</style>
