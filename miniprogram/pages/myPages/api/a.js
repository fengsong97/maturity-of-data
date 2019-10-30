var startRequest = require("../api/startRequest.js")

//sessionId保存

//后台登录接口
  function a_login(doSuccess, doFail){
    var that =this;
    startRequest.getData("a/login?password=123456&username=fengsong97&__login=true&__ajax=json",
      function success(data) {
      console.log(data);
      wx.setStorage({
        key:"sessionid",
        data:data.sessionid
      })
      doSuccess(data)
    },function fail(data) {
      // console.log(data)
      doFail(data)
    })
}

//获取首页接口
  function a_homePage(doSuccess, doFail){
    var that =this;
    startRequest.getData("a/gen/ahome/listData.json?",
      function success(data) {
      console.log(data);
      doSuccess(data)
    },function fail(data) {
      // console.log(data)
      doFail(data)
    })
}


  function a_questions(doSuccess, doFail){
    var that =this;
    startRequest.getData("a/gen/questions/listData.json?",
      function success(data) {
      console.log(data);
      doSuccess(data)
    },function fail(data) {
      // console.log(data)
      doFail(data)
    })
}

//后台退出接口


 module.exports.a_login = a_login;
 module.exports.a_homePage = a_homePage;
 module.exports.a_questions = a_questions;

