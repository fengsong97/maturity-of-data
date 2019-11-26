
  function getStorage(keyname){


  }
 //项目URL相同部分，减轻代码量，同时方便项目迁移
 //这里因为我是本地调试，所以host不规范，实际上应该是你备案的域名信息
 var host = 'https://a.fuduo.wang/'; 
 // var host = 'http://localhost:8980/'; 
 /**
  * POST请求，
  * URL：接口
  * postData：参数，json类型
  * doSuccess：成功的回调函数
  * doFail：失败的回调函数
  */
 function postData(url, postData, doSuccess, doFail) {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })

  var jeesite_sessionid = wx.getStorageSync('jeesite_sessionid');
   
   wx.request({
     //项目的真正接口，通过字符串拼接方式实现
     url: host + url +"&__sid="+jeesite_sessionid,
     header: {
       "content-type": "application/json;charset=UTF-8"
     },
     data: postData,
     method: 'POST',
     success: function (res) {
       if(!toHome(res)) {return};
       //参数值为res.data,直接将返回的数据传入
       doSuccess(res.data);
       wx.hideToast()
     },
     fail: function () {
       doFail();
       wx.hideToast()
     },
   })


 }
 
 //GET请求，不需传参，直接URL调用，
 function getData(url, doSuccess, doFail) {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  })

  var jeesite_sessionid = wx.getStorageSync('jeesite_sessionid');

   wx.request({
     url: host + url +"&__sid="+jeesite_sessionid,
     header: {
       "content-type": "application/json;charset=UTF-8"
     },
     method: 'GET',
     success: function (res) {
       if(!toHome(res)) {return};
       doSuccess(res.data);
       wx.hideToast()
     },
     fail: function () {
       doFail();
       wx.hideToast()
     },
   })

}

//跳转到home页
  function toHome(res) {
    if(JSON.stringify(res.data) == "{}"){
        wx.showToast({
                  title: '账户失效,再登录',
                  icon: 'loading',
                  duration: 5000
        })
         wx.redirectTo({
            url: '/pages/myPages/home/home'
       })
         return false
      }
    return true;
  }

    

 
 /**
  * module.exports用来导出代码
  * js文件中通过var call = require("../util/request.js")  加载
  * 在引入引入文件的时候"  "里面的内容通过../../../这种类型，小程序的编译器会自动提示，因为你可能
  * 项目目录不止一级，不同的js文件对应的工具类的位置不一样
  */
 module.exports.postData = postData;
 module.exports.getData = getData;