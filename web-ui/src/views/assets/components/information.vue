<template>
    <div class="information">
        <p class="in-gaishu">{{$t('assets.Overview')}}</p>

        <p class="in-neirong">
            Pay and receive payments in cryptocurrency anytime, anywhere, and use any cryptocurrency for free.
        </p>

        <p class="in-gaishu">{{$t('assets.market')}}</p>
        <div class="in-gengduo">
            <p class="in-margin">{{$t('assets.Volume',{time: '2'})}}</p>
            <p >$5,781,078.00</p>
        </div>
        <div class="in-gengduo">
            <p class="in-margin">{{$t('assets.Market_value')}}</p>
            <p>$5,657,480,532.88</p>
        </div>
        <div class="in-gengduo">
            <p class="in-margin">{{$t('assets.Circular_supply')}}</p>
            <p>120,175,840.00 WETH</p>
        </div>

        <p class="in-from">{{$t('assets.data_sources')}}：<span class="click">Coinmarketcap</span></p>
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
