<template>
  <div class="contracts-info bg-gray">
    <div class="bg-white">
      <h4 class="font20 w1200">
        {{ contractsAddress }}
        <img class="cur" src="../../assets/img/Icon.png" alt="" :title="$t('public.copy')" @click="copy(contractsAddress)">
      </h4>
    </div>
    <div class="w1200 b-info">
      <h3 class="tabs_title tabs_header">{{ $t('public.basicInfo') }}</h3>
      <ul class="ul">
        <li class="tabs_infos fl">
          <p>{{$t('assets.Contract_address')}}
            <span class="click mobile_s"
              @click="toUrl('addressInfo', contractsInfo.creater)">{{ contractsInfo.contractAddress }}</span>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>
            {{ $t('public.status') }}
            <span >{{ $t('contractStatus.' + contractsInfo.status) }}</span>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>{{ $t('public.passCard') }}
            <span class="click" @click="toUrl('tokenInfo', contractsAddress)">{{ contractsInfo.tokenName }}</span>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>{{$t('public.abbreviate')}}
            <span>{{ contractsInfo.symbol }}</span>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>
            {{$t('home.home3')}}
            <span>{{ timesDecimals(contractsInfo.totalSupply, contractsInfo.decimals, 0) }}</span>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>
            {{$t('tokenInfo.tokenInfo0')}}
            <span>{{ contractsInfo.decimals }}</span>
          </p>
        </li>

        <li class="tabs_infos fl">
          <p>{{ $t('public.transactionNo') }}<span>{{ contractsInfo.transferCount }}</span></p>
        </li>
        <li class="tabs_infos fl">
          <p>{{$t('tokenInfo.tokenInfo1')}}<span>{{ contractsInfo.ownersCount }}</span></p>
        </li>
        <li class="tabs_infos fl">
          <p>{{ $t('public.createAddress') }}
            <span class="click mobile_s"
              @click="toUrl('addressInfo', contractsInfo.creater)">{{ contractsInfo.creater }}</span>
          </p>
        </li>
        <li class="tabs_infos fl">
          <p>{{ $t('public.createTime') }}<span>{{ contractsInfo.createTime }}</span></p>
        </li>
      </ul>
    </div>

    <div class="w1200 contracts-tab">
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="$t('public.transactionList')" name="first">
            <!-- <SelectBar v-model="contractsTypeRegion" :typeOptions="contractsStatusOptions" typeName="type"
                       @change="changeType"></SelectBar> -->
            <el-table :data="contractsTxList" style="width: 100%;margin-top: 14px">
              <el-table-column prop="height" :label="$t('public.height')" width="100" align="left">
                <template slot-scope="scope">
                  <span class="cursor-p click" @click="toUrl('blockInfo', scope.row.blockHeight)">{{ scope.row.blockHeight
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('public.contractMethod')" width="150" align="left">
                <template slot-scope="scope">
                  <span>{{ scope.row.contractMethod }}</span>
                </template>
              </el-table-column>
              <el-table-column label="TXID" min-width="280" align="left">
                <template slot-scope="scope">
                  <span class="cursor-p click" @click="toUrl('transactionInfo', scope.row.txHash)">{{ scope.row.txHashs
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" :label="$t('public.time')" width="180" align="left"></el-table-column>
              <el-table-column prop="type" :label="$t('public.type')" width="180" align="left">
                <template slot-scope="scope">{{ $t('type.' + scope.row.type) }}</template>
              </el-table-column>
              <el-table-column :label="$t('public.fee') + '(' + symbol + ')'" width="180" align="left">
                <template slot-scope="scope">{{ scope.row.fee.value }}</template>
              </el-table-column>
            </el-table>
            <paging :pager="pager" @change="pagesList" v-show="pager.total > pager.rows"></paging>

          </el-tab-pane>
          <el-tab-pane v-if="!isMobile" name="second"
            :disabled="contractsInfo.status === -1 || contractsInfo.status === 3">
            <span slot="label">
              {{$t('nav.contracts')}}
              <img v-if="contractsInfo.status == 2" src="./img/Certification.svg" class="authenticate" alt="" srcset=""> 
            </span>
            <div v-if="activeName === 'second'">
                <NewCodeInfo :certificationTime="certificationTime"></NewCodeInfo>
            </div>
          </el-tab-pane>
          
          <el-tab-pane :label="$t('transactionInfo.transactionInfo9')" name="three" v-if="false">
            <el-table :data="modeList" style="width: 100%" class="mt_20">
              <el-table-column label="" width="30"></el-table-column>
              <el-table-column prop="name" label="Method" width="280" align="left"></el-table-column>
              <el-table-column prop="height" label="Parameter" min-width="280" align="left">
                <template slot-scope="scope">
                  <span v-for="(item, index) in scope.row.params" :key="index">{{ item }}-</span>
                </template>
              </el-table-column>
              <el-table-column prop="returnType" label="Return Type" width="280" align="left"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import paging from '@/components/pagingBar';
import SelectBar from '@/components/SelectBar';
import CodeInfo from '@/views/contracts/CodeInfo';
import { getLocalTime, superLong, copys, divisionDecimals , timesDecimals } from '@/api/util.js'
import axios from 'axios'
import { CODE_URL } from '@/config'
import NewCodeInfo from './NewCodeInfo'

export default {
  data() {
    return {
      timesDecimals,
      symbol: sessionStorage.hasOwnProperty('symbol') ? sessionStorage.getItem('symbol') : 'NULS',//symbol
      decimals: sessionStorage.hasOwnProperty('decimals') ? Number(sessionStorage.getItem('decimals')) : 8,//decimals
      isMobile: false,
      activeName: this.$route.query.tabName,
      //合约地址
      contractsAddress: this.$route.query.contractAddress,
      //合约详情
      contractsInfo: [],
      //合约交易类型
      contractsStatusOptions: [
        { value: 0, label: '0' },
        { value: 15, label: '15' },
        { value: 16, label: '16' },
        { value: 17, label: '17' },
        { value: 18, label: '18' },
      ],
      contractsTypeRegion: 0,
      //合约交易列表
      contractsTxList: [],
      //方法列表
      modeList: [],
      //分页数据
      pager: {
        total: 0,
        page: 1,
        rows: 15,
      },
      certificationTime: "null",
      //地址定时器
      contractAddressInterval: null,
    }
  },
  components: {
    paging,
    CodeInfo,
    SelectBar,
    NewCodeInfo
  },
  watch: {
    contractsAddress: function () {
      // contractsAddress，当放生变化时，重新获取数据
      //console.log('new: %s, old: %s', val, oldVal);
      this.activeName = 'first';
      this.getContractsInfoByContractsAddress(this.contractsAddress);
      this.contractsTypeRegion = 0;
      this.pager = { total: 0, page: 1, rows: 15, };
      this.getConsensusTxList(this.pager.page, this.pager.rows, this.contractsTypeRegion, this.contractsAddress);
    }
  },
  created() {
    this.isMobile = /(iPhone|iOS|Android|Windows Phone)/i.test(navigator.userAgent);
    this.getContractsInfoByContractsAddress(this.contractsAddress);
    this.getConsensusTxList(this.pager.page, this.pager.rows, this.contractsTypeRegion, this.contractsAddress);
  },
  mounted() {
    //定时获取地址
    this.contractAddressInterval = setInterval(() => {
      this.contractsAddress = this.$route.query.contractAddress;
    }, 500)
  },
  beforeDestroy() {
    //离开界面清除定时器
    if (this.contractAddressInterval) {
      clearInterval(this.contractAddressInterval);
    }
  },
  methods: {

    /**
     * 获取子组件的状态值
     * @param contractStatus
     **/
    contractStatus(contractStatus) {
      this.contractsInfo.status = contractStatus
    },

    /**
     * 复制方法
     * @param sting
     **/
    copy(sting) {
      copys(sting);
      this.$message({ message: this.$t('public.copysuccess'), type: 'success', duration: 1000 });
    },

    /**
     * 根据合约地址获取合约详情
     * @param address
     */
    getContractsInfoByContractsAddress(address) {
      this.$post('/', 'getContract', [address])
        .then((response) => {
          //console.log(response);
          //console.log(response.result.status);
          if (response.hasOwnProperty("result")) {
            this.getContractAddressInfo(address);
            response.result.createTime = moment(getLocalTime(response.result.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
            if(response.result.owners != null){
              response.result["ownersCount"] = response.result.owners.length;
            }else{
              response.result["ownersCount"] = 0;
            }
            this.contractsInfo = response.result;
            this.modeList = response.result.methods;
          }
        }).catch((error) => {
          console.log(error)
        })
    },

    /**
     * 调用认证方法
     * @param contractsAddress
     **/
    async getContractAddressInfo(contractsAddress) {
      const params = {
        "jsonrpc": "2.0",
        "method": 'getContractAddressInfo',
        "params": [Number(sessionStorage.getItem('chainId')), contractsAddress],
        "id": Math.floor(Math.random() * 1000)
      };
      if (CODE_URL) {
        axios.post(CODE_URL, params)
          .then((response) => {
            if (response.data.hasOwnProperty("result")) {
              this.certificationTime = response.data.result.certificationTime;
              this.contractsInfo.status = response.data.result.status;
            }
          }).catch((error) => {
            console.log(error);
          })
      } else {
        this.contractsInfo.status = 0;
      }
    },

    /**
     *  根据数据类型排序
     *  @param type
     **/
    changeType(type) {
      this.contractsTypeRegion = parseInt(type);
      this.pagesList();
    },

    /**
     * 获取合约交易记录
     * @param page
     * @param rows
     * @param type
     * @param contractsAddress
     */
    async getConsensusTxList(page, rows, type, contractsAddress) {
      this.$post('/', 'getContractTxList', [page, rows, type, contractsAddress])
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            for (let item of response.result.list) {
              item.time = moment(getLocalTime(item.time * 1000)).format('YYYY-MM-DD HH:mm:ss');
              item.txHashs = superLong(item.txHash, 20);
              item.fee.value = divisionDecimals(item.fee.value, this.decimals);
            }
            this.contractsTxList = response.result.list;
            this.pager.total = response.result.totalCount;
          }
        }).catch((error) => {
          console.log(error)
        })
    },

    /**
     * 分页功能
     **/
    pagesList() {
      this.getConsensusTxList(this.pager.page, this.pager.rows, this.contractsTypeRegion, this.contractsAddress);
    },

    handleClick() {
      //console.log(tab, event);
    },

    /**
     * url 连接跳转
     * @param name
     * @param parmes
     */
    toUrl(name, parmes) {
      let newQuery = {};
      if (name === 'addressInfo') {
        newQuery = { address: parmes }
      } else if (name === 'transactionInfo') {
        newQuery = { hash: parmes }
      } else if (name === 'tokenInfo') {
        newQuery = { contractAddress: parmes }
      } else {
        newQuery = { height: parmes }
      }
      this.$router.push({
        name: name,
        query: newQuery
      })
    },

  },
}
</script>

<style lang="less">
.contracts-info {

  //min-height: 950px;
  .bg-white {
    background: initial;

    h4 {
      color: #000000;
      font-weight: 600;
      padding: 24px 0;

      img {
        width: 14px;
        height: 14px;
      }
    }
  }

  .b-info {
    h3 {
      margin: 0;
      background: #FFFFFF;
      color: #000000;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }

    .ul {
      min-height: 214px;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      li {
        background: #FFFFFF;

        p {
          border-bottom: 1px solid #E9E9F8;
          position: relative;
          z-index: 999;
        }

        @media screen and (max-width: 1000px) {
          .mobile_s {
            font-size: 0.8rem;
          }
        }
      }
    }
  }

  .contracts-tab {
    margin-top: 24px;
    .el-col{
      margin-bottom: 100px;
    }
    .el-tabs {
      padding: 16px 24px  24px;
      border-radius: 12px;
      background: #FFFFFF;
      .authenticate{
        position: relative;
        top: -6px;
      }
      .el-tabs__header {
        .el-tabs__nav-wrap {
          .el-tabs__item {
            color: #000000;
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

    margin: 1rem auto 0;
  }

  .el-tabs__content {
    margin-bottom: 0;
  }
}

@media (max-width:1220px){
  .w1200{
    width: initial;
  }
  .contracts-info{
    padding: 0 .5rem;

    @media (max-width: 600px) {
      .bg-white h4{
        font-size: 14px;
      }
    }
    .b-info .ul .tabs_infos, .info_tabs .ul .tabs_infos{
      width: 50%;
    }
  }
}

@media(max-width: 600px){
  .b-info .ul .tabs_infos p, .info_tabs .ul .tabs_infos p{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    white-space: nowrap;
  }
}

</style>
