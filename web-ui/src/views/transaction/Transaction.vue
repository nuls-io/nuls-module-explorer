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

        <ve-line height="300px" style="top: -25px" :data="timeChartData" :legend-visible="false" :colors="colors"
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
          <el-table-column :label="$t('public.height')" width="90" align="left">
            <template slot-scope="scope"><span class="click" @click="toUrl('blockInfo', scope.row.height)">{{
              scope.row.height }}</span>
            </template>
          </el-table-column>
          <el-table-column label="TXID" min-width="280" align="left">
            <template slot-scope="scope"><span class="click" @click="toUrl('transactionInfo', scope.row.hash)">{{
              scope.row.hashs }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="time" :label="$t('public.time')" width="180" align="left">
          </el-table-column>
          <el-table-column :label="$t('public.type')" width="160" align="left">
            <template slot-scope="scope"><span class="capitalize">{{ $t('type.' + scope.row.type) }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('public.amount')" width="160" align="left">
            <template slot-scope="scope">{{ scope.row.value }}{{ scope.row.symbol }}</template>
          </el-table-column>
          <el-table-column :label="$t('public.fee')" width="160" align="left">
            <template slot-scope="scope">{{ scope.row.fees }}{{ scope.row.fee.symbol }}</template>
          </el-table-column>
        </el-table>

        <div class="paging">
          <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
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
import { getLocalTime, superLong, timesDecimals } from '@/api/util.js'

export default {
  data() {
    this.colors = ['#7db46d', '#7db46d', '#7db46d', '#546570', '#c4ccd3'];
    this.chartExtend = {
      series: {
        showSymbol: false,//取消折线图上的小圆点
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          color: '#000000'
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
        area: true, //是否展示为面积图
        itemStyle: { //面积图颜色设置
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(0, 231, 137, 0.5)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(255, 255, 255, 0)' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          }
        }
      };
    return {

      //统计图数据
      timeChartData: {
        columns: [],
        rows: []
      },
      timeRateDataLoading: true,
      timeRate: 2,
      //交易类型
      typeRegion: 0,
      //隐藏滑块
      hideSwitch: false,
      //交易列表
      txList: [],
      //交易列表加载动画
      txListLoading: true,

      nerveTxList: [],//nerve 交易列表
      //交易列表总数
      txListTotal: 0,
      //分页信息
      pagerTotal: 0,
      pagerIndex: 1,
      pagerRows: 6,

      symbol: sessionStorage.hasOwnProperty('symbol') ? sessionStorage.getItem('symbol') : 'NULS',//默认symbol
      decimals: sessionStorage.hasOwnProperty('decimals') ? Number(sessionStorage.getItem('decimals')) : 8,//decimals
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

    /**
     * 获取交易历史数据统计
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
     * @disc: 获取最新的交易总量
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
     * 选择统计数据的周、月、年
     **/
    changeDate(type) {
      this.timeRateDataLoading = true;
      this.timeChartData.columns = [];
      this.timeChartData.rows = [];
      this.timeRate = type;
      this.getYearRateData(type)
    },

    /**
     * @disc: tab 切换
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
     * @disc: 根据tab名称加载数据
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
     * 获交易列表
     */
    getTxList(page, rows, type, show) {
      this.$post('/', 'getTxList', [page, rows, type, show])
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            for (let item of response.result.list) {
              item.time = moment(getLocalTime(item.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              item.hashs = superLong(item.hash, 20);
              item.value = timesDecimals(item.value, item.decimal);
              item.fees = timesDecimals(item.fee.value, this.decimals);
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
     * 分页功能
     **/
    pagesList(e) {
      this.pageIndex = e;
      this.txListLoading = true;
      this.tabNameList();
    },

    /**
     * 获取交易类型
     **/
    changeType(type) {
      this.pager = { total: 0, page: 1, rows: 7, };
      this.typeRegion = parseInt(type);
      this.getTxList(this.pager.page, this.pager.rows, this.typeRegion, this.hideSwitch);
    },

    /**
     * 隐藏共识奖励
     **/
    hideConsensusList() {
      this.txListLoading = true;
      this.pager = { total: 0, page: 1, rows: 6 };
      this.getTxList(this.pager.page, this.pager.rows, this.typeRegion, this.hideSwitch);
    },

    /**
     * 查询跨链交易列表
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
    },

    /**
     * url 连接跳转
     * @param name
     * @param parmes
     */
    toUrl(name, parmes) {
      this.$router.push({
        name: name,
        query: name === 'transactionInfo' ? { hash: parmes } : { height: parmes }
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
      height: 300px;

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
          width: 108px;
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
            min-width: 28px;
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
          .cell{
            color: #4A4F55;
          }
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
</style>
