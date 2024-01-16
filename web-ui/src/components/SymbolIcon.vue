<template>
<!--  <img class="symbol-icon" v-lazy="iconSrc" :key="iconSrc" />-->
  <el-image :src="symbolIcon" lazy class="symbol-icon">
    <img :src="defaultIcon" alt="" slot="placeholder">
    <img :src="defaultIcon" alt="" slot="error">
  </el-image>
</template>

<script>
// import { getIconSrc } from '@/utils/util';
import defaultIcon from '../assets/img/errorimg.png'
export default {
  name: 'symbol-icon',
  props: {
    icon: String
  },
  data() {
    return {
      defaultIcon
    }
  },
  computed:{
    symbolIcon() {
      const icon = this.icon
      if (!icon) {
        return ''
      }
      if (icon.startsWith('http') || icon.startsWith('https')) {
        return icon
      } else {
        return 'https://nuls-cf.oss-us-west-1.aliyuncs.com/icon/' + this.icon + '.png';
      }
    }
  }
};
</script>

<style lang="less">
.symbol-icon {
  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
}
</style>
