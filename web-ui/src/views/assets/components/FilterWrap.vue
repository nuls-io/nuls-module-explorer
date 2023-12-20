<template>
  <div class="fliter-wrap" >
    <p class="label-wrap flex-start">
      <span>{{label}}</span>
      <img src="../img/filter.svg" alt="" @click="showFilter">
    </p>
    <div class="filter-content" v-if="visibleFilter" ref="filterContent">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'visibleFilter',
    event: 'change'
  },
  props: {
    visibleFilter: Boolean,
    label: String
  },
  watch: {
    visibleFilter(val) {
      if (val) {
        this.addClickListener()
      } else {
        this.removeClickListener()
      }
    }
  },
  mounted() {
    
  },
  methods: {
    addClickListener() {
      document.addEventListener('click', this.handleClick)
    },
    removeClickListener() {
      document.removeEventListener('click', this.handleClick)
    },
    handleClick(e) {
      if (e.target && this.$refs.filterContent.contains(e.target)) {
        //
      } else {
        this.hideFilter()
      }
    },
    showFilter() {
      this.$emit('change', true)
    },
    hideFilter() {
      this.$emit('change', false)
    }
  }
}
</script>

<style lang="less">
  .fliter-wrap {
    position: relative;
    z-index: 9;
    div {
      display: block !important;
      padding: 0 !important;
      line-height: initial !important;
    }
    .label-wrap {
      img {
        margin-left: 6px;
        cursor: pointer;
      }
    }
    .filter-content {
      position: absolute;
      // left: calc(100% - 25px);
      top: calc(100% - 5px);
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15)
    }
  }
</style>