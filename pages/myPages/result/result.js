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
    resultsTreeList:[],
    resultDetail:{},
    ShiTiArray:[],
    ShiTiIndex: 0,
    shiTiId:"",
    resultsTreeDetailList:[],
    nengliArr:[],
    userInfo:{},
    showDetailBoolean:false

  },
  onShareAppMessage() {
    return {
      title: '数据成熟度工具',
      path: 'pages/index/index'
    }
  },

  onReady() {
    console.log('onReady')
    this.setData({
      ShiTiArray:app.globalData.shiTiZiDianArray,
      shiTiId:wx.getStorageSync("ShiTi").dictValue
    })
    //初始化雷达图 但不填充数据
    this.init_echarts();

    if(this.data.shiTiId=="003"){
      this.index()
    }else{

    }


    var that = this;
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
            that.setData({
              userInfo:res.userInfo
            })
            }
          })
        }
      }
    })
  },
  onShow(){
    var that =this;
    this.setData({
      ShiTiIndex:app.globalData.shiTiIndex||0,
      shiTiId:wx.getStorageSync("ShiTi").dictValue
    })
    console.log('onShow')
    if(this.data.shiTiId=="003"){
      if(app.globalData.reloadResults){
        app.globalData.reloadResults=false
        console.log('刷新答题记录列表')
        that.index()
      }
    }else{
        that.getResultTree(function (){
          that.setMyOption(that.getOption2());
        },function(){})
        
    }
    
  },
  index(){
    var that =this;
    //获取答题列表
    that.getResultsList(function aaa(data) {
        if(data.list.length==0){
          return;
        }
        for (var i = 0; i < data.list.length; i++) {
          //所属试题
          var shiti=app.globalData.shiTiZiDianKeyValue[data.list[i].testSelect]
          data.list[i].testSelect=shiti ? shiti.name: data.list[i].testSelect
          data.list[i].testSelectRemarks=shiti ? shiti.remarks :""
        }
        that.setData({
          resultsList:data.list
        })

        //关闭下拉刷新
        that.stopPullDownRefresh();

        var params = {id :data.list[0].id}
        a.a_result_detail(params,
          function success(data){
            wx.setStorageSync('aresultDetailsList', data.aresults.aresultDetailsList);
            that.setMyOption(that.getOption1())
        },function fail(data){
        })
    },function bbb(data) {
    });
  },
  //初始化图表
  init_echarts: function () {
    this.selectComponent('#mychartRadar').init((canvas, width, height) => {
      // 初始化图表
      myChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return myChart;
    });
  },
  setMyOption: function (option) {
    // myChart.clear();  // 清除
    if(myChart==null){
      setTimeout(function(){
        myChart.setOption(option);  //填充数据
      },1000)
    }else{
    myChart.setOption(option);  //填充数据
    }
  },

  getOption1: function () {


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
    legend: {
        data: []
    },
    radar: {
      shape: 'circle',
      indicator: results.names
    },
    series: [{
      name: '数据成熟度',
      type: 'radar',
      // tooltip: {
      //   trigger: 'item'
      // },
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [{
        value: results.values,
        name: results.titles[0]
      }
      ]
    }]
  };
  return option;
  },
   getOption2: function (index) {
    var nengliArr= this.data.resultsTreeList[index||0].resultsTreeDetailList;
    var keys=[];var values=[];
    for(var i=0;i<nengliArr.length;i++){
        keys.push({name:nengliArr[i].key,max:5});
        values.push(nengliArr[i].value);
    }
    // var option=this.getOption2(keys,values);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#FF9F7F"],
    tooltip: {},
    legend: {
        data: ['销售']
    },
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    legend: {
        data: []
    },
    radar: {
      shape: 'circle',
      indicator: keys
    },
    series: [{
      name: '数据成熟度',
      type: 'radar',
      // tooltip: {
      //   trigger: 'item'
      // },
      itemStyle: {normal: {areaStyle: {type: 'default'}}},
      data: [{
        value: values,
        name: '销售'
      }
      ]
    }]
  };
  return option;
  },

  getResultsList(doSuccess, doFail){
    var params ={
            testUser:{
              userName:app.globalData.memberInfo.user.userName,
              userCode:app.globalData.memberInfo.user.userCode
            },
            testSelect:"",
            createDate_gte:"",
            createDate_lte:"",
            status:"0",
            pageNo:1,
            pageSize:3,
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
        that.setMyOption(that.getOption1())
    },function fail(data){
        // console.log(data);
        // doFail(data)
    })

  },

  onPullDownRefresh() {
    // this.index()
    console.log('onPullDownRefresh', new Date())
  },

  stopPullDownRefresh() {
    wx.stopPullDownRefresh({
      complete(res) {
        console.log(res, new Date())
      }
    })
  },
  bindPickerChange(e){
    var that=this;
    this.saveShiti(e.detail.value);
    this.setData({   //给变量赋值
      ShiTiIndex: e.detail.value,  //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
      shiTiId: wx.getStorageSync("ShiTi").dictValue
    });
    if(this.data.shiTiId=="003"){
      this.index();
    }else{
      this.getResultTree(function(){
        that.setMyOption(that.getOption2());
      },function(){});
    }
 },
 saveShiti(index){
  wx.setStorageSync('ShiTi',this.data.ShiTiArray[index])
  app.globalData.shiTiIndex=index;
 }, 
  getResultTree(doSuccess, doFail){
    var that=this;
      var params ={
        userCode:{
          userName:app.globalData.memberInfo.user.userName,
          userCode:app.globalData.memberInfo.user.userCode
        },
        status:"0",
        title:this.data.shiTiId,
        pageNo:1,
        pageSize:3
      };


      a.a_result_tree_list(params,
        function success(data){
          for(var i=0;i<data.list.length;i++){
            if(data.list[i].analysis.replace(/'/g,"\"") =="") {
              continue
            }
            var nengli =JSON.parse(data.list[i].analysis.replace(/'/g,"\""));
            var nengliArr=[]
              for(var key in nengli){  
                nengliArr.push(
                {key:key,
                value:nengli[key]}

                )
            }  
            data.list[i].resultsTreeDetailList=nengliArr
          }
          that.setData({
            resultsTreeList:data.list
          })
        doSuccess();
      },function fail(data){
        doFail();
          // console.log(data);
      })
  },
  showDetail(){
    this.setData({showDetailBoolean:!this.data.showDetailBoolean});
  }

});
