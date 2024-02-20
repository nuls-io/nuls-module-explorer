<template>
  <div class="block bg-gray">
    <div class="bg-white">
      <div class="w1200">
        <h2 class="font20 fl capitalize block-title">{{$t('block.block0')}}</h2>
        <el-switch class="hide-switch fr" v-model="hideSwitch" :width="32" :inactive-text="$t('block.block2')"
        @change="hideOneList"></el-switch>
      </div>
    </div>
    <div class="tabs w1200">
      <el-table :data="blockList" style="width: 100%" v-loading="blockLoading">
        <el-table-column width="40"></el-table-column>
        <el-table-column :label="$t('public.height')" min-width="100">
          <template slot-scope="scope">
            <router-link class="click" tag="a" :to="{ name: 'blockInfo', query: { height: scope.row.height }}">
              {{ scope.row.height }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('public.time')" min-width="160"></el-table-column>
        <el-table-column prop="txCount" :label="$t('public.transactionNo')" min-width="140"></el-table-column>
        <el-table-column :label="$t('public.outNode')" min-width="140">
          <template slot-scope="scope">
            <label class="cursor-p" v-if="!scope.row.agentHash">
              {{$t('public.seedNode')}}
            </label>
            <router-link
              v-else
              class="click" :class="scope.row.agentAlias ? '' : 'uppercase'"
              tag="a"
              :to="{ name: 'ConsensusInfo', query: { hash: scope.row.agentHash }}">
              {{scope.row.agentAlias ? scope.row.agentAlias : scope.row.agentId}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="size" :label="$t('public.size')+'(byte)'" min-width="140"></el-table-column>
        <el-table-column :label="$t('public.blockReward')" align="center" min-width="140">
          <template slot-scope="scope">{{ scope.row.reward}}</template>
        </el-table-column>
      </el-table>
      <paging :pager="pager" @change="pagesList" v-show="pager.total > pager.rows"></paging>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import paging from '@/components/pagingBar';
  import {getLocalTime, timesDecimals} from '@/api/util.js'

  export default {
    data() {
      return {
        //Data loading animation
        blockLoading: true,
        //Hide single transaction slider
        hideSwitch: false,
        //Block List Data
        blockList: [],
        //Paging Information
        pager: {
          total: 0,
          page: 1,
          rows: 15,
        }
      }
    },
    components: {
      paging,
    },
    created() {
      this.getBlockList(this.pager.page, this.pager.rows, this.hideSwitch, '')
    },
    beforeRouteLeave(to, from, next) {
      //console.log(to.name);
      if (to.name === 'blockInfo') {
        from.meta.keepAlive = true;
      } else {
        from.meta.keepAlive = false;
      }
      next()
    },
    methods: {

      /**
       * Get block list
       */
      getBlockList(pager, rows, isShow, packAddress) {
        this.$post('/', 'getBlockHeaderList', [pager, rows, isShow, packAddress])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.reward = timesDecimals(item.reward, 8);
                item.createTime = moment(getLocalTime(item.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              }
              this.blockList = response.result.list;
              this.pager.total = response.result.totalCount;
              this.blockLoading = false;
            }
          })
      },

      /**
       * Paging function
       **/
      pagesList() {
        this.blockLoading = true;
        this.getBlockList(this.pager.page, this.pager.rows, this.hideSwitch, '')
      },

      /**
       * Hide single transaction slider
       **/
      hideOneList() {
        this.blockLoading = true;
        this.getBlockList(this.pager.page, this.pager.rows, this.hideSwitch, '');
      }
    },
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .block {
    //height: 1000px;
    @media screen and (max-width: 1000px) {
      margin: 0 auto 0;
    }
    .block-title{
      padding: 24px 0;
      color: #000;
      font-weight: bold;
    }
    .hide-switch{
      margin-top: 0;
      padding: 24px 0;
    }
    .bg-white {
      height: 80px;
      background: initial;
      @media screen and (max-width: 1000px) {
        height: 5rem;
      }
    }
    .tabs {
      margin-top: 0;
      margin-bottom: 100px;
      .el-table{
        border-radius: 0;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        .el-table__header-wrapper{
          background: #F4F8FE;
        }
        .el-table__body-wrapper{
          .el-table__body{
            tr{
              td{
                padding: 0 !important;
                .cell{
                  line-height: 48px;
                }
              }
            }
          }
        }
        tr{
          th{
            background: #F4F8FE;
            .cell{
              color: #4A4F55;
            }
          }
        }
      }
    }
  }

  @media (max-width: 1220px){
    .w1200{
      width: initial;
      padding: 0 .5rem;
    }
  }
  @media (max-width: 1000px){
    .block{
      .bg-white{
        height: 3.5rem;
      }
      .tabs{
        margin-top: 1px;
      }
    } 
  }
</style>
