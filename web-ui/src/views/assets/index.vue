<template>
    <div class="assets">
        <div class="assets-container w1200">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="ALL" name="first"></el-tab-pane>
                <el-tab-pane :label="$t('assets.chain_assets')" name="ssss"></el-tab-pane>
                <el-tab-pane label="NRC20" name="second"></el-tab-pane>
                <el-tab-pane label="NRC721" name="third"></el-tab-pane>
                <el-tab-pane label="NRC1155" name="fourth"></el-tab-pane>
            </el-tabs>
        </div>

        <div class="assets-table w1200">
            <p class="table-titile">{{$t('assets.Contracts',{number: 127})}}</p>
            <el-table :data="tableData" style="width: 100%" :cell-class-name="cellClassName" stripe border>
                <el-table-column label="ID" width="160">
                    <template slot-scope="scope">
                        <div>{{ scope.row.date }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="Token" width="160">
                    <template slot-scope="scope">
                        <div class="Token-box" @click="routLink">
                            <img src="../../assets/img/Icon.png" alt="">
                            <span class="cur color-derl">{{ scope.row.data }}2222</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="Native Chain" min-width="160">
                    <template slot-scope="scope">
                        <div class="chain-box">
                            {{ scope.row.data }} BNB Chain
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('assets.Circulation')" min-width="160">
                    <template slot-scope="scope">
                        <div>{{ scope.row.date }}</div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('assets.Holder')" min-width="160">
                    <template slot-scope="scope">
                        <div>{{ scope.row.date }}</div>
                    </template>
                </el-table-column>
            </el-table>

            <div class="paging">
                <div class="paging-select">
                    <span>show</span>
                    <el-select v-model="pagerRows">
                        <el-option label="20" value="20"></el-option>
                        <el-option label="50" value="50"></el-option>
                        <el-option label="100" value="100"></el-option>
                    </el-select>
                    <span>Records</span>
                </div>

                <el-pagination class="pages" background layout="total,prev, pager, next, jumper" :total="pagerTotal"
                    :current-page.sync="pagerIndex" :page-size="pagerRows" @current-change="pagesList">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'first',
            pagerTotal: 0,
            pagerIndex: 1,
            pagerRows: 20,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        routLink() {
            this.$router.push({
                name: 'assetsdetails'
            })
        },
        /**
     * 分页功能
     **/
        pagesList(e) {
            this.pageIndex = e;
        },
    }
}
</script>

<style lang="less">
.assets {
    background-color: #F9FAFD;

    .assets-table {
        background: #ffff;
        border-radius: 12px;
        padding: 0 24px;
        padding-bottom: 24px;

        .table-titile {
            font-size: 14px;
            color: #000000;
            padding-bottom: 12px;
            padding-top: 12px;
        }

        .paging {
            .pages {
                height: initial;
            }

            .paging-select {
                font-size: 12px;
                color: #000000;
                display: flex;
                align-items: center;

                .el-input__inner {
                    width: 100px;
                    margin: 0 8px;
                }
            }

            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .paging .pages .el-pager .active {
            background-color: #00E789 !important;
        }

        .is-checked .el-switch__core {
            border-color: #00E789 !important;
            background-color: #00E789 !important;
        }

        .el-pagination__total,
        .el-pagination__jump {
            color: #8B8BB0;
        }

        .el-pagination.is-background .el-pager li {
            background-color: initial;
            border: 1px solid #EBEBF4;
            border-radius: 5px;
        }

        .el-pagination.is-background .btn-prev,
        .el-pagination.is-background .btn-next {
            background-color: initial;
            border: 1px solid #EBEBF4;
            border-radius: 5px;
        }

        .el-table {
            th {
                .cell {
                    color: #4A4F55;
                    padding: 0 36px;
                }
            }

            td {
                border-bottom: 1px solid #E9E9F8 !important;

                .cell {
                    padding: 0 36px;
                }
            }

            .chain-box {
                width: fit-content;
                padding: 2px 6px;
                border-radius: 8px;
                color: #000000;
                font-size: 12px;
                background: #F2F7FF;
            }

            .Token-box {
                display: flex;
                align-items: center;
                cursor: pointer;

                img {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    margin-right: 6px;
                }

                span {
                    font-size: 14px;
                    color: #00E789;
                }
            }
        }

        .el-table::before {
            height: 0;
        }
    }

    .assets-container {
        padding: 24px 0;

        .el-tabs {
            .el-tabs__header {
                .el-tabs__nav-wrap {
                    .el-tabs__item {
                        color: #000000;
                        font-size: 18px;
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
    }
}

@media (max-width: 1220px) {
    .assets {
        padding: 0 .5rem;
        .w1200 {
            width: initial;
        }
    }
}

@media (max-width: 686px){
    .assets{
        .assets-table{
            .paging{
                margin-top: 16px;
                flex-wrap: wrap;
            }
        }
    }
}
</style>