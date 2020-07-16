<template>
  <div class="block bg-gray">
    <div class="bg-white">
      <div class="w1200">
        <h2 class="title font24 fl capitalize">{{$t('block.block0')}}</h2>
        <el-switch class="hide-switch fr" v-model="hideSwitch" :width="32" :inactive-text="$t('block.block2')"
                   @change="hideOneList"></el-switch>
      </div>
    </div>
    <div class="tabs w1200">
      <el-table :data="blockList" stripe border style="width: 100%" v-loading="blockLoading">
        <el-table-column label="" width="30">
        </el-table-column>
        <el-table-column :label="$t('public.height')" width="130">
          <template slot-scope="scope"><span class="cursor-p click" @click="toUrl('blockInfo',scope.row.height)">{{ scope.row.height }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('public.time')" width="230"></el-table-column>
        <el-table-column prop="txCount" :label="$t('public.transactionNo')" width="160"></el-table-column>
        <el-table-column :label="$t('public.outNode')" min-width="185">
          <template slot-scope="scope">
            <label class="cursor-p" v-show="!scope.row.agentHash">
              {{$t('public.seedNode')}}
            </label>
            <span class="cursor-p click" :class="scope.row.agentAlias ? '' : 'uppercase'"
                  @click="toUrl('consensusInfo',scope.row.agentHash)" v-show="scope.row.agentHash">
              {{scope.row.agentAlias ? scope.row.agentAlias : scope.row.agentId}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="size" :label="$t('public.size')+'(byte)'" width="100"></el-table-column>
        <el-table-column :label="$t('public.blockReward')" width="180" align="center">
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
        //数据加载动画
        blockLoading: true,
        //隐藏单笔交易滑块
        hideSwitch: false,
        //块列表数据
        blockList: [],
        //分页信息
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
       * 获取块列表
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
       * 分页功能
       **/
      pagesList() {
        this.blockLoading = true;
        this.getBlockList(this.pager.page, this.pager.rows, this.hideSwitch, '')
      },

      /**
       * 隐藏单笔交易滑块
       **/
      hideOneList() {
        this.blockLoading = true;
        this.getBlockList(this.pager.page, this.pager.rows, this.hideSwitch, '');
      },

      /**
       * url 连接跳转
       * @param name
       * @param parmes
       */
      toUrl(name, parmes) {
        let newQuery = {};
        console.log(name);
        if (name === 'consensusInfo') {
          newQuery = {hash: parmes};
          console.log(newQuery)
        } else {
          newQuery = {height: parmes}
        }
        this.$router.push({
          name: name,
          query: newQuery
        })

      }
    },
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .block {
    //height: 1000px;
    @media screen and (max-width: 1000px) {
      width: 95%;
      margin: 0 auto 0;
    }
    .bg-white {
      height: 126px;
      @media screen and (max-width: 1000px) {
        height: 5rem;
      }
    }
    .tabs {
      margin-bottom: 100px;
    }
  }
</style>
