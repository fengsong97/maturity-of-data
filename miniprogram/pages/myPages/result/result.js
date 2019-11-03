import * as echarts from '../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#FF9F7F"],
    tooltip: {},
    legend: {
        data: ['数据成熟度name']
    },
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      shape: 'circle',
      indicator: [{
        name: '数据战略规划1',
        max: 5
      },
      {
        name: '数据战略规划2',
        max: 5
      },
      {
        name: '数据战略规划3',
        max: 5
      }
      ]
    },
    series: [{
      name: '数据成熟度',
      type: 'radar',
      data: [{
        value: [2, 4, 5],
        name: '数据成熟度name'
      }
      ]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({

	data: {
	windowWidth:app.globalData.systemInfo.windowWidth,
	windowHeight:app.globalData.systemInfo.windowHeight,
    ec: { 
      onInit: initChart
    }
  },
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },

  onReady() {
  }
});
