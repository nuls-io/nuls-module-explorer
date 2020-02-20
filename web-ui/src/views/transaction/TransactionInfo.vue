<template>
  <div class="t_info bg-gray" v-loading="txInfoLoading">
    <div class="bg-white">
      <h4 class="title font20 w1200">
        <span class="pc">{{txhash}}</span>
        <span class="mobile fl">{{txhashs}}</span>
        <i class="iconfont icon-copy_icon click" :title="$t('public.copy')" @click="copy(txhash)"></i>
      </h4>
    </div>
    <div class="w1200 info_tabs">
      <h3 class="tabs_title tabs_header capitalize">{{$t('public.basicInfo')}}</h3>
      <ul class="ul" ref="menu">
        <li class="tabs_infos fl capitalize">
          <p>{{$t('public.amount')}}<span>{{txInfo.value}}</span></p>
        </li>
        <li class="tabs_infos fl capitalize"><p>{{$t('public.type')}}<span>{{$t('type.'+txInfo.type)}}</span></p></li>
        <li class="tabs_infos fl capitalize">
          <p>
            {{$t('public.fee')}}
            <span>{{txInfo.fees}}<span class="fCN">&nbsp;{{symbol}}</span></span>
            <!--<span v-if="contractInfo.length !== 0">
            {{txInfo.fees}}
             <el-tooltip :content="contractInfo.totalFee+'('+$t('transactionInfo.transactionInfo0')+')'+'='
                         +contractInfo.txSizeFee+'('+$t('transactionInfo.transactionInfo1')+')'+'+'
                         +contractInfo.actualContractFee+'('+$t('type.16')+')'+'+'
                         +contractInfo.refundFee+'('+$t('transactionInfo.transactionInfo2')+')'"
                         class="item" effect="dark" placement="top">
             <i class="el-icon-info gray"></i>
            </el-tooltip>
          </span>-->
          </p>
        </li>
        <li class="tabs_infos fl capitalize"><p>{{$t('public.size')}}<span>{{txInfo.size}}</span></p></li>
        <li class="tabs_infos fl capitalize"><p>{{$t('public.time')}}<span>{{txInfo.time}}</span></p></li>
        <li class="tabs_infos fl capitalize">
          <p>{{$t('public.input')}}/{{$t('public.output')}}<span>{{inputNumber}}/{{outNumber}}</span></p>
        </li>
        <li class="tabs_infos fl capitalize">
          <p>
            {{$t('transactionInfo.transactionInfo3')}}
            <span class="click" @click="viewDialog = true" v-if="txInfo.txDataHex">View</span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize">
          <p>
            {{$t('public.height')}}
            <span class="click" @click="toUrl('blockInfo',txInfo.height)">{{txInfo.height}}</span>
          </p>
        </li>

        <li class="tabs_infos fl" v-if="txInfo.type ===3">
          <p>{{$t('public.alias')}}<span>{{txInfo.txData.alias}}</span></p>
        </li>

        <!--加入、退出节点-->
        <li class="tabs_infos fl capitalize" v-if="txInfo.type ===5 || txInfo.type ===6">
          <p>{{$t('transactionInfo.transactionInfo4')}}
            <span class="click uppercase" @click="toUrl('consensusInfo',txInfo.txData.txHash)">
              {{ txInfo.txData.agentAlias ? txInfo.txData.agentAlias : txInfo.txData.agentId}}
            </span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize"
            v-if="txInfo.type ===5 || txInfo.type ===6 ||txInfo.type ===4 || txInfo.type ===9">
          <p>{{$t('public.proportion')}}<span>{{txInfo.txData.commissionRate}}%</span></p>
        </li>
        <li class="tabs_infos fl capitalize" v-if="txInfo.type ===5 || txInfo.type ===6">
          <p>{{$t('public.creditValue')}}<span>{{txInfo.txData.creditValue}}</span></p>
        </li>

        <!--创建、注销节点-->
        <li class="tabs_infos fl capitalize" v-if="txInfo.type ===4 || txInfo.type ===9">
          <p>{{$t('public.createAddress')}}
            <span class="click"
                  @click="toUrl('addressInfo',txInfo.txData.agentAddress)">{{txInfo.txData.agentAddress}}</span>
          </p>
        </li>
        <li class="tabs_infos fl" v-if="txInfo.type ===4 || txInfo.type ===9">
          <p>{{$t('public.outAddress')}}
            <span class="click" @click="toUrl('addressInfo',txInfo.txData.rewardAddress)">{{txInfo.txData.rewardAddress}}</span>
          </p>
        </li>
        <li class="tabs_infos fl" v-if="txInfo.type ===4 || txInfo.type ===9">
          <p>{{$t('public.packAddress')}}
            <span class="click" @click="toUrl('addressInfo',txInfo.txData.packingAddress)">{{txInfo.txData.packingAddress}}</span>
          </p>
        </li>

        <!--红黄牌-->
        <li class="tabs_infos fl" v-if="txInfo.type ===7 || txInfo.type ===8">
          <p class="redcal">{{$t('transactionInfo.transactionInfo5')}}
            <span class="click" v-show="txInfo.type === 7" v-for="item in txInfo.txDataList" :key="item.address"
                  @click="toUrl('addressInfo',item.address)">{{item.address}}</span>
            <span class="click" v-show="txInfo.type === 8" @click="toUrl('addressInfo',txInfo.txData.address)">{{txInfo.txData.address}}</span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize" v-if="txInfo.type ===7 || txInfo.type ===8">
          <p>{{$t('consensus.consensus3')}}
            <span>
              {{$t('transactionInfo.transactionInfo6')}}
              <label class="click" @click="toUrl('rotationInfo',txInfo.roundIndex)">{{txInfo.roundIndex}}</label>
              {{$t('transactionInfo.transactionInfo7')}} {{$t('public.number')}} {{txInfo.index}}
            </span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize" v-if="txInfo.type ===7 || txInfo.type ===8">
          <p>{{$t('public.reason')}}<span>{{txInfo.reason}}</span></p>
        </li>

        <!--创建、调用合约-->
        <li class="tabs_infos fl"
            v-if="txInfo.type ===15 || txInfo.type ===16|| txInfo.type ===17|| txInfo.type ===18">
          <p>{{$t('public.contractAddress')}}
            <span class="click" @click="toUrl('contractsInfo',contractInfo.contractAddress)">
              {{contractInfo.contractAddress}}
            </span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize"
            v-if="txInfo.type ===15 || txInfo.type ===16|| txInfo.type ===17|| txInfo.type ===18">
          <p>GasLimit
            <span>{{contractInfo.gasLimit}}</span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize"
            v-if="txInfo.type ===15 || txInfo.type ===16|| txInfo.type ===17|| txInfo.type ===18">
          <p>{{$t('transactionInfo.transactionInfo8')}}
            <span>{{contractInfo.price}}</span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize"
            v-if="txInfo.type ===15 || txInfo.type ===16|| txInfo.type ===17|| txInfo.type ===18">
          <p>GasUsed
            <span>{{contractInfo.gasUsed}}</span>
          </p>
        </li>

        <li class="tabs_infos fl capitalize"
            v-if="txInfo.type ===15 || txInfo.type ===16|| txInfo.type ===17|| txInfo.type ===18">
          <p>{{$t('public.enforcement')}}
            <span>{{contractInfo.success ? $t('public.success') : $t('public.fail')}}</span>
            <font v-show="!contractInfo.success">({{contractInfo.errorMessage}})</font>
          </p>
        </li>
        <!--调用合约-->
        <li class="tabs_infos fl capitalize" v-if="txInfo.type ===16">
          <p>{{$t('transactionInfo.transactionInfo9')}}
            <span>
              {{txInfo.txData.methodName}}
               <el-tooltip class="item" effect="dark" :content="txInfo.txData.methodDesc" placement="top">
                 <i class="el-icon-info gray"></i>
               </el-tooltip>
            </span>
          </p>
        </li>
        <li class="tabs_infos fl tabs_infos_long">
          <p v-if="txInfo.remark && txInfo.remark.length > 50">{{$t('public.remarks')}}
            <el-tooltip class="calc fr" effect="light" :content="txInfo.remark" placement="top">
              <span class="scroll overflow">{{txInfo.remark}}</span>
            </el-tooltip>
          </p>
          <p v-else>{{$t('public.remarks')}}
            <span class="scroll overflow">{{txInfo.remark}}</span>
          </p>
        </li>
        <p class="cb"></p>
      </ul>
    </div>

    <div class="w1200 token_list bg-white" v-if="nulsTransfers.length !==0">
      <h3 class="tabs_title tabs_header capitalize">{{$t('transactionInfo.transactionInfo12')}}</h3>
      <ul class="inputs fl scroll">
        <li class="font14" v-for="item of nulsTransfers" :key="item.from">
          <span class="click" @click="toUrl('addressInfo',item.from)">{{item.from}}</span>
          <label class="fr">{{item.value}}<span> {{item.symbol}}</span></label>
        </li>
      </ul>
      <div class="arrow fl">
        <font v-for="item of nulsTransfers" class="click" @click="toUrl('transactionInfo',item.txHash)"
              :key="item.txHash">
          {{item.txHashs}}
        </font>
      </div>
      <ul class="outputs fr scroll">
        <li class="font14" v-for="item of nulsTransfers" :key="item.to">
          <p v-for="k of item.outputs" :key="k.to">
            <span class="click" @click="toUrl('addressInfo',k.to)">{{k.to}}</span>
            <label class="fr">{{k.value}}<span> {{item.symbol}}</span></label>
          </p>
        </li>
      </ul>
    </div>

    <div class="w1200 token_list bg-white" v-if="tokenTransfers.length !==0">
      <h3 class="tabs_title tabs_header capitalize">{{$t('transactionInfo.transactionInfo11')}}</h3>
      <ul class="inputs fl scroll" style="width: 500px">
        <li class="font14" v-for="item in tokenTransfers" :key="item.keys">
          <span class="click" @click="toUrl('addressInfo',item.fromAddress)">{{item.fromAddress}}</span>
        </li>
      </ul>
      <div class="arrow fl">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <ul class="outputs fr scroll" style="width: 600px">
        <li class="font14" v-for="item in tokenTransfers" :key="item.keys" style="width: 550px">
          <span class="click" @click="toUrl('addressInfo',item.toAddress)">{{item.toAddress}}</span>
          <label class="fr" style="width: 200px">{{item.value}}<span> {{item.symbol}}</span></label>
        </li>
      </ul>
    </div>

    <div class="w1200 t_basics bg-white">
      <h3 class="tabs_title tabs_header capitalize"><span>{{$t('public.input')}}</span>{{$t('public.output')}}</h3>
      <ul class="inputs fl scroll">
        <li class="font14" v-for="item in txInfo.coinFroms" :key="item.key">
          <span class="click" @click="toUrl('addressInfo',item.address)">{{item.address}}</span>
          <label class="fr">{{item.value}}<span class="fCN"> {{item.symbol}}</span></label>
        </li>
      </ul>
      <div class="arrow fl">
        <i class="el-icon-d-arrow-right"></i>
      </div>
      <ul class="outputs fr scroll">
        <li class="font14" v-for="item in txInfo.coinTos" :key="item.key">
          <span class="click" @click="toUrl('addressInfo',item.address)">{{item.address}}</span>
          <label class="fr">
            {{item.value}}
            <span class="fCN"> {{item.symbol}}
              <i class="iconfont yellow font12" :title="item.isShowInfo"
                 :class="item.lockTime < 0 ? 'icon-lock_icon':''"></i>
            </span>
          </label>
        </li>
      </ul>
    </div>

    <div class="t_mobile">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('public.input')" name="first">
          <div>
            <ul class="inputs scroll">
              <li class="font14" v-for="item in txInfo.froms" :key="item.key">
                <span class="click" @click="toUrl('addressInfo',item.address)">{{item.addresss}}</span>
                <label class="fr">{{item.value}}<span class="fCN"> {{item.symbol}}</span></label>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('public.output')" name="second">
          <div>
            <ul class="outputs scroll">
              <li class="font14" v-for="item in txInfo.tos" :key="item.key">
                <span class="click" @click="toUrl('addressInfo',item.address)">{{item.addresss}}</span>
                <label class="fr">
                  {{item.value}}
                  <span class="fCN"> {{item.symbol}}<i class="iconfont yellow font12" :title="item.isShowInfo"
                                                       :class="item.lockTime > 0 ? 'icon-lock_icon':''"></i></span>
                </label>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title="" :visible.sync="viewDialog" class="dialog_tran">
      <div class="dialog-title">Data<i class="iconfont icon-copy_icon click fr" @click="copy(txInfo.txDataHex)"
                                       v-show="!isContracts"></i>
      </div>
      <div class="dialog-info scroll">
        <div v-show="!isContracts">{{txInfo.txDataHex}}</div>
        <div v-show="isContracts">
          <!--<p v-html="$xss(txInfo.txData)"></p>-->
          <json-viewer
                  :value="txInfo.txData"
                  :expand-depth="5"
                  copyable
                  boxed
          ></json-viewer>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import moment from 'moment'
  import {getLocalTime, copys, timesDecimals, superLong} from '@/api/util.js'


  export default {
    data() {
      return {
        txhash: this.$route.query.hash,
        txhashs: superLong(this.$route.query.hash, 20),
        decimals: sessionStorage.hasOwnProperty('decimals') ? Number(sessionStorage.getItem('decimals')) : 8,//decimals
        txInfo: [],
        //交易详情加载动画
        txInfoLoading: true,
        activeName: 'second',
        inputNumber: 0,
        outNumber: 0,
        viewDialog: false, //业务数据显示
        liShow: false,//显示空白li
        contractInfo: [],//合约信息
        tokenTransfers: [],//token转账信息
        //txhash定时器
        txhashInterval: null,
        isContracts: false,//是否为合约交易
        nulsTransfers: [],//合约转出NULS
        symbol: sessionStorage.hasOwnProperty('symbol') ? sessionStorage.getItem('symbol') : 'NULS',//默认symbol
      };
    },
    created() {
      this.getTxInfoByHash(this.txhash);
    },
    mounted() {
      setTimeout(() => {
        this.liShow = (this.$refs.menu.children.length - 2) % 2 === 1
      }, 100);

      //定时获取地址
      this.txhashInterval = setInterval(() => {
        this.txhash = this.$route.query.hash;
      }, 500)
    },
    beforeDestroy() {
      //离开界面清除定时器
      if (this.txhashInterval) {
        clearInterval(this.txhashInterval);
      }
    },
    methods: {

      /**
       * 根据hash获取交易详情
       */
      async getTxInfoByHash(hash) {
        this.nulsTransfers = [];
        this.contractInfo = [];
        this.tokenTransfers = [];
        this.$post('/', 'getTx', [hash])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              response.result.time = moment(getLocalTime(response.result.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              response.result.fees = timesDecimals(response.result.fee.value, 8);
              response.result.value = timesDecimals(response.result.value, 8);

              //黄牌
              if (response.result.type === 7) {
                response.result.roundIndex = response.result.txDataList[0].roundIndex;
                response.result.index = response.result.txDataList[0].index;
                response.result.reason = response.result.txDataList[0].reason;
                response.result.txData = {address: ''};
              }
              //红牌
              if (response.result.type === 8) {
                response.result.roundIndex = response.result.txData.roundIndex;
                response.result.index = response.result.txData.index;
                response.result.reason = response.result.txData.reason;
                //response.result.txDataList ={};
              }

              //创建、调用合约
              if (response.result.type === 15 || response.result.type === 16 || response.result.type === 17 || response.result.type === 18) {
                this.isContracts = true;
                if (response.result.txData.hasOwnProperty('resultInfo')) {
                  response.result.txData.resultInfo.totalFee = timesDecimals(response.result.txData.resultInfo.totalFee, 8);
                  response.result.txData.resultInfo.txSizeFee = timesDecimals(response.result.txData.resultInfo.txSizeFee, 8);
                  response.result.txData.resultInfo.actualContractFee = timesDecimals(response.result.txData.resultInfo.actualContractFee, 8);
                  response.result.txData.resultInfo.refundFee = timesDecimals(response.result.txData.resultInfo.refundFee, 8);
                  this.contractInfo = response.result.txData.resultInfo;
                  if (response.result.txData.resultInfo.tokenTransfers) {
                    let newTokenTransfers = response.result.txData.resultInfo.tokenTransfers;
                    for (let item in  newTokenTransfers) {
                      newTokenTransfers[item].keys = Number(item);
                      newTokenTransfers[item].value = timesDecimals(newTokenTransfers[item].value, newTokenTransfers[item].decimals);
                    }
                    this.tokenTransfers = newTokenTransfers
                  }
                }
                //console.log(this.tokenTransfers);
              }

              if (response.result.type === 16) {
                if (response.result.txData.resultInfo.nulsTransfers) {
                  for (let item of response.result.txData.resultInfo.nulsTransfers) {
                    item.txHashs = superLong(item.txHash, 6);
                    item.value = timesDecimals(item.value);
                    for (let k of item.outputs) {
                      k.value = timesDecimals(k.value);
                    }
                  }
                  this.nulsTransfers = response.result.txData.resultInfo.nulsTransfers;
                  //console.log(this.nulsTransfers);
                }
              }

              if (response.result.type === 18) {
                this.contractInfo = {success: true}
              }

              if (response.result.coinFroms) {
                for (let item of response.result.coinFroms) {
                  item.value = timesDecimals(item.amount, 8);
                  item.addresss = superLong(item.address, 10);
                }
                this.inputNumber = response.result.coinFroms.length;
              }

              if (response.result.coinTos) {
                for (let item of response.result.coinTos) {
                  item.value = timesDecimals(item.amount, 8);
                  item.addresss = superLong(item.address, 10);
                  //根据lockTime字段长度判断是高度锁定还时间锁定
                  if (item.lockTime === 0) {
                    item.isShowInfo = ''
                  } else if (item.lockTime > 1000000000) {
                    item.isShowInfo = this.$t('transactionInfo.transactionInfo10') + ":" + moment(getLocalTime(item.lockTime)).format('YYYY-MM-DD HH:mm:ss');
                  } else if (item.lockTime === -1) {
                    item.isShowInfo = this.$t('public.consensusLockings');
                  } else {
                    const heightDiffer = (item.lockTime - this.$store.state.height) * 10;
                    const expectTime = moment(moment().add(heightDiffer, 'seconds')).format('YYYY-MM-DD HH:mm:ss');
                    item.isShowInfo = this.$t('transactionInfo.transactionInfo10') + ":" + expectTime;
                  }
                }
                this.outNumber = response.result.coinTos.length;
              }

              this.txInfo = response.result;
              if (this.txInfo.txData && this.txInfo.txData.args) {
                this.txInfo.txData.args = this.txInfo.txData.args.replace(/<[^<>]+>/g, '');
              }
              this.txInfoLoading = false;
            }
          })
      },

      /**
       * 复制方法
       * @param sting
       **/
      copy(sting) {
        copys(sting);
        this.$message({message: this.$t('public.copysuccess'), type: 'success', duration: 1000});
      },

      /**
       * url 连接跳转
       * @param name
       * @param params
       */
      toUrl(name, params) {
        let newQuery = {};
        if (name === "consensusInfo") {
          newQuery = {hash: params};
        } else if (name === "rotationInfo") {
          newQuery = {rotation: params};
        } else if (name === 'blockInfo') {
          newQuery = {height: params}
        } else if (name === 'contractsInfo') {
          newQuery = {contractAddress: params, tabName: 'first'}
        } else if (name === 'transactionInfo') {
          newQuery = {hash: params}
        } else {
          newQuery = {address: params};
        }
        this.$router.push({
          name: name,
          query: newQuery
        })
      }
    },
    watch: {
      txhash: function () {
        // txhash，当放生变化时，重新获取数据
        //console.log('new: %s, old: %s', val, oldVal);
        this.getTxInfoByHash(this.txhash);
      }
    }
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .t_info {
    min-height: 800px;
    .bg-white {
      .title {
        margin: 40px auto 0;
        padding-bottom: 64px;
        .click {
          margin-left: 20px;
        }
        @media screen and (max-width: 1000px) {
          margin: 1rem auto 0;
          padding: 0 0 1.8rem 0.5rem;
          font-size: 0.8rem;
          .click {
            margin-left: 1rem;
          }
        }
      }
    }
    .info_tabs {
      ul {
        li {
          &:nth-last-child(3) {
            p {
              border-bottom: 0;
            }
          }
        }
      }
    }

    .t_basics, .token_list {
      //background-color: @bg-white;
      margin: 30px auto 100px;
      min-height: 275px;
      border: @BD1;
      @media screen and (max-width: 1000px) {
        display: none;
      }
      h3 {
        padding: 0 0 0 30px;
        border-bottom: @BD1;
        span {
          width: 58%;
          display: block;
          float: left;
        }
      }
      .inputs, .outputs {
        width: 550px;
        max-height: 120px;
        margin: 10px 0 0 0;
        overflow-x: auto;
        li {
          margin: 0 20px 0;
          line-height: 30px;
          label {
            width: 160px;
            text-align: right;
            .el-icon-goods {
              display: initial !important;
            }
          }
        }
      }
      .arrow {
        width: 50px;
        text-align: center;
        color: @Ncolour;
        line-height: 40px;
      }
    }

    .redcal {
      height: 40px;
      overflow-x: auto;
    }

    .t_mobile {
      display: none;
      @media screen and (max-width: 1000px) {
        display: block;
        width: 95%;
        margin: 1rem auto 0;
      }
    }

    .token_list {
      min-height: 180px;
      margin: 30px auto 0;
    }

    .dialog_tran {
      .el-dialog {
        width: 50rem;
        @media screen and (max-width: 1000px) {
          width: 70%;
        }
        .el-dialog__header {

          .el-dialog__title {
            line-height: 0;
          }
        }
        .el-dialog__body {
          background-color: @Bcolour2;
          padding: 0 0 30px 0;
          .dialog-title {
            height: 50px;
            line-height: 50px;
            padding: 0 30px;
            font-size: 20px;
            color: @Mcolour;
            border-bottom: @BD1;
          }
          .dialog-info {
            background-color: @Bcolour1;
            margin: 30px 30px 0 30px;
            font-size: 14px;
            line-height: 20px;
            color: @Mcolour;
            max-height: 320px;
            overflow-x: auto;
          }
        }
      }

    }
  }
</style>
