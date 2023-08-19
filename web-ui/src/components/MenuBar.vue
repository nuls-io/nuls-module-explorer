<template>
  <div class="nav">
    <el-menu :default-active="activedMenu($route.name)" :mode=mode active-text-color="#00DB82"
             @select="handleSelect">
      <el-menu-item index="home" class="font14 fw capitalize">{{$t('nav.home')}}</el-menu-item>
      <el-submenu index="blockChain">
        <template slot="title">{{$t('nav.blockChain')}}</template>
        <el-menu-item index="block" class="font14 capitalize">{{$t('nav.block')}}</el-menu-item>
        <el-menu-item index="address" class="font14 capitalize">{{$t('nav.address')}}</el-menu-item>
        <el-menu-item index="transaction" class="font14 capitalize">{{$t('nav.transaction')}}</el-menu-item>
      </el-submenu>
      <el-menu-item index="consensus" class="font14 fw capitalize">{{$t('nav.consensus')}}</el-menu-item>
     <el-menu-item index="assets" class="font14 fw capitalize">{{$t('nav.assets')}}</el-menu-item>
      <el-submenu index="contractsBase">
        <template slot="title">{{$t('nav.contracts')}}</template>
        <el-menu-item index="contracts" class="font14 capitalize">{{$t('contracts.contracts0')}}</el-menu-item>
        <el-menu-item index="nrc20" class="font14 capitalize">NRC20</el-menu-item>
        <el-menu-item index="nrc721" class="font14 capitalize">NRC721</el-menu-item>
        <el-menu-item index="nrc1155" class="font14 capitalize">NRC1155</el-menu-item>
      </el-submenu>
      <el-menu-item index="network" class="font14 fw capitalize">{{$t('network.network')}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mode: 'horizontal'
      };
    },
    components: {
      //numberGrow,
    },
    created() {
    },
    mounted() {
      if (this.$route.path === '/accountInfo') {
        let parmes = this.$route.query.address;
        this.$router.push({
          name: 'addressInfo',
          query: {address: parmes}
        })
      }
      setInterval(() => {
        this.mode = /(iPhone|iOS|Android|Windows Phone)/i.test(navigator.userAgent) ? 'vertical' : 'horizontal';
      }, 500)
    },
    methods: {

      /**
       * 导航跳转
       * @param key
       **/
      handleSelect(key, path) {
        this.navActive = key;
        sessionStorage.setItem('navActive', key);
        if (path.length > 1 && path[0] === 'contractsBase') {
          this.$router.push({
            name: path[1]
          });
        } else {
          this.$router.push({
            name: key
          });
        }
        if(key){
          this.$parent.hideMobileMenu();
        }
      },

      /**
       * 导航栏的选中
       **/
      activedMenu(val) {
        // console.log(val, '9999');
        // if (!val) return '';
        return val;
        /*if (val.indexOf('/block') === 0) {
          return 'block'
        } else if (val.indexOf('/address') === 0) {
          return 'address'
        } else if (val.indexOf('/transaction') === 0) {
          return 'transaction'
        } else if (val.indexOf('/consensus') === 0 || val.indexOf('/rotation') === 0) {
          return 'consensus'
        } else if (val.indexOf('/contracts') === 0 || val.indexOf('/token') === 0) {
          return val
        } else if (val.indexOf('/network') === 0) {
          return 'network'
        } else {
          return 'home'
        }*/
      },

    },
    watch: {}
  }
</script>

<style>
.el-menu--horizontal .el-menu .el-menu-item{
  color: #000000;
}
</style>

<style lang="less">
  @import "./../assets/css/style";

  .nav {
    height: 68px;
    width: 700px;
    float: left;
    .el-menu{
      //padding: 20px 0 0 0;
      height: 67px;
      .el-menu-item {
        padding: 0 20px;
        color: #000000;
        font-size: 14px;
        line-height: 68px;
        font-weight: normal;
      }
      .el-submenu {
        @media screen and (max-width: 1000px) {
          &:focus{
            border-color: transparent !important;
          }
          .el-submenu__title{
            font-size: 14px;
            line-height: 60px;
            color: #000000;
          }
        }
      }
    }
    .el-menu--horizontal {
      float: left;
      border-bottom: 0 !important;
      .is-active {
        border-color: transparent !important;
      }
      .el-submenu {
        @media screen and (max-width: 1000px) {
          float: none;
          text-align: center;
        }
        .el-submenu__title {
          border-bottom-color: transparent !important;
          font-size: 14px;
          line-height: 68px;
          color: #000000;
        }
      }
    }
    @media screen and (max-width: 1000px) {
      width: 100%;
      float: none;
      .el-menu--horizontal {
        float: none;
        width: 160px;
        right: 0;
        position: absolute;
        .el-menu-item {
          float: none;
          height: 40px;
          line-height: 40px;
          text-align: center;
        }
      }
    }
  }
</style>
