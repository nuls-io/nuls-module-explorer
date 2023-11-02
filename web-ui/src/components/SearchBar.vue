<template>
  <div class="search-container" v-if="true">
    <div class="search-scroll">
      <div class="search-centent">
        <p class="style1">Tokens</p>
        <div class="style2">
          <img src="../assets/img/destroyed.svg" alt="" />
          <p class="sysmol font14">NULS</p>
          <p class="monys font12">$0.21</p>
        </div>
        <p class="style3">0xa2791bdf2d5055cda4d46ec17f9f429568275047</p>
        <p class="style3">http://www.nuls.io</p>
      </div>
      <div class="search-centent">
        <p class="style1">Tokens</p>
        <div class="style2">
          <img src="../assets/img/destroyed.svg" alt="" />
          <p class="sysmol font14">NULS</p>
          <p class="monys font12">$0.21</p>
        </div>
        <p class="style3">0xa2791bdf2d5055cda4d46ec17f9f429568275047</p>
        <p class="style3">http://www.nuls.io</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less">
.search-container {
  width: 518px;
  height: 235px;
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
    width: 500px;
    height: 220px;
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
    padding-bottom: 16px;
    padding-top: 16px;
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
      }
    }
    .style3 {
      color: #4a4f55;
      font-size: 14px;
    }
  }
}
</style>