<template>
  <div class="contracts bg-gray">
    <div class="bg-white" :class="activeName === 'nrc20Contract' ? 'bg-white1' : ''">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="w1200 tables">
        <el-tab-pane :label="$t('contracts.contracts0')" name="allContract" v-loading="contractListLoading">
          <el-switch class="hide-switch fr" v-model="hideSwitch" :width="32" :inactive-text="$t('contracts.contracts1')"
                     @change="hideNrc20List"></el-switch>
          <el-table :data="contractList" stripe border>
            <el-table-column :label="$t('public.serial')" width="80" align="left">
              <template slot-scope="scope">{{scope.$index+(pager.page - 1) * pager.rows + 1}}</template>
            </el-table-column>
            <el-table-column :label="$t('public.contractAddress')" width="460" align="left">
              <template slot-scope="scope">
                <span class="cursor-p click" @click="toUrl('contractsInfo',scope.row.contractAddress)">
                  {{ scope.row.contractAddress }}
                  <span v-if="scope.row.status ===3" class="gray">{{$t('public.unavailable')}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('public.remarks')" min-width="80" align="left">
              <template slot-scope="scope">
                <label v-if="scope.row.remark && scope.row.remark.length > 30">
                  <el-tooltip class="calc fr" effect="light" :content="scope.row.remark" placement="top">
                    <span class="scroll overflow" style="width: 250px">{{ scope.row.remark }}</span>
                  </el-tooltip>
                </label>
                <span v-else>{{ scope.row.remark }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="balance" :label="$t('public.balance')+ '('+symbol+')'" width="130" align="left">
              <template slot-scope="scope">{{ scope.row.balance/100000000 }}</template>
            </el-table-column>
            <el-table-column prop="txCount" :label="$t('public.transactionNo')" width="100"
                             align="left">
            </el-table-column>
            <el-table-column prop="createTime" :label="$t('public.createTime')" width="180"
                             align="left">
            </el-table-column>
          </el-table>
          <div class="paging">
            <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
                           v-show="contractListPage.total > contractListPage.rows"
                           :total="contractListPage.total"
                           :current-page.sync="contractListPage.page"
                           :page-size="contractListPage.rows" @current-change="pagesContractList">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('contracts.contracts2')" name="nrc20Contract">
          <div class="hide-div"></div>
          <el-table :data="nrc20List" border stripe style="width: 100%" v-loading="nrc20ListLoading">
            <el-table-column :label="$t('public.serial')" width="80" align="left">
              <template slot-scope="scope">{{scope.$index+(pager.page - 1) * pager.rows + 1}}</template>
            </el-table-column>
            <el-table-column prop="tokenName" :label="$t('public.passCard')" width="140"
                             align="left"></el-table-column>
            <el-table-column :label="$t('public.abbreviate')" width="160" align="left">
              <template slot-scope="scope">
                <span class="cursor-p click" @click="toUrl('tokenInfo',scope.row.contractAddress)">
                  {{ scope.row.symbol }}
                  <span v-if="scope.row.status ===3" class="gray">{{$t('public.unavailable')}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="totalSupply" :label="$t('contracts.contracts3')" width="180"
                             align="left">
            </el-table-column>
            <el-table-column :label="$t('public.contractAddress')" min-width="220" align="left">
              <template slot-scope="scope">
                <span class="cursor-p click" @click="toUrl('tokenInfo',scope.row.contractAddress)">
                  {{ scope.row.contractAddress }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" :label="$t('public.createTime')" width="180"
                             align="left">
            </el-table-column>
          </el-table>

          <div class="paging">
            <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
                           v-show="pager.total > pager.rows"
                           :total="pager.total"
                           :current-page.sync="pager.page"
                           :page-size="pager.rows" @current-change="pagesList">
            </el-pagination>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import {getLocalTime, timesDecimals,divisionDecimals} from '@/api/util.js'

  export default {
    data() {
      return {
        symbol: sessionStorage.hasOwnProperty('symbol') ? sessionStorage.getItem('symbol') : 'NULS',//symbol
        decimals: sessionStorage.hasOwnProperty('decimals') ? Number(sessionStorage.getItem('decimals')) : 8,//decimals
        isMobile: true,
        activeName: 'allContract',
        //隐藏NRC-20合约
        hideSwitch: false,
        //合约列表
        contractList: [],
        contractListLoading: true,
        contractListPage: {
          total: 0,
          page: 1,
          rows: 15,
        },
        //NRC-20列表
        nrc20List: [],
        nrc20ListLoading: true,
        pager: {
          total: 0,
          page: 1,
          rows: 15,
        }
      };
    },
    components: {},
    created() {
      this.isMobile = /(iPhone|iOS|Android|Windows Phone)/i.test(navigator.userAgent);
      this.getContractList(this.pager.page, this.pager.rows, this.activeName === 'nrc20Contract' ? 1 : -1, this.hideSwitch);
    },
    methods: {

      /**
       * 获取所有合约列表
       */
      getContractList(page, rows, boolean, boolean1) {
        this.$post('/', 'getContractList', [page, rows, boolean, boolean1])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.createTime = moment(getLocalTime(item.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
                if (this.activeName === 'nrc20Contract') {
                  if (item.decimals !== 0) {
                    item.totalSupply = timesDecimals(item.totalSupply, item.decimals);
                    item.fee = divisionDecimals(item.balance, this.decimals);
                  }
                }
              }
              if (this.activeName !== 'nrc20Contract') {
                this.contractList = response.result.list;
                this.contractListLoading = false;
                this.contractListPage.total = response.result.totalCount;
              } else {
                this.nrc20List = response.result.list;
                this.nrc20ListLoading = false;
                this.pager.total = response.result.totalCount;
              }
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * 获取所有合约列表 分页
       */
      pagesContractList() {
        this.getContractList(this.contractListPage.page, this.contractListPage.rows, this.activeName === 'nrc20Contract' ? 1 : -1, this.hideSwitch);
      },

      /**
       * 分页功能
       **/
      pagesList() {
        this.getContractList(this.pager.page, this.pager.rows, this.activeName === 'nrc20Contract' ? 1 : -1, this.hideSwitch);
      },

      /**
       * 隐藏NRC-20合约
       */
      hideNrc20List() {
        this.contractListLoading = true;
        this.getContractList(this.pager.page, this.pager.rows, this.activeName === 'nrc20Contract' ? 1 : -1, this.hideSwitch);
      },

      /**
       * tab 切换数据
       * @param tab
       */
      handleClick(tab) {
        this.activeName = tab.name;
        if (this.activeName !== 'nrc20Contract') {
          this.contractListPage = {total: 0, page: 1, rows: 15,};
          this.contractListLoading = true;
          this.getContractList(this.contractListPage.page, this.contractListPage.rows, this.activeName === 'nrc20Contract' ? 1 : -1, this.hideSwitch);
        } else {
          this.pager = {total: 0, page: 1, rows: 15,};
          this.nrc20ListLoading = true;
          this.getContractList(this.pager.page, this.pager.rows, this.activeName === 'nrc20Contract' ? 1 : -1, this.hideSwitch);
        }
      },

      /**
       * url 连接跳转
       * @param name
       * @param contractAddress
       * @param tabName
       */
      toUrl(name, contractAddress, tabName = 'first') {
        let newQuery = {};
        if (name === 'tokenInfo') {
          newQuery = {contractAddress: contractAddress}
        } else {
          newQuery = {contractAddress: contractAddress, tabName: tabName}
        }
        this.$router.push({
          name: name,
          query: newQuery
        })
      }
    }
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .contracts {
    width: 95%;
    margin: 0 auto;
    .bg-white {
      height: 120px;
      .tables {
        margin: 24px auto 80px;
        .hide-switch {
          height: 35px;
          margin: 1px 0 0 20px;
        }
        .hide-div {
          width: 100%;
          height: 23px;
        }
      }
    }
    .bg-white1 {
      height: 102px;
    }
  }

</style>
