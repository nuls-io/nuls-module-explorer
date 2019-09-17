<template>
  <label class="number-grow-warp">
    <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">{{value}}</span>
  </label>
</template>

<script>
  export default {
    props: {
      time: {
        type: Number,
        default: 2
      },
      value: {
        type: Number,
        default: 720000
      }
    },
    mounted() {
      this.numberGrow(this.$refs.numberGrow);
    },
    methods: {
      numberGrow(ele) {
        let _this = this;

        //let step = (_this.value * 50) / (_this.time * 1000);
        let step = 1;
        let current = 0;
        let start = _this.value;
        if(_this.value > 1000){
          start = _this.value-100;
        }
        let t = setInterval(function () {
          start += step;
          if (start > _this.value) {
            clearInterval(t);
            start = _this.value;
            t = null
          }
          if (current === start) {
            return
          }
          current = start;
          ele.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
        }, 10)
      }
    },
    watch:{
      value(curVal,oldVal){
        //console.log(curVal,oldVal);
        if(curVal !== oldVal){
          this.numberGrow(this.$refs.numberGrow);
        }
      },
    }
  }
</script>

<style>
  .number-grow-warp {
    transform: translateZ(0);
  }

  .number-grow {
    margin: 0 0 0 5px;
  }
</style>
