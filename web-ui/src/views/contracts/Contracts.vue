<template>
  <div class="contracts-all">
    <el-switch class="hide-switch fr" v-model="hideSwitch" :width="32" :inactive-text="$t('contracts.contracts1')"
               @change="hideNrc20List"></el-switch>
    <el-table :data="list" stripe border>
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
      contractType: 'all',
      symbol: 'NULS'
    };
  },
  mixins: [contractMixin],
  components: {
    PagingBar
  }
}
</script>

<style lang="less">
.contracts-all {
  //padding-bottom: 60px;
  .hide-switch {
    height: 35px;
    margin: 1px 0 0 20px;
  }
  .hide-div {
    width: 100%;
    height: 23px;
  }
}
</style>
