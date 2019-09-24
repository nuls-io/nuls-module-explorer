<template>
    <div class="transaction">
        <div class="top-chart w1200 ">
            <div class="chart_title">
                <h2 class="fl font18 capitalize">{{$t('protocolUpdate.name')}}:{{protocolUpdate}}</h2>
            </div>

            <!--<div class="chart_info">-->
            <!--<ve-line height="300px" style="top: -40px"-->
            <!--:data="timeChartData"-->
            <!--:legend-visible="false"-->
            <!--:colors="colors"-->
            <!--:settings="chartSettings"-->
            <!--:loading="timeRateDataLoading"></ve-line>-->
            <!--</div>-->
        </div>
        <div></div>
        <div class="chart_info">
            <div class="font16">
                <span class="font12 capitalize">已升级节点:</span>
                <div v-for="item in newList" :key="item.agentAddress">
                    {{ item.agentAddress }}
                </div>
            </div>
            <div class="font16">
                <span class="font12 capitalize">未升级节点：</span>
                <div v-for="item in oldList" :key="item.agentAddress">
                    {{ item.agentAddress }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import paging from '@/components/pagingBar';
    import SelectBar from '@/components/SelectBar';
    import {getLocalTime, superLong, timesDecimals} from '@/api/util.js'

    export default {
        data() {
            this.colors = ['#7db46d', '#7db46d', '#7db46d',
                '#546570', '#c4ccd3'];
            this.chartSettings = {
                yAxisType: ['normal'],
                labelMap: {
                    'value': 'TXS'
                },
            };
            return {
                protocolUpdate: "",
                newList: [],
                oldList: [],
                //统计图数据
                timeChartData: {
                    columns: [],
                    rows: []
                },
                timeRateDataLoading: true,
                timeRate: 2,
                //交易类型
                typeRegion: 0,
                //隐藏滑块
                hideSwitch: false,
                //交易列表
                txList: [],
                //交易列表加载动画
                txListLoading: true,
                //交易列表总数
                txListTotal: 0,
                //分页信息
                pager: {
                    total: 0,
                    page: 1,
                    rows: 6,
                },
                symbol: sessionStorage.hasOwnProperty('symbol') ? sessionStorage.getItem('symbol') : 'NULS',//默认symbol
            }
        },
        components: {
            paging,
            SelectBar
        },
        created() {
            console.log("do init")
            this.protocolUpdate = "10/100"
            // this.getYearRateData(this.timeRate);
            this.getTransactionsTotal();
            // this.getTxList(this.pager.page, this.pager.rows, this.typeRegion, this.hideSwitch);
        },
        mounted() {
        },
        methods: {

            /**
             * 获取交易历史数据统计
             */
            getYearRateData(time) {
                this.$post('/', 'getTxStatistical', [time])
                    .then((response) => {
                        //console.log(response);
                        if (response.hasOwnProperty("result")) {
                            this.timeChartData.columns = ['key', 'value'];
                            this.timeChartData.rows = response.result;
                            this.timeRateDataLoading = false;
                        }
                    })
            },

            /**
             * @disc: 获取最新的交易总量
             * @date: 2019-09-10 14:02
             * @author: Wave
             */
            getTransactionsTotal() {
                this.$post('/', 'getConsensusNodes', [1, 200, 0])
                    .then((response) => {
                        console.log(response);
                        const total = response.result.list.length;
                        const success = response.result.list.filter(d => d.version == 2).length;
                        this.protocolUpdate = `${success}/${total}`;
                        console.log(this.protocolUpdate)
                        response.result.list.forEach(d => {
                            if (d.version == 2) {
                                this.newList.push(d);
                            } else {
                                this.oldList.push(d);
                            }
                        })
                        // if (response.hasOwnProperty("result")) {
                        //   this.txListTotal = response.result.txCount;
                        // }
                    })
            },

            /**
             * 选择统计数据的周、月、年
             **/
            changeDate(type) {
                this.timeRateDataLoading = true;
                this.timeChartData.columns = [];
                this.timeChartData.rows = [];
                this.timeRate = type;
                this.getYearRateData(type)
            },

            /**
             * 获交易列表
             */
            getTxList(page, rows, type, show) {
                this.$post('/', 'getTxList', [page, rows, type, show])
                    .then((response) => {
                        //console.log(response);
                        if (response.hasOwnProperty("result")) {
                            for (let item of response.result.list) {
                                item.time = moment(getLocalTime(item.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
                                item.hashs = superLong(item.hash, 20);
                                item.value = timesDecimals(item.value, 8);
                                item.fees = timesDecimals(item.fee.value, 8);
                            }
                            this.txList = response.result.list;
                            if (type === 0 && !show) {
                                this.txListTotal = response.result.totalCount
                            }
                            this.pager.total = response.result.totalCount;
                            this.txListLoading = false;
                        }
                    })
            },

            /**
             * 分页功能
             **/
            pagesList() {
                this.txListLoading = true;
                this.getTxList(this.pager.page, this.pager.rows, this.typeRegion, this.hideSwitch);
            },

            /**
             * 获取交易类型
             **/
            changeType(type) {
                this.pager = {total: 0, page: 1, rows: 7,};
                this.typeRegion = parseInt(type);
                this.getTxList(this.pager.page, this.pager.rows, this.typeRegion, this.hideSwitch);
            },

            /**
             * 隐藏共识奖励
             **/
            hideConsensusList() {
                this.txListLoading = true;
                this.pager = {total: 0, page: 1, rows: 6};
                this.getTxList(this.pager.page, this.pager.rows, this.typeRegion, this.hideSwitch);
            },

            /**
             * url 连接跳转
             * @param name
             * @param parmes
             */
            toUrl(name, parmes) {
                this.$router.push({
                    name: name,
                    query: name === 'transactionInfo' ? {hash: parmes} : {height: parmes}
                })
            }
        },
    }
</script>

<style lang="less">
    @import "./../../assets/css/style";

    .transaction {
    height: 120 px;

    .top-chart {
        height: 80px;

    @media screen and (max-width: 1000px) {
        display: none

    ;
    }

    .chart_title {
        margin: 40px 0 0 0;

    .chart_bt {
        z-index: 8;
        position: relative;
    }

    }
    .chart_info {
        margin: 20px 0 0 0;
        padding-left: 200px;
    }

    }
    .info {
        width: 100%;
        margin-bottom: 100px;

    .title {
        line-height: 40px;
        font-weight: 400;
        margin: 5px auto;
        border-bottom: @BD1;

    @media screen and (max-width: 1000px) {
        margin:

    0 auto

    0;
        padding:

    1rem

    0 0 0.5rem

    ;
        width:

    95%;
    }

    }
    }
    .tabs {
        margin: 0 0 0 0;

    @media screen and (max-width: 1000px) {
        width:

    95%;
        margin:

    0 auto

    ;
    }

    .el-select {
        margin: 20px 0 14px 0;
    }

    .hide-switch {
        margin: 35px 0 0 0;
    }

    }
    }

</style>
