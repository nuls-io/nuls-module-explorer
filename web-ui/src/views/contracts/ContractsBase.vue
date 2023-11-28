<template>
  <div class="contracts bg-gray">
    <div class="assets-container w1200">
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('contracts.contracts0')" name="/contracts/"></el-tab-pane>
        <el-tab-pane label="NRC20" name="/contracts/nrc20"></el-tab-pane>
        <el-tab-pane label="NRC721" name="/contracts/nrc721"></el-tab-pane>
        <el-tab-pane label="NRC1155" name="/contracts/nrc1155"></el-tab-pane>
      </el-tabs> -->
    </div>
    <div class="bg-white">
      <div class="content">
        <div class="w1200">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeName: "/contracts"
    };
  },
  
  watch:{
    $route:{
      handler(newval){
        console.log(newval.path)
        this.activeName = newval.path
      },
      immediate: true
    }
  },
  computed: {
    activeName() {
      return this.$route.path
    },
  },
  methods:{
    handleClick(tab, event) {
      this.$router.push(tab.name)
      console.log(tab.name)
    },
  }
}
</script>

<style lang="less">
.contracts {
  margin: 0 auto;
  background-color: #F9FAFD;
  .bg-white{
    background: initial;
  }
  .tables {
    margin-top: 24px;
  }

  .el-tabs__item {
    a {
      color: #303133;
    }

    &.is-active a {
      color: #00DB82;
    }
  }

  .assets-container {
    padding-top: 24px;

    .el-tabs {
      .el-tabs__header {
        .el-tabs__nav-wrap {
          .el-tabs__item {
            color: #000000;
            font-size: 18px;
          }

          .el-tabs__active-bar {
            background: #00DB82;
          }

          .is-active {
            color: #00DB82;
            font-weight: 550;
          }
        }
      }
    }
  }

  .content {
    padding-bottom: 60px;
  }
}

@media (max-width: 1220px){
  .contracts{
    padding: 0 .5rem;
    .w1200{
      width: initial;
    }
  }
}
</style>
