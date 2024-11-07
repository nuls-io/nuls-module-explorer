<template>
  <a :href="address" target="_blank" v-if="isExternal"><slot /></a>
  <router-link v-else tag="a" :to="address"><slot /></router-link>
</template>
<script>
export default {
  props: {
    address: String,
  },
  computed: {
    isExternal() {
      if (typeof this.address !== "string") return false;
      return this.address.startsWith('http') || this.address.startsWith('https')
    },
  },
};
</script>
<style></style>
