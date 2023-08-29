<template>
    <div class="destroyList">
        <div class="w1200">
            <p class="destroy-title">Burned Address List</p>

            <el-table :data="tableData" style="width: 100%" :cell-class-name="cellClassName">
                <el-table-column label="Address" min-width="150">
                    <template slot-scope="scope">
                        <div class="lineGhei">{{ scope.row.address }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="Label" min-width="150">
                    <template slot-scope="scope">
                        <div class="lineGhei">
                            <span class="label-box">{{ scope.row.date }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="Quantity（NULS）" min-width="150">
                    <template slot-scope="scope">
                        <div class="lineGhei">{{ scope.row.name }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="Percentage" min-width="150">
                    <template slot-scope="scope">
                        <div class="lineGhei">{{ scope.row.s }}</div>
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
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                s: 'sssssss'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                s: 'sssssss'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                s: 'sssssss'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                s: 'sssssss'
            }]
        }
    },
    methods:{
        cellClassName({row, column, rowIndex, columnIndex}){
            if(columnIndex === 0){
                return 'custom-style-left'
            }
            if(columnIndex === 3){
                return 'custom-style-right'
            }
        },
    }
}
</script>

<style lang="less">
.destroyList {
    background-color: #F9FAFD;

    .w1200 {
        .destroy-title {
            font-size: 20px;
            color: #000000;
            font-weight: 600;
            padding: 24px 0;
        }
        .el-table{
            border-radius: 12px;
            background: #FFFFFF;
            border: 1px solid #EBEBF4;
            padding-bottom: 40px;
            &::before{
                background-color: initial;
            }
            .cell{
                padding: 0 38px;
            }
            th,td,tr{
                background: #FFFFFF;
            }
            .el-table__header-wrapper{
                border-bottom: 1px solid #E9E9F8;
            }
            th{
                .cell{
                    font-size: 14px;
                    color: #000000;
                }
            }
            td{
                .cell{
                    border-bottom: 1px solid #E9E9F8;
                }
            }
            .lineGhei{
                line-height: 46px;
                white-space: nowrap;
                .label-box{
                    width: fit-content;
                    height: fit-content;
                    padding: 4px 6px;
                    height: 30px;
                    border-radius: 6px;
                    background: #F2F7FF;
                }
            }
            .custom-style-right{
                .cell{
                    margin-right: 16px;
                }
            }
            .custom-style-left{
                .cell{
                    margin-left: 16px;
                }
            }
        }
    }
}

@media (max-width: 1220px){
    .destroyList{
        .w1200{
            width: initial;
            padding: 0 .5rem;
            .destroy-title{
            }
        }
    }
}

</style>