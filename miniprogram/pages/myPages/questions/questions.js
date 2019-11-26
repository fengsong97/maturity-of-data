var startRequest = require("../api/startRequest.js")
var a = require("../api/a.js")

const app = getApp();
Page({
  onShareAppMessage() {
    return {
      title: '数据成熟度工具',
      path: 'pages/index/index'
    }
  },
onLoad: function() {
  this.getQuestions();
},
onShow:function(){
  this.setData({
  shitiTitle:wx.getStorageSync("ShiTi").dictLabel
})
},
  data: {
    shitiTitle:'',
    lists: [],
    answers:[],
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    currentIndex: 0,
    currentName: '',
    disable: false
  },
  getQuestions(){
    var that =this;
    var params={
      testSelect: wx.getStorageSync("ShiTi").dictValue,
      status:"0",
      pageNo:'1',
      pageSize:'50',
      orderBy: 'a.test_select_multiple desc'
    };
    a.a_questions(params,
      function success(data){
        that.setData({
          lists:data.list,
          currentName:data.list[0].title
        })
    },function fail(data){
        // console.log(data);
    })

  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  setIndex(e){
   var buttonid=e.target.id
   var  index=this.data.currentIndex;
    if(buttonid=='button0'&&this.data.currentIndex>0){
     index= index-1
    }else if(buttonid=='button1' &&this.data.currentIndex<(this.data.lists.length-1)){
     index= index+1
    }
    this.setData({
      currentIndex: index
    })
  },
  //轮播图的切换事件
  swiperChange(e) {
    this.setData({
      currentIndex: e.detail.current,
      currentName: this.data.lists[e.detail.current].title
    })
    console.log(this.data.currentIndex)
  },
  radioChange:function(e) {
    console.log(e);
    this.data.answers[e.currentTarget.id]=e.detail.value
    // this.setData({
    //   answers["2"]:'2'
    // })
    console.log(this.data);
  },
  toslider(index){
    this.setData({
      currentIndex: index,
      currentName: this.data.lists[index].title
    })
  },
  submit(e) {
    var that=this;

    for (var i = 0; i < that.data.lists.length; i++) {
      if(that.data.answers[i]==undefined){
         wx.showToast({
          title: '该题未答('+(i+1)+')',
          duration: 2000
        })
         that.toslider(i)
      return;
     }
   }

    // wx.setStorageSync('answers',  that.data.answers);
    wx.setStorageSync('answers_title',  that.data.answers[0]?that.data.answers[0].testSelect:"默认");
    wx.showModal({
      title: '确认提交吗?',
      content: '已答'+that.data.answers.length+'题,共'+that.data.lists.length+'题',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.result_add()



        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  result_add(){
    var obj ={id:"",
          testUser:{
            userCode: app.globalData.memberInfo.user.userCode,
            userName: app.globalData.memberInfo.user.userName,
          },
          testSelect:wx.getStorageSync("ShiTi").dictValue,
          remarks:"",
          aresultDetailsList:[]
        };
    var answers = this.data.answers;
    // "0_1155000075046084608_数据战略规划_1155030816359333888_3"
    for (var i = 0; i < answers.length; i++) {
      var aresultDetails ={
        id:"",
        status:"0",
        testTextarea : answers[i].split("_")[2],
        testSelectMultiple : answers[i].split("_")[4],
        testSelect:"0"
      }
      obj.aresultDetailsList.push(aresultDetails)
    }


  //   var obj = {"id":"",
  //             "testUser":{
  //                 "userName":"wx@冯松",
  //                 "userCode":"wx_wFNO5fBQhn_oau1"
  //             },
  //             "testSelect":"001",
  //             "remarks":"asffasdfasdf",
  //             "aresultDetailsList":[
  //                     {"status":"0",
  //                     "id":"",
  //                     "testTextarea":"111",
  //                     "testSelectMultiple":"11",
  //                     "testSelect":"0"
  //                     },{"status":"0",
  //                     "id":"",
  //                     "testTextarea":"222",
  //                     "testSelectMultiple":"22",
  //                     "testSelect":"0"
  //                     }
  //             ]
  // }

    a.a_result_add(obj,
      function success(data){
          app.globalData.reloadResults=true;
          wx.switchTab({
            url: '/pages/myPages/result/result'
          })
    },function fail(data){
        // console.log(data);
    })
  }
})
