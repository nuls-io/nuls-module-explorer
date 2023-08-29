<template>
    <div class="information">
        <p class="in-gaishu">概述</p>

        <p class="in-neirong">
            随时随地以加密货币支付和接受支付，使用任何加密货币，都是免费的。
        </p>

        <p class="in-gaishu">市场</p>
        <div class="in-gengduo">
            <p class="in-margin">成交量（24小时）</p>
            <p >$5,781,078.00</p>
        </div>
        <div class="in-gengduo">
            <p class="in-margin">市值</p>
            <p>$5,657,480,532.88</p>
        </div>
        <div class="in-gengduo">
            <p class="in-margin">循环供应</p>
            <p>120,175,840.00 WETH</p>
        </div>

        <p class="in-from">市场数据来源：<span class="click">Coinmarketcap</span></p>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    }
}
</script>

<style lang="less">
    .information{
        padding: 0 24px 24px;
        .in-from{
            font-size: 12px;
            color: #000000;
            margin-top: 12px;
        }
        .in-gengduo{
            display: flex;
            align-items: center;
            margin-bottom: 4px;
            span{
                font-size: 14px;
                color: #000000;
            }
            .in-margin{
                width: 200px;
            }
        }
        .in-gaishu{
            font-size: 14px;
            color: #4A4F55;
            margin-bottom: 12px;
        }
        .in-neirong{
            font-size: 14px;
            color: #000000;
            margin-bottom: 24px;
        }
    }
</style>