<template>
  <div class="consensus">
    <div class="top-chart w1200 ">
      <div class="chart_title">
        <h2 class="title-box">{{ $t('consensus.consensus0') }}</h2>
        <div class="fr right-tir">
          <div class="font16">
            <span class="font12 capitalize">{{ $t('home.home4') }}:</span> {{ $formatNumber(circulation) }}
            <span class="font12 capitalize">{{ $t('home.home2') }}:</span> {{ $formatNumber(consensusTotal) }}
            <span class="font12 capitalize">{{ $t('consensus.consensus1') }}:</span> {{ nodeing }}
            <span class="font12 capitalize">{{ $t('home.home1') }}:</span> {{ node }}
          </div>
        </div>
      </div>
      <div class="chart_info">
        <div class="chart_bt">
          <div class="chart_bt1">
            <el-button type="text" class="capitalize" @click="changeDate(1)" :class="timeRate === 1 ? 'btn' : ''">
              {{ $t('public.week') }}
            </el-button>
            <el-button type="text" class="capitalize" @click="changeDate(2)" :class="timeRate === 2 ? 'btn' : ''">
              {{ $t('public.month') }}
            </el-button>
            <el-button type="text" class="capitalize" @click="changeDate(3)" :class="timeRate === 3 ? 'btn' : ''">
              {{ $t('public.year') }}
            </el-button>
          </div>
        </div>

        <ve-line height="330px" style="top: -20px" :data="chartData" :legend-visible="false" :colors="colors" :extend="chartExtend"
          :settings="chartSettings" :loading="timeRateDataLoading">
        </ve-line>
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
                <h6 class="font14">{{ $t('consensus.consensus4') }}</h6>
                <h5 class="font18 fW600 tc">{{ roundInfo.index }}</h5>
              </li>
              <li class="cards-li fl">
                <h6 class="font14">{{ $t('consensus.consensus5') }}</h6>
                <h5 class="font18 fW600 tc fCN">{{ roundInfo.names }}</h5>
              </li>
              <li class="cards-li fl">
                <h6 class="font14">{{ $t('consensus.consensus6') }}</h6>
                <h5 class="font18 fW600 tc">{{ roundInfo.memberCount }}</h5>
              </li>
              <li class="cards-li fl">
                <h6 class="font14">{{ $t('consensus.consensus7') }}</h6>
                <h5 class="font18 fW600 tc">{{ roundInfo.startTime }}--{{ roundInfo.endTime }}</h5>
              </li>
            </ul>
          </div>
          <div class="cards-title font14 cb">{{ $t('consensus.consensus8') }}</div>
          <el-table :data="roundList" style="width: 100%" v-loading="roundListLoading">
            <el-table-column label="" width="30">
            </el-table-column>
            <el-table-column :label="$t('public.round')" width="100" align="left">
              <template slot-scope="scope">
                <router-link class="click" tag="a" :to="{ name: 'rotationInfo', query: { rotation: scope.row.index } }">
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
            <el-table-column :label="$t('public.yellowCard') + '/' + $t('public.redCard')" width="180" align="left">
              <template slot-scope="scope"><span>{{ scope.row.yellowCardCount }}-{{ scope.row.redCardCount }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="producedBlockCount" :label="$t('consensus.consensus11')" width="150" align="left">
            </el-table-column>
            <el-table-column prop="lostRate" :label="$t('public.lostRate')" width="150" align="left">
            </el-table-column>
          </el-table>
          <paging :pager="pager" @change="pagesList" v-show="pager.total > pager.rows" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import paging from '@/components/pagingBar';
import ConsensusList from '@/views/consensus/ConsensusList'
import { getLocalTime, superLong, divisionDecimals } from '@/api/util.js'
import { NDecimals } from '@/constants/constants'

export default {
  data() {
    this.chartExtend = {
        series: {
          showSymbol: false,//Cancel small dots on the line chart
        },
        tooltip:{
          trigger: 'axis',
          textStyle:{
            color: '#000000'
          },
          formatter: params => {
            params = params[0];
            // console.log(params, 333)
            // const value = Number(params.data[1].toFixed(2))
            return `<div class="line-tooltip">
              <p class="tooltip-label">${params.data[0]}</p>
              <p class="tooltip-value">${this.$t('public.stake')}: ${this.$formatNumber(params.data[1])}</p>
            </div>`
          }
        },
        xAxis:{
          axisLine:{
            lineStyle:{
              color: '#B3B3CF'
            }
          }
        },
        yAxis:{
          axisLine:{
            lineStyle:{
              color: '#B3B3CF'
            }
          },
          axisLabel: {
            formatter: value => {
              return this.$formatNumber(value)
            }
          }
          
        }
      },
    this.colors = ['#7db46d', '#7db46d', '#7db46d',
      '#546570', '#c4ccd3'];
    this.chartSettings = {
      yAxisType: ['normal'],
      lineStyle: {
        width: 1,
        color: '#00E789'
      },
      area: true, //Is it displayed as an area chart
      itemStyle: { //Area chart color settings
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(0, 231, 137, 0.5)', // 0% Color at
            },
            {
              offset: 1,
              color: 'rgba(255, 255, 255, 0)' // 100% Color at
            }
          ],
          globalCoord: false // Default to false
        }
      }
    };
    return {
      //Circulation volume
      circulation: 0,
      //general entrustment
      consensusTotal: 0,
      //Nodes in consensus
      nodeing: 0,
      //Consensus node
      node: 0,

      //Statistical chart data
      chartData: {
        columns: [],
        rows: []
      },
      timeRateDataLoading: true,
      //Select statistical report time
      timeRate: 2,
      activeName: 'first',
      //Current round information
      roundInfo: [],
      //Round List
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
      //Circulation volume
      // let newCirculateNumber = new BigNumber(timesDecimals(this.$store.state.NULSNumber.circulation, 11));
      // this.circulation = newCirculateNumber.toFormat(2);
      this.circulation = divisionDecimals(this.$store.state.NULSNumber.circulation, NDecimals)
      //general entrustment
      // let newConsensusTotal = new BigNumber(timesDecimals(this.$store.state.NULSNumber.consensusTotal, 11));
      // this.consensusTotal = newConsensusTotal.toFormat(2);
      this.consensusTotal = divisionDecimals(this.$store.state.NULSNumber.consensusTotal, NDecimals)
      //Nodes in consensus
      this.nodeing = this.$store.state.nodeNumber.consensusCount;
      //Consensus node
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
     * Obtain transaction history data statistics
     */
    getYearRateData(time) {
      this.$post('/', 'getConsensusStatistical', [time])
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            for (let item of response.result) {
              item.value = divisionDecimals(item.value, NDecimals)
            }
            this.chartData.columns = ['key', 'value'];
            this.chartData.rows = response.result;
            this.timeRateDataLoading = false;

          }
        })
    },

    /**
     * Select the week of statistical data、month、year
     **/
    changeDate(type) {
      this.timeRateDataLoading = true;
      this.chartData.columns = [];
      this.chartData.rows = [];
      this.timeRate = type;
      this.getYearRateData(type)
    },

    /**
     * tab switch
     **/
    handleClick() {
      // this.pager.total = 0;
      // this.pager.page = 1;
    },

    /**
     *  Obtain current round information
     **/
    async getRoundInfo() {
      this.$post('/', 'getBestRoundInfo', [])
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            response.result.startTime = moment(getLocalTime(response.result.startTime * 1000)).format('HH:mm:ss');
            response.result.endTime = moment(getLocalTime(response.result.endTime * 1000)).format('HH:mm:ss');
            const startBlockHeader = response.result.startBlockHeader
            if (startBlockHeader) {
              response.result.names = startBlockHeader.agentAlias ? startBlockHeader.agentAlias : superLong(startBlockHeader.agentId, 8);
            } 
            this.roundInfo = response.result;
          }
        }).catch((error) => {
          setTimeout(() => {
            this.getRoundInfo();
          }, 5000)
          console.log(error)
        })
    },

    /**
     * Get a list of rounds
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
            // console.log(this.pager, 333)
            this.roundListLoading = false;
          }
        }).catch((error) => {
          console.log(error)
        })
    },

    /**
     * Paging function
     **/
    pagesList() {
      this.getRoundList(this.pager.page, this.pager.rows)
    }
  },
}
</script>

