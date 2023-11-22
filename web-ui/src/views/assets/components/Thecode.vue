<template>
    <div class="Thecode">
        <div class="info-button">
            <div :class="infoActive === 3 ? 'info-active':''" @click="setActive(3)">{{$t('contractsInfo.contractsInfo0')}}</div>
            <div :class="infoActive === 1 ? 'info-active':''" @click="setActive(1)">{{$t('assets.the_contract')}}</div>
            <div :class="infoActive === 2 ? 'info-active':''" @click="setActive(2)">{{$t('assets.write_contract')}}</div>
        </div>

        <showSourceCode v-if="infoActive === 3"></showSourceCode>

        <readContract :infoActive="infoActive" v-if="infoActive !== 3"></readContract>
    </div>
</template>

<script>
import showSourceCode from './showSourceCode.vue'
import readContract from '../../contracts/components/readContract.vue'
export default {
    components: {
        showSourceCode,
        readContract
    },
    data(){
        return{
            infoActive: 3,
        }
    },
    created(){
        if(this.$route.query.infoActive){
            this.infoActive = Number(this.$route.query.infoActive) 
        }else{
            this.infoActive = 3
        }
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