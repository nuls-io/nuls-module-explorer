<template>
  <div class="home">
    <div class="h_height tc font30 fW600 capitalize">
      {{$t('home.home0')}}:
      <i class="el-icon-loading font18" v-if="height===0"></i>
      <span v-else>{{height}}</span>
    </div>
    <div class="search">
      <el-input :placeholder="$t('public.searchTip')" v-model="homeSearch" @keyup.enter.native="clickSearch">
        <i class="el-icon-search el-input__icon click" slot="suffix" @click="clickSearch"></i>
      </el-input>
    </div>

    <div class="h_count" v-loading="countLoading">
      <ul class="w1200">
        <li>
          <p class="font18 capitalize">{{$t('consensus.consensus1')}} <i class="el-icon-d-arrow-right"></i></p>
          <h5 class="font24 click" @click="toUrl('consensus')">{{count.nodeNumber}}</h5>
        </li>
        <li>
          <p class="font18 capitalize">{{$t('home.home2')}} <i class="el-icon-d-arrow-right"></i></p>
          <h5 class="font24 click" @click="toUrl('consensus')">{{count.entrustNumber}}K</h5>
        </li>
        <li>
          <p class="font18 capitalize">{{$t('home.home3')}}</p>
          <h5 class="font24">{{count.circulateNumber}}K</h5>
        </li>
        <li>
          <p class="font18 capitalize">{{$t('home.home4')}}</p>
          <h5 class="font24">{{count.tradeNumber}}K</h5>
        </li>
      </ul>
    </div>

    <div class="h_animation" v-loading="packerListLoading">
      <ul class="w1200 clicks" @click="toUrl('rotationInfo',rotationIndex)">
        <li v-for="(item,index) in packerList" :key="index">
          <p class="tc font12">{{item.agentName ? item.agentName : item.packingAddress}}</p>
          <p class="greybox tc" v-show="item.order !== pagekerId">
            <img v-if="item.blockHash && !item.yellow" src="./../assets/img/penGreen.svg">
            <img v-else-if="item.yellow" src="./../assets/img/penYellow.svg">
            <img v-else src="./../assets/img/greybox.svg">
          </p>
          <p class="blocks tc" v-show="item.order === pagekerId"><img src="./../assets/img/penBuild.svg"></p>
        </li>
      </ul>
    </div>

    <div class="h_chart w1200">
      <div class="h_chart_left">
        <div class="h_chart_title tc">
          <span class="font14 tc capitalize">{{$t('home.home5')}}</span>
          <el-tooltip v-if="!isMobile" class="calc fr" effect="light" :content="$t('home.home6')" placement="top">
            <i @click="toCalc" class="iconfont icon-calculator_icon font18 cursor-p click"></i>
          </el-tooltip>
          <div v-if="isMobile" class="calc fr">
            <i @click="toCalc" class="iconfont icon-calculator_icon font18 cursor-p click"></i>
          </div>
        </div>
        <ve-line style="top: -40px" height="100%" width="100%"
                 :loading="yearChartLoading"
                 :data="yearChartData"
                 :legend-visible="false"
                 :colors="colors"
                 :settings="yearSettings">
        </ve-line>
      </div>
      <div class="h_chart_right">
        <div class="h_chart_title tc">
          <span class="font14 tc capitalize">{{$t('home.home7')}}</span>
          <label class="calc fr font14 cursor-p click capitalize"
                 @click="toUrl('transaction')">{{$t('home.home8')}}</label>
        </div>
        <ve-line height="100%" width="100%" style="top: -40px"
                 :loading="dayChartLoading"
                 :data="dayChartData"
                 :legend-visible="false"
                 :colors="colors"
                 :settings="daySettings">
        </ve-line>
      </div>
    </div>
    <el-dialog title="" :visible.sync="calcDialog" :close-on-click-modal="false" center class="home_dialog">
      <CalcBar></CalcBar>
    </el-dialog>
  </div>
</template>

<script>
  import {BigNumber} from 'bignumber.js'
  import CalcBar from '@/components/CalcBar'
  import {superLong, timesDecimals} from '@/api/util.js'

  export default {
    data() {
      this.colors = ['#7db46d', '#7db46d'];
      this.yearSettings = {
        yAxisType: ['percent'],
        labelMap: {
          'value': 'APR'
        },
      };
      this.daySettings = {
        yAxisType: ['KMB'],
        labelMap: {
          'value': 'TXS'
        },
      };

      return {
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
      }
    },
    created() {
      this.isMobile = /(iPhone|iOS|Android|Windows Phone)/i.test(navigator.userAgent);
      this.getNULSInfo();
      //统计信息
      this.getYearRateData(3);
      this.get14DaysData(0);
      this.getRotationList();
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
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              if (response.result.type === 'block') {
                this.$router.push({
                  name: 'blockInfo',
                  query: {height: response.result.data.txList[0].height}
                });
                sessionStorage.setItem('navActive', 'block');
              } else if (response.result.type === 'tx') {
                this.$router.push({
                  name: 'transactionInfo',
                  query: {hash: response.result.data.hash}
                })
              } else if (response.result.type === 'account') {
                this.$router.push({
                  name: 'addressInfo',
                  query: {address: response.result.data.address}
                })
              } else if (response.result.type === 'contract') {
                this.$router.push({
                  name: 'contractsInfo',
                  query: {contractAddress: response.result.data.contractAddress, tabName: 'first'}
                })
              } else {
                this.$message({message: this.$t('codeInfo.codeInfo12'), type: 'error', duration: 1000});
              }
            } else {
              this.$message({message: this.$t('codeInfo.codeInfo12'), type: 'error', duration: 1000});
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
            query: {rotation: parmes}
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
    .h_height {
      color: @Acolor;
      margin: 36px auto;
    }
    .search {
      width: 818px;
      margin: 0 auto;
      .el-input__inner {
        height: 50px;
        line-height: 50px;
        border-radius: 2px;
        border: 1px solid #969eaf;
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
        right: 10px;
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
    .h_animation {
      border-bottom: @BD1;
      background-color: #F9FAFD;
      height: 130px;
      .w1200 {
        li {
          float: right;
          width: 150px;
          .font12 {
            margin: 30px 0 0 0;
            color: #a4aec4;
          }
          .greybox {
            width: 150px;
            margin: 15px auto 0;
            img {
              width: 40px;
            }
          }
          .blocks {
            margin: -15px auto 0;
            img {
              width: 155px;
              margin: -18px 0 0 0;
            }

          }

        }
      }
    }
    .h_chart {
      height: 375px;
      margin: 50px auto;
      .h_chart_left, .h_chart_right {
        width: 48.7%;
        height: 350px;
        float: left;
        border: @BD1;
        .h_chart_title {
          margin: 24px 0 1px 0;
          z-index: 9;
          position: relative;
        }
        .calc {
          margin: 3px 30px 0 0;
        }
      }
      .h_chart_left {

      }
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
      .h_height {
        margin: 1.2rem 0;
      }

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
        .h_chart_left, .h_chart_right {
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
</style>
