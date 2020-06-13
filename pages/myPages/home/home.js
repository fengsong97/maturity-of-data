const app = getApp()
const types = ['default', 'primary', 'warn']
const pageObject = {
  data: {
  },
    onLoad(opts) {
     wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            console.log("已授权")

    }}})

   },
    onShow(){
  },

  onShareAppMessage() {
    return {
      title: '数据成熟度工具',
      path: 'pages/index/index'
    }
  },

  getPhoneNumber(){

  },
    getUserInfo: function (e) {
      console.log(e)
      // var userInfo = wx.getStorageSync('userInfo');
      if(e.detail.errMsg ="getUserInfo:ok"){
         this.setData({
              loading: true,
              disabled: false

              }) ;
         
        app.getWxSetting();
      }else {
        wx.showToast({
            icon:'none',
            title: '授权失败'
        })
      }
      
  },
  dontLogin(){
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
  
}

Page(pageObject)
