//登录 
function login(doSuccess, doFail) {
	wx.login({
      success(data){
      	doSuccess(data)
        console.log(data)
      },fail(data){
        console.log(data)
        doFail(data)
      }
    })
}
function getSetting(doSuccess, doFail) {
	wx.getSetting({
      success(data){
      	doSuccess(data)
        console.log(data)
      },fail(data){
        console.log(data)
        doFail(data)
      }
    })
}


 module.exports.login = login;
 module.exports.getSetting = getSetting;