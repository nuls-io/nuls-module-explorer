<template>
  <div class="block-info bg-gray">
    <div class="bg-white w1200">
      <div class="font24 block-info-title">#{{this.height}}</div>

      <div class="to-switch" @click="addition(false)"><i class="el-icon-arrow-left"></i></div>
      <div class="to-switch" @click="addition(true)"><i class="el-icon-arrow-right"></i></div>
    </div>
    <div class="info_tabs w1200">
      <h3 class="tabs_title tabs_header capitalize">{{$t('public.basicInfo')}}</h3>
      <ul class="ul">
        <li class="tabs_infos fl capitalize">
          <p>{{$t('public.block')}} hash
            <span>{{nodeInfo.hashs}}
              <img src="../../assets/img/Icon.png" alt="" :title="$t('public.copy')" @click="$copy(nodeInfo.hash)">
            </span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize">
          <p>
            {{$t('public.outNode')}}
            <router-link
              v-show="!nodeInfo.seedPacked"
              class="fr click"
              tag="a" :to="computePath('ConsensusInfo', nodeInfo.agentHash)">
              {{nodeInfo.agentAlias ? nodeInfo.agentAlias: nodeInfo.agentId }}
            </router-link>
            <span v-show="nodeInfo.seedPacked">{{$t('public.seedNode')}}</span>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>
            {{$t('public.packAddress')}}
            <router-link
              class="fr click"
              tag="a" :to="computePath('addressInfo', packingAddress)">
              {{ packingAddress }}
            </router-link>
          </p>
        </li>
        <li class="tabs_infos fl capitalize"><p>{{$t('public.transactionNo')}}<span>{{nodeInfo.txCount}}</span></p></li>
        <li class="tabs_infos fl capitalize"><p>{{$t('public.size')}} <span>{{nodeInfo.size}} Bytes</span></p></li>
        <li class="tabs_infos fl capitalize"><p>{{$t('public.blockReward')}}<span>{{nodeInfo.reward}}<span class="fCN">&nbsp;{{symbol}}</span></span></p></li>
        <li class="tabs_infos fl capitalize">
          <p>{{$t('public.round')}}/{{$t('public.number')}}
            <span>
              <router-link
                class="click"
                tag="a" :to="computePath('rotationInfo', nodeInfo.roundIndex)">
                {{ nodeInfo.roundIndex }}
              </router-link>
              /{{nodeInfo.packingIndexOfRound}}</span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize"><p>{{$t('public.fee')}}<span>{{nodeInfo.totalFee}}<span class="fCN">&nbsp;{{symbol}}</span></span></p></li>
        <li class="tabs_infos fl capitalize"><p>{{$t('public.time')}}<span>{{nodeInfo.createTime}}</span></p></li>
        <li class="tabs_infos fl capitalize"><p>{{$t('public.consensusReward')}}<span>{{nodeInfo.totalReward}}<span class="fCN">&nbsp;{{symbol}}</span></span></p></li>
      </ul>

      <div class="bg-white w1200">
        <div class="font20 block-info-title">{{$t('public.transactionList')}}</div>
      </div>
      
      <div class="bg-white-container">
        <div class="select">
          <SelectBar size="small" v-model="typeRegion" @change="changeType"></SelectBar>
        </div>
        <div class="info_table">
          <el-table :data="txList" style="width: 100%">
            <el-table-column label="" width="30">
            </el-table-column>
            <el-table-column label="TXID" min-width="250" align="left">
              <template slot-scope="scope">
                <router-link
                  class="click"
                  tag="a" :to="computePath('transactionInfo', scope.row.hash)">
                  {{ scope.row.hashs }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="time" :label="$t('public.time')" width="180" align="left"></el-table-column>
            <el-table-column :label="$t('public.type')" width="180" align="left">
              <template slot-scope="scope">{{ titleCase($t('type.'+scope.row.type))  }}</template>
            </el-table-column>
            <el-table-column :label="$t('public.amount')" width="180" align="left">
              <template slot-scope="scope">{{scope.row.value}} {{ scope.row.symbol }}</template>
            </el-table-column>
            <el-table-column :label="$t('public.fee')" width="180" align="left">
              <template slot-scope="scope">{{scope.row.fees}} {{ symbol }}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <paging :pager="pager" @change="pagesList" v-show="pager.total > pager.rows"></paging>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import paging from '@/components/pagingBar';
  import SelectBar from '@/components/SelectBar';
  import {getLocalTime, superLong,timesDecimals, titleCase } from '@/api/util.js'
  import { NSymbol, NDecimals, NKey, calDecimalsAndSymbol } from '@/constants/constants'

  export default {
    data() {
      return {
        titleCase,
        //height
        height:this.$route.query.height,
        //Block information
        packingAddress: '',
        nodeInfo: {},
        //Transaction type
        typeRegion: 0,
        //Transaction List
        txList: [],
        //Paging data
        pager: {
          total: 0,
          page: 1,
          rows: 5,
        },
        //timer
        heightInterval:null,
        symbol: NSymbol

      }
    },
    components: {
      paging,
      SelectBar
    },
    created() {
      this.getHeaderByHeight(this.height);
      this.getTxListByHeight(this.pager.page, this.pager.rows, this.height, this.typeRegion);
    },
    mounted(){
      //Timed acquisition of height
      this.heightInterval = setInterval(()=>{
        this.height = this.$route.query.height;
      },500)
    },
    beforeDestroy() {
      //Leave the interface to clear the timer
      if(this.heightInterval) {
        clearInterval(this.heightInterval);
      }
    },
    methods: {
      // Switch height
      addition(val){
        const pathname = location?.pathname
        let height = this.$route.query.height
        height = parseInt(height)
        if(val){
          // Increase height
          height += 1
        }else{
          // Reduce height
          height -= 1
        }
        this.$router.push({path: pathname, query:{height}})
        this.height = height
      },

      /**
       * Obtain block information based on height
       */
      async getHeaderByHeight(height) {
        this.$post('/', 'getHeaderByHeight', [height])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              response.result.hashs = superLong(response.result.hash, 10);
              response.result.totalReward= timesDecimals(response.result.reward-response.result.totalFee, NDecimals);
              response.result.reward= timesDecimals(response.result.reward, NDecimals);
              response.result.totalFee= timesDecimals(response.result.totalFee, NDecimals);
              // response.result.totalFee= timesDecimals(response.result.totalFee, 8);

              response.result.createTime = moment(getLocalTime(response.result.createTime*1000)).format('YYYY-MM-DD HH:mm:ss');
              this.nodeInfo = response.result
              this.packingAddress = response.result.packingAddress
            }else{
              this.nodeInfo = {}
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * Obtain transaction list based on height
       */
      async getTxListByHeight(page, rows, height, type) {
        this.$post('/', 'getBlockTxList', [height, type,])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result) {
                item.time = moment(getLocalTime(item.createTime*1000)).format('YYYY-MM-DD HH:mm:ss');
                item.value = timesDecimals(item.value, item.decimal);
                item.hashs = superLong(item.hash, 20);
                const { decimals, symbol } = calDecimalsAndSymbol(item.fee)
                item.symbol = item.symbol === 'NULS' ? NSymbol : item.symbol
                item.fees = timesDecimals(item.fee.value, decimals);
                item.fee.symbol = symbol
              }
              this.txList = response.result;
              //this.pager.total = response.result.totalCount;
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * Paging function
       **/
      pagesList() {
        this.getTxListByHeight(this.pager.page, this.pager.rows, this.height, parseInt(this.typeRegion));
      },

      /**
       * Obtain transaction type
       **/
      changeType(type) {
        this.typeRegion = type;
        this.getTxListByHeight(this.pager.page, this.pager.rows, this.height, parseInt(this.typeRegion));
      },

      computePath(name, params) {
        let query = {};
        if(name ==='addressInfo') {
          query ={address: params}
        } else if(name ==='rotationInfo') {
          query={rotation: params}
        } else {
          query ={hash: params}
        }
        return { name, query }
      }
    },
    watch: {
      height: function () {
        // monitoringheightReload data when releasing changes
        //console.log('new: %s, old: %s', val, oldVal);
        this.getHeaderByHeight(this.height);
        this.typeRegion= 0;
        this.pager={total: 0, page: 1, rows: 5};
        this.getTxListByHeight(this.pager.page, this.pager.rows, this.height, this.typeRegion);
      }
    }
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .block-info {
    background-color: #F9FAFD;
    margin-bottom: 100px;
    .block-info-title{
      font-size: 20px;
      color: #000000;
      font-weight: 600;
    }
    .bg-white-container{
        background: #FFFFFF;
        border-radius: 12px;
        padding: 24px;
        .info_table{
          .el-table{
            .el-table__header-wrapper{
              border-radius: 8px;
            }
            th,td{
              .cell{
                color: #000000;
                .click{
                  color: #00DB82;
                }
              }
            }
          }
        }
        .select{
          margin: 0;
          margin-bottom: 16px;
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
    .bg-white {
      background-color: #F9FAFD;
      padding: 24px 0;
      display: flex;
      align-items: center;
      .to-switch{
        cursor: pointer;
        margin-left: 10px;
        width: 30px;
        height: 30px;
        border-radius: 8px;
        background: rgba(#00E789, .1);
        display: flex;
        justify-content: center;
        align-items: center;
        .el-icon-arrow-left,.el-icon-arrow-right{
          color: #00DB82;
        }
      }
      @media screen and (max-width: 1000px) {
        height: 3.3rem;
      }
      .title {
        padding-bottom: 40px;
        @media screen and (max-width: 1000px) {
          padding-bottom: 1rem;
        }
      }
    }
    .info_tabs {
      h3{
        margin: 0;
        background: #FFFFFF;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        padding-left: 20px;
        color: #000000;
        @media (max-width: 1000px) {
          padding-left: 0.5rem;
        }
      }
      .ul {
        min-height: 210px;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        .tabs_infos{
          p{
            color: #4A4F55;
            padding: 0;
            span{
              color: #000000;
              img{
                width: 12px;
              }
            }
            .click{
              color: #00DB82;
            }
          }
        } 
      }
    }
  }
  
  @media (max-width: 1220px){
    .w1200{
      width: initial;
    }
    .block-info{
      padding: 0 .5rem;
    }
    .info_tabs{
      .ul{
        .tabs_infos {
          width: 50%;
        }
      }
    }
  }
  @media (max-width: 1000px){
    .info_tabs{
      width: 100%;
      .ul{
        .tabs_infos {
          p{
            padding: 0 .5rem !important;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-between;
            span{
              line-height: initial;
              word-break: break-all;
            }
          }
        }
      }
    }
  }
</style>
