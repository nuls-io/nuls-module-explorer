<template>
  <div class="asset-holders">
    <div class="total">
      <img src="../img/renshu.png" alt="" />
      <span>{{
        $t("assetInfo.assetInfo25", { number: toThousands(pager.total) })
      }}</span>
    </div>
    <div v-loading="loading">
      <el-table :data="holders">
        <el-table-column width="20" align="left"></el-table-column>
        <el-table-column label="#" width="60" align="left">
          <template slot-scope="scope">{{
            scope.$index + 1 + (pager.page - 1) * pager.rows
          }}</template>
        </el-table-column>
        <el-table-column :label="$t('public.address')" min-width="260" align="left">
          <template slot-scope="scope">
            <div class="flex-start">
              <router-link tag="a" :to="{
                path: `/asset/${assetKey}/${scope.row.address}`
              }" class="click">
                {{ superLong(scope.row.address, 10) }}
              </router-link>
              <div class="tags" v-if="scope.row.tag">
                {{ scope.row.tag }}
              </div>
              <img @click="copy(scope.row.address)" src="../img/fuzhi.png" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('assetInfo.assetInfo24')" min-width="130">
          <template slot-scope="scope">{{
            toThousands(scope.row.balance)
          }}</template>
        </el-table-column>

        <el-table-column :label="$t('assetInfo.assetInfo26')" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.rate }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('assetInfo.assetInfo27')" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.value > 0">${{ toThousands(scope.row.value) }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
      </el-table>
      <paging :pager="pager" @change="getHolders" v-show="pager.total > pager.rows"></paging>
    </div>
  </div>
</template>
  
<script>
import {
  superLong,
  copys,
  divisionDecimals,
  fixNumber,
  toThousands,
} from "../../../api/util";
import paging from "@/components/pagingBar";
export default {
  props: {
    assetKey: String,
    decimals: Number,
  },
  components: {
    paging,
  },
  data() {
    return {
      toThousands,
      loading: true,
      holders: [],
      pager: {
        total: 0,
        page: 1,
        rows: 10,
      },
    };
  },
  watch: {
    assetKey(val) {
      if (val) {
        this.getHolders();
      }
    },
  },
  mounted() {
    if (this.assetKey) {
      this.getHolders();
    }
  },
  methods: {
    async getHolders() {
      this.loading = true;
      const result = await this.$post("/", "getHoldersByAssetKey", [
        this.assetKey,
        this.pager.page,
        this.pager.rows,
      ]);
      if (result.result) {
        const { list, totalCount } = result.result;
        list.map((v) => {
          v.balance = divisionDecimals(v.balance, this.decimals); 
          if(v.value){
            v.value = Number(v.value)
          }
          v.rate = fixNumber(v.rate / 100, 8) + "%";
        });
        this.holders = list;
        this.pager.total = totalCount;
      }
      this.loading = false;
    },
    sliceHash(str) {
      return str.slice(0, 20) + "...";
    },
    superLong(str, len = 8) {
      return superLong(str, len);
    },
    copy(sting) {
      copys(sting);
    },
  },
};
</script>
  
<style lang="less">
.asset-holders {
  .el-table {
    border-radius: 0;

    tr {
      th {
        .cell {
          font-size: 14px;
          color: #000000;
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

    

  }

  .total {
    display: flex;
    margin: 0 24px 16px;
    align-items: center;

    img {
      width: 14px;
      height: 12px;
      margin-right: 6px;
    }

    span {
      font-size: 14px;
    }
  }
}
</style>
  