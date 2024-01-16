<template>
  <div class="nav">
    <el-menu :default-active="activedMenu($route.name)" :mode="mode" active-text-color="#00DB82" @select="handleSelect">
      <el-menu-item index="home" class="font14 fw capitalize">{{ $t('nav.home') }}</el-menu-item>


      <el-submenu index="blockChain">
        <template slot="title">{{ $t('nav.blockChain') }}</template>
        <el-menu-item index="contracts" class="font14 capitalize">{{ $t('nav.contracts') }}</el-menu-item>
        <el-menu-item index="block" class="font14 capitalize">{{ $t('nav.block') }}</el-menu-item>
        <el-menu-item index="address" class="font14 capitalize">{{ $t('nav.address') }}</el-menu-item>
        <el-menu-item index="transaction" class="font14 capitalize">{{ $t('nav.transaction') }}</el-menu-item>
      </el-submenu>



      <el-menu-item index="Consensus" class="font14 fw capitalize">{{ $t('nav.consensus') }}</el-menu-item>
      <el-menu-item index="Assets" class="font14 fw capitalize">{{ $t('nav.assets') }}</el-menu-item>
      <!-- <el-submenu index="contractsBase">
        <template slot="title">{{ $t('nav.contracts') }}</template>
        <el-menu-item index="contracts" class="font14 capitalize">{{ $t('contracts.contracts0') }}</el-menu-item>
        <el-menu-item index="nrc20" class="font14 capitalize">NRC20</el-menu-item>
        <el-menu-item index="nrc721" class="font14 capitalize">NRC721</el-menu-item>
        <el-menu-item index="nrc1155" class="font14 capitalize">NRC1155</el-menu-item>
      </el-submenu> -->
      <el-menu-item index="Parachains" class="font14 fw capitalize">{{ $t('network.network') }}</el-menu-item>
      <div class="font14 fw capitalize languagess el-menu-item" @click="selectLanguage(lang, true)">
        {{ lang === 'en' ? 'Zh' : 'En' }}
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: 'horizontal',
      //language
      lang: 'en',
    };
  },
  components: {
    //numberGrow,
  },
  created() {
    let lang = navigator.language || navigator.userLanguage;//Regular browser language andIEbrowser
    if (sessionStorage.hasOwnProperty('lang')) {
      this.lang = sessionStorage.getItem('lang')
    } else {
      if (lang.substr(0, 2) === 'zh') {
        this.lang = 'cn'
      } else {
        this.lang = 'en'
      }
    }
  },
  mounted() {
    this.changeNavMode()
    window.onresize = () => {
      return (() => {
        this.$nextTick(() => {
          this.changeNavMode()
        })
      })()
    }

    this.selectLanguage(this.lang, false);
    if (this.$route.path === '/accountInfo') {
      let parmes = this.$route.query.address;
      this.$router.push({
        name: 'addressInfo',
        query: { address: parmes }
      })
    }
    // setInterval(() => {
    //   this.mode = /(iPhone|iOS|Android|Windows Phone)/i.test(navigator.userAgent) ? 'vertical' : 'horizontal';
    // }, 500)
  },
  methods: {
    changeNavMode() {
      if (document.documentElement.clientWidth <= 1000) {
        this.mode = "vertical"
      } else {
        this.$emit('hideMobile')
        this.mode = "horizontal"
      }
    },
    /**
     * Language switching
     * @param e
     * @param Boolean
     */
    selectLanguage(e, Boolean) {
      if (Boolean) {
        this.lang = this.lang === 'en' ? 'cn' : 'en';
      }
      sessionStorage.setItem('lang', this.lang);
      //console.log(this.lang);
      this.$i18n.locale = this.lang;
    },
    /**
     * Navigation jump
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
      if (key) {
        this.$parent.hideMobileMenu();
      }
    },

    /**
     * Selection of navigation bar
     **/
    activedMenu(val) {
      // if (!val) return '';
      console.log(val, '-------nav---------')
      if(val === "transactionInfo"){
        return "transaction"
      }else if(val === "Assetsdetails" || (val && val.indexOf('token') > -1) || val === 'holderAddress' || (val && val.indexOf('tokenInfo') > -1) || (val && val.indexOf('Assets') > -1)){
        return "Assets"
      }else if(val === 'nrc20' || val === 'nrc721' || val === 'nrc1155'){
        return "contracts"
      }else if (val && val.indexOf('address') > -1) {
        return 'address'
      }else if (val && val.indexOf('contracts') > -1) {
        return 'contracts';
      }else if (val && val.indexOf('block') > -1) {
        return 'block';
      }else if ( val && val.indexOf('Consensus') > -1 || (val && val.indexOf('rotation') > -1) ) {
        return 'Consensus'
      }else{
        return val;
      }
      
    },

  },
}
</script>

<style>
.el-menu--horizontal .el-menu .el-menu-item {
  color: #000000;
}

</style>

<style lang="less">
@import "./../assets/css/style";

.nav {
  float: left;

  .languagess {
    color: #000000 !important;
  }

  .el-menu {
    .el-menu-item {
      padding: 0 18px;
      color: #000000;
      font-size: 14px;
      line-height: 68px;
      font-weight: normal;
      &:hover {
        color: #00DB82;
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


    .el-menu {
      .el-menu-item {
        height: 56px;
        line-height: 56px;
      }

      .el-submenu {
        @media screen and (max-width: 1000px) {
          &:focus {
            border-color: transparent !important;
          }

          .el-submenu__title {
            font-size: 14px;
            line-height: 60px;
            color: #000000;
          }
        }
      }
    }
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

@media (min-width: 1000px) {
  .languagess {
    display: none;
  }
}
.el-menu--horizontal {
  .el-menu {
    .el-menu-item {
      &:hover {
        color: #00DB82;
      }
    }
  }
}
.el-menu-item-group__title {
  padding-top: 0
}
</style>
