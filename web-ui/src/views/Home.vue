<template>
  <div class="home">
    <div class="Information-bar">
      <div class="h_height tc font30 fW600 capitalize">
        {{ $t('home.home0') }}:
        <i class="el-icon-loading font18" v-if="height === 0"></i>
        <span v-else>{{ height }}</span>
      </div>
      <div class="search">
        <el-input type="text" :placeholder="$t('public.searchTip')" v-model="homeSearch" @keyup.enter.native="clickSearch"
          @input="DynamicMonitoring">
          <i class="el-icon-search" slot="suffix" @click="clickSearch"></i>
        </el-input>

        <SearchBar v-if="openSearchBar" :assetsList="assetsList" />
      </div>


      <div class="node-information" v-loading="countLoading">
        <ul class="w1200">
          <li>
            <p class="font16 node-title">{{ $t('home.home3') }}</p>
            <h5 class="font24 click-number">{{ count.circulateNumber }}</h5>
          </li>
          <li>
            <p class="font16 node-title">{{ $t('home.home2') }}</p>
            <h5 class="font24 clicks click-number">
              <router-link :to="{ name: 'Consensus'}">
                {{ count.entrustNumber }}
              </router-link>
            </h5>
          </li>
          <li>
            <p class="font16 node-title">{{ $t('home.home4') }}</p>
            <h5 class="font24 click-number">{{ count.tradeNumber }}</h5>
          </li>
          <li>
            <p class="font16 clicks node-title">
              <router-link :to="{ name: 'destroyList'}">
                {{ $t('home.home9') }}<i class="el-icon-arrow-right"></i>
              </router-link>
            </p>
            <h5 class="font24 click-number">{{ destroyedAddressAmount }}</h5>
          </li>
          <li>
            <div class="font16 node-title text-align">
              {{ $t('home.home10') }}
              <el-tooltip placement="right">
                <div slot="content">
                  <p>{{ count.blockRewardBeforeDeflation }}</p>
                  <p style="font-size: 12px; color: #FFFFFF; line-height: 20px;">{{ $t('home.home35', {
                    number:
                      count.blockRewardBeforeDeflation
                  }) }}</p>
                  <p style="font-size: 12px; color: #FFFFFF; line-height: 20px;">{{ $t('home.home36', {
                    number:
                      count.blockRewardAfterDeflation
                  }) }}</p>
                  <p style="font-size: 12px; color: #FFFFFF; line-height: 20px;">{{ $t('home.home37', {
                    year:
                      this.count.Year, month: this.count.month, day: this.count.Day
                  }) }}</p>
                </div>
                <img class="question cur" src="../assets//img/Group29.png" alt="">
              </el-tooltip>
            </div>
            <h5 class="font24 clicks click-number">{{ count.Countdown_to_production_cuts }}</h5>
          </li>
        </ul>
      </div>
    </div>

    <div class="consensus-node">
      <div class="h_animation w1200" v-loading="packerListLoading">
        <div class="Noun">
          <p class="Noun-title">{{ $t('home.home1') }}</p>
          <p class="Noun-number cur">
            <router-link :to="{ name: 'Consensus'}">
              {{ count.nodeNumber }}
            </router-link>
          </p>
        </div>
        <p class="section"></p>
        <ul class="clicks jiedian" @click="toUrl('rotationInfo', rotationIndex)">
          <li v-for="(item, index) in packerList" :key="index">
            <p class="tc font12" :class="item.order === pagekerId ? 'sizecolor' : ''">{{ item.agentName ? item.agentName :
              item.packingAddress }}</p>
            <p class="greybox tc" v-show="item.order !== pagekerId">
              <img v-if="item.blockHash && !item.yellow" src="./../assets/img/penGreen.svg">
              <img v-else-if="item.yellow" src="./../assets/img/penYellow.svg">
              <img v-else src="./../assets/img/greybox.svg">
            </p>
            <p class="blocks tc" v-show="item.order === pagekerId"><img src="./../assets/img/penBuild.svg"></p>
          </li>
        </ul>
      </div>
    </div>

    <div class="h_chart w1200">
      <div class="h_chart_left">
        <div class="h_chart_title tc">
          <span class="font14 tc capitalize">{{ $t('home.home5') }}</span>
          <el-tooltip v-if="!isMobile" class="calc fr" effect="light" :content="$t('home.home6')" placement="top">
            <i @click="toCalc" class="iconfont icon-calculator_icon font18 cursor-p click"></i>
          </el-tooltip>
          <div v-if="isMobile" class="calc fr">
            <i @click="toCalc" class="iconfont icon-calculator_icon font18 cursor-p click"></i>
          </div>
        </div>
        <ve-line style="top: -40px" height="100%" width="100%" :loading="yearChartLoading" :data="yearChartData"
          :extend="chartExtend" :legend-visible="false" :settings="yearSettings">
        </ve-line>
      </div>
      <div class="h_chart_right">
        <div class="h_chart_title tc">
          <span class="font14 tc capitalize">{{ $t('home.home7') }}</span>
          <router-link tag="a" :to="{ name: 'transaction'}" class="calc fr font14 cursor-p click capitalize">
            {{ $t('home.home8') }}
            <img src="../assets//img/More.svg" alt="" >
          </router-link>
        </div>
        <ve-line height="100%" width="100%" style="top: -40px" :loading="dayChartLoading" :data="dayChartData"
          :extend="chartExtend" :legend-visible="false" :settings="daySettings">
        </ve-line>
      </div>
    </div>
    <el-dialog title="" :visible.sync="calcDialog" :close-on-click-modal="false" center class="home_dialog">
      <CalcBar />
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { API_ROOT } from '@/config'
import CalcBar from '@/components/CalcBar'
import {
  superLong,
  Division,
  Times,
  fixNumber,
  divisionDecimals,
  timesDecimals1,
  formatNumber
} from '@/api/util.js'
import SearchBar from '../components/SearchBar.vue'
import moment from 'moment'
import { mapState } from 'vuex'
import { NDecimals, NDiffDeciamsl } from '@/constants/constants'
// import { NSymbol, NDecimals, NDiffDeciamsl, calDecimalsAndSymbol } from '@/constants/constants'

