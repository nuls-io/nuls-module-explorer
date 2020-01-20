<template>
  <div class="update w1200" v-loading="updateLoading">
    <div class="chart_title">
      <h4>{{$t('protocolUpdate.name')}}:{{protocol}}</h4>
      <el-progress :text-inside="true" :stroke-width="24" :percentage="protocolUpdate" status="success"></el-progress>
    </div>
    <div class="cb"></div>
    <el-row class="chart_info">
      <el-col :span="12">
        <div class="titles">
          <div class="font16">{{$t('protocolUpdate.upgraded')}}:</div>
          <div class="font12">{{$t('public.address')}}<span class="fr">{{$t('public.alias')}}</span></div>
        </div>
        <div class="list scroll">
          <div v-for="item in newList" :key="item.agentAddress" class="font12">
            {{ item.agentAddress }}<span v-show="item.agentAlias" class="fr">({{ item.agentAlias }})</span>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="titles">
          <div class="font16">{{$t('protocolUpdate.notUpgraded')}}:</div>
          <div class="font12">{{$t('public.address')}}<span class="fr">{{$t('public.alias')}}</span></div>
        </div>
        <div class="list scroll">
          <div v-for="item in oldList" :key="item.agentAddress" class="font12">
            {{ item.agentAddress }}<span v-show="item.agentAlias" class="fr">({{ item.agentAlias }})</span>
          </div>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        protocol: "",
        protocolUpdate: "",
        newList: [],
        oldList: [],
        updateInterval: null,
        updateLoading: true
      }
    },
    components: {},
    created() {
      this.protocolUpdate = "0/0";
      this.getTransactionsTotal();
    },
    mounted() {
      this.updateInterval = setInterval(() => {
        this.getTransactionsTotal();
      }, 60000)
    },
    beforeDestroy() {
      clearInterval(this.updateInterval);
    },
    methods: {

      /**
       * @disc: 获取最新的交易总量
       * @date: 2019-09-10 14:02
       * @author: Wave
       */
      getTransactionsTotal() {
        this.$post('/', 'getConsensusNodes', [1, 200, 0])
          .then((response) => {
            //console.log(response);
            const newVersion = 4;
            const list = response.result.list.filter(d => d.status === 1);
            const total = list.length + 5;
            const success = list.filter(d => d.version === newVersion).length + 5;
            const per = ~~(success / total * 100);
            this.protocol = `${success}/${total}`;
            this.protocolUpdate = `${per}`;
            //console.log(this.protocolUpdate);
            this.newList = [];
            this.oldList = [];
            this.updateLoading = false;
            list.forEach(d => {
              if (d.version === newVersion) {
                this.newList.push(d);
              } else {
                this.oldList.push(d);
              }
            })
          })
      },

      /**
       * url 连接跳转
       * @param name
       * @param parmes
       */
      toUrl(name, parmes) {
        this.$router.push({
          name: name,
          query: name === 'transactionInfo' ? {hash: parmes} : {height: parmes}
        })
      }
    },
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .update {
    .chart_title {
      margin: 40px auto 0;
      width: 50rem;
    }
    .chart_info {
      margin: 20px 0 0 0;
      border: 1px solid #d1dbe5;
      .el-col-12 {

        &:first-child {
          border-right: 1px solid #a4aec4;
        }
        .titles {
          background-color: #BCC4CC;
          padding: 10px 10px;
          .font12 {
            margin: 10px 0 0 0;
          }
        }
        .list {
          height: 36rem;
          overflow-y: auto;
          padding: 0 10px;
          .font12 {
            line-height: 20px;
          }
        }
      }
    }
  }


</style>
