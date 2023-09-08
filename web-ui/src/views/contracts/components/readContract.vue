<template>
    <div class="read-contract">
        <div class="nabox-wallet cur" @click="connectWallet">
            <i class="info-success" v-if="walletaddress"></i>
            <i class="info-error" v-else></i>
            <p>连接Nabox钱包</p>
        </div>

        <div class="info-box-nav">
            <div class="box-snav">
                <img src="../img/shuben.png" alt="" v-show="newinfoActive === 1">
                <span v-show="newinfoActive === 1">Read Contract Information</span>
            </div>

            <div class="nav-right">
                <span class="click" @click="ExpandAll()">[Expand all]</span>
                <span class="click" @click="closureReset()">[Reset]</span>
            </div>
        </div>

        <div v-loading="vLoading">
            <div class="box-border" v-for="(item, index) in modelData" :key="index">
                <div class="contract-method cur" @click="ReadContract(item)" :id="item.name">
                    <span class="font14">{{ index + 1 }}.{{ item.name }}</span>
                    <div>
                        <img src="../img/lianjie.png" alt="" @click.stop="copy(item)">
                        <img class="trans" :class="item.expand ? 'amini' : ''" src="../img/zhankai.png" alt="">
                    </div>
                </div>
                <div class="view-results" v-if="item.expand">
                    <div v-for="(domain, index) in item.params" :key="index">
                        <p class="blace-name"><span class="must" v-if="domain.required">*</span>{{ domain.name }}</p>
                        <el-input :class="domain.customize ? 'required' : ''" v-model.trim="domain.value"
                            @change="ChongInput(domain)"></el-input>
                    </div>

                    <!-- 写 -->
                    <div class="div-senior" v-if="!item.view">
                        <div class="row-center margintop">
                            <p style="margin-right:8px;">{{ $t('call.call3') }}</p>
                            <el-switch v-model="item.senior" @change="Onchange(item)"></el-switch>
                        </div>
                        <div class="senior-div " v-if="item.senior">
                            <div>
                                <p>Gas Limit</p>
                                <el-input class="margintop" v-model="item.gas" @change="changeGas(item)"
                                    disabled></el-input>
                                <div class="font12 yellow margintop" v-show="item.gasTips">{{ $t('call.call10') }}</div>
                            </div>

                            <div class="margintop">
                                <p>Price</p>
                                <el-input class="margintop" v-model="item.price" disabled></el-input>
                            </div>

                            <div class="margintop" v-if="item.payable">
                                <p>Value(NULS)</p>
                                <el-input class="margintop" v-model="item.values"></el-input>
                            </div>

                            <div class="transfer-multiple-asset" v-if="item.payableMultyAsset"
                                style="background-color: #fff;width: 500px;padding: 10px 0 15px">
                                <div class="search-model">
                                    <p>Other Assets</p>
                                    <el-select v-model="item.assetInfo" class="margintop" :placeholder="$t('call.call11')"
                                        @change="changeAsset($event, item)">
                                        <el-option v-for="(itembox, index) in multipleAsset" :key="index"
                                            :label="itembox.symbol" :value="itembox">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="margintop">
                                    <p>Value</p>
                                    <el-input class="margintop" :class="item.ifValues ? 'required' : ''"
                                        v-model="item.otherValue" @input="Oninput($event, item)"></el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 显示合约调用结果 -->
                    <p class="blace-name" v-if="item.callResult">{{ item.callResult }}</p>
                    <div v-if="item.params.length > 0 || newinfoActive === 2" class="tijiao font14 cur"
                        @click="changeParameter(item)">调用</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { getArgs, getChainId, timesDecimalsBig, Times, getNulsBalance } from '../../../api/util'
