var startRequest = require("../myPages/api/startRequest.js")
var a = require("../myPages/api/a.js")

const app = getApp()

Page({
  onShow() {
    wx.reportAnalytics('enter_home_programmatically', {})
  },
  onShareAppMessage() {
    return {
      title: '数据成熟度工具',
      path: 'pages/index/index'
    }
  },
  onLoad: function() {
    var that = this;
   // var time= setInterval(function(){
      // console.log("等待1秒")
      // if(app.globalData.jeesite_sessionid){
        that.getHomePage();
        // clearInterval(time);
    //   }
    // }, 1000)
    // ;
  },
  data: {
    homeDes:""
  },


  getUserInfo(data){
    //encryptedData
    //signature
    console.log(data)
    var userInfo = data.userInfo
    var nickName = userInfo.nickName
    var avatarUrl = userInfo.avatarUrl
    var gender = userInfo.gender //性别 0：未知、1：男、2：女
    var province = userInfo.province
    var city = userInfo.city
    var country = userInfo.country

    
  },
  getHomePage(){
    var that =this;
    a.a_homePage(
      function success(data){
        that.setData({
        homeDes:data.list[0].testTextarea
      });

    },function fail(data){
        // console.log(data);
    })
  },
  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
    wx.reportAnalytics('click_view_programmatically', {})
  }
  ,
  start(e) {
    wx.navigateTo({
    url: '../myPages/questions/questions'
    })
  },
  getPhoneNumber: function (e) {
    var that=this;
  // 参数e是绑定的授权方法自动传入过来的, 主要是为了拿到vi和encryptedData值从后台换取用户联系方式
        if ("getPhoneNumber:ok" != e.detail.errMsg){
          wx.showToast({
            icon:'none',
            title: '快捷登陆失败'
          })
          return;
        }
        var params = {}
        params.iv = e.detail.iv;
        params.encrypted = e.detail.encryptedData;
        params.sessionkey =  wx.getStorageSync('sessionKey');

        //调用后台接口获取用户手机号码
       a.a_wx_getphone(
          params,
          function success(data){
           // 获取到的手机号码
            var phone = data.phone;
          },
          function fail(msg){
         }
    )
  }
})
