<template>
  <!--此处的id用变量，方便同一页面引用多次相同的组件-->
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
        this.drawChart(this.charData);       // 第一步想到的是创建的时候更新图表，但是这个不适用于异步请求接口获取相关数据，所以采用下面的监听的方式
      },500);

    },
    beforeUpdate () {
//      this.drawChart();
    },
    watch: {
      charData: function (val, oldVal) {    // 监听charData，当放生变化时，触发这个回调函数绘制图表
        console.log('new: %s, old: %s', val, oldVal);
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
        chart.line().position('year*value').color('#7db46d'); // 绘制曲线图
        chart.point().position('year*value').color('#7db46d').size(3).shape('circle').style({lineWidth: 1});
        chart.render();
      }
    }
  }
</script>

<style scoped>

</style>
