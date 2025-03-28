<template>
  <div class="transaction">
    <div class="w1200">
      <h2 class="fl font18 capitalize transaction-title">{{ $t('transaction.transaction0') }}</h2>

      <div class="transaction-echarts">
        <div class="transaction-echarts-box">
          <p class="transaction-volume">{{ $t('transaction.transaction1') }}: <span>{{ this.txListTotal }}</span> </p>
          <div class="chart_bt">
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

        <ve-line height="310px" style="top: -25px" :data="timeChartData" :legend-visible="false" :colors="colors"
          :extend="chartExtend" :settings="chartSettings" :loading="timeRateDataLoading">
        </ve-line>
      </div>
    </div>

    <div class="w1200">
      <h2 class="font18 bg-gray-title">{{ $t('public.transactionList') }}</h2>
    </div>
    <div class="info bg-gray">
      <div class="bg-gray-container w1200">
        <div class="row">
          <SelectBar size="small" v-model="typeRegion" @change="changeType">
          </SelectBar>
          <el-switch class="hide-switch fr" v-model="hideSwitch" :width="32" :inactive-text="$t('block.block1')"
            v-show="typeRegion === 0" @change="hideConsensusList">
          </el-switch>
        </div>

        <el-table :data="txList" style="width: 100%;" v-loading="txListLoading">
          <el-table-column width="10" align="left"></el-table-column>
          <el-table-column :label="$t('public.height')" width="90" align="left">
            <template slot-scope="scope">
              <router-link tag="a" :to="{ name: 'blockInfo', query: { height: scope.row.height }}" class="click">
                {{ scope.row.height }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column label="TXID" min-width="220" align="left">
            <template slot-scope="scope">
              <router-link tag="a" :to="{ name: 'transactionInfo', query: { hash: scope.row.hash }}" class="click">
                  {{ scope.row.hashs }}
                </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="time" :label="$t('public.time')" width="180" align="left">
          </el-table-column>
          <el-table-column :label="$t('public.type')" min-width="120" align="left">
            <template slot-scope="scope"><span class="capitalize">{{ $t('type.' + scope.row.type) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('public.amount')" min-width="160" align="left">
            <template slot-scope="scope">
              <p class="addmoy">
                {{ $formatNumber(scope.row.value) }} {{ scope.row.symbol }}
              </p>
            </template>
          </el-table-column>
          <el-table-column :label="$t('public.fee')" width="160" align="left">
            <template slot-scope="scope">{{ $formatNumber(scope.row.fees) }} {{ scope.row.fee.symbol }}</template>
          </el-table-column>
        </el-table>

        <div class="paging">
          <el-pagination class="pages" background :pager-count=5 layout="total,prev, pager, next, jumper"
            v-show="pagerTotal > pagerRows" :total="pagerTotal" :current-page.sync="pagerIndex" :page-size="pagerRows"
            @current-change="pagesList">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
import SelectBar from '@/components/SelectBar';
import { getLocalTime, superLong, timesDecimals, divisionDecimals } from '@/api/util.js'
import { NSymbol, NDecimals, calDecimalsAndSymbol } from '@/constants/constants'

export default {
  data() {
    this.colors = ['#7db46d', '#7db46d', '#7db46d', '#546570', '#c4ccd3'];
    this.chartExtend = {
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
          return `<div class="line-tooltip">
            <p class="tooltip-label">${params.data[0]}</p>
            <p class="tooltip-value">TXS: ${this.$toThousands(params.data[1])}</p>
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
    },
    this.chartSettings = {
      yAxisType: ['normal'],
      labelMap: { 'value': 'TXS' },
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

      //Statistical chart data
      timeChartData: {
        columns: [],
        rows: []
      },
      timeRateDataLoading: true,
      timeRate: 1,
      //Transaction type
      typeRegion: 0,
      //Hide slider
      hideSwitch: true,
      //Transaction List
      txList: [],
      //Transaction list loading animation
      txListLoading: true,

      nerveTxList: [],//nerve Transaction List
      //Total number of transaction lists
      txListTotal: 0,
      //Paging Information
      pagerTotal: 0,
      pagerIndex: 1,
      pagerRows: 20,
      isCtrl: false,
      symbol: NSymbol,
      decimals: NDecimals,
      activeName: 'first',
    }
  },
  components: {
    SelectBar
  },
  created() {
    this.getYearRateData(this.timeRate);
    this.getTransactionsTotal();
    this.tabNameList();
    //When opened this time, the search on the homepage and navigation will encounter invalid input, paste, and delete issues
    // this.keyDown() 
  },
  mounted() {
  },
  beforeRouteLeave(to, from, next) {
    //console.log(to.name);
    if (to.name === 'transactionInfo') {
      from.meta.keepAlive = true;
    } else {
      from.meta.keepAlive = false;
    }
    next()
  },
  methods: {
    keyDown() {
        // Keyboard press event
        document.onkeydown = (e) => {
          // Cancel default events
          e.preventDefault();   
          //Event object compatibility
          let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
          //  ctrl：17  
          switch (e1.keyCode) {
            case 17:
              this.isCtrl= true;  // IfctrlPress to change the identifier he pressed totrue
              break;
          }
        }
        // Keyboard lifting event
        document.onkeyup = (e) => {
          // Cancel default events
          e.preventDefault();
          //Event object compatibility
          let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
          switch (e1.keyCode) {
            case 17: 
              this.isCtrl = false;  // IfctrlLift it up and make the identifier he pressed change tofalse
              break;
          }
        }
      },
    /**
     * Obtain transaction history data statistics
     */
    getYearRateData(time) {
      this.$post('/', 'getTxStatistical', [time])
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            this.timeChartData.columns = ['key', 'value'];
            this.timeChartData.rows = response.result;
            this.timeRateDataLoading = false;
          }
        })
    },

    /**
     * @disc: Get the latest total transaction volume
     * @date: 2019-09-10 14:02
     * @author: Wave
     */
    getTransactionsTotal() {
      this.$post('/', 'getCoinInfo', [])
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            this.txListTotal = response.result.txCount;
          }
        })
    },

    /**
     * Select the week of statistical data、month、year
     **/
    changeDate(type) {
      this.timeRateDataLoading = true;
      this.timeChartData.columns = [];
      this.timeChartData.rows = [];
      this.timeRate = type;
      this.getYearRateData(type)
    },

    /**
     * @disc: tab switch
     * @params:
     * @date: 2020-06-28 15:11
     * @author: Wave
     */
    handleClick(tab) {
      this.activeName = tab.name;
      this.pagerIndex = 1;
      this.pageTotal = 0;
      this.tabNameList();
    },

    /**
     * @disc: according totabName loading data
     * @params:
     * @date: 2020-07-01 10:54
     * @author: Wave
     */
    tabNameList() {
      if (this.activeName === 'first') {
        this.getTxList(this.pagerIndex, this.pagerRows, this.typeRegion, this.hideSwitch);
      } else {
        this.getCrossTxList(this.pagerIndex, this.pagerRows, this.typeRegion, this.hideSwitch);
      }
    },

    /**
     * Obtain transaction list
     */
    getTxList(page, rows, type, show) {
      this.$post('/', 'getTxList', [page, rows, type, show])
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            for (let item of response.result.list) {
              item.time = moment(getLocalTime(item.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              item.hashs = superLong(item.hash, 15);
              const { decimals, symbol } = calDecimalsAndSymbol(item)
              item.value = divisionDecimals(item.value, decimals);
              item.symbol = symbol
              const { decimals: feeDecimals, symbol: feeSymbol } = calDecimalsAndSymbol(item.fee)
              item.fees = divisionDecimals(item.fee.value, feeDecimals);
              item.fee.symbol = feeSymbol
            }
            this.txList = response.result.list;
            // if (type === 0 && !show) {
            //   this.txListTotal = response.result.totalCount
            // }
            this.pagerTotal = response.result.totalCount;
            this.txListLoading = false;
          }
        })
    },

    /**
     * Paging function
     **/
    pagesList(e) {
      this.pageIndex = e;
      this.txListLoading = true;
      this.tabNameList();
    },

    /**
     * Obtain transaction type
     **/
    changeType(type) {
      this.pager = { total: 0, page: 1, rows: 7, };
      this.typeRegion = parseInt(type);
      this.getTxList(this.pager.page, this.pager.rows, this.typeRegion, this.hideSwitch);
    },

    /**
     * Hide consensus rewards
     **/
    hideConsensusList() {
      this.txListLoading = true;
      this.pager = { total: 0, page: 1, rows: 6 };
      this.getTxList(this.pager.page, this.pager.rows, this.typeRegion, this.hideSwitch);
    },

    /**
     * Query Cross Chain Transaction List
     */
    getCrossTxList(page, rows, type, show) {
      this.$post('/', 'getCrossTxList', [page, rows, type, show])
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            for (let item of response.result.list) {
              item.hashs = superLong(item.txHash, 20);
              item.values = timesDecimals(item.values, 8);
              item.time = moment(getLocalTime(item.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
            }
            this.nerveTxList = response.result.list;
            this.pagerTotal = response.result.totalCount;
            this.txListLoading = false;
          }
        })
    }
  },
}
</script>

<style lang="less">
@import "./../../assets/css/style";

.transaction {
  background-color: #F9FAFD;

  .w1200 {
    display: flex;
    flex-direction: column;

    .transaction-title {
      padding: 24px 0;
      font-weight: 600;
      font-size: 20px;
      color: #000000;
    }

    .transaction-echarts {
      background: #FFFFFF;
      border-radius: 12px;
      padding: 24px;
      height: 336px;

      .transaction-echarts-box {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .transaction-volume {
          font-size: 12px;
          color: #000000;

          span {
            font-size: 16px;
            font-weight: 600;
          }
        }

        .chart_bt {
          min-width: 108px;
          padding: 5px;
          background: #F4F8FE;
          border-radius: 6px;
          z-index: 8;
          position: relative;
          right: 0;
          text-align: right;
          font-size: 12px;
          display: flex;
          align-items: center;
          height: 36px;
          justify-content: space-between;
          .el-button+.el-button{
            margin: 0;
          }
          .el-button--text {
            // &:not(:last-child) {
            //   margin-right: 8px;
            // }

            color: #000000;
            min-width: 28px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
          }

          .btn {
            width: fit-content;
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

  //height: 920px;
  .top-chart {
    height: 280px;

    @media screen and (max-width: 1000px) {
      display: none;
    }

    .chart_title {
      padding: 20px 0;
      height: 20px;

      .chart_bt {
        z-index: 8;
        position: relative;
        right: 0;
        text-align: right;
      }
    }

    .chart_info {
      padding: 20px 0 0 0;
      background: #FFFFFF;
    }
  }

  .info {
    width: 100%;
    margin-bottom: 100px;
    padding: 0 .5rem;
    .bg-gray-container {
      background: #FFFFFF;
      padding: 24px;
      border-radius: 12px;
      .paging .pages .el-pager .active{
        background-color: #00E789 !important;
      }
      .is-checked .el-switch__core{
        border-color: #00E789 !important;
        background-color: #00E789 !important;
      }
      .el-pagination__total,.el-pagination__jump{
        color: #8B8BB0;
      }
      .el-pagination.is-background .el-pager li{
        background-color: initial;
        border: 1px solid #EBEBF4;
        border-radius: 5px;
      }
      .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next{
        background-color: initial;
        border: 1px solid #EBEBF4;
        border-radius: 5px;
      }
      .el-table{
        .el-table__header-wrapper{
          border-radius: 8px;
        }
        .click{
          color: #00DB82;
        }
        td{
          border-bottom: 1px solid #E9E9F8 !important;
          .cell{
            color: #000000;
          }
        }
        th{
          background: #F4F8FE;
          .cell{
            color: #4A4F55;
          }
        }
        .addmoy{
          display: flex;
          align-items: center;
          white-space: nowrap;
        }
      }
      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        
        .el-switch {
          margin: 0;
        }

        .el-select {
          width: 140px;
          height: 36px;

          .el-input {
            height: 36px;

            .el-input__inner {
              background: #F2F7FF;
              border-radius: 8px;
              width: 140px;
              height: 36px !important;
              color: #000000;
              font-size: 14px;
              border: 1px solid #F0F0F8;
            }
          }
        }
      }
    }

    
  }
  .w1200 {
      .bg-gray-title {
        font-weight: 600;
        font-size: 20px;
        color: #000000;
        margin: 24px 0;
      }
    }
  .tabs {
    margin: 0 0 0 0;

    @media screen and (max-width: 1000px) {
      width: 95%;
      margin: 0 auto;
    }

    .el-select {
      margin: 20px 0 14px 0;
    }

    .hide-switch {
      margin: 35px 0 0 0;
    }
  }
}

@media (max-width:1220px){
  .transaction{
    .w1200{
      padding: 0 .5rem;
      width: initial;
    }
  }
}
@media (max-width: 568px){
  .paging{
    .pages{
      white-space: wrap;
      height: initial;
    }
  } 
}
</style>
