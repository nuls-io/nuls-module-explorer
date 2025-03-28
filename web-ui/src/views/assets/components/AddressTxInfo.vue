<template>
  <div class="address-asset-tx-info">
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
            <span>{{ $formatNumber(scope.row.amount) }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="page-wrap flex-end">
        <span v-if="showPrev" @click="prev">{{$t('assets.assetInfo30')}}</span>
        <span v-if="showNext" @click="next">{{$t('assets.assetInfo31')}}</span>
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
  computed: {
    showPrev() {
      const pageIndex = this.pager.page
      if (pageIndex === 1) {
        return false
      }
      return true
    },
    showNext() {
      const length = this.txList.length
      const pageSize = this.pager.rows
      if (length && length === pageSize) {
        return true
      }
      return false
    }
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
    prev() {
      this.pager.page = this.pager.page - 1;
      this.getTxList();
    },
    next() {
      this.pager.page = this.pager.page + 1;
      this.getTxList();
    },
  },
};
</script>

<style lang="less">
.address-asset-tx-info {
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

  .page-wrap {
    display: flex;
    justify-content: flex-end;
    padding: 15px 0 10px 0;

    span {
      display: inline-block;
      font-size: 14px;
      padding: 3px 15px;
      margin-right: 15px;
      background: #00DB82;
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
