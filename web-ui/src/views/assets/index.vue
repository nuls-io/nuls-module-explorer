<template>
    <div class="assets">
        <div class="assets-container w1200">
            <el-tabs v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane label="ALL" name="first">用户管理</el-tab-pane>
                <el-tab-pane label="链资产" name="ssss">用户管理</el-tab-pane>
                <el-tab-pane label="NRC20" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="NRC721" name="third">角色管理</el-tab-pane>
                <el-tab-pane label="NRC1155" name="fourth">定时任务补偿</el-tab-pane>
            </el-tabs>
        </div>

        <div class="assets-table w1200">
            <p class="table-titile">A total of  1,271 Token Contracts found</p>
            <el-table :data="tableData" style="width: 100%" :cell-class-name="cellClassName">
                <el-table-column label="ID">
                    <template slot-scope="scope">
                        <div>{{ scope.row.date }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="Token">
                    <template slot-scope="scope">
                        <div>{{ scope.row.date }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="Native Chain">
                    <template slot-scope="scope">
                        <div>{{ scope.row.date }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="流通量">
                    <template slot-scope="scope">
                        <div>{{ scope.row.date }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="持有人">
                    <template slot-scope="scope">
                        <div>{{ scope.row.date }}</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'first',
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
        .table-titile{
            font-size: 14px;
            color: #000000;
            padding-bottom: 12px;
            padding-top: 12px;
        }
        .el-table{
            th{
                .cell{
                }
            }
            td{
                border-bottom: 1px solid #E9E9F8 !important;
                
            }
        }
        .el-table::before{
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
</style>