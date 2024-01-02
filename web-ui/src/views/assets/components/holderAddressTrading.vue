<template>
    <div class="asset-tx-info">
        <div v-loading="loading" class="assets-container">
            <el-table :data="txList">
                <el-table-column width="20" align="left"></el-table-column>
                <!-- <el-table-column label="#" width="40" align="left">
            <template slot-scope="scope">
              <img src="../img/yanjin.png" class="cur" alt="" @click="illustrate = false" v-if="illustrate"/>
              <img src="../img/biyan.png" class="cur" alt="" @click="illustrate = true" v-else/>
            </template>
          </el-table-column> -->
                <el-table-column :label="$t('assets.assetInfo19')" min-width="200" align="left">
                    <template slot-scope="scope">
                        <router-link tag="a" :to="{
                            path: '/Transactions/info',
                            query: { hash: scope.row.hash },
                        }" class="click">
                            {{ sliceHash(scope.row.hash) }}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('assets.model')" min-width="125">
                    <template slot-scope="scope">
                        <div class="styleBut">
                            {{ $t("type." + scope.row.txType) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('assets.assetInfo21')" min-width="160">
                    <template slot-scope="scope">{{ scope.row.time }}</template>
                </el-table-column>
                <el-table-column width="190" align="left" :label="$t('assets.from')">
                    <template slot-scope="scope">
                        <div class="flex-start" v-if="scope.row.from">
                            <router-link tag="a" :to="{
                                path: '/Accounts/info',
                                query: { address: scope.row.from },
                            }" class="click">
                                {{ superLong(scope.row.from) }}
                            </router-link>
                            <img @click="copy(scope.row.from)" src="../img/fuzhi.png" alt="" />
                        </div>
                        <span v-else>--</span>
                    </template>
                </el-table-column>
                <el-table-column label="" min-width="60">
                    <template slot-scope="scope">
                        <img src="../img/zishi.png" alt="" />
                    </template>
                </el-table-column>
                <el-table-column min-width="190" align="left" :label="$t('assets.arrive')">
                    <template slot-scope="scope">
                        <div class="flex-start" v-if="scope.row.to">
                            <router-link tag="a" :to="{
                                path: '/Accounts/info',
                                query: { address: scope.row.to },
                            }" class="click">
                                {{ superLong(scope.row.to) }}
                            </router-link>
                            <img @click="copy(scope.row.to)" src="../img/fuzhi.png" alt="" />
                        </div>
                        <span v-else>--</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('assets.assetInfo24')" min-width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.amount | toThousands }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="paging">
                <el-pagination class="pages" background layout="prev, pager, next, jumper" :total="pager.total"
                    :current-page.sync="pager.page" :page-size="pager.rows">
                </el-pagination>
            </div>
            <!-- <div class="page-wrap flex-end">
          <span v-if="showPrev" @click="prev">{{
            $t("assets.assetInfo30")
          }}</span>
          <span v-if="showNext" @click="next">{{
            $t("assets.assetInfo31")
          }}</span>
        </div> -->
        </div>
    </div>
</template>
    
