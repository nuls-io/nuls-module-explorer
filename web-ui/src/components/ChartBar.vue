<template>
  <div :id=showID></div>
</template>

<script>
  import G2 from '@antv/g2';

  export default {
    props: {showID: String, chartData: Array, width: String},
    data() {
      return {
        chartName: null,
      }
    },
    mounted() {
    },
    watch: {
      chartData: function (val) {
        //console.log('new: %s, old: %s', val, oldVal);
        if (this.chartName) {
          this.chartName.destroy();
        }
        this.drawChart(val);
      }
    },
    methods: {
      drawChart(data) {
        this.chartName = new G2.Chart({
          container: this.showID,
          width: parseInt(this.width) !== 0 ? parseInt(this.width) : 550,
          height: 280,
        });
        this.chartName.source(data);
        this.chartName.line().position('year*value').color('#7db46d'); // 绘制曲线图
        this.chartName.point().position('year*value').color('#7db46d').size(3).shape('circle').style({lineWidth: 1});
        this.chartName.render();
      }
    },
  }
</script>

<style scoped>

</style>
