<template>
  <div class="header">
    <div class="w1200">
      <div class="header_logo fl">
        <img class="logo click" :src=logoSvg @click="toHome">
      </div>
      <div class="menu fl">
        <MenuBar></MenuBar>
      </div>

      <div class="header_language fl">
        <div class="top-search fl" v-if="navActive !== 'home' && navActive !== '/'">
          <el-input 
              v-model="searchValue" class="fr" :placeholder="$t('public.searchTip')"
                @keyup.enter.native="clickSearch"
                @focus="focusSearch"
                @input="DynamicMonitoring"
                @blur="blurSearch">
            <i class="el-icon-search el-input__icon click" slot="suffix" @click="clickSearch"></i>
          </el-input>
          <SearchBar v-if="openSearchBar" :assetsList="assetsList" @clearModel="clearModel"/>
        </div>
        <!-- <div class="destroyed font14 fl pc" v-else>
          <i class="iconfont icon-jiandingxiaohui fred"></i>&nbsp;
          {{$t('home.home9')}}：{{destroyedAddressAmount}}
          <span class="fCN">&nbsp;NULS</span>
        </div> -->
        <div class="language font14 fr" @click="selectLanguage(lang,true)">{{lang === 'en' ? 'Zh':'En' }}</div>
      </div>
      <div class="mobile_ico fr">
        <i class="el-icon-menu" @click="showMobile = !showMobile"></i>
      </div>
    </div>

    <el-collapse-transition>
      <div class="mobile_header fr" v-show="showMobile">
        <div class="mobile_menu">
          <MenuBar></MenuBar>
          <div class="cb"></div>
          <div class="language font14 fr" @click="selectLanguage(lang,true)">{{lang === 'en' ? 'Zh':'En' }}</div>
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
  import {RUN_DEV, API_ROOT} from '@/config'
  import { getOriginChain } from '@/api/util.js'
  import SearchBar from './SearchBar.vue'

  export default {
    data() {
      return {
        openSearchBar: false,
        assetsList: [],
        logoSvg: logo,
        //默认选择菜单
        navActive: sessionStorage.hasOwnProperty('navActive') ? sessionStorage.getItem('navActive') : 'home',
        //统计信息
        count: {
          height: this.$store.state.height,//当前高度
        },
        //搜索框内容
        searchValue: '',
        //顶部搜索框加长
        topLong: false,
        //语言
        lang: 'en',
        //移动端显示
        showMobile: false,
        RUN_DEV: RUN_DEV,//运行模式
        destroyedAddressAmount: 0,//销毁地址金额
      };
    },
    components: {
      MenuBar,
      SearchBar
    },
    created() {
      let lang = navigator.language || navigator.userLanguage;//常规浏览器语言和IE浏览器
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
      //秒循环一次数据
      setInterval(() => {
        this.count.height = this.$store.state.height;
        this.navActive = this.$route.path;
      }, 100);
      this.getAddressInfo();
    },
    methods: {
      DynamicMonitoring(e){
        if(!e){
          this.assetsList = []
          this.openSearchBar = false
        }
      },
      /**
       * @disc: 获销毁数量
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
       * 顶部搜索框获取焦点事件
       **/
      focusSearch() {
        this.topLong = true;
      },

      /**
       * 顶部搜索框失却焦点事件
       **/
      blurSearch() {
        this.topLong = false;
      },
      clearModel(){
        this.assetsList = []
        this.openSearchBar = false
      },
      /**
       *  顶部搜索框
       **/
      clickSearch() {
        this.$post('/', 'search', [this.searchValue])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              if (response.result.type === 'block') {
                this.$router.push({
                  name: 'blockInfo',
                  query: {height: response.result.data.txList[0].height}
                })
              } else if (response.result.type === 'tx') {
                this.$router.push({
                  name: 'transactionInfo',
                  query: {hash: response.result.data.hash}
                })
              } else if (response.result.type === 'account') {
                this.$router.push({
                  name: 'addressInfo',
                  query: {address: response.result.data.address}
                })
              } else if (response.result.type === 'contract') {
                this.$router.push({
                  name: 'contractsInfo',
                  query: {contractAddress: response.result.data.contractAddress, tabName: 'first'}
                })
              }else if(response.result.type === 'asset'){
                const list = response.result.data
                  list.map(v => {
                    v.originChain = getOriginChain(v.sourceChainId)
                  })
                  this.assetsList = list
                  this.openSearchBar = true
              } else {
                this.$message({message: this.$t('codeInfo.codeInfo12'), type: 'error', duration: 1000});
              }
            } else {
              this.$message({message: this.$t('codeInfo.codeInfo12'), type: 'error', duration: 1000});
            }
            this.searchValue = '';
          }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * @disc: 隐藏导航
       * @params:
       * @date: 2020-07-22 10:38
       * @author: Wave
       */
      hideMobileMenu() {
        this.showMobile = false;
      },

      /**
       * 语言切换
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
       * logo 跳转首页
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
      /* navActive: function (val, oldVal) {
         console.log('new: %s, old: %s', val, oldVal);
       }*/
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
    .w1200 {
      .header_logo {
        width: 104px;
        height: 68px;
        display: flex;
        align-items: center;
        margin-right: 20px;
        .logo {
          width: 72px;
          height: 32px;
        }
      }
      .menu {
        height: 68px;
        width: 670px;
      }
      .header_language {
        width: 406px;
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
          .search-container{
            width: initial;
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
            input {
              width: 260px;
              transition: width 400ms ease, background 400ms ease, border-radius 400ms ease;
              height: 36px;
              line-height: 36px;
              border-radius: 10px;
              border: 1px solid #E9E9F8;
              background: #F6FAFF;
              font-size: 13px;
              &:focus {
                width: 250px;
                border-color: @Ncolour;
              }
            }
            .el-input__suffix{
              width: 36px;
              background: #00DB82;
              right: 0;
              .el-icon-search:before{
                color: #FFFFFF;
              }
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
    .mobile_header {

    }

    @media screen and (max-width: 1000px) {
      .w1200 {
        justify-content: space-between;
        .header_logo {
          width: 5.2rem;
          margin: 0 0.5rem;
          .logo {
            width: 5.2rem;
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
        .mobile_menu{
          .language{
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

  @media screen and (max-width: 1220px){
    .header{
      .w1200{
        display: flex;
        width: initial;
        padding: 0 0.5rem;
      }
    }
  }
</style>
