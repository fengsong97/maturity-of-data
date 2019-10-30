var startRequest = require("../api/startRequest.js")

//sessionId保存

//后台登录接口
  function a_login(openId,doSuccess, doFail){
    var that =this;
    startRequest.getData("a/login?password=123456&username="+openId+"&__login=true&__ajax=json",
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

//注册接口
  function a_sign_in(openId,doSuccess, doFail){
    var that =this;
    startRequest.postData("account/wxSign?"
      +"userName="+openId
      +"&loginCode="+openId
      +"&userCode="+openId
      +"&userType=employee&op=add&isNewRecord=true&employee.office.officeCode=WX&employee.office.officeName=微信",
      {},
      function success(data) {
        console.log(data);
        if(data.result="true"){
          a_login(openId,
            function success(data){
              doSuccess(data)
          },function fail(data){

          })
        }else {
          a_login(openId,
            function success(data){
              doSuccess(data)
          },function fail(data){

          })
        }
        
    },function fail(data) {
      // console.log(data)
      doFail(data)
    })
}

  function a_wx(code,doSuccess, doFail){
    var that =this;
    startRequest.getData("wx/getOpenIdByCode/"+code+"?",
      function success(data) {
      console.log(data);
      doSuccess(data)
    },function fail(data) {
      // console.log(data)
      doFail(data)
    })
}
  function a_wx_getphone(parms,doSuccess, doFail){
    var that =this;
    startRequest.getData("wx/getPhone?"+"encrypted="+parms.encrypted+"&iv="+parms.iv+"&sessionkey="+parms.sessionkey,
      function success(data) {
      console.log(data);
      doSuccess(data)
    },function fail(data) {
      // console.log(data)
      doFail(data)
    })
}

//后台退出接口


 module.exports.a_wx = a_wx;
 module.exports.a_wx_getphone = a_wx_getphone;
 module.exports.a_login = a_login;
 module.exports.a_sign_in = a_sign_in;
 module.exports.a_homePage = a_homePage;
 module.exports.a_questions = a_questions;