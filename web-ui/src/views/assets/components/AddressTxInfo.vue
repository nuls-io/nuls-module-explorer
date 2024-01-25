<template>
  <div class="asset-tx-info">
    <div v-loading="loading" class="assets-container">
      <el-table :data="txList">
        <el-table-column width="20" align="left"></el-table-column>
        <el-table-column
          :label="$t('assets.assetInfo19')"
          min-width="200"
          align="left"
        >
          <template slot-scope="scope">
            <router-link
              tag="a"
              :to="{
                path: '/transaction/info',
                query: { hash: scope.row.hash },
              }"
              class="click"
            >
              {{ sliceHash(scope.row.hash) }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('assets.model')" min-width="125">
          <template slot-scope="scope">
            <div class="styleBut">
              {{ $t("type." + scope.row.txType) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('assets.assetInfo21')" min-width="160">
          <template slot-scope="scope">{{ scope.row.time }}</template>
        </el-table-column>
        <el-table-column width="190" align="left" :label="$t('assets.from')">
          <template slot-scope="scope">
            <div class="flex-start" v-if="scope.row.from">
              <router-link
                tag="a"
                :to="{
                  path: '/address/info',
                  query: { address: scope.row.from },
                }"
                class="click"
              >
                {{ superLong(scope.row.from) }}
              </router-link>
              <img
                @click="$copy(scope.row.from)"
                src="../img/fuzhi.png"
                alt=""
              />
            </div>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="" min-width="60">
          <template slot-scope="scope">
            <img src="../img/zishi.png" alt="" />
          </template>
        </el-table-column>
        <el-table-column
          min-width="190"
          align="left"
          :label="$t('assets.arrive')"
        >
          <template slot-scope="scope">
            <div class="flex-start" v-if="scope.row.to">
              <router-link
                tag="a"
                :to="{
                  path: '/address/info',
                  query: { address: scope.row.to },
                }"
                class="click"
              >
                {{ superLong(scope.row.to) }}
              </router-link>
              <img @click="$copy(scope.row.to)" src="../img/fuzhi.png" alt="" />
            </div>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('assets.assetInfo24')" min-width="100">
          <template slot-scope="scope">
            <span>{{ $toThousands(scope.row.amount) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="paging">
        <el-pagination
          class="pages"
          background
          layout="prev, pager, next, jumper"
          :total="pager.total"
          :current-page.sync="pager.page"
          :page-size="pager.rows"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { superLong, divisionDecimals } from "../../../api/util";
import moment from "moment";
export default {
  props: {
    assetKey: String,
    decimals: Number,
    address: String
  },
  data() {
    return {
      loading: true,
      txList: [],
      pager: {
        total: 0,
        page: 1,
        rows: 10,
      }
    };
  },
  watch: {
    assetKey(val) {
      if (val) {
        this.getTxList();
      }
    },
  },
  mounted() {
    if (this.assetKey) {
      this.getTxList();
    }
  },
  methods: {
    async getTxList() {
      const { page, rows } = this.pager;
      this.loading = true;
      const result = await this.$post(
        "/",
        "getTxsByAssetKey",
        [
          this.assetKey,
          page,
          rows,
          "",
          this.address,
          this.address,
        ],
        true
      );
      if (result.result) {
        const { list, totalCount } = result.result;
        list.map((v) => {
          v.amount = divisionDecimals(v.amount, this.decimals);
          v.time = moment(v.txTime * 1000).format("YYYY-MM-DD HH:mm:ss");
        });
        this.txList = list;
        this.pager.total = totalCount;
      }
      this.loading = false;
    },
    sliceHash(str) {
      return str.slice(0, 20) + "...";
    },
    superLong(str) {
      return superLong(str, 8);
    },
  },
};
</script>

<style lang="less">
.asset-tx-info {
  .assets-container {
    width: 100%;

    .el-table {
      overflow: initial;
      border-radius: 0;

      .el-input__inner:focus,
      .el-button--primary:hover {
        border-color: #00db82;
      }

      .el-button--primary {
        background: #00db82;
        border-color: #00db82;
      }

      .styleBut {
        width: fit-content;
        padding: 2px 5px;
        border-radius: 8px;
        background: #f2f7ff;
        font-size: 12px;
        color: #000000;
        white-space: nowrap;
      }

      tr {
        th {
          .cell {
            color: #000000;
            font-size: 14px;
          }
        }
      }
    }
  }

  .paging {
    display: flex;
    justify-content: flex-end !important;

    .pages {
      height: initial;
    }

    .paging-select {
      font-size: 12px;
      color: #000000;
      display: flex;
      align-items: center;

      .el-input__inner {
        width: 100px;
        margin: 0 8px;
      }
    }

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .paging .pages .el-pager .active {
    background-color: #00e789 !important;
  }

  .flex-start {
    display: flex;
    align-items: center;

    img {
      margin-left: 6px;
      cursor: pointer;
    }

    span {
      font-size: 14px;
      color: #000000;
    }
  }

  .total {
    display: flex;
    margin: 0 24px 16px;

    img {
      margin-right: 6px;
    }

    span {
      font-size: 14px;

      &:last-child {
        color: #8291a4;
      }
    }
  }

  .txType-filter {
    height: 280px;
    overflow-y: auto !important;

    p {
      height: 36px;
      line-height: 36px;
      padding: 0 15px;
      white-space: nowrap;
      border-bottom: 1px solid #edf1f9;
      cursor: pointer;

      &:last-child {
        border: none;
      }

      &.active,
      &:hover {
        color: #608fff;
      }
    }
  }

  .address-filter {
    padding: 15px !important;

    .el-input {
      margin: 10px 0;
      width: 280px;

      input {
        height: 36px;
        line-height: 36px;
      }
    }

    .flex-between {
      display: flex !important;

      button {
        width: 48%;
        padding: 10px 20px;
      }
    }
  }

  .to-filter {
    .filter-content {
      left: auto;
      right: 20%;
    }
  }

  .page-wrap {
    margin: 15px 0 10px 0;

    span {
      display: inline-block;
      font-size: 14px;
      padding: 3px 15px;
      margin-right: 15px;
      background: #2688f7;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
