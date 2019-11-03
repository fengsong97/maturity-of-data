const app = getApp()
const types = ['default', 'primary', 'warn']
const pageObject = {
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
  },
    onLoad(opts) {
     wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                 this.setData({
              loading: true,
              disabled: true

              }) 

    }}})

   },
  

  onShareAppMessage() {
    return {
      title: 'button',
      path: 'page/component/pages/button/button'
    }
  },

  setDisabled() {
    this.setData({
      disabled: !this.data.disabled
    })
  },

  setPlain() {
    this.setData({
      plain: !this.data.plain
    })
  },

  setLoading() {
    this.setData({
      loading: !this.data.loading
    })
  },

  getPhoneNumber(){

  },
    getUserInfo: function (e) {
      console.log(e)
      // var userInfo = wx.getStorageSync('userInfo');
      if(e.detail.errMsg ="getUserInfo:ok"){
         this.setData({
              loading: true,
              disabled: true

              }) ;
         
        app.getWxSetting();
      }else {
        wx.showToast({
            icon:'none',
            title: '授权失败'
        })
      }
      
  }
}

for (let i = 0; i < types.length; ++i) {
  (function (type) {
    pageObject[type] = function () {
      const key = type + 'Size'
      const changedData = {}
      changedData[key] =
        this.data[key] === 'default' ? 'mini' : 'default'
      this.setData(changedData)
    }
  }(types[i]))
}

Page(pageObject)
