<template>
    <div class="NewCodeInfo">
        <div class="info-button">
            <div :class="infoActive == 1 ? 'info-active':''" @click="setActive(1)">读合约</div>
            <div :class="infoActive == 2 ? 'info-active':''" @click="setActive(2)">写合约</div>
            <div :class="infoActive == 3 ? 'info-active':''" @click="setActive(3)">方法</div>
        </div>

        <div class="nabox-wallet cur" @click="connectWallet">
            <i class="info-success" v-if="accounts"></i>
            <i class="info-error" v-else></i>
            <p>连接Nabox钱包</p>
        </div>

        <div class="info-box-nav">
            <div class="box-snav">
                <img src="./img/shuben.png" alt="">
                Read Contract Information
            </div>

            <div class="nav-right">
                <span class="click">[Expand all]</span>
                <span class="click">[Reset]</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            infoActive: 1,
            accounts: false
        }
    },
    async created(){
        const accounts = await ethereum.request({ method: 'eth_accounts' })
        this.accounts = accounts[0]
        console.log(this.accounts, '======accounts')
    },
    methods:{
        async connectWallet(){
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            this.accounts = accounts[0]
            console.log(this.accounts, '========')
        },
        setActive(val){
            this.infoActive = val
        }
    }
}
</script>

<style lang="less" scoped>
.NewCodeInfo{
    .info-box-nav{
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .nav-right{
            font-size: 14px;
            span{
                margin-left: 16px;
            }
        }   
        .box-snav{
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #000000;
            img{
                margin-right: 6px;
            }
        }
    }
    .nabox-wallet{
        width: 160px;
        height: 36px;
        border-radius: 8px;
        border: 1px solid #EBEBF4;
        background: #F2F7FF;
        font-size: 14px;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 12px;
        .info-error, .info-success{
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #F64141;
            margin-right: 8px;
        }
        .info-success{
            background: #00DB82;
        }
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