const chartConfig = {
  xAxis: {
    axisLine: {
      lineStyle: {
        color: "#B3B3CF",
      },
    },
  },
  yAxis: {
    axisLine: {
      lineStyle: {
        color: "#B3B3CF",
      },
    },
  },
  lineStyle: {
    width: 1,
    color: "#5EB1FF",
  },
  itemStyle: {
    //Area chart color settings
    color: {
      type: "linear",
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: "rgba(94, 177, 255, 0.4)", // 0% Color at
        },
        {
          offset: 1,
          color: "rgba(255, 255, 255, 0)", // 100% Color at
        },
      ],
      globalCoord: false, // Default to false
    },
  },
  series: {
    showSymbol: false,//Cancel small dots on the line chart
    emphasis: {
      itemStyle: {
        color: '#5EB1FF',
        borderWidth: 1,
        borderColor: '#fff',
        shadowBlur: 10,
        shadowColor: '#5EB1FF'
      },
      scale: 2  // 放大 1.5 倍
    }
  }
};

export default chartConfig;
