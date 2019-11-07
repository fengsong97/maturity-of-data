import * as echarts from '../ec-canvas/echarts';

const app = getApp();
// 0: "0_1155000075046084608_您所在的单位/业务领域是否制定了数据战略规划？_1155030816359333888_3"
// 1: "1_1155000051230826496_数据战略规划_1155000051398598656_1"
// 2: "2_1155637119227740160_数据战略实施_1189805214162796544_4"
var myChart = null;


Page({

	data: {
	windowWidth:app.globalData.systemInfo.windowWidth,
	windowHeight:app.globalData.systemInfo.windowHeight,
   ec: {
      lazyLoad: true // 延迟加载
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
    this.echartsComponnet = this.selectComponent('#mychartRadar');
    if (!myChart){
      this.init_echarts(); //初始化图表
    }else{
      this.setOption(myChart); //更新数据
    }
  },
  //初始化图表
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      myChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setMyOption(myChart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return myChart;
    });
  },
  setMyOption: function (myChart) {
    // myChart.clear();  // 清除
    myChart.setOption(this.getOption());  //获取新数据
  },

  getOption: function () {
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
    results.names.push({name:answers[i].split("_")[2], max:5 });
    results.values.push(answers[i].split("_")[4])
  }

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
  console.log(option)
  return option;
  }
});