export default {
  components: {
    SearchBar,
    CalcBar
  },
  data() {
    this.chartExtend = {
      grid: {
        top: 60,
        bottom: 30,
        left: 10,
        right: 10,
        containLabel: true
      },
      series: {
        showSymbol: false,//Cancel small dots on the line chart
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          color: '#000000'
        },
        formatter: params => {
          params = params[0];
          const value = params.seriesName === 'APR'
            ? fixNumber(Times(params.data[1],  100).toFixed(), 2) + '%'
            : fixNumber(Division(params.data[1], 1000), 2) + 'k'
          return `<div class="line-tooltip">
            <p class="tooltip-label">${params.data[0]}</p>
            <p class="tooltip-value">${params.seriesName}: ${value}</p>
          </div>`
        }
      },
      xAxis: {
        axisLine: {
          lineStyle: {
            color: '#B3B3CF'
          }
        }
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            color: '#B3B3CF'
          }
        }
      }
    };
      this.yearSettings = {
        yAxisType: ['percent'],
        labelMap: {
          value: 'APR'
        },
        area: true,
        lineStyle: {
          width: 1,
          color: '#00E789'
        },
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
                color: 'rgba(0, 231, 137, .5)', // 0% Color at
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
    this.daySettings = {
      yAxisType: ['KMB'],
      labelMap: {
        'value': 'TXS'
      },
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
      assetsList: [],
      openSearchBar: false,
      moment,
      isMobile: false,
      //Search content
      homeSearch: '',
      height: this.$store.state.height,//Current height
      //statistical information
      count: {
        nodeNumber: 0,//Node information
        entrustNumber: '0',//Total number of commissioned services across the entire network consensusTotal
        circulateNumber: '0',//Total circulation
        tradeNumber: '0',//Total flux
        blockRewardBeforeDeflation: '0',
        blockRewardAfterDeflation: '0',
        Year: '',
        month: '',
        Day: '',
        Countdown_to_production_cuts: ''
      },
      countLoading: true,
      //Calculator pop-up
      calcDialog: false,
      //Packaging List
      packerList: [],
      packerListLoading: true,
      //Round information
      rotationIndex: '',
      //Packaging nodesID
      pagekerId: 0,
      //Annualized reward rate
      yearChartData: {},
      dayChartData: {},
      yearChartLoading: true,
      yearRateData: [],
      dayRateData: [],
      dayChartLoading: true,
      homeSetInterval: null, //Homepage Timer
      heightSetInterval: null, //Home page height acquisition timer
      destroyedAddressAmount: 0,
    }
  },
  created() {
    this.isMobile = /(iPhone|iOS|Android|Windows Phone)/i.test(navigator.userAgent);
    this.getNULSInfo();
    //statistical information
    this.getYearRateData(3);
    this.get14DaysData(0);
    this.getRotationList();
    // Obtain the quantity that has been destroyed
    this.getAddressInfo()
    //10Cycle data every second
    this.homeSetInterval = setInterval(() => {
      this.getRotationList();
      this.height = this.$store.state.height;
    }, 10000);

  },
  computed: {
    ...mapState(['NULSNumber'])
  },
  mounted() {
    this.heightSetInterval = setInterval(() => {
      if (this.height === 0) {
        this.height = this.$store.state.height;
        this.getNULSInfo();
        this.getYearRateData(3);
        this.get14DaysData(0);
        this.getRotationList();
      }
    }, 1000)
  },
  destroyed() {
    clearInterval(this.homeSetInterval);
    clearInterval(this.heightSetInterval);
  },
  methods: {
    /**
     * @disc: Quantity of destruction obtained
     * @date: 2023-08-16
     */
    async getAddressInfo() {
      const url = API_ROOT + '/nuls/assets/get';
      let dataRes = await axios.get(url);
      if (dataRes.data.success) {
        // this.destroyedAddressAmount = dataRes.data.data.destroy.toFixed(3)
        this.destroyedAddressAmount = formatNumber(timesDecimals1(dataRes.data.data.destroy, NDiffDeciamsl))
      } else {
        this.destroyedAddressAmount = 0
      }
    },

    /**
     * @disc: Obtain node information fromvuexinside
     * @params:
     * @date: 2019-08-30 11:17
     * @author: Wave
     */
    getNULSInfo() {
      if (this.$store.state.nodeNumber.consensusCount) {
        this.count.nodeNumber = this.$store.state.nodeNumber.consensusCount;
      } else {
        this.count.nodeNumber = 0
      }
      let NULSNumber = this.$store.state.NULSNumber;
      if (NULSNumber.length !== 0) {
        // let newBlockRewardBeforeDeflation = new BigNumber(timesDecimals(NULSNumber.blockRewardBeforeDeflation, 8, 5));
        // this.count.blockRewardBeforeDeflation = newBlockRewardBeforeDeflation.toFormat(5);
        // let newBlockRewardAfterDeflation = new BigNumber(timesDecimals(NULSNumber.blockRewardAfterDeflation, 8, 5));
        // this.count.blockRewardAfterDeflation = newBlockRewardAfterDeflation.toFormat(5);
        this.count.blockRewardBeforeDeflation = fixNumber(divisionDecimals(NULSNumber.blockRewardBeforeDeflation, NDecimals), 5);
        this.count.blockRewardAfterDeflation = fixNumber(divisionDecimals(NULSNumber.blockRewardAfterDeflation, NDecimals), 5);
        this.count.Year = moment(NULSNumber.nextDeflationTime).format('YYYY');
        this.count.month = moment(NULSNumber.nextDeflationTime).format('MM');
        this.count.Day = moment(NULSNumber.nextDeflationTime).format('DD');
        this.countdown(NULSNumber.nextDeflationTime)
        // let newCirculateNumber = new BigNumber(timesDecimals(NULSNumber.total, 11));
        // this.count.circulateNumber = newCirculateNumber.toFormat(2);
        this.count.circulateNumber = formatNumber(divisionDecimals(NULSNumber.total, NDecimals))
        // let newEntrustNumber = new BigNumber(timesDecimals(NULSNumber.consensusTotal, 11));
        // this.count.entrustNumber = newEntrustNumber.toFormat(2);
        this.count.entrustNumber = formatNumber(divisionDecimals(NULSNumber.consensusTotal, NDecimals))
        // let newTradeNumber = new BigNumber(timesDecimals(NULSNumber.circulation, 11));
        // this.count.tradeNumber = newTradeNumber.toFormat(2);
        this.count.tradeNumber = formatNumber(divisionDecimals(NULSNumber.circulation, NDecimals))
        this.countLoading = false;
      }
    },
    countdown(targetTime) {
      if (!targetTime) return false;
      // Target time
      let newdate = new Date(targetTime)
      // let setINT = setInterval(() => {
      // current time
      let olddate = new Date()
      // Subtract the current time from the target time
      let down = newdate - olddate
      // When the remaining time is negative, clear the timer
      if (down < 0) {
        // clearInterval(setINT)
      }
      this.formatSeconds(down)
      // },3000)
    },
    formatSeconds(value) {
      var secondTime = 0 //second
      var minuteTime = 0; // branch
      var hourTime = 0; // hour
      var today = 0 //day
      // How many seconds are left for all
      var seconds = Math.ceil(value / 1000)

      hourTime = Math.floor(seconds / 3600)
      //Days
      today = Math.floor(hourTime / 24)
      //hour
      hourTime = Math.floor(hourTime % 24) < 10 ? '0' + Math.floor(hourTime % 24) : Math.floor(hourTime % 24)
      // branch
      minuteTime = Math.floor(seconds / 60 % 60) < 10 ? '0' + Math.floor(seconds / 60 % 60) : Math.floor(seconds / 60 % 60)
      //second
      secondTime = Math.floor(seconds % 60) < 10 ? '0' + Math.floor(seconds % 60) : Math.floor(seconds % 60)
      this.count.Countdown_to_production_cuts = today + 'd:' + hourTime + 'h:' + minuteTime + 'm'
    },
    DynamicMonitoring(e) {
      if (!e) {
        this.assetsList = []
        this.openSearchBar = false
      }
    },
    /**
     *  Global search box on homepage
     **/
    clickSearch() {
      this.$post('/', 'search', [this.homeSearch])
        .then((response) => {
          if (response.hasOwnProperty("result")) {
            if (response.result.type === 'block') {
              this.$router.push({
                name: 'blockInfo',
                query: { height: response.result.data.txList[0].height }
              });
              sessionStorage.setItem('navActive', 'block');
            } else if (response.result.type === 'tx') {
              this.$router.push({
                name: 'transactionInfo',
                query: { hash: response.result.data.hash }
              })
            } else if (response.result.type === 'account') {
              this.$router.push({
                name: 'addressInfo',
                query: { address: response.result.data.address }
              })
            } else if (response.result.type === 'contract') {
              this.$router.push({
                name: 'contractsInfo',
                query: { contractAddress: response.result.data.contractAddress, tabName: 'first' }
              })
              // eslint-disable-next-line no-empty
            } else if (response.result.type === 'asset') {
              const list = response.result.data
              this.assetsList = list
              this.openSearchBar = true
            } else {
              this.$message({ message: this.$t('codeInfo.codeInfo12'), type: 'error', duration: 2000 });
            }
          } else {
            this.$message({ message: this.$t('codeInfo.codeInfo12'), type: 'error', duration: 2000 });
          }
        }).catch((error) => {
          console.log(error)
        })
    },

    /**
     * Calculator pop-up display
     */
    toCalc() {
      this.calcDialog = true
    },

    /**
     * Get a list of rounds
     */
    getRotationList() {
      this.$post('/', 'getBestRoundInfo', [])
        .then((response) => {
          if (response.hasOwnProperty("result")) {
            try {
              this.rotationIndex = response.result.index;
              this.pagekerId = response.result.packerOrder;
              const itemList = response.result.itemList
              if(itemList && itemList.length > 0){
                for (let item of response.result.itemList) {
                  item.agentName = item.agentName ? item.agentName : superLong(item.seedAddress, 6);
                }
                this.packerList = response.result.itemList.slice(response.result.packerOrder - 1, response.result.packerOrder + 6);
                let packed = response.result.itemList.slice(response.result.packerOrder - 2, response.result.packerOrder - 1);
                this.packerList.unshift(packed[0]);
              }
            } catch (error) {
              console.log(error)
            }
            this.packerListLoading = false;
          }
        })
    },

    /**
     * Obtain consensus annualized reward rate
     */
    getYearRateData(time) {
      this.$post('/', 'getAnnulizedRewardStatistical', [time])
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            for (let item of response.result) {
              item.value = item.value / 100
              item.key = moment(item.key).format('YYYY/MM')
            }
            this.yearRateData = response.result;
          }
        })
    },

    /**
     * obtain14Daily trading history data
     */
    get14DaysData(time) {
      this.$post('/', 'getTxStatistical', [time])
        .then((response) => {
          if (response.hasOwnProperty("result")) {
            this.dayRateData = response.result
          }
        })
    },

    /**
     * url Connection jump
     * @param name
     * @param parmes
     */
    toUrl(name, parmes) {
      if (name === 'transaction') {
        this.$router.push({
          name: name
        })
      } else {
        this.$router.push({
          name: name,
          query: { rotation: parmes }
        })
      }
    },
  },
  watch: {
    yearRateData: function () {
      // yearRateDataWhen releasing changes, trigger this callback function to draw a chart yearChartLoading
      this.yearChartLoading = false;
      this.yearChartData = {
        columns: ['key', 'value'],
        rows: this.yearRateData
      };
    },
    dayRateData: function () {
      // dayRateDataWhen releasing changes, trigger this callback function to draw a chart dayChartLoading
      this.dayChartLoading = false;
      this.dayChartData = {
        columns: ['key', 'value'],
        rows: this.dayRateData
      };
    }
  }

}
</script>

