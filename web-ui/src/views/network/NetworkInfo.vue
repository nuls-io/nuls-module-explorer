<template>
  <div class="w1200 network_info">
    <!--<div class=" font14 gray back"><span class="click">{{$t('network.network')}}</span> / {{$t('network.network4')}}
    </div>-->
    <div class="info">
      <div class="font14 chain_id">{{$t('network.network0')}}：{{chainInfo.chainId}}</div>
      <div class="infos">
        <div class="title">{{$t('network.network5')}}</div>
        <ul>
          <li>{{$t('network.network1')}}<span class="fr">{{chainInfo.chainName}}</span></li>
          <li>{{$t('network.network2')}}<span class="fr">{{defaultAsset.symbol}}</span></li>
          <li>{{$t('network.network19')}}<span class="fr">{{defaultAsset.nulsTotalCoins}}</span></li>
          <li>{{$t('network.network6')}}<span class="fr">{{pageTotal}}</span></li>
          <li>{{$t('network.network7')}}<span class="fr">{{defaultAsset.initCoins}}</span></li>
        </ul>
      </div>
    </div>
    <div class="tx_list" v-loading="txDataLoading">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('network.network8')" name="first">
          <el-table :data="txData" border stripe>
            <el-table-column label="TXID" min-width="330" align="center">
              <template slot-scope="scope">
                <span class="click" @click="toUrl('transactionInfo',scope.row.txHash)">{{ scope.row.hashs }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="TXID(Nerve)" width="330" align="center">
               <template slot-scope="scope">
                 <span class="click" @click="toUrl('networkInfo',scope.row.hash0)">{{ scope.row.hash0 }}</span>
               </template>
             </el-table-column>-->
            <el-table-column prop="time" :label="$t('public.time')" width="180" align="center">
            </el-table-column>
            <el-table-column :label="$t('network.network9')" width="290" align="center">
              <template slot-scope="scope">
                <span class="capitalize">{{scope.row.transferType === -1 ? $t('network.network10'):$t('network.network11') }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('public.amount')" width="160" align="left">
              <template slot-scope="scope">{{ scope.row.values }}</template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="paging">
        <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
                       v-show="pageTotal > pageSize"
                       :total="pageTotal"
                       :current-page.sync="pageIndex"
                       :page-size="pageSize"
                       @current-change="pageChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import {getLocalTime, superLong, timesDecimals} from '@/api/util.js'

  export default {
    data() {
      return {
        chainInfo: {},//链信息
        defaultAsset: {},//链信息的默认信息
        activeName: 'first',
        txData: [],
        pageIndex: 1, //页码
        pageSize: 10, //每页条数
        pageTotal: 0,//总页数
        txDataLoading: false,//分页加载
      }
    },
    created() {

    },
    mounted() {
      this.getOtherChainInfo(Number(this.$route.query.chainId));
      this.getCrossTxList(Number(this.$route.query.chainId), this.pageIndex, this.pageSize, 0, 0)
    },
    methods: {

      handleClick(tab, event) {
        console.log(tab, event);
      },

      /**
       * @disc: 查询平行链信息
       * @params:
       * @date: 2020-06-30 19:36
       * @author: Wave
       */
      getOtherChainInfo(Id) {
        this.$post('/', 'getOtherChainInfo', [Id])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              response.result.defaultAsset.initCoins = Number(timesDecimals(response.result.defaultAsset.initCoins, response.result.defaultAsset.decimals));
              response.result.defaultAsset.nulsTotalCoins = Number(timesDecimals(response.result.defaultAsset.localTotalCoins, response.result.defaultAsset.decimals));
              this.chainInfo = response.result;
              this.defaultAsset = response.result.defaultAsset
            }
          }).catch((error) => {
          console.log(error);
        })
      },

      /**
       * @disc: 查询交易列表
       * @params:
       * @date: 2020-06-30 19:36
       * @author: Wave
       */
      getCrossTxList(chainId, pageNumber, pageSize, startTime, endTime) {
        this.txDataLoading = true;
        this.$post('/', 'getCrossTxList', [chainId, pageNumber, pageSize, startTime, endTime])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.time = moment(getLocalTime(item.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
                item.hashs = superLong(item.txHash, 20);
                item.values = timesDecimals(item.values, 8);
              }
              this.pageTotal = response.result.totalCount;
              this.txData = response.result.list;
              this.txDataLoading = false;
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * @disc: 分页功能
       * @params:
       * @date: 2020-07-13 9:52
       * @author: Wave
       */
      pageChange(e) {
        this.pageIndex = e;
        this.getCrossTxList(Number(this.$route.query.chainId), this.pageIndex, this.pageSize, 0, 0)
      },

      /**
       * url 连接跳转
       * @param name
       * @param parmes
       */
      toUrl(name, parmes) {
        this.$router.push({
          name: name,
          query: name === 'transactionInfo' ? {hash: parmes} : {height: parmes}
        })
      }
    }
  }
</script>

<style lang="less">
  .network_info {
    .back {
      line-height: 30px;
      margin: 20px 0;
    }
    .info {
      margin: 40px 0 0 0;
      .chain_id {
        line-height: 30px;
        font-size: 20px;
      }
      .infos {
        border: 1px solid #c1c1c1;
        .title {
          line-height: 34px;
          margin: 10px 2% 5px;
          font-size: 16px;
          border-bottom: 1px solid #c1c1c1;
        }
        ul {
          margin: 10px 0;
          li {
            width: 96%;
            margin: 0 auto;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
          }
        }
      }
    }
    .tx_list {
      margin: 20px 0 100px 0;
    }
  }
</style>
