 var app = getApp();
 //��ĿURL��ͬ���֣������������ͬʱ������ĿǨ��
 //������Ϊ���Ǳ��ص��ԣ�����host���淶��ʵ����Ӧ�����㱸����������Ϣ
 var host = 'https://a.fuduo.wang/'; 
 /**
  * POST����
  * URL���ӿ�
  * postData��������json����
  * doSuccess���ɹ��Ļص�����
  * doFail��ʧ�ܵĻص�����
  */
 function postData(url, postData, doSuccess, doFail) {
   wx.request({
     //��Ŀ�������ӿڣ�ͨ���ַ���ƴ�ӷ�ʽʵ��
     url: host + url,
     header: {
       "content-type": "application/json;charset=UTF-8"
     },
     data: postData,
     method: 'POST',
     success: function (res) {
       //����ֵΪres.data,ֱ�ӽ����ص����ݴ���
       doSuccess(res.data);
     },
     fail: function () {
       doFail();
     },
   })
 }
 
 //GET���󣬲��贫�Σ�ֱ��URL���ã�
 function getData(url, doSuccess, doFail) {
   wx.request({
     url: host + url,
     header: {
       "content-type": "application/json;charset=UTF-8"
     },
     method: 'GET',
     success: function (res) {
       doSuccess(res.data);
     },
     fail: function () {
       doFail();
     },
   })
 }
 
 /**
  * module.exports������������
  * js�ļ���ͨ��var call = require("../util/request.js")  ����
  * �����������ļ���ʱ��"  "���������ͨ��../../../�������ͣ�С����ı��������Զ���ʾ����Ϊ�����
  * ��ĿĿ¼��ֹһ������ͬ��js�ļ���Ӧ�Ĺ������λ�ò�һ��
  */
 module.exports.postData = postData;
 module.exports.getData = getData;