<style lang="less" type="text/less">
@import "./../assets/css/style";

.home {
  background: #F7F8FB;

  .Information-bar {
    height: 237px;
    background: #00DB82;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-top: 48px;

    .node-information {
      position: absolute;
      bottom: -55px;

      ul {
        display: flex;
        align-items: center;
        justify-content: space-between;

        li {
          width: 224px;
          height: 110px;
          background: #FFFFFF;
          border-radius: 12px;
          border: 1px solid #EBEBF4;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .question {
            width: 14px;
            height: 14px;
            margin-left: 6px;
          }

          .click-number {
            margin-top: 12px;
            font-weight: 600;
          }

          .node-title {
            font-size: 16px;
            color: #9C9CBA;
          }

          .text-align {
            text-align: center;
            line-height: 22px;
          }
        }
      }
    }

    .h_height {
      font-size: 20px;
      color: #FFFFFF;
      span{
        user-select: none;
      }
    }

    .search {
      width: 518px;
      margin: 24px auto 0;
      position: relative;
      .search-container{
        width: 100%;
      }
      .el-input__inner {
        height: 44px;
        line-height: 44px;
        border-radius: 12px;
        border: none;
        padding-right: 40px;

        &::-webkit-input-placeholder {
          color: @Acolor2;
          font-size: 14px;
          text-align: left;
        }

        &:focus {
          border-color: @Ncolour;
        }
      }

      .el-input__suffix {
        display: flex;
        align-items: center;
        right: 14px;
        font-size: 16px;
      }
    }
  }

  .h_count {
    margin: 58px auto 0;
    border-top: @BD1;
    border-bottom: @BD1;

    ul {
      height: 126px;

      li {
        text-align: center;
        width: 25%;
        height: 80px;
        float: left;
        border-left: @BD1;
        margin: 26px 0 0 0;
        padding-top: 10px;

        &:first-child {
          border-left: 0
        }

        p {
          color: @Acolor1;
        }

        h5 {
          color: @Acolor;
          margin: 10px 0 0 0;
          font-weight: 600;
        }
      }
    }
  }

  .consensus-node {
    padding-top: 72px;

    .h_animation {
      border: 1px solid #EBEBF4;
      background-color: #FFFFFF;
      height: 110px;
      border-radius: 12px;
      display: flex;
      align-items: center;

      .Noun {
        width: 132.33px;
        height: 90px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .Noun-title {
          font-size: 14px;
          white-space: nowrap;
          color: #9C9CBA;
        }

        .Noun-number {
          font-size: 24px;
          color: #000000;
          font-weight: 600;
          margin-top: 14px;
        }
      }

      .section {
        width: 1px;
        height: 30px;
        background: #E9E9F8;
      }

      .jiedian {
        li {
          width: 133.3px;
        }
      }

      ul {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;

        li {
          height: 90px;
          float: right;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;

          .font12 {
            margin: 0 0 0 0;
            color: #9C9CBA;
          }

          .sizecolor {
            position: relative;
            top: 32px;
          }

          .greybox {
            width: 125px;
            margin: 15px auto 0;

            img {
              width: 30px;
            }
          }

          .blocks {
            width: 116px;

            img {
              width: 116px;
              margin: 8px 0 0 0;
            }

          }

        }
      }
    }
  }

  .h_chart {
    height: 375px;
    margin: 20px auto;

    .h_chart_left,
    .h_chart_right {
      width: 48.7%;
      height: 310px;
      float: left;
      border: @BD1;
      border-radius: 12px;
      background: #FFFFFF;

      .h_chart_title {
        margin: 24px 0 1px 0;
        z-index: 9;
        position: relative;

        .font14 {
          color: #000000;
          font-size: 14px;
        }

        .icon-calculator_icon::before {
          color: #00DB82;
        }
      }

      .calc {
        margin: 3px 30px 0 0;
      }
    }

    .h_chart_left {}

    .h_chart_right {
      float: right;
    }
  }

  .home_dialog {
    .el-dialog {
      width: 745px;
    }
  }

  @media screen and (max-width: 1000px) {
    .search {
      width: 90%;

    }

    .h_count {
      margin: 1rem auto 0;

      ul {
        height: 5rem;

        li {
          height: 3rem;
          margin: 1rem 0 0 0;

          p {
            font-size: 0.7rem;
            line-height: 0.7rem;
          }

          h5 {
            font-size: 0.8rem;
            line-height: 0.8rem;
          }
        }
      }
    }

    .h_animation {
      display: none;
    }

    .h_chart {
      height: auto;
      margin: 1.5rem 0;

      .h_chart_left,
      .h_chart_right {
        width: 100%;
        height: 15rem;
        float: none;
      }

    }

    .home_dialog {
      .el-dialog {
        width: 92%;

        .el-dialog__body {
          padding: 1rem 0.5rem;
        }
      }
    }
  }

  .el-dialog__wrapper {
    .el-dialog {
      background-color: @Bcolour;
    }
  }
}

