<template>
  <div class="address bg-gray">
    <div class="bg-white">
      <h2 class="w1200 title fl capitalize font18 autoInf">
        {{ $t("address.address1") }}
      </h2>
      <div class="w1200">
        <ve-line height="260px" :data="timeChartData" :legend-visible="false" :colors="colors" :settings="chartSettings"
          :extend="chartExtend" :loading="timeRateDataLoading" />
      </div>
    </div>
    <div class="tabs w1200">
      <h2 class="title fl capitalize font18">{{ $t("address.address0") }}</h2>
      <el-table :data="addressList" style="width: 100%" @sort-change="sortChange" v-loading="addressLoading">
        <el-table-column label="" width="30"> </el-table-column>
        <el-table-column :label="$t('public.serial')" width="70">
          <template slot-scope="scope">{{
            scope.$index + (pager.page - 1) * pager.rows + 1
          }}</template>
        </el-table-column>
        <el-table-column :label="$t('public.address')" min-width="280">
          <template slot-scope="scope">
            <div class="cursor-p click flex-center" @click="toUrl('addressInfo', scope.row.address, scope.row.type)">
              {{ scope.row.address }}
              <div class="tags" v-if="scope.row.tag">
                {{ scope.row.tag }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.locking')" width="200" align="left">
          <template slot-scope="scope">{{ $toThousands(scope.row.locked) || '0' }}</template>
        </el-table-column>
        <el-table-column :label="$t('public.total')" width="200" align="left">
          <template slot-scope="scope">{{ $toThousands(scope.row.totalBalance) }}</template>
        </el-table-column>
        <el-table-column :label="$t('public.accountedFor')" width="120" align="left">
          <template slot-scope="scope">{{ scope.row.proportion }}</template>
        </el-table-column>
      </el-table>
      <paging :pager="pager" @change="pagesList" v-show="pager.total > pager.rows">
      </paging>
    </div>
  </div>
</template>

<script>
import paging from "@/components/pagingBar";
import { timesDecimals } from "@/api/util.js";

export default {
  data() {
    this.colors = ["#7db46d", "#7db46d", "#7db46d", "#546570", "#c4ccd3"];
    this.chartExtend = {
      grid: {
        top: 20,
        bottom: 30,
        left: 10,
        right: 10,
        containLabel: true
      },
      series: {
        showSymbol: false,//Cancel small dots on the line chart
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          color: '#000000'
        },
        formatter: params => {
          params = params[0];
           return `<div class="line-tooltip">
            <p class="tooltip-label">${params.data[0]}</p>
            <p class="tooltip-value">${this.$t('address.address2')}: ${this.$toThousands(params.data[1])}</p>
          </div>`
          // return `${params.data[0]}<br/><span class="naboxs">${this.$t('address.address2')}</span>  &emsp;</span><span class="naboxs">${params.data[1]}</span>`
        }
      },
      xAxis: {
        axisLine: {
          lineStyle: {
            color: '#B3B3CF'
          }
        }
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            color: '#B3B3CF'
          }
        }
      }
    }
    return {
      timeRateDataLoading: true,
      timeChartData: {
        columns: [],
        rows: [],
      },
      timeRateDataLoading: true,
      addressLoading: true,
      addressList: [],
      sort: 0,
      pager: {
        total: 0,
        page: 1,
        rows: 15,
      },
      i18n_locale: 'cn',
    };
  },
  components: {
    paging,
  },
  computed: {
    chartSettings() {
      return {
        labelMap: { 'count': this.$t('address.address2') },
        lineStyle: {
          width: 1,
          color: '#00E789'
        },
        area: true, //Is it displayed as an area chart
        itemStyle: { //Area chart color settings
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(0, 231, 137, 0.5)', // 0% Color at
              },
              {
                offset: 1,
                color: 'rgba(255, 255, 255, 0)' // 100% Color at
              }
            ],
            globalCoord: false // Default to false
          }
        }
      };
    }
  },
  created() {
    this.getActiveAddress()
    this.getActiveAddress();
    this.pagesList();
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "addressInfo") {
      from.meta.keepAlive = true;
    } else {
      from.meta.keepAlive = false;
    }
    next();
  },
  methods: {
    async getActiveAddress() {
      const result = await this.$post("/", "getActiveAddressData", [14]);
      if (result.result) {
        this.timeChartData.columns = ["date", "count"];
        this.timeChartData.rows = result.result.reverse();
        this.timeRateDataLoading = false;
      }
    },

    /**
     * @disc: Obtain address list
     * @params: page, rows
     * @date: 2019-09-09 17:32
     * @author: Wave
     */
    getAddressList(page, rows) {
      let chainId = sessionStorage.hasOwnProperty("chainId")
        ? Number(sessionStorage.getItem("chainId"))
        : 1;
      this.$post("/", "getAssetRanking", [chainId, 1, page, rows]).then(
        (response) => {
          // console.log(response, 'Obtain address list');
          if (response.hasOwnProperty("result")) {
            for (let item of response.result.list) {
              item.totalBalance = timesDecimals(item.totalBalance, 8);
              item.locked = timesDecimals(item.locked, 8);
            }
            this.addressList = response.result.list;
            this.pager.total = response.result.totalCount;
            this.addressLoading = false;
          }
        }
      );
    },

    /**
     * Total sorting function
     **/
    sortChange(column) {
      //console.log(column);
      this.addressLoading = true;
      if (column.order === "ascending") {
        this.sort = 1;
      } else {
        this.sort = 0;
      }
      this.getAddressList(this.pager.page, this.pager.rows);
    },

    /**
     * Paging function
     **/
    pagesList() {
      this.addressLoading = true;
      this.getAddressList(this.pager.page, this.pager.rows);
    },

    /**
     * url Connection jump
     * @param name
     * @param parmes
     * @param type
     */
    toUrl(name, parmes, type) {
      // type 1ordinary 2contract 3Multiple signatures
      if (type !== 2) {
        this.$router.push({
          name: name,
          query: { address: parmes },
        });
      } else {
        this.$router.push({
          name: "contractsInfo",
          query: { contractAddress: parmes },
        });
      }
    },
  },
};
</script>

<style lang="less">
@import "./../../assets/css/style";

.address {
  .naboxs{
    font-weight: bold;
  }
  .bg-white {
    background-color: initial;
    display: flex;
    flex-direction: column;

    .w1200 {
      background: #fff;
      padding: 10px 40px 0;
      border-radius: 12px;
    }

    .autoInf {
      margin: auto;
      background: inherit;
      padding: 24px 0;
      font-size: 20px;
      font-weight: 550;
    }

    @media screen and (max-width: 1000px) {
      .w1200 {
        width: 95%;
        margin: 0 auto;
      }
    }
  }

  .title {
    margin: 0;
    padding: 20px 0;
    font-weight: 550;
    font-size: 20px;
  }

  .tabs {
    margin-bottom: 100px;
    margin-top: 0;

    @media screen and (max-width: 1000px) {
      width: 100%;
    }

    .el-table {
      tr {
        th {
          background: #fff !important;

          .cell {
            color: #000000;
          }
        }

        td {
          padding: 0 !important;

          .cell {
            line-height: 48px;
          }
        }
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
}

@media (max-width: 1200px) {
  .address {
    padding: 0 .5rem;

    .bg-white {
      .w1200 {
        width: 100%;
        padding: 0;
      }

      .autoInf {
        padding: 20px 0;
      }
    }
  }
}
</style>
