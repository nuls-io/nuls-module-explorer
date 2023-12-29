<template>
  <div class="contracts-all">
    <el-switch class="hide-switch fr" v-model="hideSwitch" :width="32" :inactive-text="$t('contracts.contracts1')"
               @change="hideNrc20List"></el-switch>
    <el-table class="contarracts-teble" :data="list">
      <el-table-column width="20" align="left"></el-table-column>
      <el-table-column :label="$t('public.serial')" width="80" align="left">
        <template slot-scope="scope">{{scope.$index+(pager.page - 1) * pager.rows + 1}}</template>
      </el-table-column>
      <el-table-column :label="$t('public.contractAddress')" width="400" align="left">
        <template slot-scope="scope">
                <span class="cursor-p click" @click="toUrl('contractsInfo',scope.row.contractAddress)">
                  {{ scope.row.contractAddress }}
                  <span v-if="scope.row.status ===3" class="gray">{{$t('public.unavailable')}}</span>
                </span>
        </template>
      </el-table-column>
      
      <el-table-column prop="balance" :label="$t('public.balance')+ '('+symbol+')'" sortable align="left">
        <template slot-scope="scope">{{ scope.row.balance/100000000 }}</template>
      </el-table-column>
      <el-table-column prop="txCount" :label="$t('public.transactionNo')" sortable
                       align="left">
      </el-table-column>
      <el-table-column prop="createTime" :label="$t('public.createTime')" sortable min-width="160"
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
import { watch } from 'vue';

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
  },
  watch:{
    list:{
      handler(newval){
        console.log(newval, '--------Contracts 列表')
      },immediate: true
    }
  }
}
</script>

<style lang="less">
.contracts-all {
  margin-bottom: 60px;
  .is-checked .el-switch__core{
    border-color: #00DB82 !important;
    background-color: #00DB82 !important;
  }
  .paging .pages .el-pager .active{
    background-color: #00DB82 !important;
  }
  .hide-switch {
    height: 35px;
    margin: 1px 0 0 20px;
  }
  .click{
    color: #00DB82;
  }
  .hide-div {
    width: 100%;
    height: 23px;
  }
  .contarracts-teble{
    tr{
      th{
        background: #ffffff !important;
        .cell{
          font-size: 14px;
          color: #000000;
        }
      }
    }
  }
}
</style>
