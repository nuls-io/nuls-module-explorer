<template>
    <div class="Thecode">
        <div class="info-button">
            <div :class="infoActive == 1 ? 'info-active':''" @click="setActive(1)">读合同</div>
            <div :class="infoActive == 2 ? 'info-active':''" @click="setActive(2)">写合同</div>
            <div :class="infoActive == 3 ? 'info-active':''" @click="setActive(3)">方法</div>
        </div>

        <div class="row-center font24px code-title">
            <img src="../img/title-inco.png" alt="">
            合约源代码已验证（完全匹配）
        </div>

        <div class="code-container-list">
            <div class="code-list">
                <div>
                    合同名称
                    <span>CroToken</span>
                </div>
                <p class="feigei"></p>
                <div>
                    编译器版本
                    <span>v0.6.6+commit.6c089d02</span>
                </div>
            </div>

            <div class="code-list">
                <div>
                    启用优化
                    <span>是，运行200次</span>
                </div>
                <p class="feigei"></p>
                <div>
                    其他设置
                    <span>默认evm版本</span>
                </div>
            </div>
        </div>

        <div class="code-box">
            <div class="muli">
                <img src="../img/heyue-yuana.png" alt="">
                <p class="yuanma">合约源代码<span>（Solidity）</span></p>
            </div>

            <div class="code-select">
                <el-select v-model="region1" class="zi-select">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-select v-model="region2" class="zi-select">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-select v-model="region3">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </div>
        </div>

        <div class="code-other">
            <div class="cur">
                <img src="../img/copey.png" alt="">
            </div>
            <div class="cur">
                <img src="../img/lianjie.png" alt="">
            </div>
            <div class="cur">
                <img src="../img/fangda.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            infoActive: 1,
            region1: '打开',
            region2: '大纲',
            region3: '更多选择'
        }
    },
    created(){

    },
    methods:{
        setActive(val){
            this.infoActive = val
        }
    }
}
</script>

<style lang="less" scoped>
.Thecode{
    padding: 0 24px;
    padding-bottom: 24px;
    .code-other{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 12px;
        div{
            width: 30px;
            height: 30px;
            border-radius: 6px;
            border: 1px solid #F0F0F8;
            background: #F2F7FF;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 6px;
        }
    }
    /deep/.code-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        .code-select{
            .el-select{
                .el-input {
                    .el-input__inner{
                        border-radius: 6px;
                        background: #F2F7FF !important;
                        margin-left: 6px;
                        width: 120px;
                    }
                }
            }
            .zi-select{
                .el-input {
                    .el-input__inner{
                        width: 80px;
                    }
                }
            }
        }
        .muli{
            display: flex;
            align-items: center;
            img{
                margin-right: 6px;
            }
            .yuanma{
                font-size: 14px;
                color: #000000;
                span{
                    color: #8291A4;
                }
            }
        }
    }
    .code-container-list{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .code-list{
            width: 561px;
            height: 110px;
            border-radius: 12px;
            border: 1px solid #EBEBF4;
            padding: 24px;
            .feigei{
                margin: 16px 0;
                height: 1px;
                background: #E9E9F8;
            }
            div{
                font-size: 14px;
                color: #4A4F55;
                display: flex;
                align-items: center;
                justify-content: space-between;
                span{
                    color: #000000;
                }
            }
        }
    }
    .code-title{
        font-size: 14px;
        margin-top: 16px;
        margin-bottom: 24px;
        color: #000000;
        img{
            margin-right: 6px;
        }
    }
    .row-center{
        display: flex;
        align-items: center;
    }
    .info-button{
        display: flex;
        align-items: center;
        div{
            cursor: pointer;
            padding: 6px 10px;
            background: #F2F7FF;
            color: #000000;
            font-size: 14px;
            width: fit-content;
            margin-right: 16px;
            border-radius: 6px;
        }
        .info-active{
            background: #00DB82;
            color: #FFFFFF;
        }
    }
}
</style>