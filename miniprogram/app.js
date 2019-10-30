const config = require('./config')
var a = require("pages/myPages/api/a.js")

App({
  onLaunch(opts) {
    console.log('App Launch', opts)
    this.getWxSetting();
  },
  onShow(opts) {
    console.log('App Show', opts)
  },
  onHide() {
    console.log('App Hide')
  },
  // globalData: {
  //   hasLogin: false,
  //   openid: null
  // },
  // lazy loading openid
  getUserOpenId(callback) {
    const self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success(data) {
          wx.request({
            url: config.openIdUrl,
            data: {
              code: data.code
            },
            success(res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  },
  // 通过云函数获取用户 openid，支持回调或 Promise
  getUserOpenIdViaCloud() {
    return wx.cloud.callFunction({
      name: 'wxContext',
      data: {}
    }).then(res => {
      this.globalData.openid = res.result.openid
      return res.result.openid
    })
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
                    // wx.authorize({
                    //     scope: 'scope.record',
                    //     success() {
                    //         // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                    //         that.getWxSetting();
                    //     },
                    //     fail(error) {
                    //         console.log(error);
                    //     }
                    // })
                }
            }
        })
    },

    /**
     * 微信登录，在用户授权成功后登录，否则不登录
     */
    wxLogin: function() {
        var that = this;
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                console.log(res);
                a.a_wx(res.code,
                  function success(data){
                   console.log(data);
                   that.getWxUserInfo(data);
                   that.globalData.openId = data.openid;
                   that.globalData.sessionKey = data.session_key;
                   wx.setStorageSync('sessionKey',  data.session_key);
                },function fail(error){
                    console.log("location_error : " + error);
                    wx.showModal({
                      title: "登录fail",
                      content: error
                    });
                    
                })
            }
        })
    },
    getWxUserInfo: function(data) {
        var that = this;
        a.a_sign_in(data.openid,
          function success(data){
                   console.log(data);
                   that.globalData.memberInfo=data;
         },function fail(error){
                    console.log("location_error : " + error);
                    wx.showModal({
                      title: "登录fail",
                      content: error
                    });
                    
         }
        )

    /**
     * 根据openid请求后台查询，是否已绑定手机号码，即是否已注册系统账号
     */
        // wx.request({
        //     url: that.globalData.baseUrl + '/v1/member',
        //     method: 'GET',
        //     data: {
        //         openid: openid
        //     },
        //     header: {
        //         'content-type': 'application/x-www-form-urlencoded',
        //         'Accept': 'application/json'
        //     },
        //     success: function (data) {
        // /**
        //  * member表中存在该用户
        //  */
        //         if (data.statusCode === 200 && data.data.code == 200 && data.data.data.length === 1) {
        //             that.globalData.memberInfo = data.data.data[0];
        //         } else {
        //             // 不存在该用户
        //         }
        //     }
        // })
    },
    globalData: {
        openId: null,
        sessionKey: null,
        userInfo: null,
        memberInfo: null //,
        // baseUrl: "http://localhost"
    }



})