import utils from 'nuls-sdk-js/lib/utils/utils'
export default {
    props: ['infoActive'],
    data() {
        return {
            // 测试用合约地址NULSd6HgrEtRT9r151GxBMG6hAVvdahgnSw7w
            searchContract: '', //合约地址
            walletaddress: '', //钱包地址
            modelData: [], //合约方法列表
            //选中的方法
            selectionData: {
                view: true,
                payable: false, // 是否可向该合约转nuls
                payableMultyAsset: false // 是否可向该合约转其他资产
            },
            callForm: {
                senior: false,
                gas: 0,
                price: 25,
                values: 0,
                assetInfo: "",
                otherValue: ""
            },
            resMethods: [], //没处理的数据
            newinfoActive: 0,
            vLoading: false,
            newArgs: [],//合约参数
            decimals: 0, //精度
            openName: null, //根据参数默认暂开读取列表某一项
            multipleAsset: [], // 可转入合约的平行链资产列表
            assetInfo: null, // 往合约转的其他资产资产信息
            contractCallData: {},//调用合约data
        }
    },
    watch: {
        infoActive: {
            handler(newval) {
                this.newinfoActive = Number(newval)
                this.modelData = [] //初始化
                this.modelList(this.resMethods)
            },
            immediate: true
        },
    },
    async created() {
        this.searchContract = this.$route.query.contractAddress
        this.getReadContract()
        this.openName = this.$route.query.name || null
        
        const accounts = await window['NaboxWallet'].request({ method: 'eth_accounts' })
        console.log(accounts, '获取钱包地址')
        if (accounts[0]) {
            this.walletaddress = accounts[0]
            this.getAccountCrossLedgerList(accounts[0]) //传钱包地址
        } else {
            this.walletaddress = ''
        }
    },
    mounted() {
        // 监听钱包地址切换
        window.NaboxWallet.on("accountsChanged", (accounts) => {
            if (accounts[0]) {
                this.walletaddress = accounts[0]
                this.getAccountCrossLedgerList(accounts[0]) //传钱包地址
            } else {
                this.walletaddress = ''
            }
        });
    },
    methods: {
        Onchange(item) {
            item.otherValue = 0
            item.ifValues = false
            item.senior = item.senior
            this.$forceUpdate()
        },
        async getAccountCrossLedgerList(address) {
            // address 接收钱包地址
            if (address) {
                const params = { "jsonrpc": "2.0", "method": 'getAccountCrossLedgerList', "params": [Number(getChainId()), address], "id": Math.floor(Math.random() * 1000) };
                const res = await axios.post('/', params)
                console.log(res, 'ffffffffff')
                if (res.data.result) {
                    this.multipleAsset = res.data.result
                }
            }
        },
        async getReadContract() {
            const params = { "jsonrpc": "2.0", "method": 'getContract', "params": [Number(getChainId()), this.searchContract], "id": Math.floor(Math.random() * 1000) };
            const res = await axios.post('/', params)
            try {
                this.decimals = res.data.result.decimals;
                this.modelData = [] //初始化
                this.resMethods = res.data.result.methods
                this.modelList(res.data.result.methods)
            } catch (error) {
                console.log(error)
            }
        },
        modelList(val) {
            let newData = val.filter(obj => !obj.event);
            newData = newData.filter(obj => obj.name !== '<init>');

            newData.forEach(element => {
                // view 为true是读合约
                element['expand'] = false //初始化关闭展开
                const valParams = element.params
                valParams.forEach(valbox => {
                    if (valbox.required) {
                        valbox['customize'] = false
                    }
                });
                // 读合约
                if (this.newinfoActive === 1 && element.view) {
                    this.modelData.push(element)
                } else if (this.newinfoActive === 2) {
                    // 写
                    if (!element.view) {
                        element['senior'] = false
                        element['gasTips'] = false //gas 太小提示信息
                        element['gas'] = 1
                        element['price'] = 25
                        element['values'] = 0
                        element['assetInfo'] = ""
                        element['otherValue'] = 0
                        element['ifValues'] = false
                        this.modelData.push(element)
                    }
                }
            });

            if (this.$route.query.name) {
                const Hbox = this.modelData
                Hbox.forEach(nits => {
                    if (nits.name === this.openName) {
                        if(this.newinfoActive === 1){
                            if (nits.params.length == 0) {
                                let newArgs = [];
                                this.methodCall(this.searchContract, nits, newArgs)
                            }else{
                                nits.expand = true
                                this.$forceUpdate()
                            }
                        }else{
                            nits.expand = true
                            this.$forceUpdate()
                        }
                    }
                });
                this.$nextTick(() => {
                    setTimeout(() => {
                        document.getElementById(this.openName).scrollIntoView()
                    }, 500)
                })
            }
        },
        async changeParameter(item) {
            console.log(item, '======item')
            if (this.newinfoActive === 2) {
                // 写合约
                let condition = true
                if (item.payableMultyAsset) {
                    if (Number(item.otherValue) > 0) {
                        item.ifValues = false
                        condition = true
                    } else {
                        item.ifValues = true
                        condition = false
                    }
                    this.$forceUpdate()
                }
                if (condition) {
                    let newArgs = [];
                    newArgs = getArgs(item.params);
                    const array = item.params
                    if (newArgs.allParameter) {
                        array.forEach(element => {
                            if (element.hasOwnProperty('customize')) {
                                element.customize = false
                            }
                        });
                        this.$forceUpdate()
                    } else {
                        array.forEach(element => {
                            if (element.hasOwnProperty('customize')) {
                                element.customize = true
                            }
                        });
                        this.$forceUpdate()
                        return false
                    }

                    if (item.params.length !== 0) {
                        // 有参数的
                        if (newArgs.allParameter) {
                            this.imputedContractCallGas(this.walletaddress, Number(Times(item.values, 100000000)), this.searchContract, item.name, item.desc, newArgs.args, [], item)
                        }
                    }
                    this.getBalanceByAddress(Number(getChainId()), 1, this.walletaddress)

                    let agentAsset = sessionStorage.getItem('info')
                    let assetChainId, assetId = 1
                    if (agentAsset) {
                        agentAsset = JSON.parse(agentAsset)
                        assetChainId = agentAsset.agentAsset.chainId
                        assetId = agentAsset.agentAsset.assetId
                    }
                    const data = {
                        from: this.walletaddress, //钱包地址
                        value: 0,
                        contractAddress: this.searchContract,
                        methodName: item.name,
                        methodDesc: item.desc,
                        args: newArgs.args,
                        multyAssetValues: []
                    }
                    if(item.payableMultyAsset){
                        data.multyAssetValues = [[0, assetChainId, assetId]]
                    }else{
                        data.multyAssetValues = []
                    }
                    console.log(JSON.stringify(data) )
                    item.callResult = "transaction hash: " + await nabox.contractCall(data) // 返回交易hash
                    this.$forceUpdate()
                }
            } else {
                // 读合约点击调用按钮
                let newArgs = [];
                newArgs = getArgs(item.params);
                const array = item.params
                if (newArgs.allParameter) {
                    array.forEach(element => {
                        if (element.hasOwnProperty('customize')) {
                            element.customize = false
                        }
                    });
                } else {
                    array.forEach(element => {
                        if (element.hasOwnProperty('customize')) {
                            element.customize = true
                        }
                    });
                }
                this.$forceUpdate()

                if (newArgs.allParameter) {
                    this.methodCall(this.searchContract, item, newArgs.args)
                }
            }
        },
        /**
       * 获取账户余额
       * @param assetChainId
       * @param assetId
       * @param address
       **/
        getBalanceByAddress(assetChainId, assetId, address) {
            getNulsBalance(assetChainId, assetId, address).then((response) => {
                console.log(response.data, '===获取账户余额');
                if (response.data.success) {
                    this.balanceInfo = response.data.data;
                } else {
                    this.$message({ message: this.$t('public.err2') + response.data.error.data, type: 'error', duration: 3000 });
                }
            }).catch((error) => {
                this.$message({ message: this.$t('public.err3') + error, type: 'error', duration: 3000 });
            });
        },

        ReadContract(item) {
            item.expand = !item.expand
            this.selectionData = item
            if (item.expand) {
                if (this.newinfoActive === 1) {
                    // 读
                    if (item.params.length == 0) {
                        let newArgs = [];
                        this.methodCall(this.searchContract, item, newArgs)
                    }
                } else {
                    // 写
                }

            } else {
                // 关闭展开时，初始化必填状态
                const array = item.params
                array.forEach(element => {
                    element.value = ''
                    if (element.hasOwnProperty('customize')) {
                        element.customize = false
                    }
                });
                if (this.newinfoActive === 2) {
                    item.otherValue = 0
                    item.ifValues = false
                    item.senior = false
                }
            }
            this.$forceUpdate()
        },
        /**
       * 不上链方法调用
       * @param contractAddress
       * @param methodName
       * @param methodDesc
       * @param args
       */
        async methodCall(contractAddress, item, args) {
            const params = { "jsonrpc": "2.0", "method": 'invokeView', "params": [Number(getChainId()), contractAddress, item.name, item.desc, args], "id": Math.floor(Math.random() * 1000) };
            try {
                const response = await axios.post('/', params)
                if (response.data.result) {
                    item['callResult'] = response.data.result.result;
                    item.expand = true
                    this.$forceUpdate()
                } else {
                    if (response.data.error.code === 'err_0014') {
                        this.$message({ message: this.$t('call.call8') + response.data.error.data, type: 'error', duration: 3000 });
                    } else {
                        this.$message({ message: this.$t('call.call8') + response.data.error.message, type: 'error', duration: 3000 });
                    }
                }
            } catch (error) {
                this.$message({ message: this.$t('call.call9') + error, type: 'error', duration: 3000 });
            }
            this.vLoading = false
        },

        ChongInput(domain) {
            if (domain.value) {
                if (domain.hasOwnProperty('customize')) {
                    domain.customize = false
                }
            } else {
                if (domain.hasOwnProperty('customize')) {
                    domain.customize = true
                }
            }
            this.$forceUpdate()
        },
        closureReset() {
            const array = this.modelData
            array.forEach(item => {
                item.expand = false
                if (this.newinfoActive === 2) {
                    item.otherValue = 0
                    item.ifValues = false
                    item.senior = false
                }
                const boxqu = item.params
                boxqu.forEach(element => {
                    element.value = ''
                    if (element.hasOwnProperty('customize')) {
                        element.customize = false
                    }
                });
            })
            this.$forceUpdate()
        },
        Oninput(event, item) {
            item.otherValue = event
            this.$forceUpdate()
        },
        ExpandAll() {
            if (this.newinfoActive === 2) {
                const array = this.modelData
                array.forEach(element => {
                    element.expand = true
                });
                this.$forceUpdate()
            } else {
                this.vLoading = true
                const array = this.modelData
                array.forEach(item => {
                    if (item.params.length == 0) {
                        let newArgs = [];
                        this.methodCall(this.searchContract, item, newArgs)
                    } else {
                        item.expand = true
                    }
                })
                this.$forceUpdate()
            }
        },
        /**
       * gas改变提示
       * */
        changeGas(item) {
            let gasNumber = Number(item.gas)
            if (item.oldGasNumber > gasNumber) {
                item.gasTips = true
            } else {
                item.gasTips = false
            }
        },
        changeAsset(asset, item) {
            let newArgs = [];
            newArgs = getArgs(item.params);
            this.assetInfo = asset;
            item.assetInfo.symbol = asset.symbol;
            this.$forceUpdate()
            const { chainId: assetChainId, assetId, decimals } = this.assetInfo;
            const value = timesDecimalsBig(item.otherValue, decimals);
            const multyAssets = [
                { value, assetChainId, assetId }
            ];
            this.imputedContractCallGas(this.walletaddress, 0, this.searchContract, item.name, item.desc, newArgs, multyAssets, item);
        },
        /**
       * 预估调用合约交易的gas
       * @param sender
       * @param value
       * @param contractAddress
       * @param methodName
       * @param methodDesc
       * @param args
       */
        async imputedContractCallGas(sender, value, contractAddress, methodName, methodDesc, args, multyAssets, item) {
            let multyAssetArray = [];
            if (multyAssets && multyAssets.length) {
                let length = multyAssets.length;
                multyAssetArray = new Array(length);
                for (let i = 0; i < length; i++) {
                    let multyAsset = multyAssets[i];
                    multyAssetArray[i] = [multyAsset.value, multyAsset.assetChainId, multyAsset.assetId];
                }
            }
            const params = {
                "jsonrpc": "2.0", "method": 'imputedContractCallGas',
                "params": [Number(getChainId()), sender, value, contractAddress, methodName, methodDesc, args, multyAssetArray], "id": Math.floor(Math.random() * 1000)
            };
            console.log(params, '===========')
            const _this = this
            return await axios.post('/', params)
                .then(async (response) => {
                    if (response.data.hasOwnProperty("result")) {
                        console.log(response.data, '预估调用合约交易的gas');
                        console.log(item, 'itemitemitemitemitem');
                        item.gas = response.data.result.gasLimit;
                        item.oldGasNumber = response.data.result.gasLimit;
                        let contractConstructorArgsTypes = await _this.getContractMethodArgsTypes(contractAddress, methodName, methodDesc);
                        if (!contractConstructorArgsTypes.success) {
                            _this.$message({ message: _this.$t('call.call4') + response.data, type: 'error', duration: 3000 });
                            return;
                        }
                        let newArgs = utils.twoDimensionalArray(args, contractConstructorArgsTypes.data);
                        _this.contractCallData = {
                            chainId: getChainId(),
                            sender: sender,
                            contractAddress: contractAddress,
                            value: value,
                            gasLimit: item.gas,
                            price: item.price,
                            methodName: methodName,
                            methodDesc: methodDesc,
                            args: newArgs
                        };
                    } else {
                        _this.$message({ message: _this.$t('call.call4') + response.data, type: 'error', duration: 3000 });
                    }
                })
                .catch((error) => {
                    _this.$message({ message: _this.$t('call.call5') + JSON.stringify(error), type: 'error', duration: 3000 });
                });
        },
        /**
       * 获取合约指定函数的参数类型
       * @param contractAddress
       * @param  methodName
       * @param  methodDesc
       */
        async getContractMethodArgsTypes(contractAddress, methodName, methodDesc) {
            console.log('=======获取合约指定函数的参数类型')
            const params = { "jsonrpc": "2.0", "method": 'getContractMethodArgsTypes', "params": [Number(getChainId()), contractAddress, methodName, methodDesc], "id": Math.floor(Math.random() * 1000) };
            return await axios.post('/', params)
                .then((response) => {
                    console.log(response.data, ' 获取合约指定函数的参数类型');
                    if (response.data.hasOwnProperty("result")) {
                        return { success: true, data: response.data.result };
                    } else {
                        return { success: false, data: response.data.error };
                    }
                })
                .catch((error) => {
                    return { success: false, data: error };
                });
        },
        async connectWallet() {
            // NaboxWallet
            if (typeof window['NaboxWallet'] === "undefined") {
                alert("Please install Nabox Wallet")
            } else {
                const accounts = await window.NaboxWallet.request({ method: 'eth_requestAccounts' })
                if(accounts[0]){
                    this.walletaddress = accounts[0]
                    this.getAccountCrossLedgerList(accounts[0]) //传钱包地址
                }else{
                    this.walletaddress = ''
                }
            }
        },
        async copy(item) {
            let target = document.createElement('input') //创建input节点
            target.value = location.origin + location.pathname + '?contractAddress=' + this.searchContract + '&name=' + item.name + '&tabName=second'+"&infoActive="+this.newinfoActive
            target.style.position = 'absolute'
            target.style.top = '-99999px'
            document.body.appendChild(target) // 向页面插入input节点
            target.select() // 选中input
            try {
                await document.execCommand('Copy') // 执行浏览器复制命令
                this.$message.success(this.$t('messages.copy'));
            } catch {
                this.$message.error(this.$t('messages.Paste'));
            }
        }
    }
}
</script>

