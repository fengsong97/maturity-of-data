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
  onShow: function() {
    var that = this;
   wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          that.getHomePage();
          that.getShiTiLitst();
    }else{
      wx.setStorageSync('ShiTi',{dictValue:"错误信息"})
      wx.setStorageSync('jeesite_sessionid','错误信息');

    }}})

  },
  data: {
    homeDes:"这是一个数据能力熟度小程序, 帮助个人或公司来加深对数据现状的认识",
    shitiName:"默认试题",
    ShiTiArray: [],
    index: 0
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
  getShiTiLitst(){
    var that =this;
    a.a_shiTiLitst(
      function success(data){
        that.setData({
          ShiTiArray:data
        });
        that.saveShiti(0)
        console.log(that.data.ShiTiArray)
      },function fail(data){
        // console.log(data);
    })
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
  },
  bindPickerChange(e){
    this.setData({   //给变量赋值
      index: e.detail.value,  //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
    });
    this.saveShiti(e.detail.value);
 },
 saveShiti(index){
  wx.setStorageSync('ShiTi',this.data.ShiTiArray[index])
 }
})
