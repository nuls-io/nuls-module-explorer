<template>
  <div class="search-container" v-if="true">
    <div class="search-scroll">
      <div class="search-centent cur" v-for="(item,index) in assetsList" :key="index" @click="toAssetInfo(item.id)">
        <p class="style1" v-if="index === 0">Tokens</p>
        <div class="style2">
          <img :src="symbolLogo(item.name)" alt="" />
          <p class="sysmol font14">{{item.name}}</p>
          <p class="monys font12">${{item.inAmount}}</p>
        </div>
        <p class="style3">{{item.contract}}</p>
        <p class="style3" v-if="item.website">{{item.website}}</p>
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
    symbolLogo(name) {
      if (name) {
        return 'https://nuls-cf.oss-us-west-1.aliyuncs.com/icon/' + name + '.png';
      }else{
        return "../assets/img/destroyed.svg"
      }
    },
    toAssetInfo(assetKey) {
      this.$router.push('/assets/details/'+assetKey)
    }
  }
};
</script>

<style lang="less">
.search-container {
  width: 100%;
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
      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 8px;
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
    }
    .style3 {
      color: #4a4f55;
      font-size: 14px;
    }
  }
}
</style>