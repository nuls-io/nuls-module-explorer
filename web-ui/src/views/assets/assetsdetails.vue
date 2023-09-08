<template>
    <div class="assetsdetails">
        <div class="w1200">
            <div class="assetsdetails_title"><img src="../../assets/img/Group29.png" alt=""> Token XXXXX(USDX)</div>
        </div>

        <div class="assetsdetails_container w1200">
            <div class="a_container">
                <p class="a_title">概述</p>
                <div class="a_content">
                    <div class="row-center">
                        <p>最大总供应量</p>
                        <p>713,837,311,550 USDX</p>
                    </div>
                    <div class="row-center">
                        <p>小数点位数</p>
                        <p>18</p>
                    </div>
                    <div class="row-center">
                        <p>持有人</p>
                        <p>109,509 <span>(+0.309%)</span></p>
                    </div>
                </div>
            </div>
            <div class="a_container">
                <p class="a_title">市场</p>
                <div class="a_content">
                    <div class="row-center">
                        <p>交易笔数</p>
                        <p>1,808,998</p>
                    </div>
                    <div class="row-center">
                        <p>NULS网络流通量</p>
                        <p>$289,393,823</p>
                    </div>
                    <div class="row-center">
                        <p>网络</p>
                        <p><img class="img1" src="../../assets/img/logo.png" alt="">Ethereum</p>
                    </div>
                </div>
            </div>
            <div class="a_container">
                <p class="a_title">其他信息</p>
                <div class="a_content">
                    <div class="row-center">
                        <p>代币合约（18位小数）</p>
                        <p>0x8E870Db...d388289E1 <img class="img2" src="../../assets/img/Icon.png" alt=""></p>
                    </div>
                    <div class="row-center">
                        <p>官网</p>
                        <p><span>nuls.io</span></p>
                    </div>
                    <div class="row-center">
                        <p>社区</p>
                        <p><img class="img2" src="../../assets/img/Icon.png" alt=""></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="w1200 a_list_container">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="交易信息" name="first">
                    <Trading></Trading>
                </el-tab-pane>
                <el-tab-pane label="持有人">
                    <holder></holder>
                </el-tab-pane>
                <el-tab-pane name="second">
                    <span slot="label">代码 <img class="a_position" src="./img/dunpai.png" alt=""></span>
                    <Thecode></Thecode>
                </el-tab-pane>
                <el-tab-pane label="信息" name="fourth">
                    <information></information>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Holder from './components/Holder.vue'
import Trading from './components/Trading'
import Information from './components/information'
import Thecode from './components/Thecode'
import { getHeaderInfo} from '../../api/util'
export default {
    components:{
        Trading,
        Holder,
        Information,
        Thecode
    },
    data() {
        return {
            activeName: 'first'
        }
    },
    created(){
        if(this.$route.query.tabName){
            this.activeName = this.$route.query.tabName
        }else{
            this.activeName = "first"
        }

        getHeaderInfo()
    },
    methods:{
        handleClick(tab){
        }
    }
}
</script>

<style lang="less">
.assetsdetails {
    background-color: #F9FAFD;
    padding-bottom: 100px;
    .a_list_container{
        border-radius: 12px;
        background: #FFFFFF;
        margin-top: 24px;
    }
    .el-tabs {
        .a_position{
            position: relative;
            top: -6px;
        }
      .el-tabs__header {
        .el-tabs__nav-wrap {
            .el-tabs__nav-scroll{
                padding: 0 24px;
            }
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

    .assetsdetails_container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .a_container {
            width: 387px;
            height: 199px;
            background: #FFFFFF;
            border-radius: 12px;

            .a_title {
                font-size: 16px;
                color: #000000;
                line-height: 50px;
                border-bottom: 1px solid #E9E9F8;
                padding-left: 24px;
            }

            .a_content {
                padding: 0 24px;

                .row-center {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 14px;
                    color: #000000;
                    line-height: 50px;

                    &:not(:last-child) {
                        border-bottom: 1px solid #E9E9F8;
                    }

                    p {
                        display: flex;
                        align-items: center;
                    }

                    span {
                        color: #00DB82;
                    }

                    .img1 {
                        width: 20px;
                        border-radius: 50%;
                        margin-right: 6px;
                    }

                    .img2 {
                        width: 20px;
                        border-radius: 50%;
                        margin-left: 6px;
                    }
                }
            }
        }
    }

    .w1200 {
        .assetsdetails_title {
            padding: 24px 0;
            font-size: 20px;
            color: #000000;
            font-weight: 600;
            display: flex;
            align-items: center;

            img {
                width: 28px;
                margin-right: 6px;
            }
        }
    }
}</style>