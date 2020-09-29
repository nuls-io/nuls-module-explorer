<template>
  <div class="address bg-gray">
    <div class="bg-white">
      <div class="w1200">
        <h2 class="title fl capitalize">{{$t('address.address0')}}</h2>
        <!--<i class="iconfont icon-dwonload_gray_icon fr hide-switch click" title="更多功能敬请期待..."></i>-->
      </div>
    </div>
    <div class="tabs w1200">
      <el-table :data="addressList" stripe border style="width: 100%" @sort-change='sortChange'
                v-loading="addressLoading">
        <el-table-column label="" width="30">
        </el-table-column>
        <el-table-column :label="$t('public.serial')" width="100">
          <template slot-scope="scope">{{scope.$index+(pager.page - 1) * pager.rows + 1}}</template>
        </el-table-column>
        <el-table-column :label="$t('public.address')" min-width="280">
          <template slot-scope="scope">
            <span class="cursor-p click" @click="toUrl('addressInfo',scope.row.address,scope.row.type)">
              {{ scope.row.address }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.locking')" width="200" align="left">
          <template slot-scope="scope">{{ scope.row.locked}}</template>
        </el-table-column>
        <el-table-column :label="$t('public.total')" width="200" align="left">
          <template slot-scope="scope">{{ scope.row.totalBalance}}</template>
        </el-table-column>
        <el-table-column :label="$t('public.accountedFor')" width="200" align="left">
          <template slot-scope="scope">{{ scope.row.proportion}}</template>
        </el-table-column>
      </el-table>
      <paging :pager="pager" @change="pagesList" v-show="pager.total > pager.rows">
      </paging>
    </div>
  </div>
</template>

<script>
  import paging from '@/components/pagingBar';
  import {timesDecimals} from '@/api/util.js'
  import {RUN_DEV} from '@/config.js'

  export default {
    data() {
      return {
        addressLoading: true,
        addressList: [],
        sort: 0,
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
      this.pagesList();
    },
    beforeRouteLeave(to, from, next) {
      //console.log(to.name);
      if (to.name === 'addressInfo') {
        from.meta.keepAlive = true;
      } else {
        from.meta.keepAlive = false;
      }
      next()
    },
    methods: {

      /**
       * @disc: 获地址列表
       * @params: page, rows
       * @date: 2019-09-09 17:32
       * @author: Wave
       */
      getAddressList(page, rows) {
        this.$post('/', 'getAssetRanking', [RUN_DEV ? 1 : 2, 1, page, rows])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.totalBalance = timesDecimals(item.totalBalance, 8);
                item.locked = timesDecimals(item.locked, 8);
              }
              this.addressList = response.result.list;
              this.pager.total = response.result.totalCount;
              this.addressLoading = false;
            }
          })
      },

      /**
       * 总计排序功能
       **/
      sortChange(column) {
        //console.log(column);
        this.addressLoading = true;
        if (column.order === 'ascending') {
          this.sort = 1;
        } else {
          this.sort = 0;
        }
        this.getAddressList(this.pager.page, this.pager.rows);
      },

      /**
       * 分页功能
       **/
      pagesList() {
        this.addressLoading = true;
        this.getAddressList(this.pager.page, this.pager.rows)
      },

      /**
       * url 连接跳转
       * @param name
       * @param parmes
       * @param type
       */
      toUrl(name, parmes, type) {
        if (type === 1) {
          this.$router.push({
            name: name,
            query: {address: parmes}
          })
        } else {
          this.$router.push({
            name: 'contractsInfo',
            query: {contractAddress: parmes}
          })
        }

      }
    },
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .address {
    //height: 1050px;
    .bg-white {
      height: 133px;
      @media screen and (max-width: 1000px) {
        height: 5rem;
      }
    }
    .tabs {
      margin-bottom: 100px;
      @media screen and (max-width: 1000px) {
        width: 95%;
        margin: -1.4rem auto 5rem;
      }
      .el-table__header {
        .has-gutter {
          tr {
            th {
              padding: 0;
            }
          }
        }
      }
    }
  }
</style>
