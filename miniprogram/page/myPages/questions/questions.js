Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    lists: [
    {id:'01',text:" '2011年1月，微信1.0发布''同年5月，微信2.0语音对讲发布''10月，微信3.0新增摇一摇功能'???",answers:[{id:"01",text:"A: aaaa"},{id:"02",text:"B: bbbb"}]},
    {id:'02',text:" '2011年1月，微信1.0发布''同年5月，微信2.0语音对讲发布''10月，微信3.0新增摇一摇功能'???",answers:[{id:"01",text:"A: aaaa"},{id:"02",text:"B: bbbb"}]},
    {id:'03',text:" '2011年1月，微信1.0发布''同年5月，微信2.0语音对讲发布''10月，微信3.0新增摇一摇功能'???",answers:[{id:"01",text:"A: aaaa"},{id:"02",text:"B: bbbb"}]},
    {id:'04',text:" '2011年1月，微信1.0发布''同年5月，微信2.0语音对讲发布''10月，微信3.0新增摇一摇功能'???",answers:[{id:"01",text:"A: aaaa"},{id:"02",text:"B: bbbb"}]},
    ],
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
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
  }
})
