<template>
  <div class="contract-nrc20">
    <div class="hide-div"></div>
    <el-table :data="list" style="width: 100%" v-loading="listLoading">
      <el-table-column :label="$t('public.serial')" width="80" align="left">
        <template slot-scope="scope">{{
          scope.$index + (pager.page - 1) * pager.rows + 1
        }}</template>
      </el-table-column>
      <el-table-column
        prop="tokenName"
        :label="$t('public.passCard')"
        width="140"
        align="left"
      ></el-table-column>
      <el-table-column
        :label="$t('public.abbreviate')"
        width="160"
        align="left"
      >
        <template slot-scope="scope">
          <router-link
            class="click"
            :to="computePath('tokenInfo', scope.row.contractAddress)">
            {{ scope.row.symbol }}
            <span v-if="scope.row.status === 3" class="gray">
              {{ $t("public.unavailable") }}
            </span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalSupply"
        :label="$t('contracts.contracts3')"
        width="180"
        align="left"
      >
      </el-table-column>
      <el-table-column
        :label="$t('public.contractAddress')"
        min-width="220"
        align="left"
      >
        <template slot-scope="scope">
          <router-link
            class="click"
            :to="computePath('tokenInfo', scope.row.contractAddress)">
            {{ scope.row.contractAddress }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        :label="$t('public.createTime')"
        width="180"
        align="left"
      >
      </el-table-column>
    </el-table>
    <PagingBar :pager="pager" @change="changePageList" />
  </div>
</template>

<script>
import PagingBar from "@/components/pagingBar";
import contractMixin from "./contractMixin";

export default {
  data() {
    return {
      contractType: "nrc20",
    };
  },
  mixins: [contractMixin],
  components: {
    PagingBar,
  },
};
</script>

<style lang="less">
.el-table {
  tr {
    th {
      background: #f4f8fe !important;
    }
  }
  
  .el-table__header-wrapper {
    background: #f4f8fe;
  }
}
</style>
