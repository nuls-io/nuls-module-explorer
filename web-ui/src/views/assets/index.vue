<template>
  <div class="assets">
    <div class="assets-container w1200">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('assets.chain_assets')" name="Assets">
          <div class="assets-table w1200">
            <!-- <p class="table-titile">
              {{ $t("assets.Contracts", { number: pager.total }) }}
            </p> -->
            <el-table
              :data="tableData"
              style="width: 100%"
              :cell-class-name="cellClassName"
            >
              <el-table-column label="ID" min-width="110">
                <template slot-scope="scope">
                  <div>#{{ scope.row.id }}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('assets.symbol')" min-width="200">
                <template slot-scope="scope">
                  <router-link class="Token-box" :to="{ path: '/asset/' + scope.row.id}">
                    <SymbolIcon :icon="scope.row.iconUrl || scope.row.symbol" />
                    <span class="cur color-derl">{{ scope.row.symbol }}</span>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column label="Native Chain" min-width="160">
                <template slot-scope="scope">
                  <div class="chain-box" v-if="scope.row.sourceChainName">{{scope.row.sourceChainName}}</div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('assets.Circulation')"
                min-width="190"
              >
                <template slot-scope="scope">
                  <div>{{ toThousands(scope.row.supply) }}</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('assets.Holder')" min-width="160">
                <template slot-scope="scope">
                  <div>{{ toThousands(scope.row.addresses) }}</div>
                </template>
              </el-table-column>
            </el-table>

            <div class="paging">
              <!-- <div class="paging-select">
                <span>show</span>
                <el-select v-model="pagerRows" @change="changePagerRows">
                  <el-option label="20" value="20"></el-option>
                  <el-option label="50" value="50"></el-option>
                  <el-option label="100" value="100"></el-option>
                </el-select>
                <span>Records</span>
              </div> -->
              <el-pagination
                class="pages"
                background
                :pager-count="5"
                layout="total,prev, pager, next, jumper"
                :total="pager.total"
                :current-page.sync="pager.page"
                :page-size="pager.rows"
                @current-change="pagesList"
              >
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="NRC20" name="AssetsNrc20">
          <Nrc20></Nrc20>
        </el-tab-pane>
        <el-tab-pane label="NRC721" name="AssetsNrc721">
            <Nrc721 />
        </el-tab-pane>
        <el-tab-pane label="NRC1155" name="AssetsNrc1155">
            <Nrc1155 />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { toThousands , timesDecimals, divisionDecimals} from "../../api/util";
import SymbolIcon from "@/components/SymbolIcon.vue";
import Nrc20 from "../contracts/Nrc20.vue";
import Nrc721 from '../contracts/Nrc721.vue'
import Nrc1155 from '../contracts/Nrc1155.vue'
import { NSymbol, NDecimals, NDiffDeciamsl, calDecimalsAndSymbol } from '@/constants/constants'
export default {
  components: {
    SymbolIcon,
    Nrc20,
    Nrc721,
    Nrc1155
  },
  data() {
    return {
      timesDecimals,
      toThousands,
      activeName: "Chain_assets",
      // pagerRows: 20,
      tableData: [],
      pager: {
        total: 0,
        page: 1,
        rows: 15,
      }
    };
  },
  created() {
    // console.log(this.$route, 22)
    this.activeName = this.$route.name || 'Assets'
    /* if(location.pathname == '/assets'){
      this.activeName = 'Chain_assets'
    }else if(location.pathname == '/Assets/nrc20'){
      this.activeName = 'second'
    }else if(location.pathname === '/Assets/nrc721'){
      this.activeName = 'third'
    }else{
      this.activeName = 'fourth'
    } */
    this.getYearRateData();
  },
  methods: {
    symbolLogo(name) {
      if (name) {
        return (
          "https://nuls-cf.oss-us-west-1.aliyuncs.com/icon/" + name + ".png"
        );
      } else {
        return "../assets/img/destroyed.svg";
      }
    },
    getYearRateData() {
      const { page, rows } = this.pager;
      this.$post("/", "getTopAssets", [page,rows]).then((response) => {
        if (response.hasOwnProperty("result")) {
          this.pager.total = response.result?.totalCount || 0;
          response.result?.list?.map(v => {
            const { decimals, symbol } = calDecimalsAndSymbol(v)
            if (v.sourceChainName === 'NULS') {
              v.sourceChainName = 'NAI'
            }
            v.supply = divisionDecimals(v.totalSupply, decimals)
            v.symbol = symbol
          })
          this.tableData = response.result?.list;
        }
      });
    },
    handleClick() {
      const { page, rows } = this.pager;
      let params;
      this.$router.push({
        name: this.activeName
      })
    },
    getContractList(method, params) {
      this.$post("/", method, params).then((response) => {
        if (response.hasOwnProperty("result")) {
          this.pager.total = response.result.totalCount;
          this.tableData = response.result?.list;
        }
      });
    },
    /**
     * Paging function
     **/
    pagesList(e) {
      this.pager.page = e;
      this.getYearRateData();
    },
  },
};
</script>

<style lang="less">
.assets {
  background-color: #f9fafd;
  .assets-table {
    margin-bottom: 150px;
    background: #ffff;
    border-radius: 12px;
    overflow: hidden;
    .table-titile {
      font-size: 14px;
      color: #000000;
      padding-bottom: 12px;
      padding-top: 12px;
    }

    .paging {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .pages {
        height: initial;
      }

      .paging-select {
        font-size: 12px;
        color: #000000;
        display: flex;
        align-items: center;

        .el-input__inner {
          width: 66px;
          margin: 0 8px;
          padding: 0 4px;
          border-radius: 4px;
        }
        .el-input__suffix {
          right: 10px;
        }
      }
    }

    .paging .pages .el-pager .active {
      background-color: #00e789 !important;
    }

    .is-checked .el-switch__core {
      border-color: #00e789 !important;
      background-color: #00e789 !important;
    }

    .el-pagination__total,
    .el-pagination__jump {
      color: #8b8bb0;
    }

    .el-pagination.is-background .el-pager li {
      background-color: initial;
      border: 1px solid #ebebf4;
      border-radius: 5px;
    }

    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .btn-next {
      background-color: initial;
      border: 1px solid #ebebf4;
      border-radius: 5px;
    }

    .el-table {
      tr {
        th {
          background: #F4F8FE;
          .cell {
            color: #4a4f55;
            padding: 0 36px;
          }
        }
      }

      td {
        .cell {
          padding: 0 36px;
        }
      }

      .chain-box {
        width: fit-content;
        padding: 2px 6px;
        border-radius: 8px;
        color: #000000;
        font-size: 12px;
        background: #f2f7ff;
      }

      .Token-box {
        display: flex;
        align-items: center;
        cursor: pointer;

        img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin-right: 6px;
        }

        span {
          font-size: 14px;
          color: #00e789;
        }
      }
    }

    .el-table::before {
      height: 0;
    }
  }

  .assets-container {
    padding: 24px 0;
    margin-bottom: 50px;
    .el-tabs {
      .el-tabs__header {
        .el-tabs__nav-wrap {
          .el-tabs__item {
            color: #000000;
            font-size: 18px;
          }

          .el-tabs__active-bar {
            background: #00db82;
          }

          .is-active {
            color: #00db82;
            font-weight: 400;
          }
        }
      }
    }
  }
}

@media (max-width: 1220px) {
  .assets {
    padding: 0 0.5rem;
    .w1200 {
      width: initial;
    }
  }
}

@media (max-width: 686px) {
  .assets {
    .assets-table {
      .paging {
        margin-top: 16px;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
