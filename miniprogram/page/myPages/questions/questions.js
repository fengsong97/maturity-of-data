var startRequest = require("../api/startRequest.js")
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
onLoad: function() {
  this.getQuestions();
},
  data: {
    lists: []
    // {id:'01',text:" '2011年1月，微信1.0发布''同年5月，微信2.0语音对讲发布''10月，微信3.0新增摇一摇功能'???",answers:[{id:"01",text:"A: aaaa"},{id:"02",text:"B: bbbb"}]},
    // {id:'02',text:" '2011年1月，微信1.0发布''同年5月，微信2.0语音对讲发布''10月，微信3.0新增摇一摇功能'???",answers:[{id:"01",text:"A: aaaa"},{id:"02",text:"B: bbbb"}]},
    // {id:'03',text:" '2011年1月，微信1.0发布''同年5月，微信2.0语音对讲发布''10月，微信3.0新增摇一摇功能'???",answers:[{id:"01",text:"A: aaaa"},{id:"02",text:"B: bbbb"}]},
    // {id:'04',text:" '2011年1月，微信1.0发布''同年5月，微信2.0语音对讲发布''10月，微信3.0新增摇一摇功能'???",answers:[{id:"01",text:"A: aaaa"},{id:"02",text:"B: bbbb"}]},
    // ]
    ,
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    currentIndex: 0,
    disable: false
  },
  getQuestions(){
    var that =this;
    startRequest.postData("a/gen/questions/listData.json",{},
      function success(data) {
      console.log(data);
      
      that.setData({
        lists:data.list
      })
    },function fail(data) {
      console.log(data)
      // body...
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
      currentIndex: e.detail.current
    })
    console.log(this.data.currentIndex)
  },
  submit(e) {
    wx.showModal({
      title: '确认提交吗?',
      content: '已答2题,共10题',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.switchTab({
            url: '/page/myPages/result/result'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})