<script>
import { superLong, copys, divisionDecimals } from "../../../api/util";
import FilterWrap from "./FilterWrap.vue";
import moment from "moment";
export default {
    props: {
        assetKey: String,
        decimals: Number,
    },
    components: {
        FilterWrap,
    },
    data() {
        this.txTypes = [
            { value: "0", label: "0" },
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5", label: "5" },
            { value: "6", label: "6" },
            { value: "7", label: "7" },
            { value: "8", label: "8" },
            { value: "9", label: "9" },
            { value: "10", label: "10" },
            /*
              {value: '11', label: '11'},
              {value: '12', label: '12'},
              {value: '13', label: '13'},
              {value: '14', label: '14'},
              {value: '15', label: '15'},
              {value: '16', label: '16'},
              {value: '17', label: '17'},
              {value: '18', label: '18'},
              {value: '19', label: '19'},
              {value: '20', label: '20'},
              {value: '21', label: '21'},
              {value: '22', label: '22'},
              {value: '23', label: '23'},
              */

            { value: "24", label: "24" },
            { value: "25", label: "25" },
            { value: "26", label: "26" },
            { value: "27", label: "27" },
            { value: "28", label: "28" },
            { value: "29", label: "29" },
            { value: "30", label: "30" },
            { value: "31", label: "31" },
            { value: "32", label: "32" },
            { value: "33", label: "33" },
            { value: "228", label: "228" },
            { value: "229", label: "229" },
            { value: "230", label: "230" },
            { value: "231", label: "231" },
            { value: "232", label: "232" },
            { value: "233", label: "233" },
            { value: "40", label: "40" },
            { value: "41", label: "41" },
            { value: "42", label: "42" },
            { value: "43", label: "43" }, //归于跨链交易tab
            { value: "44", label: "44" },
            { value: "45", label: "45" },
            { value: "46", label: "46" },
            { value: "47", label: "47" },
            { value: "48", label: "48" },
            { value: "49", label: "49" },
            { value: "50", label: "50" },
            { value: "51", label: "51" },
            { value: "52", label: "52" },
            { value: "53", label: "53" },
            { value: "54", label: "54" },
            { value: "55", label: "55" },
            { value: "56", label: "56" },
            { value: "60", label: "60" },
            { value: "61", label: "61" },
            { value: "62", label: "62" },
            { value: "63", label: "63" },
            { value: "64", label: "64" },
            { value: "65", label: "65" },
            { value: "66", label: "66" },
            { value: "67", label: "67" },
            { value: "68", label: "68" },
            { value: "69", label: "69" },
            { value: "70", label: "70" },
            { value: "71", label: "71" },
            { value: "72", label: "72" },
            { value: "73", label: "73" },
            { value: "74", label: "74" },
            { value: "75", label: "75" },
        ];
        return {
            illustrate: true,
            loading: true,
            txList: [],
            pager: {
                total: 0,
                page: 1,
                rows: 10,
            },
            showTypeFilter: false,
            typeFilter: "0",
            showFromFilter: false,
            fromVal: "",
            toVal: "",
            showToFilter: false,
            fromFilter: "",
            toFilter: "",
        };
    },
    watch: {
        assetKey(val) {
            if (val) {
                this.getTxList();
            }
        },
    },
    computed: {
        showPrev() {
            const pageIndex = this.pager.page;
            if (pageIndex === 1) {
                return false;
            }
            return true;
        },
        showNext() {
            const length = this.txList.length;
            const pageSize = this.pager.rows;
            if (length && length === pageSize) {
                return true;
            }
            return false;
        },
    },
    methods: {
        async getTxList() {
            const { page, rows } = this.pager;
            this.loading = true;
            const result = await this.$post(
                "/",
                "getTxsByAssetKey",
                [this.assetKey, page, rows, this.$route.query.address, this.$route.query.address],
                true
            );
            if (result.result) {
                const { list, totalCount } = result.result;
                list.map((v) => {
                    // v.balance = divisionDecimals(v.balance, this.decimals);
                    // v.rate = fixNumber(v.rate / 100, 8) + "%";
                    v.amount = divisionDecimals(v.amount, this.decimals);
                    v.time = moment(v.txTime * 1000).format("YYYY-MM-DD HH:mm:ss");
                });
                this.txList = list;
                this.pager.total = totalCount;
                this.loading = false;
            }
        },
        filterTxType(type) {
            this.typeFilter = type;
            this.pager.page = 1;
            this.showTypeFilter = false;
            this.getTxList();
        },
        filterFrom() {
            this.fromFilter = this.fromVal;
            this.pager.page = 1;
            this.showFromFilter = false;
            this.getTxList();
        },
        filterTo() {
            this.toFilter = this.toVal;
            this.pager.page = 1;
            this.showToFilter = false;
            this.getTxList();
        },
        prev() {
            this.pager.page = this.pager.page - 1;
            this.getTxList();
        },
        next() {
            this.pager.page = this.pager.page + 1;
            this.getTxList();
        },
        sliceHash(str) {
            return str.slice(0, 20) + "...";
        },
        superLong(str) {
            return superLong(str, 8);
        },
        copy(sting) {
            const a = {
                twitter: "",
                telegram: "",
                medium: "",
                discord: "",
            };
            copys(sting);
        },
    },
};
</script>
    
<style lang="less">
.asset-tx-info {
    .assets-container {
        width: 100%;

        .el-table {
            overflow: initial;
            border-radius: 0;

            .el-input__inner:focus,
            .el-button--primary:hover {
                border-color: #00DB82;
            }

            .el-button--primary {
                background: #00DB82;
                border-color: #00DB82;
            }

            .styleBut {
                width: fit-content;
                padding: 2px 5px;
                border-radius: 8px;
                background: #F2F7FF;
                font-size: 12px;
                color: #000000;
                white-space: nowrap;
            }

            tr {
                th {
                    .cell {
                        color: #000000;
                        font-size: 14px;
                    }
                }
            }
        }
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
        background-color: #00e789 !important;
    }

    .flex-start {
        display: flex;
        align-items: center;

        img {
            margin-left: 6px;
            cursor: pointer;
        }

        span {
            font-size: 14px;
            color: #000000;
        }
    }

    .total {
        display: flex;
        margin: 0 24px 16px;

        img {
            margin-right: 6px;
        }

        span {
            font-size: 14px;

            &:last-child {
                color: #8291a4;
            }
        }
    }

    .txType-filter {
        height: 280px;
        overflow-y: auto !important;

        p {
            height: 36px;
            line-height: 36px;
            padding: 0 15px;
            white-space: nowrap;
            border-bottom: 1px solid #edf1f9;
            cursor: pointer;

            &:last-child {
                border: none;
            }

            &.active,
            &:hover {
                color: #608fff;
            }
        }
    }

    .address-filter {
        padding: 15px !important;

        .el-input {
            margin: 10px 0;
            width: 280px;

            input {
                height: 36px;
                line-height: 36px;
            }
        }

        .flex-between {
            display: flex !important;

            button {
                width: 48%;
                padding: 10px 20px;
            }
        }
    }

    .to-filter {
        .filter-content {
            left: auto;
            right: 20%;
        }
    }

    .page-wrap {
        margin: 15px 0 10px 0;

        span {
            display: inline-block;
            font-size: 14px;
            padding: 3px 15px;
            margin-right: 15px;
            background: #2688f7;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;

            &:hover {
                opacity: 0.8;
            }
        }
    }
}
</style>
    