<template>
    <div class="Holder">
        <div class="Holder-title">
            <div>
                <img src="../img/renshu.png" alt="">
                <p>{{$t('assets.holders',{number: 154.26})}}</p>
            </div>
            <span>{{$t('assets.minutes_ago',{time: 32})}}</span>
        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="#" width="60">
                <template slot-scope="scope">
                    <span>1</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('public.address')" width="280">
                <template slot-scope="scope">
                    <div class="row-center">
                        <span class="click">0x33566c9...9d75836</span>
                        <img style="margin-left:6px;" src="../img/fuzhi.png" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('tokenInfo.tokenInfo5')">
                <template slot-scope="scope">
                    <p>1,387,298,408.18914185</p>
                </template>
            </el-table-column>
            <el-table-column :label="$t('assets.hundred_percent')">
                <template slot-scope="scope">
                    <p>1.8593%</p>
                </template>
            </el-table-column>
            <el-table-column :label="$t('assets.value')">
                <template slot-scope="scope">
                    <p>$84,193,753.09</p>
                </template>
            </el-table-column>
        </el-table>


        <div class="paging">
            <el-pagination class="pages" background layout="prev, pager, next, jumper" :total="pagerTotal"
                :current-page.sync="pagerIndex" :page-size="pagerRows" @current-change="pagesList">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
    }
}
</script>

<style lang="less">
.Holder {
    padding: 0 24px;

    .row-center {
        display: flex;
        align-items: center;
    }

    .paging {
        display: flex;
        justify-content: flex-end !important;
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

    .el-table {
        margin-top: 16px;

        &::before {
            height: 0px;
        }

        .has-gutter {
            tr {
                th {
                    .cell {
                        color: #000000;
                    }
                }
            }
        }

        .label-box {
            padding: 2px 5px;
            background: #F2F7FF;
            border-radius: 6px;
            color: #000000;
            font-size: 12px;
            width: fit-content;
        }
    }

    .Holder-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        div{
            display: flex;
            align-items: center;
        }
        span{
            font-size: 14px;
            color: #8291A4;
        }
        img {
            margin-right: 6px;
        }

        p {
            font-size: 14px;
            color: #000000;

            span {
                margin-left: 6px;
                color: #8291A4;
            }
        }
    }
}</style>