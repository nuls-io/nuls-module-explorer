<template>
    <div class="read-contract">
        <div class="info-box-nav">
            <div class="box-snav">
                <img src="../img/shuben.png" alt="">
                Read Contract Information
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
                        <img src="../img/lianjie.png" alt="" @click.stop="copy(item.name)">
                        <img class="trans" :class="item.expand ? 'amini' : ''" src="../img/zhankai.png" alt="">
                    </div>
                </div>
                <div class="view-results" v-if="item.expand">
                    <div v-for="(domain, index) in item.params" :key="index">
                        <p class="blace-name"><span class="must" v-if="domain.required">*</span>{{ domain.name }}</p>
                        <el-input :class="domain.customize ? 'required' : ''" v-model.trim="domain.value"
                            @change="ChongInput(domain)"></el-input>
                    </div>
                    <!-- 显示合约调用结果 -->
                    <p class="blace-name" v-if="item.callResult">{{ item.callResult }}</p>
                    <div v-if="item.params.length > 0" class="tijiao font14 cur" @click="changeParameter(item)">调用</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { RUN_DEV } from '@/config'
import { getArgs, getChainId } from '../../../api/util'
export default {
    props:['infoActive'],
    data() {
        return {
            searchContract: 'NULSd6Hgz4RrwwbJLSoJkrmMn9zaxvH6xwey7',
            modelData: [], //合约方法列表
            //选中的方法
            selectionData: {
                view: true,
                payable: false, // 是否可向该合约转nuls
                payableMultyAsset: false // 是否可向该合约转其他资产
            },
            vLoading: false,
            newArgs: [],//合约参数
            decimals: 0, //精度
            openName: null, //根据参数默认暂开读取列表某一项
        }
    },
    watch: {
        infoActive: {
            handler(newval) {
                console.log(newval, '=====11111111=====')
            },
            immediate: true
        }
    },
    created() {
        this.getReadContract()
        // this.searchContract = this.$route.query?.contractAddress
        this.openName = this.$route.query.name || null
    },
    methods: {
        async getReadContract() {
            const params = { "jsonrpc": "2.0", "method": 'getContract', "params": [Number(getChainId()), this.searchContract], "id": Math.floor(Math.random() * 1000) };
            const res = await axios.post('/', params)
            try {
                this.decimals = res.data.result.decimals;
                this.modelList(res.data.result.methods)
            } catch (error) {
                console.log(error)
            }
        },
        changeParameter(item) {
            // 点击调用按钮
            let newArgs = [];
            newArgs = getArgs(item.params, this.decimals);
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
        },
        ReadContract(item) {
            item.expand = !item.expand
            this.selectionData = item
            if (item.expand) {
                if (item.params.length == 0) {
                    let newArgs = [];
                    this.methodCall(this.searchContract, item, newArgs)
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
            }
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
        modelList(val) {
            let newData = val.filter(obj => !obj.event);
            newData = newData.filter(obj => obj.name !== '<init>');
            const array = newData
            array.forEach(element => {
                // view 为true是读合约
                if (element.view) {
                    element['expand'] = false //初始化关闭展开
                    const valParams = element.params
                    valParams.forEach(valbox => {
                        if (valbox.required) {
                            valbox['customize'] = false
                        }
                    });
                    this.modelData.push(element)
                }
            });

            if (this.$route.query.name) {
                const Hbox = this.modelData
                Hbox.forEach(nits => {
                    if (nits.name === this.openName) {
                        nits.expand = true
                        this.$forceUpdate()
                    }
                });
                this.$nextTick(() => {
                    setTimeout(() => {
                        document.getElementById(this.openName).scrollIntoView()
                    }, 500)
                })
            }
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
        ExpandAll() {
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
        },
        async copy(name) {
            let target = document.createElement('input') //创建input节点
            target.value = location.origin + location.pathname + '?contractAddress=' + this.searchContract + '&name=' + name + '&tabName=second'
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
}</style>