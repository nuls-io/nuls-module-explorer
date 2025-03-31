<template>
  <div class="nav">
    <el-menu :default-active="activedMenu($route.name)" :mode="mode">
      <el-menu-item index="home" class="font14 fw capitalize">
        <router-link tag="a" :to="{ name: 'home'}">
          {{ $t('nav.home') }}
        </router-link>
      </el-menu-item>

      <el-submenu index="blockChain">
        <template slot="title">{{ $t('nav.blockChain') }}</template>
        <el-menu-item index="contracts" class="font14 capitalize">
          <router-link tag="a" :to="{ name: 'contracts'}">
            {{ $t('nav.contracts') }}
          </router-link>
        </el-menu-item>
        <el-menu-item index="block" class="font14 capitalize">
          <router-link tag="a" :to="{ name: 'block'}">
            {{ $t('nav.block') }}
          </router-link>
        </el-menu-item>
        <el-menu-item index="address" class="font14 capitalize">
          <router-link tag="a" :to="{ name: 'address'}">
            {{ $t('nav.address') }}
          </router-link>
        </el-menu-item>
        <el-menu-item index="transaction" class="font14 capitalize">
          <router-link tag="a" :to="{ name: 'transaction'}">
            {{ $t('nav.transaction') }}
          </router-link>
        </el-menu-item>
      </el-submenu>



      <el-menu-item index="Consensus" class="font14 fw capitalize">
        <router-link tag="a" :to="{ name: 'Consensus'}">
          {{ $t('nav.consensus') }}
        </router-link>
      </el-menu-item>
      <el-menu-item index="Assets" class="font14 fw capitalize">
        <router-link tag="a" :to="{ name: 'Assets'}">
          {{ $t('nav.assets') }}
        </router-link>
      </el-menu-item>
      <!-- <el-submenu index="contractsBase">
        <template slot="title">{{ $t('nav.contracts') }}</template>
        <el-menu-item index="contracts" class="font14 capitalize">{{ $t('contracts.contracts0') }}</el-menu-item>
        <el-menu-item index="nrc20" class="font14 capitalize">NRC20</el-menu-item>
        <el-menu-item index="nrc721" class="font14 capitalize">NRC721</el-menu-item>
        <el-menu-item index="nrc1155" class="font14 capitalize">NRC1155</el-menu-item>
      </el-submenu> -->
      <el-menu-item index="Parachains" class="font14 fw capitalize">
        <router-link tag="a" :to="{ name: 'Parachains'}">
          {{ $t('network.network') }}
        </router-link>
      </el-menu-item>
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
      //language
      lang: 'en',
    };
  },
  props: {
    mode: {
      type: String,
      default: 'horizontal'
    }
  },
  components: {
    //numberGrow,
  },
  watch: {
    '$route.fullPath': {
      handler() {
        this.$parent.hideMobileMenu();
      }
    }
  },
  created() {
    setTimeout(() => {
      console.log(this.$route, 12345)
    }, 1000)
    
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
      this.changeNavMode()
    }

    this.selectLanguage(this.lang, false);
    if (this.$route.path === '/accountInfo') {
      let parmes = this.$route.query.address;
      this.$router.push({
        name: 'addressInfo',
        query: { address: parmes }
      })
    }
  },
  methods: {
    changeNavMode() {
      if (document.documentElement.clientWidth <= 1000) {
        //
      } else {
        this.$emit('hideMobile')
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
    handleSelect(key) {
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
      }else if(val && val.indexOf('token') > -1 || (val && val.indexOf('tokenInfo') > -1) || (val && val.indexOf('Assets') > -1)){
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
    padding-left: 20px !important;
  }

  .el-menu {
    .el-menu-item {
      padding: 0;
      font-size: 14px;
      line-height: 68px;
      font-weight: normal;
      a {
        display: block;
        width: 100%;
        height: 100%;
        padding: 0 18px;
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
        a {
          padding: 0;
        }
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
      padding: 0;
      a {
        display: block;
        width: 100%;
        height: 100%;
        padding: 0 10px;
      }
    }
  }
}
.el-menu-item-group__title {
  padding-top: 0
}
</style>
