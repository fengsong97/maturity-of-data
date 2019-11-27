function change(data) {
    var data = Object.assign({}, data);
    var jsonstr = _queryEncode(data);
    var params = Object.keys(jsonstr).map(function (key) {
        // body...
        return encodeURIComponent(key) + "=" + encodeURIComponent(jsonstr[key]);
        // return key+ "=" + jsonstr[key];
    }).join("&");
    return params;
  }
function _queryEncode(data, keyFix = '') {
    let res = {}
    for (const key in data) {
      if (typeof data[key] === 'object') {
        if(Array.isArray(data)){
            res = Object.assign(res, _queryEncode(data[key], keyFix ? (keyFix + '[' + key+ ']') : key))
        }else{
            res = Object.assign(res, _queryEncode(data[key], keyFix ? (keyFix + '.' + key) : key))
        }
      } else {
        res[keyFix ? (keyFix + '.' + key) : key] = data[key]
      }
      if (keyFix === '') {
        delete data[key]
      }
    }
    return res
  }



//json对象包括数组 转化为 url
 module.exports.change = change;
// var obj = {"id":"",
// "testUser":{
//     "userName":"wx@冯松",
//     "userCode":"wx_wFNO5fBQhn_oau1"
// },
// "testSelect":"001",
// "remarks":"asffasdfasdf",
// "aresultDetailsList":[
//         {"status":"0",
//         "id":"",
//         "testTextarea":"111",
//         "testSelectMultiple":"11",
//         "testSelect":"0"
//         },{"status":"0",
//         "id":"",
//         "testTextarea":"222",
//         "testSelectMultiple":"22",
//         "testSelect":"0"
//         }
// ]
// }
// var jsonstring = change(obj)
// id=&testUser.userName=wx@冯松&testUser.userCode=wx_wFNO5fBQhn_oau1&testSelect=001&remarks=asffasdfasdf&aresultDetailsList[0].status=0&aresultDetailsList[0].id=&aresultDetailsList[0].testTextarea=111&aresultDetailsList[0].testSelectMultiple=11&aresultDetailsList[0].testSelect=0&aresultDetailsList[1].status=0&aresultDetailsList[1].id=&aresultDetailsList[1].testTextarea=222&aresultDetailsList[1].testSelectMultiple=22&aresultDetailsList[1].testSelect=0
// id=&testUser.userName=wx%40%E5%86%AF%E6%9D%BE&testUser.userCode=wx_wFNO5fBQhn_oau1&testSelect=001&remarks=asffasdfasdf&aresultDetailsList%5B0%5D.status=0&aresultDetailsList%5B0%5D.id=&aresultDetailsList%5B0%5D.testTextarea=111&aresultDetailsList%5B0%5D.testSelectMultiple=11&aresultDetailsList%5B0%5D.testSelect=0&aresultDetailsList%5B1%5D.status=0&aresultDetailsList%5B1%5D.id=&aresultDetailsList%5B1%5D.testTextarea=222&aresultDetailsList%5B1%5D.testSelectMultiple=22&aresultDetailsList%5B1%5D.testSelect=0