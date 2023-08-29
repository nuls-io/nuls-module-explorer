<template>
    <div class="Trading">
        <div class="Trading-title">
            <img src="../img/buno21.png" alt="">
            <p>发现超过 3,418,029 笔交易<span>（显示最近10k条记录）</span></p>
        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="#" width="60">
                <template slot-scope="scope">
                    <img src="../img/yanjin.png" class="cur" alt="">
                </template>
            </el-table-column>
            <el-table-column label="交易哈希值" width="180">
                <template slot-scope="scope">
                    <p class="click">0x87939b2015cc288...</p>
                </template>
            </el-table-column>
            <el-table-column label="方式">
                <template slot-scope="scope">
                    <p class="label-box">
                        转移
                    </p>
                </template>
            </el-table-column>
            <el-table-column label="时间">
                <template slot-scope="scope">
                    <span>1分钟前</span>
                </template>
            </el-table-column>
            <el-table-column label="转出地址" width="180">
                <template slot-scope="scope">
                    <div class="row-center">
                        <span class="click">0x33566c9...9d75836</span>
                        <img style="margin-left:6px;" src="../img/fuzhi.png" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="" align="center">
                <template slot-scope="scope">
                    <img src="../img/zishi.png" alt="">
                </template>
            </el-table-column>
            <el-table-column label="接收地址" width="180">
                <template slot-scope="scope">
                    <div class="row-center">
                        <span class="click">0x33566c9...9d75836</span>
                        <img style="margin-left:6px;" src="../img/fuzhi.png" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="数量">
                <template slot-scope="scope">
                    <p>26,000,000</p>
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
.Trading {
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

    .Trading-title {
        display: flex;
        align-items: center;

        img {
            margin-right: 6px;
        }

        p {
            font-size: 14px;
            color: #000000;

            span {
                color: #8291A4;
            }
        }
    }
}</style>