<style scoped lang="less">
.read-contract {
    .nabox-wallet {
        width: 160px;
        height: 36px;
        border-radius: 8px;
        border: 1px solid #EBEBF4;
        background: #F2F7FF;
        font-size: 14px;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 12px;

        .info-error,
        .info-success {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #F64141;
            margin-right: 8px;
        }

        .info-success {
            background: #00DB82;
        }
    }
    .info-box-nav {
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .nav-right {
            font-size: 14px;

            span {
                margin-left: 16px;
            }
        }

        .box-snav {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #000000;

            img {
                margin-right: 6px;
            }
        }
    }

    .box-border {
        border: 1px solid #EBEBF4;
        border-radius: 8px;
        margin-top: 12px;
    }

    .view-results {
        height: fit-content;
        font-size: 14px;
        color: #000000;
        padding: 0 16px;

        .div-senior {
            .margintop {
                margin-top: 12px;
            }

            .row-center {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                margin-bottom: 12px;
            }

            .senior-div {
                margin-bottom: 12px;

                .margintop {
                    margin-top: 12px;
                }
            }
        }

        .required {
            border: 1px solid red;
            border-radius: 6px;
        }

        .blace-name {
            margin: 12px 0;
            font-size: 14px;
            color: #000000;
            word-break: break-all;

            .must {
                color: red;
            }
        }

        .tijiao {
            margin-top: 12px;
            color: #000000;
            width: 80px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            border-radius: 6px;
            color: #FFFFFF;
            background: #00DB82;
            margin-bottom: 12px;
        }
    }

    .contract-method {
        height: 44px;
        background: #F9FBFF;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 16px;
        border-bottom: 1px solid #EBEBF4;

        span {
            color: #000000;
        }

        div {
            img {
                margin-right: 16px;
            }

            .trans {
                transition: all .3s;
            }

            .amini {
                transform: rotateZ(90deg)
            }
        }
    }
}
</style>