<template>
  <div class="w1200 network">
    <el-table :data="holdData" border stripe>
      <el-table-column prop="chainId" :label="$t('network.network0')" min-width="300" align="center">
      </el-table-column>
      <el-table-column :label="$t('network.network1')" width="290" align="center">
        <template slot-scope="scope">
          <span class="click" @click="toUrl('networkInfo',scope.row.chainId)">{{ scope.row.chainName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('network.network2')" width="290" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.defaultAsset.symbol}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('network.network3')" width="290" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.defaultAsset.initCoins}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="paging">
      <el-pagination class="pages" background layout="total,prev, pager, next, jumper"
                     v-show="pageTotal > pageRows"
                     :total="pageTotal"
                     :current-page.sync="pageIndex"
                     :page-size="pageRows"
                     @current-change="pagingMethod">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {timesDecimals} from '@/api/util.js'

  export default {
    data() {
      return {
        holdData: [],
        pageTotal: 0, //总条数
        pageIndex: 1,//当前页
        pageRows: 5, //显示条数
      }
    },
    created() {

    },
    mounted() {
      this.getHoldData();
    },
    beforeDestroy() {

    },
    methods: {

      /**
       * @disc: 查询平行链信息
       * @params:
       * @date: 2020-06-30 19:36
       * @author: Wave
       */
      getHoldData() {
        this.$post('/', 'getOtherChainList', [])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of response.result) {
                item.defaultAsset.initCoins = Number(timesDecimals(item.defaultAsset.initCoins, item.defaultAsset.decimals))
              }
              this.holdData = response.result;
              this.pageTotal = response.result.length
            }
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * url 连接跳转
       * @param name
       * @param parmes
       */
      toUrl(name, parmes) {
        let newParmes = {chainId: parmes};
        this.$router.push({
          name: name,
          query: newParmes
        })
      },

    },
  }
</script>

<style lang="less">
  .network {
    min-height: 600px;
    margin: 40px auto 50px;
  }
</style>
