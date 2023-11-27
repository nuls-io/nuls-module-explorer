<template>
    <div class="destroyList">
        <div class="w1200">
            <p class="destroy-title">{{$t('assets.BurnedList')}}</p>
            <el-table :data="tableData" style="width: 100%" :cell-class-name="cellClassName">
                <el-table-column :label="$t('assets.Address')" min-width="260">
                    <template slot-scope="scope">
                        <div class="lineGhei">{{ scope.row.address }}</div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('assets.label')" min-width="180">
                    <template slot-scope="scope">
                        <div class="lineGhei">
                            <span class="label-box">{{ scope.row.type }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('assets.Quantity')" min-width="150">
                    <template slot-scope="scope">
                        <div class="lineGhei">{{ toThousands(scope.row.value)  }}</div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('assets.assetInfo32')" min-width="150">
                    <template slot-scope="scope">
                        <div class="lineGhei">{{ scope.row.proportion }}</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { toThousands } from '@/api/util'
import { mapState } from 'vuex';
export default {
    data() {
        return {
            tableData: [],
            toThousands
        }
    },
    computed:{
        ...mapState(['NULSNumber'])
    },
    created(){
        this.tableData = this.NULSNumber.destroyInfoList
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
    padding-bottom: 100px;
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
            th{
                .cell{
                    font-size: 14px;
                    color: #000000;
                }
            }
            td{
                padding: 0 !important;
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
            tr{
                th{
                    background: #FFFFFF !important;
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