<style lang="less">
@import "./../../assets/css/style";

.consensus {
  //min-height: 555px;
  box-sizing: border-box;
  background-color: #F9FAFD;
  margin-bottom: 120px;
  .cards{
    .cards-ul{
      .cards-li{
        margin-bottom: 12px;
      }
    }
  }
  .paging{
    .el-pagination{
      flex-wrap: wrap;
    }
  }

  @media screen and (max-width: 1000px) {
    background-color: @Bcolour2;
  }

  .top-chart {
    // @media screen and (max-width: 1000px) {
    //   display: none;
    // }

    .chart_title {
      margin-top: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      h2 {
        font-size: 20px;
        color: #000000;
        font-weight: 600;
        margin-bottom: 24px;
      }
      .right-tir{
        margin-bottom: 24px;
      }
    }

    .chart_info {
      background: #FFFFFF;
      border-radius: 12px;
      border: 1px solid #EBEBF4;
      padding: 20px;
      height: 320px;

      .chart_bt {
        z-index: 8;
        position: relative;
        right: 0;
        display: flex;
        justify-content: flex-end;

        .chart_bt1 {
          width: fit-content;
          height: 36px;
          background: #F4F8FE;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px;

          .el-button {
            width: fit-content;
            padding: 5px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            color: #000000;
          }

          .btn {
            // min-width: 28px;
            height: 24px;
            border-radius: 6px;
            background: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000000;
            margin: 0;
          }
        }
      }
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
  .c_list_search{
    display: flex;
    align-items: center;
    .type_select,.status_select{
      width: 170px !important;
      .el-select {
        width: 170px;
        .el-input {
          .el-input__inner {
            width: 100%;
          }
        }
      }
    }
    .search_input{
      width: 360px;
    }
  }
}

@media (max-width: 1220px){
  .consensus{
    padding: 0 .5rem;
    .w1200{
      width: initial;
      .c_list{
        .card-info{
          .card{
            width: 48%;
          }
        }
      }
    }
  }
}

@media (max-width: 1000px){
  .consensus{
    .w1200{
      .c_list{
        .card-info{
          .card{
            &:not(:nth-of-type(2n)){
              margin-right: 4%;
            }
          }
        }
      }
    }
  }
}
@media(max-width: 568px){
  .cards{
    .cards-ul{
      display: flex;
      flex-direction: column;
      .cards-li{
        width: 100%;
        margin: 0;
      }
    }
  }
}
</style>
