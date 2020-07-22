<template>
  <div class="nav">
    <el-menu :default-active="activedMenu($route.path)" :mode=mode active-text-color="#7db46d"
             @select="handleSelect">
      <el-menu-item index="home" class="font18 fw capitalize">{{$t('nav.home')}}</el-menu-item>
      <el-submenu index="blockChain">
        <template slot="title">{{$t('nav.blockChain')}}</template>
        <el-menu-item index="block" class="font18 capitalize">{{$t('nav.block')}}</el-menu-item>
        <el-menu-item index="address" class="font18 capitalize">{{$t('nav.address')}}</el-menu-item>
        <el-menu-item index="transaction" class="font18 capitalize">{{$t('nav.transaction')}}</el-menu-item>
      </el-submenu>
      <el-menu-item index="consensus" class="font18 fw capitalize">{{$t('nav.consensus')}}</el-menu-item>
      <el-menu-item index="contracts" class="font18 fw capitalize">{{$t('nav.contracts')}}</el-menu-item>
      <el-menu-item index="network" class="font18 fw capitalize">{{$t('network.network')}}</el-menu-item>
    </el-menu>
    <!--<el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            mode="vertical"
            @open="handleOpen"
            @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>-->

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
      handleSelect(key) {
        this.navActive = key;
        sessionStorage.setItem('navActive', key);
        this.$router.push({
          name: key
        });
        if(key){
          this.$parent.hideMobileMenu();
        }
      },

      /**
       * 导航栏的选中
       **/
      activedMenu(val) {
        if (val.indexOf('/block') === 0) {
          return 'block'
        } else if (val.indexOf('/address') === 0) {
          return 'address'
        } else if (val.indexOf('/transaction') === 0) {
          return 'transaction'
        } else if (val.indexOf('/consensus') === 0 || val.indexOf('/rotation') === 0) {
          return 'consensus'
        } else if (val.indexOf('/contracts') === 0 || val.indexOf('/token') === 0) {
          return 'contracts'
        } else if (val.indexOf('/network') === 0) {
          return 'network'
        } else {
          return 'home'
        }
      },

    },
    watch: {}
  }
</script>

<style lang="less">
  @import "./../assets/css/style";

  .nav {
    width: 700px;
    float: left;
    .el-menu{
      //padding: 20px 0 0 0;
      .el-menu-item {
        padding: 0 20px;
        color: #5e6983;
        font-size: 18px;
        height: 80px;
        line-height: 80px;
        font-weight: normal;
      }
      .el-submenu {
        @media screen and (max-width: 1000px) {
          &:focus{
            border-color: transparent !important;
          }
          .el-submenu__title{
            font-size: 18px;
            line-height: 60px;
            color: #5e6983;
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
          font-size: 18px;
          line-height: 80px;
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
