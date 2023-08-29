<template>
  <div class="home">
    <div class="Information-bar">
      <div class="h_height tc font30 fW600 capitalize">
        {{ $t('home.home0') }}:
        <i class="el-icon-loading font18" v-if="height === 0"></i>
        <span v-else>{{ height }}</span>
      </div>
      <div class="search">
        <el-input :placeholder="$t('public.searchTip')" v-model="homeSearch" @keyup.enter.native="clickSearch">
          <i class="el-icon-search" slot="suffix" @click="clickSearch"></i>
        </el-input>

        <div class="search-container" v-if="false">
          <div class="search-scroll">
            <div class="search-centent">
              <p class="style1">Tokens</p>
              <div class="style2"><img src="../assets/img/destroyed.svg" alt=""><p class="sysmol font14">NULS</p><p class="monys font12">$0.21</p></div>
              <p class="style3">0xa2791bdf2d5055cda4d46ec17f9f429568275047</p>
              <p class="style3">http://www.nuls.io</p>
            </div>
            <div class="search-centent">
              <p class="style1">Tokens</p>
              <div class="style2"><img src="../assets/img/destroyed.svg" alt=""><p class="sysmol font14">NULS</p><p class="monys font12">$0.21</p></div>
              <p class="style3">0xa2791bdf2d5055cda4d46ec17f9f429568275047</p>
              <p class="style3">http://www.nuls.io</p>
            </div>
          </div>
        </div>
      </div>


      <div class="node-information" v-loading="countLoading">
        <ul class="w1200">
          <li>
            <p class="font16 node-title">{{ $t('home.home3') }}</p>
            <h5 class="font24 click-number">{{ count.circulateNumber }}K</h5>
          </li>
          <li>
            <p class="font16 node-title">{{ $t('home.home2') }}</p>
            <h5 class="font24 clicks click-number" @click="toUrl('consensus')">{{ count.entrustNumber }}K</h5>
          </li>
          <li>
            <p class="font16 node-title">{{ $t('home.home4') }}</p>
            <h5 class="font24 click-number">{{ count.tradeNumber }}K</h5>
          </li>
          <li>
            <p class="font16 clicks node-title" @click="toUrl('destroyList')">{{ $t('home.home9') }}<i class="el-icon-arrow-right"></i></p>
            <h5 class="font24 click-number">{{ destroyedAddressAmount }}</h5>
          </li>
          <li>
            <div class="font16 node-title">
              {{ $t('home.home10') }}
              <el-tooltip placement="right">
                <div slot="content">
                  <p style="font-size: 12px; color: #FFFFFF; line-height: 20px;">当前平均区块奖励：13,308 NULS</p>
                  <p style="font-size: 12px; color: #FFFFFF; line-height: 20px;">减产后平均区块奖励：13,308 NULS </p>
                  <p style="font-size: 12px; color: #FFFFFF; line-height: 20px;">下一次减产时间：2023年12月20日</p>
                </div>
                <img class="question cur" src="../assets//img/Group29.png" alt="">
              </el-tooltip>
            </div>
            <h5 class="font24 clicks click-number">{{ 0 }}K</h5>
          </li>
        </ul>
      </div>
    </div>

    <div class="consensus-node">
      <div class="h_animation w1200" v-loading="packerListLoading">
        <div class="Noun">
          <p class="Noun-title">{{ $t('home.home1') }}</p>
          <p class="Noun-number cur" @click="toUrl('consensus')">{{ count.nodeNumber }}</p>
        </div>
        <p class="section"></p>
        <ul class="clicks" @click="toUrl('rotationInfo', rotationIndex)">
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
          <label class="calc fr font14 cursor-p click capitalize" @click="toUrl('transaction')">
            {{ $t('home.home8')}}
            <img src="../assets//img/More.svg" alt="">
          </label>
        </div>
        <ve-line height="100%" width="100%" style="top: -40px" :loading="dayChartLoading" :data="dayChartData" :extend="chartExtend"
          :legend-visible="false" :settings="daySettings">
        </ve-line>
      </div>
    </div>
    <el-dialog title="" :visible.sync="calcDialog" :close-on-click-modal="false" center class="home_dialog">
      <CalcBar></CalcBar>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { BigNumber } from 'bignumber.js'
import CalcBar from '@/components/CalcBar'
import { superLong, timesDecimals } from '@/api/util.js'
import { API_ROOT } from '@/config'
import moment from 'moment'

