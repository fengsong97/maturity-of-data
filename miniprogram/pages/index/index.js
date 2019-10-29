var startRequest = require("../myPages/api/startRequest.js")
Page({
  onShow() {
    wx.reportAnalytics('enter_home_programmatically', {})
  },
  onShareAppMessage() {
    return {
      title: '数据成熟度小工具',
      path: 'pages/index/index'
    }
  },
  onLoad: function() {
    this.getHomePage();


    var that = this;

    wx.login({
      success(data){
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userInfo']) {
              wx.authorize({
                scope: 'scope.userInfo',
                success (userInfo) {
                  that.getUserInfo(userInfo);
                }
              })
            }else{
              // 必须是在用户已经授权的情况下调用
                wx.getUserInfo({
                  success: function(res) {
                    that.getUserInfo(res);
                    
                  }
                })
            }
          }
    })
      },fail(data){
        console.log(data)
      }
    })
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope

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
    startRequest.postData("a/gen/article/listData.json",{},
      function success(data) {
      console.log(data);

      that.setData({
        homeDes:data.list[0].testTextarea
      })
    },function fail(data) {
      console.log(data)
      // body...
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
  }
})
