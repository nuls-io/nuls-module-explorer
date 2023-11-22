<template>
  <div class="contract-nrc721">
    <div class="hide-div"></div>
    <el-table :data="list" style="width: 100%" v-loading="listLoading">
      <el-table-column :label="$t('public.serial')" width="80" align="left">
        <template slot-scope="scope">{{scope.$index+(pager.page - 1) * pager.rows + 1}}</template>
      </el-table-column>

      <el-table-column :label="$t('public.abbreviate')" min-width="160" align="left">
        <template slot-scope="scope">
                <span class="cursor-p click" @click="toUrl('tokenInfo',scope.row.contractAddress)">
                  {{ scope.row.symbol }}
                  <!--                  <span v-if="scope.row.status ===3" class="gray">{{$t('public.unavailable')}}</span>-->
                </span>
        </template>
      </el-table-column>
      <el-table-column prop="totalSupply" :label="$t('contracts.contracts5')" min-width="180"
                       align="left">
      </el-table-column>
      <el-table-column prop="txCount" :label="$t('contracts.contracts6')" width="180"
                       align="left">
      </el-table-column>
    </el-table>
    <PagingBar
      :pager="pager"
      @change="changePageList"
    />
  </div>
</template>

<script>
import PagingBar from '@/components/pagingBar';
import contractMixin from './contractMixin';

export default {
  data() {
    return {
      contractType: 'nrc721'
    };
  },
  mixins: [contractMixin],
  components: {
    PagingBar
  },
}
</script>

<style lang="less">
.paging .pages .el-pager .active{
    background-color: #00DB82 !important;
  }
.click{
  color: #00DB82;
}

</style>