export default {
  data() {
      this.chartExtend = {
        series: {
          showSymbol: false,//取消折线图上的小圆点
        },
        tooltip:{
          trigger: 'axis',
          textStyle:{
            color: '#000000'
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
          }
        }
      },
      this.yearSettings = {
        yAxisType: ['percent'],
        labelMap: {
          'value': 'APR'
        },
        area: true,
        lineStyle:{
          width: 1,
          color: '#00E789'
        },
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
                color: 'rgba(0, 231, 137, .5)', // 0% 处的颜色
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
    this.daySettings = {
      yAxisType: ['KMB'],
      labelMap: {
        'value': 'TXS'
      },
      lineStyle:{
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
      moment,
      isMobile: false,
      //搜索的内容
      homeSearch: '',
      height: this.$store.state.height,//当前高度
      //统计信息
      count: {
        nodeNumber: 0,//节点信息
        entrustNumber: '0',//全网委托总量 consensusTotal
        circulateNumber: '0',//总发行量
        tradeNumber: '0'//总流通量
      },
      countLoading: true,
      //计算器弹框
      calcDialog: false,
      //打包列表
      packerList: [],
      packerListLoading: true,
      //轮次信息
      rotationIndex: '',
      //打包节点ID
      pagekerId: 0,
      //年化奖励率
      yearChartData: {},
      dayChartData: {},
      yearChartLoading: true,
      yearRateData: [],
      dayRateData: [],
      dayChartLoading: true,
      homeSetInterval: null, //首页定时器
      heightSetInterval: null, //首页高度获取定时器
      destroyedAddressAmount: 0,
    }
  },
  created() {
    this.isMobile = /(iPhone|iOS|Android|Windows Phone)/i.test(navigator.userAgent);
    this.getNULSInfo();
    //统计信息
    this.getYearRateData(3);
    this.get14DaysData(0);
    this.getRotationList();
    // 获取已销毁数量
    this.getAddressInfo()
    //10秒循环一次数据
    this.homeSetInterval = setInterval(() => {
      this.getRotationList();
      this.height = this.$store.state.height;
    }, 10000);
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
  components: {
    CalcBar
  },
  methods: {
    /**
     * @disc: 获销毁数量
     * @date: 2023-08-16
     */
    async getAddressInfo() {
      const url = API_ROOT + '/nuls/assets/get';
      let dataRes = await axios.get(url);
      if (dataRes.data.success) {
        this.destroyedAddressAmount = dataRes.data.data.destroy.toFixed(3)
      } else {
        this.destroyedAddressAmount = 0
      }
    },

    /**
     * @disc: 获取节点信息从vuex里面
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
        let newCirculateNumber = new BigNumber(timesDecimals(NULSNumber.total, 11));
        this.count.circulateNumber = newCirculateNumber.toFormat(2);
        let newEntrustNumber = new BigNumber(timesDecimals(NULSNumber.consensusTotal, 11));
        this.count.entrustNumber = newEntrustNumber.toFormat(2);
        let newTradeNumber = new BigNumber(timesDecimals(NULSNumber.circulation, 11));
        this.count.tradeNumber = newTradeNumber.toFormat(2);
        this.countLoading = false;
      }
    },

    /**
     *  首页全局搜索框
     **/
    clickSearch() {
      this.$post('/', 'search', [this.homeSearch])
        .then((response) => {
          console.log(response,'搜索到的内容');
          return false
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
            } else {
              this.$message({ message: this.$t('codeInfo.codeInfo12'), type: 'error', duration: 1000 });
            }
          } else {
            this.$message({ message: this.$t('codeInfo.codeInfo12'), type: 'error', duration: 1000 });
          }
          this.homeSearch = '';
        }).catch((error) => {
          console.log(error)
        })
    },

    /**
     * 计算器弹框显示
     */
    toCalc() {
      this.calcDialog = true
    },

    /**
     * 获取轮次列表
     */
    getRotationList() {
      this.$post('/', 'getBestRoundInfo', [])
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            for (let item of response.result.itemList) {
              item.agentName = item.agentName ? item.agentName : superLong(item.seedAddress, 6);
            }
            this.rotationIndex = response.result.index;
            this.pagekerId = response.result.packerOrder;
            this.packerList = response.result.itemList.slice(response.result.packerOrder - 1, response.result.packerOrder + 6);
            let packed = response.result.itemList.slice(response.result.packerOrder - 2, response.result.packerOrder - 1);
            this.packerList.unshift(packed[0]);
            this.packerListLoading = false;
          }
        })
    },

    /**
     * 获取共识年化奖励率
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
     * 获取14天交易历史数据
     */
    get14DaysData(time) {
      this.$post('/', 'getTxStatistical', [time])
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            this.dayRateData = response.result
          }
        })
    },

    /**
     * url 连接跳转
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
      // yearRateData，当放生变化时，触发这个回调函数绘制图表 yearChartLoading
      this.yearChartLoading = false;
      this.yearChartData = {
        columns: ['key', 'value'],
        rows: this.yearRateData
      };
    },
    dayRateData: function () {
      // dayRateData，当放生变化时，触发这个回调函数绘制图表 dayChartLoading
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
        }
      }
    }

    .h_height {
      font-size: 20px;
      color: #FFFFFF;
    }

    .search {
      width: 518px;
      margin: 24px auto 0;
      position: relative;
      .search-container{
        width: 518px;
        height: 235px;
        position: absolute;
        z-index: 999;
        top: 52px;
        border-radius: 12px;
        background: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        .search-scroll{
          padding: 0 16px;
          width: 500px;
          height: 220px;
          background: #FFFFFF;
          border-radius: 12px;
          overflow-y: auto;
          &::-webkit-scrollbar {
            width: 10px;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 8px;
            background-color: #C6D1E2;
          }
          &::-webkit-scrollbar-track {
            border-radius: 8px;
            background-color: #F2F7FF;
            border: 1px solid #F2F7FF;
          }
        }
        .search-centent{
          padding-bottom: 16px;
          padding-top: 16px;
          &:not(:last-child){
            border-bottom: 1px solid #E9E9F8;
          }
          .style1{
            color: #8291A4;
            font-size: 14px;
            margin-bottom: 16px;
          }
          .style2{
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            img{
              width: 24px;
              height: 24px;
              border-radius: 50%;
              margin-right: 8px;
            }
            .sysmol{
              color: #000000;
            }
            .monys{
              color: #000000;
              padding: 5px;
              border-radius: 6px;
              background: #F2F7FF;
            }
          }
          .style3{
            color: #4A4F55;
            font-size: 14px;
          }
        }
      }
      .el-input__inner {
        height: 44px;
        line-height: 44px;
        border-radius: 12px;
        border: none;

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
        font-size: 18px;
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
      justify-content: space-between;

      .Noun {
        width: 160px;
        height: 90px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .Noun-title {
          font-size: 16px;
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
      height: 350px;
      float: left;
      border: @BD1;
      border-radius: 12px;

      .h_chart_title {
        margin: 24px 0 1px 0;
        z-index: 9;
        position: relative;
        .font14{
          color: #000000;
          font-size: 14px;
        }
        .icon-calculator_icon::before{
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

@media (max-width:1220px){
  .home{
    .consensus-node{
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
    .h_chart{
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
    .Information-bar{
      .node-information{
        width: 100%;
        padding: 0 .5rem;
        ul{
          li{
            width: 19%;
          }
        }
      }
    }
    .w1200{
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
        ul{
          li{
            width: 19%;
          }
        }
      }
      .search{
        width: 80%;
      }
    }
    .consensus-node{
      display: none;
    }
    .h_chart{
      padding: 0 0.5rem;
      margin-top: 4.5rem;
      .h_chart_right{
        margin-top: 1.3rem;
      }
    }
  }
}

@media (max-width:768px){
  .home{
    .Information-bar{
      .node-information{
        ul{
          li{
            .node-title{
              font-size: 12px;
            }
            .question{
              margin-left: 2px;
            }
            .click-number{
              font-size: 14px;
            }
          }
        }
      }
    }
  } 
}

@media (max-width:586px){
  .home{
    .h_chart{
      margin-top: 12.5rem;
    }
    .Information-bar{
      .node-information{
        bottom: -196px;
        ul{
          flex-wrap: wrap;
          li{
            width: 120px;
            margin-bottom: 12px;
          }
        }
      }
    }
  } 
}

@media (max-width:513px){
  .home{
    .h_chart{
      margin-top: 12.5rem;
    }
    .Information-bar{
      .node-information{
        bottom: -196px;
        ul{
          flex-wrap: wrap;
          justify-content: initial;
          li{
            width: 30%;
            margin-right: 5%;
            &:nth-of-type(3){
              margin-right: 0;
            }
          }
        }
      }
    }
  } 
}

</style>

<style>
.el-tooltip__popper{
  width: fit-content;
}
</style>
