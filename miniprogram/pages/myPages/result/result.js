import * as echarts from '../ec-canvas/echarts';
var a = require("../api/a.js")
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
    },
  resultsList:[],
  resultDetail:{}

  },
  onShareAppMessage() {
    return {
      title: '数据成熟度工具',
      path: 'pages/index/index'
    }
  },

  onReady() {
    console.log('onReady')
    this.index()
  },
  onShow(){
    var that =this;
    console.log('onShow')
    if(app.globalData.reloadResults){
      app.globalData.reloadResults=false
      console.log('刷新答题记录列表')
      that.index()

    }
  },
  index(){
    var that =this;
    //获取答题列表
    that.getResultsList(function aaa(data) {
        that.setData({
          resultsList:data.list
        })
            var params = {id :data.list[0].id}
            a.a_result_detail(params,
              function success(data){
                wx.setStorageSync('aresultDetailsList', data.aresults.aresultDetailsList);
                that.begin()
            },function fail(data){
            })
    },function bbb(data) {
    });
  },
  begin(){
    var that =this;
    that.echartsComponnet = that.selectComponent('#mychartRadar');
    if (!myChart){
      that.init_echarts(); //初始化图表
    }else{
      that.setMyOption(); //更新数据
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
      this.setMyOption();
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return myChart;
    });
  },
  setMyOption: function () {
    // myChart.clear();  // 清除
    myChart.setOption(this.getOption());  //获取新数据
  },

  getOption: function () {


    var answers_title =  wx.getStorageSync('answers_title');
    var aresultDetailsList = wx.getStorageSync('aresultDetailsList');

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

  for (var i = 0; i < aresultDetailsList.length; i++) {
    results.titles = answers_title;
    results.names.push({name:aresultDetailsList[i].testTextarea, max:5 });
    results.values.push(aresultDetailsList[i].testSelectMultiple )
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
  return option;
  },

  getResultsList(doSuccess, doFail){
    var params ={
            testUser:{
              userName:'wx%40冯松',
              userCode:'wx_wFNO5fBQhn_oau1'
            },
            testSelect:"001",
            createDate_gte:"",
            createDate_lte:"",
            status:"0",
            pageNo:"",
            pageSize:"",
            orderBy:""
    };


    a.a_result_list(params,
      function success(data){
        console.log(data)
        doSuccess(data)
    },function fail(data){
        // console.log(data);
        doFail(data)
    })
  },
  getResultDetail(e){
    var that =this;
    var params = {id :e.currentTarget.dataset['result'].id}
    a.a_result_detail(params,
      function success(data){
        wx.setStorageSync('aresultDetailsList', data.aresults.aresultDetailsList);
        // console.log(data)
        that.begin()
    },function fail(data){
        // console.log(data);
        // doFail(data)
    })

  }
});
