<template>
  <!--HereidUsing variables to facilitate referencing the same component multiple times on the same page-->
  <div :id="id"></div>
</template>

<script>
  import G2 from '@antv/g2';
  export default {
    data () {
      return {
        chart: null
      };
    },
    props: {
      charData: {
        type: Array,
      },
      id: String
    },
    mounted () {
      setTimeout(() => {
        console.log(this.charData);
        this.drawChart(this.charData);       // The first step that comes to mind is to update the chart when creating it, but this is not suitable for asynchronous request interfaces to obtain relevant data, so the following listening method is adopted
      },500);

    },
    beforeUpdate () {
//      this.drawChart();
    },
    watch: {
      charData: function (val, oldVal) {    // monitoringcharDataWhen releasing changes, trigger this callback function to draw a chart
        this.drawChart(val);
      }
    },
    methods: {
      drawChart: function (data) {
        const chart = new G2.Chart({
          container: this.showID,
          width: parseInt(this.width) !== 0 ? parseInt(this.width) : 550,
          height: 280,
        });
        chart.source(data);
        chart.scale('value', {min: 0});
        chart.scale('year', {range: [0, 1]});
        chart.tooltip({
          crosshairs: {
            type: 'cross',
            style: {
              fill: '#7db46d',
              stroke: '#7db46d',
            }
          }
        });
        chart.line().position('year*value').color('#7db46d'); // Draw a curve chart
        chart.point().position('year*value').color('#7db46d').size(3).shape('circle').style({lineWidth: 1});
        chart.render();
      }
    }
  }
</script>

<style scoped>

</style>
