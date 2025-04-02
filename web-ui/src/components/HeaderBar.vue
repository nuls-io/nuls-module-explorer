<template>
  <div class="header" :class="{ 'no-border': $route.path === '/' }">
    <div class="w1200 flex justify-between ">
      <div class="flex items-center flex-1">
        <div class="header_logo">
          <img class="logo click" :src=logoSvg @click="toHome">
        </div>
        <div class="menu flex-1">
          <MenuBar mode="horizontal"></MenuBar>
        </div>
      </div>
      <div class="flex items-center">
        <div class="header_language">
        <div class="top-search fl" v-if="navActive !== 'home' && navActive !== '/'">
          <el-input v-model="searchValue" class="fr" :placeholder="$t('public.searchTip')"
            @keyup.enter.native="clickSearch" @focus="focusSearch" @input="DynamicMonitoring" @blur="blurSearch">
            <i class="el-icon-search el-input__icon click" slot="suffix" @click="clickSearch"></i>
          </el-input>
          <SearchBar v-if="openSearchBar" :assetsList="assetsList" @clearModel="clearModel" />
        </div>
        <!-- <div class="destroyed font14 fl pc" v-else>
          <i class="iconfont icon-jiandingxiaohui fred"></i>&nbsp;
          {{$t('home.home9')}}：{{destroyedAddressAmount}}
          <span class="fCN">&nbsp;NULS</span>
        </div> -->
          <div class="language font14" @click="selectLanguage(lang, true)">{{ lang === 'en' ? 'Zh' : 'En' }}</div>
        </div>
        <div class="mobile_ico">
          <i class="el-icon-menu" @click="showMobile = !showMobile"></i>
        </div>
      </div>
      

      
    </div>

    <el-collapse-transition>
      <div class="mobile_header fr" v-show="showMobile">
        <div class="mobile_menu">
          <MenuBar @hideMobile="showMobile=false" mode="vertical"></MenuBar>
          <div class="cb"></div>
          <!-- <div class="language font14 fr" @click="selectLanguage(lang, true)">{{ lang === 'en' ? 'Zh' : 'En' }}</div> -->
        </div>
      </div>
    </el-collapse-transition>
    <div class="cb"></div>
  </div>
</template>

<script>
import axios from 'axios'
// import logoBeta from '@/assets/img/logo-beta.svg'
import logo from '@/assets/img/logo.svg'
import MenuBar from '@/components/MenuBar';
import { RUN_DEV, API_ROOT } from '@/config'
import SearchBar from './SearchBar.vue'

