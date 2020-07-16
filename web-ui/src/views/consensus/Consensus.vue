<template>
  <div class="consensus">
    <div class="top-chart w1200 ">
      <div class="chart_title">
        <h2 class="fl font18">{{$t('consensus.consensus0')}}</h2>
        <div class="fr">
          <div class="font16">
            <span class="font12 capitalize">{{$t('home.home4')}}:</span> {{circulation}}K
            <span class="font12 capitalize">{{$t('home.home2')}}:</span> {{consensusTotal}}K
            <span class="font12 capitalize">{{$t('consensus.consensus1')}}:</span> {{nodeing}}
            <span class="font12 capitalize">{{$t('home.home1')}}:</span> {{node}}
          </div>
          <div class="chart_bt">
            <div class="chart_bt1">
              <el-button type="text" class="btn capitalize" @click="changeDate(1)" :class="timeRate === 1 ? 'btn_N':''">
                {{$t('public.week')}}
              </el-button>
              <el-button type="text" class="btn capitalize" @click="changeDate(2)" :class="timeRate === 2 ? 'btn_N':''">
                {{$t('public.month')}}
              </el-button>
              <el-button type="text" class="btn capitalize" @click="changeDate(3)" :class="timeRate === 3 ? 'btn_N':''">
                {{$t('public.year')}}
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="chart_info">
        <ve-line height="330px" style="top: -20px"
                 :data="chartData"
                 :legend-visible="false"
                 :colors="colors"
                 :settings="chartSettings"
                 :loading="timeRateDataLoading"></ve-line>
        <!-- <ChartBar showID="mountNodes" :chartData="chartData" width="1200"></ChartBar>-->
      </div>
    </div>
    <div class="info bg-gray">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="w1200 tab_consensus">
        <el-tab-pane :label="$t('consensus.consensus2')" name="first">
          <ConsensusList>
          </ConsensusList>
        </el-tab-pane>
        <el-tab-pane :label="$t('consensus.consensus3')" name="second">
          <div class="cards">
            <ul class="cards-ul">
              <li class="cards-li fl">
                <h6 class="font14">{{$t('consensus.consensus4')}}</h6>
                <h5 class="font18 fW600 tc">{{roundInfo.index}}</h5>
              </li>
              <li class="cards-li fl">
                <h6 class="font14">{{$t('consensus.consensus5')}}</h6>
                <h5 class="font18 fW600 tc fCN">{{roundInfo.names}}</h5>
              </li>
              <li class="cards-li fl">
                <h6 class="font14">{{$t('consensus.consensus6')}}</h6>
                <h5 class="font18 fW600 tc">{{roundInfo.memberCount}}</h5>
              </li>
              <li class="cards-li fl">
                <h6 class="font14">{{$t('consensus.consensus7')}}</h6>
                <h5 class="font18 fW600 tc">{{ roundInfo.startTime }}--{{ roundInfo.endTime }}</h5>
              </li>
            </ul>
          </div>
          <div class="cards-title font14 cb">{{$t('consensus.consensus8')}}</div>
          <el-table :data="roundList" stripe border style="width: 100%" v-loading="roundListLoading">
            <el-table-column label="" width="30">
            </el-table-column>
            <el-table-column :label="$t('public.round')" width="100" align="left">
              <template slot-scope="scope">
                <router-link class="click" tag="a" :to="{name:'rotationInfo',query:{rotation:scope.row.index}}">
                  {{ scope.row.index }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column :label="$t('consensus.consensus9')" min-width="280" align="left">
              <template slot-scope="scope">
                <span>{{ scope.row.startTime }}&#45;&#45;&#45;&#45;{{ scope.row.endTime }}</span></template>
            </el-table-column>
            <el-table-column prop="memberCount" :label="$t('consensus.consensus10')" width="150" align="left">
            </el-table-column>
            <el-table-column :label="$t('public.yellowCard')+'/'+ $t('public.redCard')" width="180" align="left">
              <template slot-scope="scope"><span>{{ scope.row.yellowCardCount }}-{{ scope.row.redCardCount }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="producedBlockCount" :label="$t('consensus.consensus11')" width="150" align="left">
            </el-table-column>
            <el-table-column prop="lostRate" :label="$t('public.lostRate')" width="150" align="left">
            </el-table-column>
          </el-table>
          <paging :pager="pager" @change="pagesList" v-show="pager.total > pager.rows">
          </paging>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import {BigNumber} from 'bignumber.js'
  import paging from '@/components/pagingBar';
  import ConsensusList from '@/views/consensus/ConsensusList'
  import {getLocalTime, superLong, timesDecimals} from '@/api/util.js'

  export default {

    data() {
      this.colors = ['#7db46d', '#7db46d', '#7db46d',
        '#546570', '#c4ccd3'];
      this.chartSettings = {
        yAxisType: ['normal'],
        labelMap: {
          'value': this.$t('public.stake')
        },
      };
      return {
        //流通量
        circulation: 0,
        //总委托
        consensusTotal: 0,
        //共识中节点
        nodeing: 0,
        //共识节点
        node: 0,

        //统计图数据
        chartData: {
          columns: [],
          rows: []
        },
        timeRateDataLoading: true,
        //选择统计报表时间
        timeRate: 2,
        activeName: 'first',
        //当前轮次信息
        roundInfo: [],
        //轮次列表
        roundList: [],
        roundListLoading: false,
        pager: {
          total: 0,
          page: 1,
          rows: 5,
        },

      }
    },
    components: {
      ConsensusList,
      paging,
    },
    created() {
      this.getYearRateData(2);
      this.getRoundInfo();
      this.getRoundList(this.pager.page, this.pager.rows);
    },
    mounted() {
      setInterval(() => {
        //流通量
        let newCirculateNumber = new BigNumber(timesDecimals(this.$store.state.NULSNumber.circulation, 11));
        this.circulation = newCirculateNumber.toFormat(2);
        //总委托
        let newConsensusTotal = new BigNumber(timesDecimals(this.$store.state.NULSNumber.consensusTotal, 11));
        this.consensusTotal = newConsensusTotal.toFormat(2);
        //共识中节点
        this.nodeing = this.$store.state.nodeNumber.consensusCount;
        //共识节点
        this.node = this.$store.state.nodeNumber.agentCount;
      }, 100);
    },
    beforeRouteLeave(to, from, next) {
      //console.log(to.name);
      if (to.name === 'rotationInfo') {
        from.meta.keepAlive = true;
      } else {
        from.meta.keepAlive = false;
      }
      next()
    },
    methods: {

      /**
       * 获取交易历史数据统计
       */
      getYearRateData(time) {
        this.$post('/', 'getConsensusStatistical', [time])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result) {
                item.value = item.value / 100000000
              }
              this.chartData.columns = ['key', 'value'];
              this.chartData.rows = response.result;
              this.timeRateDataLoading = false;

            }
          })
      },

      /**
       * 选择统计数据的周、月、年
       **/
      changeDate(type) {
        this.timeRateDataLoading = true;
        this.chartData.columns = [];
        this.chartData.rows = [];
        this.timeRate = type;
        this.getYearRateData(type)
      },

      /**
       * tab 切换
       **/
      handleClick() {
        this.pager.total = 0;
        this.pager.page = 1;
      },

      /**
       *  获取当前轮次信息
       **/
      async getRoundInfo() {
        this.$post('/', 'getBestRoundInfo', [])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              response.result.startTime = moment(getLocalTime(response.result.startTime * 1000)).format('HH:mm:ss');
              response.result.endTime = moment(getLocalTime(response.result.endTime * 1000)).format('HH:mm:ss');
              response.result.names = response.result.startBlockHeader.agentAlias ? response.result.startBlockHeader.agentAlias : superLong(response.result.startBlockHeader.agentId, 8);
              this.roundInfo = response.result;
            } else {
              console.log(response);
              this.getRoundInfo();
            }
          }).catch((error) => {
          this.getRoundInfo();
          console.log(error)
        })
      },

      /**
       * 获取轮次列表
       */
      async getRoundList(page, rows) {
        this.roundListLoading = true;
        this.$post('/', 'getRoundList', [page, rows])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.startTime = moment(getLocalTime(item.startTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
                item.endTime = moment(getLocalTime(item.endTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              }
              this.roundList = response.result.list;
              this.pager.total = response.result.totalCount;
              this.roundListLoading = false;
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * 分页功能
       **/
      pagesList() {
        this.getRoundList(this.pager.page, this.pager.rows)
      },

      toUrl(name, parmes) {
        this.$router.push({
          name: name,
          query: {rotation: parmes}
        })
      }

    },
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .consensus {
    //min-height: 555px;
    margin-bottom: 60px;
    @media screen and (max-width: 1000px) {
      background-color: @Bcolour2;
    }
    .top-chart {
      height: 280px;
      @media screen and (max-width: 1000px) {
        display: none;
      }
      .chart_title {
        margin: 40px 0 0 0;
        .chart_bt {
          z-index: 8;
          min-width: 450px;
          position: absolute;
          .chart_bt1 {
            text-align: right;
          }
        }
      }
      .chart_info {
        margin: 20px 0 0 0;
      }
    }
    .info {
      width: 100%;
      @media screen and (max-width: 1000px) {
        width: 95%;
        margin: 0 auto;
      }
      .cards-title {
        height: 50px;
        padding: 20px 0 10px 0;
      }
      .tab_consensus {
        .el-tabs__header {
          margin: 0 0 20px 0;
          .el-tabs__nav-wrap {
            .el-tabs__nav-scroll {
              .el-tabs__item {
                padding: 25px 50px 0 0;
                height: 55px;
                line-height: normal;
              }
            }
          }
        }
      }
    }
    .tabs {
      margin: 0 0 0 0;
    }

    .el-select {
      .el-input {
        .el-input__inner {
          height: 30px !important;
          line-height: 30px !important;
          border-radius: 1px;
          width: 100%;
        }
        .el-input__icon {
          line-height: 30px;
        }
      }
    }
  }

</style>
