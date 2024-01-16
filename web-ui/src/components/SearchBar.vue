<template>
  <div class="search-container" v-if="true">
    <div class="search-scroll">
      <div class="search-centent cur" v-for="(item,index) in assetsList" :key="index" @click="toAssetInfo(item)">
        <p class="style1" v-if="index === 0">Tokens</p>
        <div class="style2">
          <div class="imgstyle">
            <img :src="symbolLogo(item.symbol)" alt="" />
          </div>
          <div class="dispay">
            <div class="flex">
              <p class="sysmol font14">{{item.symbol}}</p>
              <p class="monys font12" v-if="item.price">${{item.price}}</p>
            </div>
            <p class="style3">{{item.contract}}</p>
            <p class="style3" v-if="item.website">{{item.website}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    assetsList: Array,
  },
  data() {
    return {};
  },
  methods:{
    symbolLogo(symbol) {
      if (symbol) {
        return 'https://nuls-cf.oss-us-west-1.aliyuncs.com/icon/' + symbol + '.png';
      }else{
        return "../assets/img/destroyed.svg"
      }
    },
    toAssetInfo(item) {
      this.$emit('clearModel')
      if(item.id){
        this.$router.push('/asset/'+item.id)
      }else{
        this.$router.push({
          name: 'tokenInfo',
          query: {contractAddress: item.contract, state: true}
        })
      }
    }
  }
};
</script>

<style lang="less">
.search-container {
  width: fit-content;
  height: fit-content;
  padding: 14px 0;
  position: absolute;
  z-index: 999;
  top: 52px;
  border-radius: 12px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 16px 0px rgba(16, 24, 40, 0.08);
  text-align: initial;
  .search-scroll {
    padding: 0 16px;
    width: 98%;
    height: fit-content;
    background: #ffffff;
    border-radius: 12px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: #c6d1e2;
    }
    &::-webkit-scrollbar-track {
      border-radius: 8px;
      background-color: #f2f7ff;
      border: 1px solid #f2f7ff;
    }
  }
  .search-centent {
    &:not(:last-child) {
      border-bottom: 1px solid #e9e9f8;
      padding-bottom: 16px;
    }
    &:not(:first-child){
      padding-top: 16px;
    }
    .style1 {
      color: #8291a4;
      font-size: 14px;
      margin-bottom: 16px;
    }
    .style2 {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      .imgstyle{
        width: 28px;
        height: 28px;
        margin-right: 8px;
        img {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid #D5DBE2;
        }
      }
      .sysmol {
        color: #000000;
      }
      .monys {
        color: #000000;
        padding: 5px;
        border-radius: 6px;
        background: #f2f7ff;
        margin-left: 8px;
      }
      .dispay{
        display: flex;
        flex-direction: column;
        .flex{
          display: flex;
          align-items: center;
        }
      }
    }
    .style3 {
      color: #4a4f55;
      font-size: 14px;
    }
  }
}
</style>