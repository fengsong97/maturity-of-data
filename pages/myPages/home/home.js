const app = getApp()
const types = ['default', 'primary', 'warn']
const pageObject = {
  data: {
    extraClasses: '',
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
    onShow(){
    this.triggerAnimation();
  },

  onShareAppMessage() {
    return {
      title: '数据成熟度工具',
      path: 'pages/index/index'
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
  triggerTransition: function () {
    if (this.data.extraClasses == 'box-transition box-moved') {
      this.setData({
        extraClasses: 'box-transition'
      })
    } else {
      this.setData({
        extraClasses: 'box-transition box-moved'
      })
    }
  },
  triggerAnimation: function () {
    this.setData({
      extraClasses: 'box-animation'
    })
  },
  transitionEnd: function () {
    console.log('渐变已结束')
  },
  animationStart: function () {
    console.log('动画已开始')
  },
  animationIteration: function () {
    // console.log('动画进行中')
  },
  dontLogin(){
    wx.switchTab({
      url: '/pages/index/index'
    });
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
