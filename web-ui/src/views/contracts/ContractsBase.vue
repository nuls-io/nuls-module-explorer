<template>
  <div class="contracts bg-gray">
    <div class="bg-white">
      <ul class="contract-link w1200 tables">
        <li :class="{active: activeName === 'contracts'}">
          <router-link to="/contracts">{{ $t('contracts.contracts0') }}</router-link>
        </li>
        <li :class="{active: activeName === 'nrc20'}">
          <router-link to="/contracts/nrc20">NRC20</router-link>
        </li>
        <li :class="{active: activeName === 'nrc721'}">
          <router-link to="/contracts/nrc721">NRC721</router-link>
        </li>
        <li :class="{active: activeName === 'nrc1155'}">
          <router-link to="/contracts/nrc1155">NRC1155</router-link>
        </li>
      </ul>
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
      // activeName: 'allContract',
    };
  },
  computed: {
    activeName() {
      return this.$route.name;
    }
  }
}
</script>

<style lang="less">

.contracts {
  width: 95%;
  margin: 0 auto;
  .tables {
    margin-top: 24px;
  }
  .el-tabs__item {
    a {
      color: #303133;
    }
    &.is-active a {
      color: #7db46d;
    }
  }
  .contract-link {
    display: flex;
    position: relative;
    margin-bottom: 20px;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #E4E7ED;
      z-index: 1;
    }
    li {
      margin-right: 40px;
      a {
        display: inline-block;
        line-height: 40px;
        font-size: 14px;
        color: #303133;
      }
      &.active a {
        color: #7db46d;
      }
      &:hover a {
        color: #7db46d;
      }
    }
  }
  .content {
    padding-bottom: 60px;
  }
}

</style>
