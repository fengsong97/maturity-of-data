var startRequest = require("../api/startRequest.js")
var a = require("../api/a.js")
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'pages/component/pages/swiper/swiper'
    }
  },
onLoad: function() {
  this.getQuestions();
},
  data: {
    lists: [],
    answers:[],
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
    a.a_questions(
      function success(data){
        that.setData({
          lists:data.list
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
      currentIndex: e.detail.current
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
  submit(e) {
    var that=this;
    if(that.data.answers.length==0){
      wx.showToast({
        title: '请作答',
        icon: 'success',
        duration: 2000
      })
      return;
    }

    wx.setStorageSync('answers',  that.data.answers);
    wx.setStorageSync('answers_title',  that.data.answers[0]?that.data.answers[0].testSelect:"默认");
    wx.showModal({
      title: '确认提交吗?',
      content: '已答'+that.data.answers.length+'题,共'+that.data.lists.length+'题',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.switchTab({
            url: '/pages/myPages/result/result'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})