@media (max-width:1220px) {
  .home {
    .consensus-node {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }

    .h_chart {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }

    .Information-bar {
      .node-information {
        width: 100%;
        padding: 0 .5rem;

        ul {
          li {
            width: 19%;
          }
        }
      }
    }

    .w1200 {
      width: initial;
    }
  }
}

@media (max-width:1000px) {
  .home {
    padding-bottom: 50px;

    .Information-bar {
      .node-information {
        width: 100%;
        padding: 0 0.5rem;

        ul {
          li {
            width: 19%;
          }
        }
      }

      .search {
        width: 80%;
      }
    }

    .consensus-node {
      display: none;
    }

    .h_chart {
      padding: 0 0.5rem;
      margin-top: 4.5rem;

      .h_chart_right {
        margin-top: 1.3rem;
      }
    }
  }
}

@media (max-width:768px) {
  .home {
    .Information-bar {
      .node-information {
        ul {
          li {
            .node-title {
              font-size: 12px;
            }

            .question {
              margin-left: 2px;
            }

            .click-number {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}

@media (max-width:586px) {
  .home {
    .h_chart {
      margin-top: 12.5rem;
    }

    .Information-bar {
      .node-information {
        bottom: -196px;

        ul {
          flex-wrap: wrap;

          li {
            width: 120px;
            margin-bottom: 12px;
          }
        }
      }
    }
  }
}

@media (max-width:513px) {
  .home {
    .h_chart {
      margin-top: 12.5rem;
    }

    .Information-bar {
      .node-information {
        bottom: -196px;

        ul {
          flex-wrap: wrap;
          justify-content: initial;

          li {
            width: 30%;
            margin-right: 5%;

            &:nth-of-type(3) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}</style>

<style>.el-tooltip__popper {
  width: fit-content;
}</style>
