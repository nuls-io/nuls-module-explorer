<template>
  <div class="t_info bg-gray" v-loading="txInfoLoading">

    <div class="bg-white new-shite">
      <h4 class="font20 w1200 bg-address">
        <span class="pc">{{ txhash }}</span>
        <span class="mobile fl">{{ txhashs }}</span>
        <img class="cur" src="../../assets/img/Icon.png" alt="" :title="$t('public.copy')" @click="copy(txhash)" />
      </h4>
    </div>
    <div class="w1200 info_tabs">
      <h3 class="tabs_title tabs_header capitalize">{{ $t('public.basicInfo') }}</h3>
      <ul class="ul" ref="menu">
        <li class="tabs_infos fl capitalize">
          <p>{{ $t('public.amount') }}<span>{{ txInfo.value }}</span></p>
        </li>
        <li class="tabs_infos fl capitalize">
          <p>{{ $t('public.type') }}<span>{{ $t('type.' + txInfo.type) }}</span></p>
        </li>
        <li class="tabs_infos fl capitalize">
          <p>
            {{ $t('public.fee') }}
            <span @click="jionOpen(txInfo)">{{ txInfo.fees }}<span class="fCN click">&nbsp;{{ symbol }}</span></span>
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
        <li class="tabs_infos fl capitalize">
          <p>{{ $t('public.size') }}<span>{{ txInfo.size }}</span></p>
        </li>
        <li class="tabs_infos fl capitalize">
          <p>{{ $t('public.time') }}<span>{{ txInfo.time }}</span></p>
        </li>
        <li class="tabs_infos fl capitalize">
          <p>{{ $t('public.input') }}/{{ $t('public.output') }}<span>{{ inputNumber }}/{{ outNumber }}</span></p>
        </li>
        <li class="tabs_infos fl capitalize">
          <p>
            {{ $t('transactionInfo.transactionInfo3') }}
            <span class="click" @click="viewDialog = true" v-if="txInfo.txDataHex">View</span>
            <span v-else>-</span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize">
          <p class="border-botton-line">
            {{ $t('public.height') }}
            <span class="click" @click="toUrl('blockInfo', txInfo.height)">{{ txInfo.height }}</span>
          </p>
        </li>

        <li class="tabs_infos fl" v-if="txInfo.type === 3">
          <p>{{ $t('public.alias') }}<span>{{ txInfo.txData.alias }}</span></p>
        </li>

        <!--加入、退出节点-->
        <li class="tabs_infos fl capitalize" v-if="txInfo.type === 5 || txInfo.type === 6">
          <p>{{ $t('transactionInfo.transactionInfo4') }}
            <span class="click uppercase" @click="toUrl('consensusInfo', txInfo.txData.txHash)">
              {{ txInfo.txData.agentAlias ? txInfo.txData.agentAlias : txInfo.txData.agentId }}
            </span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize"
          v-if="txInfo.type === 5 || txInfo.type === 6 || txInfo.type === 4 || txInfo.type === 9">
          <p>{{ $t('public.proportion') }}<span>{{ txInfo.txData.commissionRate }}%</span></p>
        </li>
        <li class="tabs_infos fl capitalize" v-if="txInfo.type === 5 || txInfo.type === 6">
          <p class="add-class">{{ $t('public.creditValue') }}<span>{{ txInfo.txData.creditValue }}</span></p>
        </li>

        <!--创建、注销节点-->
        <li class="tabs_infos fl capitalize" v-if="txInfo.type === 4 || txInfo.type === 9">
          <p>{{ $t('public.createAddress') }}
            <span class="click" @click="toUrl('addressInfo', txInfo.txData.agentAddress)">{{ txInfo.txData.agentAddress
            }}</span>
          </p>
        </li>
        <li class="tabs_infos fl" v-if="txInfo.type === 4 || txInfo.type === 9">
          <p>{{ $t('public.outAddress') }}
            <span class="click" @click="toUrl('addressInfo', txInfo.txData.rewardAddress)">{{ txInfo.txData.rewardAddress
            }}</span>
          </p>
        </li>
        <li class="tabs_infos fl xizeng" v-if="txInfo.type === 4 || txInfo.type === 9">
          <p>{{ $t('public.packAddress') }}
            <span class="click" @click="toUrl('addressInfo', txInfo.txData.packingAddress)">{{
              txInfo.txData.packingAddress }}</span>
          </p>
        </li>

        <!--红黄牌-->
        <li class="tabs_infos fl" v-if="txInfo.type === 7 || txInfo.type === 8">
          <p class="redcal">{{ $t('transactionInfo.transactionInfo5') }}
            <span class="click" v-show="txInfo.type === 7" v-for="item in txInfo.txDataList" :key="item.address"
              @click="toUrl('addressInfo', item.address)">{{ item.address }}</span>
            <span class="click" v-show="txInfo.type === 8" @click="toUrl('addressInfo', txInfo.txData.address)">{{
              txInfo.txData.address }}</span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize" v-if="txInfo.type === 7 || txInfo.type === 8">
          <p>{{ $t('consensus.consensus3') }}
            <span>
              {{ $t('transactionInfo.transactionInfo6') }}
              <label class="click" @click="toUrl('rotationInfo', txInfo.roundIndex)">{{ txInfo.roundIndex }}</label>
              {{ $t('transactionInfo.transactionInfo7') }} {{ $t('public.number') }} {{ txInfo.index }}
            </span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize" v-if="txInfo.type === 7 || txInfo.type === 8">
          <p>{{ $t('public.reason') }}<span>{{ txInfo.reason }}</span></p>
        </li>

        <!--创建、调用合约-->
        <li class="tabs_infos fl"
          v-if="txInfo.type === 15 || txInfo.type === 16 || txInfo.type === 17 || txInfo.type === 18">
          <p>{{ $t('public.contractAddress') }}
            <span class="click" @click="toUrl('contractsInfo', contractInfo.contractAddress)">
              {{ contractInfo.contractAddress }}
            </span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize"
          v-if="txInfo.type === 15 || txInfo.type === 16 || txInfo.type === 17 || txInfo.type === 18">
          <p>GasLimit
            <span>{{ contractInfo.gasLimit }}</span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize"
          v-if="txInfo.type === 15 || txInfo.type === 16 || txInfo.type === 17 || txInfo.type === 18">
          <p>{{ $t('transactionInfo.transactionInfo8') }}
            <span>{{ contractInfo.price }}</span>
          </p>
        </li>
        <li class="tabs_infos fl capitalize"
          v-if="txInfo.type === 15 || txInfo.type === 16 || txInfo.type === 17 || txInfo.type === 18">
          <p>GasUsed
            <span>{{ contractInfo.gasUsed }}</span>
          </p>
        </li>

        <li class="tabs_infos fl capitalize"
          v-if="txInfo.type === 15 || txInfo.type === 16 || txInfo.type === 17 || txInfo.type === 18">
          <p>{{ $t('public.enforcement') }}
            <span>{{ contractInfo.success ? $t('public.success') : $t('public.fail') }}</span>
            <font v-show="!contractInfo.success">({{ contractInfo.errorMessage }})</font>
          </p>
        </li>
        <!--调用合约-->
        <li class="tabs_infos fl" v-if="txInfo.type === 16">
          <p>{{ $t('transactionInfo.transactionInfo9') }}
            <span>
              {{ txInfo.txData.methodName }}
              <el-tooltip class="item" effect="dark" :content="txInfo.txData.methodDesc" placement="top">
                <i class="el-icon-info gray"></i>
              </el-tooltip>
            </span>
          </p>
        </li>
        <li class="tabs_infos fl tabs_infos_long">
          <p v-if="txInfo.remark && txInfo.remark.length > 50">{{ $t('public.remarks') }}
            <el-tooltip class="calc fr" effect="light" :content="txInfo.remark" placement="top">
              <span class="scroll overflow">{{ txInfo.remark }}</span>
            </el-tooltip>
          </p>
          <p v-else class="row-betw">
            {{ $t('public.remarks') }}
            <span class="scroll overflow">{{ txInfo.remark || '-' }}</span>
          </p>
        </li>
        <p class="cb"></p>
      </ul>
    </div>

    <!-- nuls 转账 -->
    <div class="w1200 token_list bg-white merge" v-if="nulsTransfers.length > 0">
      <el-table :data="nulsTransfers" style="width: 100%" :cell-class-name="cellClassName" :empty-text="$t('assets.nodata')">
        <el-table-column min-width="15"></el-table-column>
        <el-table-column :label="$t('public.input')" width="180">
          <template slot-scope="scope">
            <div class="sending-address">
              <p class="address-box click" @click="toUrl('addressInfo', scope.row.from)">{{ UnpAredd(scope.row.from) }}
              </p>
              <el-tooltip :content="scope.row.from" placement="bottom" effect="light">
                <img class="cur Icontits" src="./img/Icontits.svg" alt="">
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('assets.Asset_type')">
          <template slot-scope="scope">
            <p class="leixin-let">{{$t('transactionInfo.transactionInfo12')}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="value" :label="$t('tokenInfo.tokenInfo5')"></el-table-column>
        <el-table-column label="Symbol">
          <template slot-scope="scope">
            <div class="ding-box">
              NULS
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <img src="./img/ssdr145.png" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="address" :label="$t('public.output')" width="180">
          <template slot-scope="scope">
            <div class="sending-address" v-for="(item, index) in scope.row.outputs" :key="index">
              <p class="address-box click" @click="toUrl('addressInfo', item.to)">{{ UnpAredd(item.to) }}</p>
              <el-tooltip :content="item.to" placement="bottom" effect="light">
                <img class="cur Icontits" src="./img/Icontits.svg" alt="">
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tokenInfo.tokenInfo5')">
          <template slot-scope="scope">
            <div class="ding-box" v-for="(item, index) in scope.row.outputs" :key="index">
              {{ item.value }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Symbol">
          <template slot-scope="scope">
            <div class="ding-box" v-for="(item, index) in scope.row.outputs" :key="index">
              {{ item.symbol || 'NULS' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Locked">
          <template slot-scope="scope">
            <div class="ding-box" v-for="(item, index) in scope.row.outputs" :key="index">
              {{ item.lockTime }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!-- 代币转账 -->
    <div class="w1200 token_list bg-white merge" v-if="tokenTransfers.length > 0">
      <el-table :data="tokenTransfers" style="width: 100%" :empty-text="$t('assets.nodata')">
        <el-table-column min-width="15"></el-table-column>
        <el-table-column :label="$t('public.input')" width="180">
          <template slot-scope="scope">
            <div class="sending-address">
              <p class="address-box click" @click="toUrl('addressInfo', scope.row.fromAddress)">{{ UnpAredd(scope.row.fromAddress) }}</p>
              <el-tooltip v-if="scope.row.fromAddress" :content="scope.row.fromAddress" placement="bottom" effect="light">
                <img class="cur Icontits" src="./img/Icontits.svg" alt="">
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('assets.Asset_type')">
          <template slot-scope="scope">
            <p class="leixin-let">{{t('transactionInfo.transactionInfo11')}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="value" :label="$t('tokenInfo.tokenInfo5')" min-width="100"></el-table-column>
        <el-table-column prop="symbol" label="Symbol"></el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <img src="./img/ssdr145.png" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="address" :label="$t('public.output')" width="180">
          <template slot-scope="scope">
            <div class="sending-address">
              <p class="address-box click" @click="toUrl('addressInfo', scope.row.toAddress)">{{ UnpAredd(scope.row.toAddress) }}</p>
              <el-tooltip :content="scope.row.toAddress" placement="bottom" effect="light">
                <img class="cur Icontits" src="./img/Icontits.svg" alt="">
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Amount" min-width="100">
          <template slot-scope="scope">
            <div class="ding-box">
              {{ scope.row.value }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Symbol">
          <template slot-scope="scope">
            <div class="ding-box">
              {{ scope.row.symbol }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Locked">
          <template slot-scope="scope">
            <div class="ding-box" v-for="(item, index) in scope.row.outputs" :key="index">
              {{ item.lockTime }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 发送者，接受者 -->
    <div class="w1200 token_list bg-white merge">
      <el-table :empty-text="$t('assets.nodata')" :data="fromList" style="width: 100%">
        <el-table-column min-width="15"></el-table-column>
        <el-table-column :label="$t('public.input')" width="180">
          <template slot-scope="scope">
            <div class="sending-address" v-if="scope.row.address">
              <p class="address-box click" @click="toUrl('addressInfo', scope.row.address)">{{ UnpAredd(scope.row.address) }}</p>
              <el-tooltip :content="scope.row.address" placement="bottom" effect="light">
                <img class="cur Icontits" src="./img/Icontits.svg" alt="">
              </el-tooltip>
            </div>
            <p v-else>--</p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('assets.Asset_type')" v-if="showAssetType">
          <template slot-scope="scope">
            <p class="leixin-let">{{scope.row.assetType}}</p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tokenInfo.tokenInfo5')" min-width="100">
          <template slot-scope="scope">
            <div>{{ toThousands(timesDecimals(scope.row.amount, scope.row.decimals)) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="symbol" label="Symbol"></el-table-column>
        
      </el-table>
      <el-table :empty-text="$t('assets.nodata')" :data="toList" style="width: 100%">
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <img src="./img/ssdr145.png" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="address" :label="$t('public.output')" min-width="160">
          <template slot-scope="scope">
            <div class="sending-address">
              <p class="address-box click" @click="toUrl('addressInfo', scope.row.address)">{{ UnpAredd(scope.row.address) }}</p>
              <el-tooltip :content="scope.row.address" placement="bottom" effect="light">
                <img class="cur Icontits" src="./img/Icontits.svg" alt="">
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Amount">
          <template slot-scope="scope">
            <div class="ding-box">
              {{ toThousands(timesDecimals(scope.row.amount, scope.row.decimals)) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Symbol">
          <template slot-scope="scope">
            <div class="ding-box">
              {{ scope.row.symbol }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="tokenID" v-if="showTokenId">
          <template slot-scope="scope">
            <div class="ding-box" v-if="scope.row.tokenId">
              #{{scope.row.tokenId}}
            </div>
            <div class="ding-box" v-else>
              -
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Locked" v-if="showLocked">
          <template slot-scope="scope">
            <div class="ding-box">
              {{ toUpperCase(scope.row.locked) }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="t_mobile">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('public.input')" name="first">
          <div>
            <ul class="inputs scroll">
              <li class="font14" v-for="item in txInfo.fromList" :key="item.key">
                <span class="click" @click="toUrl('addressInfo', item.address)">{{ item.addresss }}</span>
                <label class="fr">{{ item.value }}<span class="fCN"> {{ item.symbol }}</span></label>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('public.output')" name="second">
          <div>
            <ul class="outputs scroll">
              <li class="font14" v-for="item in txInfo.toList" :key="item.key">
                <span class="click" @click="toUrl('addressInfo', item.address)">{{ item.addresss }}</span>
                <label class="fr">
                  {{ item.value }}
                  <span class="fCN"> {{ item.symbol }}<i class="iconfont yellow font12" :title="item.isShowInfo"
                      :class="item.lockTime > 0 ? 'icon-lock_icon' : ''"></i></span>
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
        <div v-show="!isContracts">{{ txInfo.txDataHex }}</div>
        <div v-show="isContracts">
          <!--<p v-html="$xss(txInfo.txData)"></p>-->
          <json-viewer :value="txInfo.txData" :expand-depth="5" copyable boxed></json-viewer>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { getLocalTime, copys, timesDecimals, superLong ,toThousands} from '@/api/util.js'


export default {
  data() {
    return {
      timesDecimals,
      toThousands,
      txhash: this.$route.query.hash,
      txhashs: superLong(this.$route.query.hash, 20),
      decimals: sessionStorage.hasOwnProperty('decimals') ? Number(sessionStorage.getItem('decimals')) : 8,//decimals
      txInfo: [],
      fromList: [],
      toList: [],
      showTokenId: false,
      showAssetType: false,
      showLocked: false,
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
    StringProcessing(address){
      if(address){
        return address.slice(0,7)+'...'+address.slice(-5);
      }
    },
    cellClassName({row, column, rowIndex, columnIndex}){
      if(columnIndex < 4){
        return 'custom-style'
      }
    },
    UnpAredd(address) {
      if(address){
        return address.slice(0, 7) + "..." + address.slice(-5)
      }else{
        return ''
      }
    },
    jionOpen(txInfo) {
      const parmse = txInfo.fee.chainId +'-1'
      this.$router.push("/assets/details/"+parmse)
    },

    /**
     * 根据hash获取交易详情
     */
    async getTxInfoByHash(hash) {
      this.nulsTransfers = [];
      this.contractInfo = [];
      this.tokenTransfers = [];
      this.$post('/', 'getTxV2', [hash])
        .then((response) => {
          if (response.hasOwnProperty("result")) {
            response.result.tx.time = moment(getLocalTime(response.result.tx.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
            response.result.tx.fees = timesDecimals(response.result.tx.fee.value, 8);
            response.result.tx.value = timesDecimals(response.result.tx.value, response.result.tx.decimal);

            //黄牌
            if (response.result.tx.type === 7) {
              response.result.tx.roundIndex = response.result.tx.txDataList[0].roundIndex;
              response.result.tx.index = response.result.tx.txDataList[0].index;
              response.result.tx.reason = response.result.tx.txDataList[0].reason;
              response.result.tx.txData = { address: '' };
            }
            //红牌
            if (response.result.tx.type === 8) {
              response.result.tx.roundIndex = response.result.tx.txData.roundIndex;
              response.result.tx.index = response.result.tx.txData.index;
              response.result.tx.reason = response.result.tx.txData.reason;
              //response.result.tx.txDataList ={};
            }

            //创建、调用合约
            if (response.result.tx.type === 15 || response.result.tx.type === 16 || response.result.tx.type === 17 || response.result.tx.type === 18) {
              this.isContracts = true;
              if (response.result.tx.txData.hasOwnProperty('resultInfo')) {
                response.result.tx.txData.resultInfo.totalFee = timesDecimals(response.result.tx.txData.resultInfo.totalFee, 8);
                response.result.tx.txData.resultInfo.txSizeFee = timesDecimals(response.result.tx.txData.resultInfo.txSizeFee, 8);
                response.result.tx.txData.resultInfo.actualContractFee = timesDecimals(response.result.tx.txData.resultInfo.actualContractFee, 8);
                response.result.tx.txData.resultInfo.refundFee = timesDecimals(response.result.tx.txData.resultInfo.refundFee, 8);
                this.contractInfo = response.result.tx.txData.resultInfo;
                if (response.result.tx.txData.resultInfo.tokenTransfers) {
                  let newTokenTransfers = response.result.tx.txData.resultInfo.tokenTransfers;
                  for (let item in newTokenTransfers) {
                    newTokenTransfers[item].keys = Number(item);
                    newTokenTransfers[item].value = timesDecimals(newTokenTransfers[item].value, newTokenTransfers[item].decimals);
                  }
                  this.tokenTransfers = newTokenTransfers
                  console.log(this.tokenTransfers, "代币转账")
                }
              }
            }

            if (response.result.tx.type === 16) {
              if (response.result.tx.txData.resultInfo.nulsTransfers) {
                for (let item of response.result.tx.txData.resultInfo.nulsTransfers) {
                  item.txHashs = superLong(item.txHash, 4);
                  item.value = timesDecimals(item.value);
                  for (let k of item.outputs) {
                    k.value = timesDecimals(k.value);
                  }
                }
                this.nulsTransfers = response.result.tx.txData.resultInfo.nulsTransfers;
                console.log(this.nulsTransfers ,'nuls 转账')
              }
            }

            if (response.result.tx.type === 18) {
              this.contractInfo = { success: true }
            }
            if (response.result.fromList) {
              for (let item of response.result.fromList) {
                item.value = timesDecimals(item.amount, item.decimal);
                item.addresss = superLong(item.address, 10);
              }
              this.inputNumber = response.result.fromList.length;
            }

            if (response.result.toList) {
              for (let item of response.result.toList) {
                item.value = timesDecimals(item.amount, item.decimal);
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
              this.outNumber = response.result.toList.length;
            }

            console.log(response.result, '11111')
            this.txInfo = response.result.tx;
            this.fromList = response.result.fromList;
            this.toList = response.result.toList;

            if(this.fromList.length > 0){
              if(this.fromList[0].assetType === '' || this.fromList[0].assetType === null || this.fromList[0].assetType === undefined){
                this.showAssetType = false
              }else{
                this.showAssetType = true
              }
            }
            if(this.toList.length > 0){
              const obj = this.toList[0]
              if(obj.locked != null){
                this.showLocked = true
              }
              
              if(this.txInfo.type == 16){
                this.showTokenId = true
              }
            }
            if (this.txInfo.txData && this.txInfo.txData.args) {
              this.txInfo.txData.args = this.txInfo.txData.args.replace(/<[^<>]+>/g, '');
            }
            this.txInfoLoading = false;
          }
        })
    },
    toUpperCase(locked){
      let capitalizedFirst = locked.toString();
      capitalizedFirst = capitalizedFirst.slice(0,1).toUpperCase() +capitalizedFirst.slice(1).toLowerCase();
      return capitalizedFirst;
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
     * url 连接跳转
     * @param name
     * @param params
     */
    toUrl(name, params) {
      let newQuery = {};
      if (name === "consensusInfo") {
        newQuery = { hash: params };
      } else if (name === "rotationInfo") {
        newQuery = { rotation: params };
      } else if (name === 'blockInfo') {
        newQuery = { height: params }
      } else if (name === 'contractsInfo') {
        newQuery = { contractAddress: params, tabName: 'first' }
      } else if (name === 'transactionInfo') {
        newQuery = { hash: params }
      } else if (name === 'contractsInfo') {
        newQuery = { contractAddress: params }
      } else {
        newQuery = { address: params };
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


<style>
.el-tooltip__popper.is-light {
  border: none;
  box-shadow: 0 0 2px 1px #EBEBF4;
}

.el-tooltip__popper .popper__arrow {
  border-style: none;
  box-shadow: 0 0 4px 2px #EBEBF4;
}
</style>
<style lang="less">
@import "./../../assets/css/style";

.t_info {
  min-height: 800px;
  margin-bottom: 100px;
  .tabs_header {
    background: initial;
  }
  .bottom-border{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #E9E9F8;
    .division{
      width: 48%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div{
        display: block;
        width: 125px;
      }
      .jiac-span{
        width: 160px;
      }
    }
    .chujie{
      margin: 0 40px;
    }
  }

  .tabs_title {
    color: #4A4F55;
    font-size: 14px;
    font-weight: 400;
  }

  .infoContainer {
    margin-bottom: 100px;
    border: 1px solid #EBEBF4;
    margin-top: 20px;
    border-radius: 12px;
    overflow: hidden;

    table {
      border-collapse: collapse;
      text-align: center;
      margin: auto;
      width: 100%; //固定表的宽度
      background: #FFFFFF;
    }

    table tr td {
      font-size: 14px;
      color: #000000;
      text-align: left;
      padding: 15px 0;
      padding-left: 24px;

      .tr-1 {
        font-size: 14px;
        color: #000000;

        img {
          margin-left: 6px;
        }
      }

      .tr-2 {
        width: fit-content;
        padding: 4px 6px;
        border-radius: 6px;
        background: #F2F7FF;
        font-size: 12px;
        color: #000000;
      }
    }

    table tr th {
      text-align: left;
      padding-left: 20px;
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }

  .bg-white {
    .bg-address {
      padding: 24px 0;
      font-weight: 600;
      font-size: 20px;
      color: #000000;

      img {
        margin-left: 6px;
        width: 14px;
      }
    }

    .title {
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

  .new-shite {
    background: initial;
  }

  .info_tabs {
    h3 {
      margin: 0;
      margin: 0;
      background: #FFFFFF;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      color: #000000;
      padding-left: 20px;
      font-size: 18px;
      font-weight: 550;
    }

    .ul {
      min-height: 210px;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;

      .tabs_infos {
        .tabs_infos_long {
          width: 50%;
        }

        .border-botton-line {
          border-bottom: 1px solid #E9E9F8;
        }

        .row-betw {
          position: relative;

          span {
            position: absolute;
            right: 20px;
          }
        }

        p {
          color: #4A4F55;
          padding: 0;

          span {
            color: #000000;

            img {
              width: 12px;
            }
          }

          .click {
            color: #00DB82;
          }
        }
      }
    }

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
  .merge{
    display: flex;
    border-radius: 12px;
    border: 1px solid #EBEBF4;
    overflow: hidden;
    @media(max-width: 1000px){
      flex-direction: column;
      .el-table_2_column_6{
        display: none;
      }
    }
    .el-table{
      border-radius: 0;
      td{
        border: none;
      }
      tr{
        th{
          background-color: #FFFFFF !important;
        }
      }
      tbody tr {
      &:hover {
        td {
          background-color: #FFFFFF;
        }
      }
      .leixin-let{
        width: fit-content;
        padding: 2px 5px;
        background: #F2F7FF;
        font-size: 12px;
        color: #000000;
        border-radius: 8px;
      }
    }
    }
  }
  .t_basics, .token_list {
      margin: 30px auto 100px;
      min-height: 275px;
      border: @BD1;
      @media screen and (max-width: 1000px) {
        // display: none;
      }
      .el-table{
        tr{
          th{
            background: initial !important;
          }
        }
      }
      .el-table--scrollable-x{
        .el-table__body-wrapper{
          overflow: initial;
        }
      } 
      .sending-address{
        display: flex;
        align-items: center;
        .el-tooltip{
          margin-left: 4px;
        }
        .Icontits:hover{
          transform: rotate(180deg);
        }
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
      // display: block;
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
t_info
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

@media (max-width: 1220px) {
  .t_info {
    padding: 0 .5rem;

    .ul {
      .tabs_infos {
        width: 50%;
      }
    }
  }

  .w1200 {
    width: initial;
  }
}

@media (max-width:1000px) {
  .t_info {
    .infoContainer {
      overflow-y: auto;
    }

    .ul {
      .xizeng {
        p {
          border-bottom: 1px solid #DFE4EF !important;
        }
      }

      .tabs_infos {
        p {
          padding: 0 .5rem !important;
        }
      }
    }
    .info_tabs .ul .tabs_infos:nth-last-child(2) p{
      border-bottom: none;
    }
    .add-class{
      border-bottom: 1px solid #DFE4EF !important;
    }
  }
}

@media (max-width: 686px) {
  .t_info {
    .bg-white {
      .bg-address {
        font-size: 14px;
      }
    }
  }
}
</style>