export default {
  data() {
    return {
      openSearchBar: false,
      assetsList: [],
      logoSvg: logo,
      //Default selection menu
      navActive: sessionStorage.hasOwnProperty('navActive') ? sessionStorage.getItem('navActive') : 'home',
      //statistical information
      count: {
        height: this.$store.state.height,//Current height
      },
      //Search box content
      searchValue: '',
      //Top search box lengthened
      topLong: false,
      //language
      lang: 'en',
      //Mobile display
      showMobile: false,
      RUN_DEV: RUN_DEV,//Operation mode
      destroyedAddressAmount: 0,//Destruction address amount
    };
  },
  components: {
    MenuBar,
    SearchBar
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
    this.selectLanguage(this.lang, false);
    //Cycle data every second
    setInterval(() => {
      this.count.height = this.$store.state.height;
      this.navActive = this.$route.path;
    }, 100);
    this.getAddressInfo();
  },
  methods: {
    DynamicMonitoring(e) {
      if (!e) {
        this.assetsList = []
        this.openSearchBar = false
      }
    },
    /**
     * @disc: Quantity of destruction obtained
     * @date: 2019-11-15 16:37
     * @author: Wave
     */
    async getAddressInfo() {
      const url = API_ROOT + '/nuls/assets/get';
      let dataRes = await axios.get(url);
      //console.log(dataRes.data);
      if (dataRes.data.success) {
        this.destroyedAddressAmount = dataRes.data.data.destroy.toFixed(3)
      } else {
        this.destroyedAddressAmount = 0
      }
    },

    /**
     * Top Search Box Get Focus Event
     **/
    focusSearch() {
      this.topLong = true;
    },

    /**
     * Top search box lost focus event
     **/
    blurSearch() {
      this.topLong = false;
    },
    clearModel() {
      this.assetsList = []
      this.openSearchBar = false
    },
    /**
     *  Top search box
     **/
    clickSearch() {
      this.$post('/', 'search', [this.searchValue])
        .then((response) => {
          // console.log(response, '-----------response-------------');
          if (response.hasOwnProperty("result")) {
            if (response.result.type === 'block') {
              this.$router.push({
                name: 'blockInfo',
                query: { height: response.result.data.txList[0].height }
              })
            } else if (response.result.type === 'tx') {
              this.$router.push({
                name: 'transactionInfo',
                query: { hash: response.result.data.hash }
              })
            } else if (response.result.type === 'account') {
              this.$router.push({
                name: 'addressInfo',
                query: { address: response.result.data.address }
              })
            } else if (response.result.type === 'contract') {
              this.$router.push({
                name: 'contractsInfo',
                query: { contractAddress: response.result.data.contractAddress, tabName: 'first' }
              })
            } else if (response.result.type === 'asset') {
              const list = response.result.data
              this.assetsList = list
              this.openSearchBar = true
            } else {
              this.$message({ message: this.$t('codeInfo.codeInfo12'), type: 'error', duration: 2000 });
            }
          } else {
            this.$message({ message: this.$t('codeInfo.codeInfo12'), type: 'error', duration: 2000 });
          }
        }).catch((error) => {
          console.log(error)
        })
    },

    /**
     * @disc: Hide Navigation
     * @params:
     * @date: 2020-07-22 10:38
     * @author: Wave
     */
    hideMobileMenu() {
      this.showMobile = false;
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
     * logo Jump to homepage
     */
    toHome() {
      this.navActive = 'home';
      sessionStorage.setItem('navActive', 'home');
      this.$router.push({
        name: 'home',
      })
    }
  },
  watch: {
    $route:{
      handler(newval){
        this.searchValue = ''
        this.assetsList = []
      }
    }
  }
}
</script>

<style lang="less">
@import "./../assets/css/style";

.header {
  position: relative;
  border-bottom: @BD1;
  height: 68px;
  background: #FFFFFF;
  &.no-border {
    border: none;
  }

  .w1200 {
    .header_logo {
      width: 120px;
      height: 68px;
      display: flex;
      align-items: center;
      margin-right: 20px;

      .logo {
        max-width: 100%;
        // width: 72px;
        // height: 32px;
      }
    }

    .menu {
      height: 68px;
      // width: 690px;
    }

    .header_language {
      width: 386px;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .top-search {
        width: 320px;
        height: 36px;
        text-align: right;
        margin-right: 16px;
        position: relative;

        @media screen and (max-width: 1000px) {
          //margin: 1rem 0.5rem 0 0;
        }

        .top_height {
          line-height: 30px;
          margin-left: -248px;
          position: absolute;

          .number-grow-warp {
            margin: 0 0 0 5px;
          }
        }

        .el-input {
          width: 80%;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          z-index: 99;
          input {
            width: 250px;
            transition: width 400ms ease, background 400ms ease, border-radius 400ms ease;
            height: 36px;
            line-height: 36px;
            border-radius: 10px;
            border: 1px solid #E9E9F8;
            background: #F6FAFF;
            font-size: 13px;

            &:focus {
              width: 260px;
              border-color: @Ncolour;
            }
          }

          .el-input__suffix {
            width: 36px;
            background: @Ncolour;
            right: 0;

            .el-icon-search:before {
              color: #FFFFFF;
            }
          }

          .el-input__inner {
            padding-right: 45px;
          }

          .el-input__icon {
            line-height: 30px;
            color: @Acolor3;
          }
        }
      }

      // .destroyed {
      //   line-height: 68px;
      //   text-align: right;
      //   width: 330px;
      //   i {
      //     font-size: 1rem;
      //   }
      // }
      .language {
        width: 36px;
        height: 36px;
        color: #000000;
        font-size: 14px;
        cursor: pointer;
        text-align: right;
        display: flex;
        background: #F2F7FF;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
      }
    }

    .mobile_ico {
      display: none;
    }
  }

  .mobile_header {}

  @media screen and (max-width: 1000px) {
    .w1200 {
      justify-content: space-between;

      .header_logo {
        width: 6rem;
        margin: 0 0.5rem;

        .logo {
          // width: 5.2rem;
        }
      }

      .menu {
        display: none;
      }

      .header_language {
        display: none;
        width: 61.5%;
        position: absolute;
        right: 20px;

        .top-search {
          width: 100%;

          .top_height {
            line-height: 0.28rem;
            margin: 2px 0 0 -62%;

            i {
              display: none;
            }
          }

          .el-input {
            width: 100%;

            input {
              width: 5rem;

              &:focus {
                width: 100%;
              }
            }
          }
        }

        .language {
          display: none;
        }
      }

      .mobile_ico {
        display: flex;
        align-items: center;
        height: 68px;

        i {
          font-size: 1.4rem;
          padding-right: .5rem;
          margin: 0;
        }
      }
    }

    .mobile_header {
      width: 100%;
      min-height: 35rem;
      position: absolute;
      right: 0;
      top: 3.4rem;
      z-index: 9999;

      .mobile_menu {
        .language {
          display: none;
        }
      }

      .language {
        display: initial;
        //position: absolute;
        //top: 26rem;
        height: 3rem;
        line-height: 3rem;
        width: 100%;
        background-color: #FFFFFF;
        padding: 0 0 0 1.2rem;
      }
    }
  }

  @media screen and (max-width: 320px) {
    .w1200 {
      .header_language {
        width: 55%;

        .top-search {
          width: 100%;

          .top_height {
            line-height: 0.25rem;
            margin-left: -61%;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1220px) {
  .header {
    .w1200 {
      display: flex;
      width: initial;
      padding: 0 0.5rem;
    }
  }
}</style>
