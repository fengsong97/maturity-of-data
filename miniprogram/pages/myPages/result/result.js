import * as echarts from '../ec-canvas/echarts';

const app = getApp();
// 0: "0_1155000075046084608_您所在的单位/业务领域是否制定了数据战略规划？_1155030816359333888_3"
// 1: "1_1155000051230826496_数据战略规划_1155000051398598656_1"
// 2: "2_1155637119227740160_数据战略实施_1189805214162796544_4"


function initChart(canvas, width, height) {
  console.log('initChart')
  var answers_title =  wx.getStorageSync('answers_title');
  var answers =  wx.getStorageSync('answers');

    var results={
      titles :"",
      names :[],
      values: []
      // titles:["数据成熟度评估"],
      // names:[{
      //     name: '数据战略规划1',
      //     max: 5
      //   },{
      //     name: '数据战略规划2',
      //     max: 5
      //   },{
      //     name: '数据战略规划3',
      //     max: 5
      //   }],
      // values :[1,2,3] 
    };

  for (var i = 0; i < answers.length; i++) {
    results.titles = answers_title;
    results.names.push({name:answers[0].split("_")[2], max:5 });
    results.values.push(answers[0].split("_")[4])
  }




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
        data: results.titles
    },
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      shape: 'circle',
      indicator: results.names
    },
    series: [{
      name: '数据成熟度',
      type: 'radar',
      data: [{
        value: results.values,
        name: results.titles[0]
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
  },
  onShow(){
    console.log('radar show')
    this.data.ec.onInit=initChart
  }
});
