var startRequest = require("../api/startRequest.js")
var jsonToUrl = require("../api/jsonToUrl.js")

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


  function a_questions(params,doSuccess, doFail){
    var that =this;
    startRequest.getData("a/gen/questions/listData.json?"+jsonToUrl.change(params),
      function success(data) {
      console.log(data);
      doSuccess(data)
    },function fail(data) {
      // console.log(data)
      doFail(data)
    })
}

//注册接口
  function a_sign_in(data,doSuccess, doFail){
    var that =this;
    var openId_code="wx_"+data.openId.substr(1,10);
    startRequest.postData("account/wxSign?"
      +"userCode="+openId_code
      +"&loginCode="+openId_code
      +"&userName="+"wx@"+data.userInfo.nickName
      +"&sex="+data.userInfo.gender
      +"&avatar="+data.userInfo.avatarUrl
      +"&sign="+""
      +"&wxOpenid="+data.openId
      +"&userType=employee&op=add&isNewRecord=true&employee.office.officeCode=WX&employee.office.officeName=微信",
      {},
      function success(data) {
        console.log(data.message)
        if(data.result="true"){
          a_login(openId_code,
            function success(data){
              doSuccess(data)
          },function fail(data){

          })
        }else {
          a_login(openId_code,
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
  //获取微信 openid
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

//获取手机号 未完成
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

//答题接口 新增
  function a_result_add(data,doSuccess, doFail){
    startRequest.postData("a/gen/aresults/save?"+jsonToUrl.change(data),
      {},
      function success(data) {
        // console.log(data)
        doSuccess(data)
    },function fail(data) {
      // console.log(data)
      doFail(data)
    })
}
//答题接口 列表
  function a_result_list(params,doSuccess, doFail){
    startRequest.getData("a/gen/aresults/listData.json?"+jsonToUrl.change(params),
      function success(data) {
        // console.log(data)
        doSuccess(data)
    },function fail(data) {
      // console.log(data)
      doFail(data)
    })
}

//答题接口 detail
  function a_result_detail(params,doSuccess, doFail){
    startRequest.getData("a/gen/aresults/form.json?"+jsonToUrl.change(params),
      function success(data) {
        // console.log(data)
        doSuccess(data)
    },function fail(data) {
      // console.log(data)
      doFail(data)
    })
}

//答题接口 detail
  function a_shiTiLitst(doSuccess, doFail){
    startRequest.getData("a/sys/dictData/listData.json?dictType=question_shijuan&status=0",
      function success(data) {
        // console.log(data)
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
 module.exports.a_result_add = a_result_add;
 module.exports.a_result_list = a_result_list;
 module.exports.a_result_detail = a_result_detail;
 module.exports.a_shiTiLitst = a_shiTiLitst;