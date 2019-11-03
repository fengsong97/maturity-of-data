const config = require('./config')
var a = require("pages/myPages/api/a.js")

App({
  onLaunch(opts) {
    console.log('App Launch', opts)
    wx.getSystemInfoSync();
    this.getWxSetting();
  },
  onShow(opts) {
    console.log('App Show', opts)
  },
  onHide() {
    console.log('App Hide')
  },
  /**
     * 获取微信用户信息
     */
    getWxSetting: function() {
        var that = this;
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            that.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            // if (this.userInfoReadyCallback) {
                            //     this.userInfoReadyCallback(res)
                            that.wxLogin();
                            // }

                        }
                    });


                } 
                // 如果为授权，每次进入小程序都要询问是否授权
                else {
                  console.log("未授权用户信息")
                }
            }
        })
    },

    /**
     * 微信登录，在用户授权成功后登录，否则不登录
     */
    wxLogin: function() {
        var that = this;
        // 微信登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                console.log(res);
                a.a_wx(res.code,
                  function success(data){
                   that.globalData.openId = data.openid;
                   that.globalData.sessionKey = data.session_key;
                   wx.setStorageSync('sessionKey',  data.session_key);
                  that.getWxUserInfo(data);
                },function fail(error){
                    console.log("location_error : " + error);
                    wx.showModal({
                      title: "业务登录失败",
                      content: error
                    });
                    
                })
            }
        })
    },
    getWxUserInfo: function(data) {
        var that = this;
        //后台注册,并登录
        a.a_sign_in(that.globalData,
          function success(data){
                   that.globalData.memberInfo=data;
                   wx.setStorageSync('jeesite_sessionid',  data.sessionid);
                   that.globalData.jeesite_sessionid=data.sessionid;
                   
                    wx.switchTab({
                      url: '/pages/index/index'
                    });
                   // wx.showModal({
                   //    title: "登录成功",
                   //    content: data.message
                   //  });
         },function fail(error){
                    console.log("location_error : " + error);
                    wx.showModal({
                      title: "登录fail",
                      content: error
                    });
                    
         }
        )
    },
    globalData: {
        systemInfo: wx.getSystemInfoSync(),
        openId: null,
        sessionKey: null,
        jeesite_sessionid: null,
        userInfo: null,
        memberInfo: null //,
        // baseUrl: "http://localhost"
    }



})
