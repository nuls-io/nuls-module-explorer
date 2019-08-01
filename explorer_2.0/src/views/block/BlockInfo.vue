<template>
  <div class="block-info bg-gray">
    <div class="bg-white">
      <div class="title font24 w1200">#{{this.height}}</div>
    </div>
    <div class="info_tabs w1200">
      <h3 class="tabs_title tabs_header capitalize">{{$t('public.basicInfo')}}</h3>
      <ul class="ul">
        <li class="tabs_infos fl capitalize">
          <p>{{$t('public.block')}} hash
            <span>{{nodeInfo.hashs}}
              <i class="iconfont icon-copy_icon click" :title="$t('public.copy')" @click="copy(nodeInfo.hash)"></i>
            </span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize">
          <p>{{$t('public.outNode')}}
          <span class="click" @click="toUrl('consensusInfo',nodeInfo.agentHash)" v-show="!nodeInfo.seedPacked">
          {{nodeInfo.agentAlias ? nodeInfo.agentAlias: nodeInfo.agentId }}
          </span>
          <span v-show="nodeInfo.seedPacked">{{$t('public.seedNode')}}</span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize">
          <p>{{$t('public.packAddress')}}<span class="click" @click="toUrl('addressInfo',nodeInfo.packingAddress)">{{nodeInfo.packingAddress}}</span></p>
        </li>
        <li class="tabs_infos fl capitalize"><p>{{$t('public.transactionNo')}}<span>{{nodeInfo.txCount}}</span></p></li>
        <li class="tabs_infos fl capitalize"><p>{{$t('public.size')}} <span>{{nodeInfo.size}} Bytes</span></p></li>
        <li class="tabs_infos fl capitalize"><p>{{$t('public.blockReward')}}<span>{{nodeInfo.reward}}<span class="fCN">&nbsp;{{symbol}}</span></span></p></li>
        <li class="tabs_infos fl capitalize">
          <p>{{$t('public.round')}}/{{$t('public.number')}}
            <span>
              <font class="click" @click="toUrl('rotationInfo',nodeInfo.roundIndex)">{{nodeInfo.roundIndex}}</font>
              /{{nodeInfo.packingIndexOfRound}}</span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize"><p>{{$t('public.fee')}}<span>{{nodeInfo.totalFee}}<span class="fCN">&nbsp;{{symbol}}</span></span></p></li>
        <li class="tabs_infos fl capitalize"><p>{{$t('public.time')}}<span>{{nodeInfo.createTime}}</span></p></li>
        <li class="tabs_infos fl capitalize"><p>{{$t('public.consensusReward')}}<span>{{nodeInfo.totalReward}}<span class="fCN">&nbsp;{{symbol}}</span></span></p></li>
      </ul>

      <h4 class=" font20 capitalize">{{$t('public.transactionList')}}</h4>
      <div class="select">
        <SelectBar size="small" v-model="typeRegion" @change="changeType"></SelectBar>
      </div>
      <div class="info_table">
        <el-table :data="txList" stripe style="width: 100%" border>
          <el-table-column label="" width="30">
          </el-table-column>
          <el-table-column label="TXID" min-width="250" align="left">
            <template slot-scope="scope"><span class="click" @click="toUrl('transactionInfo',scope.row.hash)">{{ scope.row.hashs }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="time" :label="$t('public.time')" width="180" align="left"></el-table-column>
          <el-table-column :label="$t('public.type')" width="180" align="left">
            <template slot-scope="scope">{{ $t('type.'+scope.row.type) }}</template>
          </el-table-column>
          <el-table-column :label="$t('public.amount')+'('+symbol+')'" width="180" align="left">
            <template slot-scope="scope">{{scope.row.value}}</template>
          </el-table-column>
          <el-table-column :label="$t('public.fee')+'('+symbol+')'" width="180" align="left">
            <template slot-scope="scope">{{scope.row.fees}}</template>
          </el-table-column>
        </el-table>
      </div>

      <paging :pager="pager" @change="pagesList" v-show="pager.total > pager.rows"></paging>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import paging from '@/components/pagingBar';
  import SelectBar from '@/components/SelectBar';
  import {getLocalTime, superLong, copys,timesDecimals} from '@/api/util.js'

  export default {
    data() {
      return {
        //高度
        height:this.$route.query.height,
        //块信息
        nodeInfo: {},
        //交易类型
        typeRegion: 0,
        //交易列表
        txList: [],
        //分页数据
        pager: {
          total: 0,
          page: 1,
          rows: 5,
        },
        //定时器
        heightInterval:null,
        symbol:sessionStorage.hasOwnProperty('symbol') ? sessionStorage.getItem('symbol') :'NULS',//默认symbol

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
      //定时获取高度
      this.heightInterval = setInterval(()=>{
        this.height = this.$route.query.height;
      },500)
    },
    beforeDestroy() {
      //离开界面清除定时器
      if(this.heightInterval) {
        clearInterval(this.heightInterval);
      }
    },
    methods: {

      /**
       * 复制方法
       * @param sting
       **/
      copy(sting) {
        copys(sting);
        this.$message({message: '复制成功', type: 'success', duration: 1000});
      },

      /**
       * 根据高度获取块信息
       */
      async getHeaderByHeight(height) {
        this.$post('/', 'getHeaderByHeight', [height])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              response.result.hashs = superLong(response.result.hash, 10);
              response.result.totalReward= timesDecimals(response.result.reward-response.result.totalFee, 8);
              response.result.reward= timesDecimals(response.result.reward, 8);
              response.result.totalFee= timesDecimals(response.result.totalFee, 8);

              response.result.createTime = moment(getLocalTime(response.result.createTime*1000)).format('YYYY-MM-DD HH:mm:ss');
              this.nodeInfo = response.result
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * 根据高度获取交易列表
       */
      async getTxListByHeight(page, rows, height, type) {
        this.$post('/', 'getBlockTxList', [page, rows, height, type,])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.time = moment(getLocalTime(item.createTime*1000)).format('YYYY-MM-DD HH:mm:ss');
                item.value = timesDecimals(item.value, 8);
                item.hashs = superLong(item.hash, 20);
                item.fees = timesDecimals(item.fee.value, 8);
              }
              this.txList = response.result.list;
              this.pager.total = response.result.totalCount;
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * 分页功能
       **/
      pagesList() {
        this.getTxListByHeight(this.pager.page, this.pager.rows, this.height, parseInt(this.typeRegion));
      },

      /**
       * 获取交易类型
       **/
      changeType(type) {
        this.typeRegion = type;
        this.getTxListByHeight(this.pager.page, this.pager.rows, this.height, parseInt(this.typeRegion));
      },

      /**
       * url 连接跳转
       * @param name
       * @param parmes
       */
      toUrl(name, parmes) {
        let newQuery = {};
        if(name ==='addressInfo'){
          newQuery ={address: parmes}
        }else if(name ==='rotationInfo'){
          newQuery={rotation: parmes}
        }else {
          newQuery ={hash: parmes}
        }
        this.$router.push({
          name: name,
          query: newQuery
        })
      }
    },
    watch: {
      height: function () {
        // 监听height，当放生变化时重新加载数据
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
    margin-bottom: 100px;
    .bg-white {
      height: 90px;
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
      .ul {
        min-height: 210px;
      }
    }
  }
</style>
