<template>
  <div class="c_list" v-loading="nodeListLoading">
    <div class="c_list_search">
      <div class="row-center">
        <div class="type_select fl">
          <SelectBar v-model="nodeTypeRegion" :typeOptions="nodeTypeOptions" typeName="nodeType"
                    @change="changeNodeType"></SelectBar>
        </div>
        <div class="status_select fl">
          <SelectBar v-model="nodeStatusRegion" :typeOptions="nodeStatusOptions" typeName="nodeStatus"
                    @change="changeNodeStatus"></SelectBar>
        </div>
        <div class="search_input">
          <el-input v-model="searchValue" class="search" :placeholder="$t('consensus.search')"
                    suffix-icon="el-icon-search"></el-input>
        </div>
      </div>
      <i class="iconfont fr click " :class="viewList ? 'icon-list_icon':'icon-chart_icon'"
           @click="viewList = !viewList"></i>
    </div>
    <div v-show="!viewList" class="c_tabs">
      <el-table :data="searchData" style="width: 100%">
        <el-table-column label="" width="30">
        </el-table-column>
        <el-table-column label="ID" min-width="150" align="left">
          <template slot-scope="scope">
            <router-link class="cursor-p click uppercase" tag="a" :to="{ name: 'ConsensusInfo', query: { hash: scope.row.txHash }}">
              {{ scope.row.agentId }}
            </router-link>
          </template>
          <!--<template slot-scope="scope"><span class="uppercase">{{ scope.row.agentId }}</span></template>-->
        </el-table-column>
        <el-table-column :label="$t('public.alias')" width="250" align="left">
          <template slot-scope="scope"><span>{{ scope.row.agentAlias ? scope.row.agentAlias : '-' }}</span></template>
        </el-table-column>
        <el-table-column prop="creditValue" :label="$t('public.creditValue')" width="150"
                         align="left"></el-table-column>
        <el-table-column :label="$t('public.proportion')" width="100" align="left">
          <template slot-scope="scope">{{ scope.row.commissionRate }}%</template>
        </el-table-column>
        <el-table-column :label="$t('public.bond')+'('+symbol+')'" width="150" align="left">
          <template slot-scope="scope">{{ scope.row.deposit }}</template>
        </el-table-column>
        <el-table-column :label="$t('public.entrust')+'('+symbol+')'" width="150" align="left">
          <template slot-scope="scope">
            <router-link class="cursor-p click uppercase" tag="a" :to="{ name: 'ConsensusInfo', query: { hash: scope.row.txHash, tabName: 'three' }}">
              {{ scope.row.totalDeposit }}
            </router-link>
          </template>
          <!-- <template slot-scope="scope">{{ scope.row.totalDeposit/100000000 }}</template>-->
        </el-table-column>
        <el-table-column prop="depositCount" :label="$t('public.participants')" width="150"
                         align="left"></el-table-column>
      </el-table>
    </div>

    <div v-show="viewList" class="card-info">
      <template v-if="searchData.length">
        <router-link
          class="card fl click"
          tag="a"
          :to="{ name: 'ConsensusInfo', query: { hash: item.txHash }}"
          v-for="item in searchData"
          :key="item.agentId">
          <h3 class="tabs_title tabs_infos" :class="item.agentAlias ? '' : 'uppercase'">
            {{ item.agentAlias ? item.agentAlias : item.agentId }}
            <i class="iconfont fr font18"
              :class="item.status.toString() !=='0'? 'icon-consensus_icon': 'icon-wait_red_icon'"></i>
          </h3>
          <ul>
            <li class="font12 fl">{{$t('public.alias')}}<span
                    class="fr">{{ item.agentAlias ? item.agentAlias : '-' }}</span></li>
            <li class="font12 fl">{{$t('public.proportion')}}<span class="fr">{{ item.commissionRate }}%</span></li>
            <li class="font12 fl">{{$t('public.bond')}}<span class="fr">{{ $toThousands(item.deposit) }}<label
                    class="fCN"> {{symbol}}</label></span></li>
            <li class="font12 fl">{{$t('public.creditValue')}}<span class="fr">{{item.creditValue}}</span></li>
            
            <li class="font12 fl">{{$t('public.entrust')}}<span class="fr">{{$toThousands(item.totalDeposit) }}<label
                    class="fCN"> {{symbol}}</label></span></li>
            <li class="font12 fl">{{$t('public.participants')}}<span class="fr">{{ item.depositCount }}</span></li>
          </ul>
        </router-link>
      </template>
      <template v-else>
        <div class="no-data">
          <span>{{$t('assets.nodata')}}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import SelectBar from '@/components/SelectBar';
  import {timesDecimals} from '@/api/util.js'

  export default {
    data() {
      return {
        //Is the list displayed
        viewList: true,
        //Sort dropdown menu selection list
        nodeTypeOptions: [
          {value: 0, label: '0'},
          {value: 1, label: '1'},
          {value: 2, label: '2'},
          {value: 3, label: '3'},
          {value: 4, label: '4'},
        ],
        //Sort Selected Values
        nodeTypeRegion: 0,
        //Node Type Sorting
        nodeStatusOptions: [
          {value: 0, label: '0'},
          {value: 1, label: '1'},
          {value: 2, label: '2'},
          {value: 3, label: '3'},
        ],
        nodeStatusRegion: 0,
        //Node List
        nodeList: [],
        nodeListLoading: true,
        //Search box content
        searchValue: '',
        //Paging data
        pager: {
          total: 0,
          page: 1,
          rows: 200,
        },
        symbol:sessionStorage.hasOwnProperty('symbol') ? sessionStorage.getItem('symbol') :'NULS',//defaultsymbol
      }
    },
    components: {
      SelectBar
    },
    created() {
      this.getConsensusNodes(this.pager.page, this.pager.rows, this.nodeStatusRegion)
    },
    computed: {
      //Data filtering
      searchData: function () {
        let search = this.searchValue;
        //console.log(this.nodeList);
        if (search) {
          return this.nodeList.filter(function (product) {
            return Object.keys(product).some(function (key) {
              return String(product[key]).toLowerCase().indexOf(search.toLowerCase()) > -1
            })
          })
        }
        return this.nodeList;
      },

    },
    methods: {

      /**
       * Obtain consensus list
       */
      async getConsensusNodes(page, rows, type) {
        this.$post('/', 'getConsensusNodes', [page, rows, type])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result.list) {
                item.deposit = timesDecimals(item.deposit, 8);
                item.bozhengjin = item.deposit;
                item.totalDeposit = Number(timesDecimals(item.totalDeposit, 8)).toFixed(2);
              }
              this.nodeList = response.result.list;
              this.nodeListLoading = false;
            }else {
              console.log(response);
            }
          }).catch((error) => {
            this.getConsensusNodes(page, rows, type);
          console.log(error);
        })
      },

      /**
       *  Sort by data type
       **/
      changeNodeType(type) {
        this.nodeTypeRegion = parseInt(type);
        switch (type) {
          case 1:
            this.nodeTypeSort(this.nodeList, 'creditValue');
            break;
          case 2:
            this.nodeTypeSort(this.nodeList, 'commissionRate');
            break;
          case 3:
            this.nodeTypeSort(this.nodeList, 'totalDeposit');
            break;
          case 4:
            this.nodeTypeSort(this.nodeList, 'bozhengjin');
            break;
          default:
            this.getConsensusNodes(this.pager.page, this.pager.rows, 0, '')
        }
      },

      /**
       *  Sort by node status
       **/
      changeNodeStatus(type) {
        this.nodeStatusRegion = type;
        this.getConsensusNodes(this.pager.page, this.pager.rows, this.nodeStatusRegion)
      },

      /**
       * Array sorting
       */
      nodeTypeSort(arr, name) {
        //console.log(name);
        let compare = function (prop) {
          return function (obj1, obj2) {
            let val1 = obj1[prop];
            let val2 = obj2[prop];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
              val1 = Number(val1);
              val2 = Number(val2);
            }
            if (val1 > val2) {
              return -1;
            } else if (val1 < val2) {
              return 1;
            } else {
              return 0;
            }
          }
        };
        return arr.sort(compare(name));
      },

    },
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .c_list {
    .c_list_search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .row-center{
        display: flex;
        align-items: center;
      }
      .type_select {
        width: 174px;
        margin-left: 5px;
        @media screen and (max-width: 1000px) {
          width: 45%;
          margin-left: 0;
        }
      }
      .status_select {
        width: 174px;
        margin-left: 10px;
        @media screen and (max-width: 1000px) {
          width: 45%;
          margin-left: 0;
          float: right;
          margin-right: 0;
        }
      }

      .search_input {
        .search {
          width: 360px;
          margin-left: 20px;
          @media screen and (max-width: 1000px) {
            width: 80%;
            margin: 0.5rem 0 0 0;
          }
          .el-input__inner {
            height: 36px;
            line-height: 36px;
            border-radius: 8px;
            &:focus {
              border-color: @Ncolour;
            }
          }
          .el-input__icon {
            line-height: 36px !important;
          }
        }
        .iconfont {
          @media screen and (max-width: 1000px) {
            font-size: 1rem;
            margin: 1rem 0 0 0 ;
          }
        }
      }
    }
    .c_tabs {
      margin: 20px auto 100px;
      .el-table{
        border-radius: 12px;
      }
    }
    .card-info {
      min-height: 600px;
      .card {
        width: 588px;
        margin: 20px 0 0 0;
        border: @BD1;
        &:first-child {
          margin: 16px 0 0 0;
        }
        &:nth-child(2) {
          margin: 16px 0 0 0;
        }
        &:nth-child(2n) {
          margin-left: 20px;
        }
        &:last-child {
          margin-bottom: 100px;
        }
        .tabs_infos {
          padding: 0 0 0 20px;
          .icon-wait_red_icon, .icon-consensus_icon {
            margin: 15px 30px 0 0;
            color: @Ncolour;
          }
          .icon-wait_red_icon {
            color: red;
          }
        }
        ul {
          background-color: @Bcolour1;
          height: 92px;
          padding: 0 30px;
          li {
            width: 50%;
            line-height: 30px;
            color: @Acolor3;
            span {
              width: 150px;
              text-align: left;
              color: @Mcolour;
            }
          }
        }
      }
      @media screen and (max-width: 1000px) {
        .card {
          width: 100%;
          margin: 1rem 0 0;
          &:first-child {
            margin: 1rem 0 0;
          }
          &:nth-child(2) {
            margin: 1rem 0 0;
          }
          &:nth-child(2n) {
            margin: 1rem 0 0;
          }
          &:last-child {
            margin: 1rem 0 0;
          }

          ul {
            padding: 0 1rem;
            li {
              span {
                width: 55%;
                text-align: center;
                .fCN {
                  display: none;
                }
              }
            }
          }
        }
      }
    }

  }

@media (max-width: 1000px){
  .consensus{
    .c_list_search{
      display: flex;
      flex-wrap: wrap;
      .row-center{
        flex-wrap: wrap;
      }
      .type_select, .status_select{
        margin-right: 16px;
        margin-bottom: 16px;
      }
      .search_input{
        margin-bottom: 16px;
        .search{
          margin-top: 0;
        }
      }
    }
  }
}

@media (max-width: 686px){
  .consensus{
    .w1200{
      .c_list{
        .card-info{
          .card{
            width: 100% !important;
            margin-right: 0 !important;
          }
        }
      }
    }
  }
}
</style>
