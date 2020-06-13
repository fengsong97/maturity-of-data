var startRequest = require("../api/startRequest.js")
var a = require("../api/a.js")

const app = getApp();
Page({
  onShareAppMessage() {
    return {
      title: '数据成熟度工具',
      path: 'pages/index/index'
    }
  },
onLoad: function() {
  this.setData({
    shiTiId:wx.getStorageSync("ShiTi").dictValue
  });
  this.setData({
    question2_answers:wx.getStorageSync("question2_answers")
  });
  this.getQuestions();
},
onShow:function(){
  this.setData({
  shitiTitle:wx.getStorageSync("ShiTi").dictLabel
})
},
  data: {
    shiTiId:'',
    shitiTitle:'',
    question2_answers:'',
    lists: [],
    treeQuestionLists: [],
    treeQuestionListsLength: 0,
    answers:[],
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 0,
    currentIndex: 0,
    toIndex: 0,
    currentName: '',
    disable: false
  },
  getQuestions(){
    var that =this;
    if(wx.getStorageSync("ShiTi").dictValue!="003"){
      a.a_q_tree({},
        function success(data){
          console.log("000"+new Date())
          var lists=data.filter(function (item) {
            return item.treeLevel===3 && item.pIds.split(",")[1]===that.data.shiTiId;
          });
          console.log("111"+new Date())
          var tempList=[];tempList.length = lists.length;
          that.setData({
            'lists':tempList
          }) 
          console.log("222"+new Date())
          var some=wx.getStorageSync("question2_answers");
          for(var i=0;i<lists.length;i++){
            lists[i].answersList=some;
            lists[i].treeNamesWeizhi=lists[i].treeNames.replace(that.data.shitiTitle+'/','');
          }
          console.log("333"+new Date())
          
          that.setData({
            'lists[0]':lists[0],
            // 'lists[1]':lists[1],
            treeQuestionLists: lists,
            treeQuestionListsLength: lists.length
          })
          console.log("444"+new Date())
      },function fail(data){
          // console.log(data);
      })

      return;
    }

    var params={
      testSelect: wx.getStorageSync("ShiTi").dictValue,
      status:"0",
      pageNo:'1',
      pageSize:'50',
      orderBy: 'a.test_select_multiple desc'
    };
    a.a_questions(params,
      function success(data){
        that.setData({
          lists:data.list,
          currentName:data.list[0].title
        })
    },function fail(data){
        // console.log(data);
    })

  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  setIndex(e){
   var buttonid=e.target.id
   var  index=this.data.currentIndex;
    if(buttonid=='button0'&&this.data.currentIndex>0){
     index= index-1
    }else if(buttonid=='button1' &&this.data.currentIndex<(this.data.lists.length-1)){
     index= index+1
    }
    this.setData({
      currentIndex: index
    })
  },
  //轮播图的切换事件
  swiperChange(e) {
    console.log("111"+new Date())
    var that=this;
    var n = e.detail.current;
    var n_1=n+1;
    if(this.data.lists[n]==undefined){
        this.setData({
          ['lists[' + n + ']']:this.data.treeQuestionLists[n]
        })
        // if(n<this.data.treeQuestionLists.length-1){
        //   this.setData({
        //   ['lists[' + n_1 + ']']:undefined
        // })
        // }
    }

    that.setData({
      currentIndex: n,
      currentName: that.data.lists[n].title|that.data.lists[n].name
    })

    console.log(this.data.currentIndex)
  },
  radioChange:function(e) {
    console.log(e);
    this.data.answers[e.currentTarget.id]=e.detail.value
    // this.setData({
    //   answers["2"]:'2'
    // })
    console.log(this.data);
  },
  radioChange2:function(e) {
    var that=this;
    // console.log(e);
    this.data.answers[e.currentTarget.id]=e.detail.value
    this.data.lists[this.data.currentIndex].result_=e.detail.value

    for (var i = 0; i < that.data.lists.length; i++) {
      if(that.data.answers[i]==undefined){
         that.toslider(i)
      return;
     }
   }

  },
  toslider(index){
    this.setData({
      toIndex: index,
      // currentName: this.data.lists[index].title|this.data.lists[index].name
    })
  },
  submit(e) {
    var that=this;

    for (var i = 0; i < that.data.lists.length; i++) {
      if(that.data.answers[i]==undefined){
         wx.showToast({
          title: '该题未答,序号为 '+(i+1),
          duration: 2000,
          icon:'none'
        })
         that.toslider(i)
      return;
     }
   }

    
    if(that.data.shiTiId==="003") {
      wx.setStorageSync('answers_title',  that.data.answers[0]?that.data.answers[0].testSelect:"默认");
    }
    wx.showModal({
      title: '确认提交吗?',
      content: '已答'+that.data.answers.length+'题,共'+that.data.lists.length+'题',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          if(that.data.shiTiId==="003") {
            that.result_add()
          }else{
            that.result_add2()
          }


        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  result_add(){
    var obj ={id:"",
          testUser:{
            userCode: app.globalData.memberInfo.user.userCode,
            userName: app.globalData.memberInfo.user.userName,
          },
          testSelect:wx.getStorageSync("ShiTi").dictValue,
          remarks:"",
          aresultDetailsList:[]
        };
    var answers = this.data.answers;
    // "0_1155000075046084608_数据战略规划_1155030816359333888_3"
    for (var i = 0; i < answers.length; i++) {
      var aresultDetails ={
        id:"",
        status:"0",
        testTextarea : answers[i].split("_")[2],
        testSelectMultiple : answers[i].split("_")[4],
        testSelect:"0"
      }
      obj.aresultDetailsList.push(aresultDetails)
    }


  //   var obj = {"id":"",
  //             "testUser":{
  //                 "userName":"wx@冯松",
  //                 "userCode":"wx_wFNO5fBQhn_oau1"
  //             },
  //             "testSelect":"001",
  //             "remarks":"asffasdfasdf",
  //             "aresultDetailsList":[
  //                     {"status":"0",
  //                     "id":"",
  //                     "testTextarea":"111",
  //                     "testSelectMultiple":"11",
  //                     "testSelect":"0"
  //                     },{"status":"0",
  //                     "id":"",
  //                     "testTextarea":"222",
  //                     "testSelectMultiple":"22",
  //                     "testSelect":"0"
  //                     }
  //             ]
  // }

    a.a_result_add(obj,
      function success(data){
          app.globalData.reloadResults=true;
          wx.switchTab({
            url: '/pages/myPages/result/result'
          })
    },function fail(data){
        // console.log(data);
    })
  },

  result_add2(){
    var obj ={id:"",
          userCode:{
            userCode: app.globalData.memberInfo.user.userCode,
            userName: app.globalData.memberInfo.user.userName,
          },
          "title":wx.getStorageSync("ShiTi").dictValue,
          "companyAvg":"",
          "evaluate":"",
          "analysis":"",
          "achievement":"",
          "shortage":"",
          "suggest":"",
          "summary":"",
          "remarks":"",
          aresultsTreeDetailsList:[]
        };
    var lists = this.data.lists;
    var answers = this.data.answers;
    // "0_1155000075046084608_数据战略规划_1155030816359333888_3"
    var answersSum=0;
    for (var i = 0; i < answers.length; i++) {
      answersSum=answersSum+answers[i]*lists[i].weight;
      var aresultDetails ={
        id:"",
        status:"0",
        "treeNames":lists[i].treeNames,
        "content":lists[i].content,
        "fuhedu":"",
        "fuheduScore":answers[i],
        "weight":lists[i].weight,
        "weightScore":(answers[i]*lists[i].weight).toFixed(2)
      }
      obj.aresultsTreeDetailsList.push(aresultDetails)
    }
    //计算 有几个能力域 1
    var nengLiArr=[];
    for(var i=0;i<lists.length;i++){
      nengLiArr.push(lists[i].treeNames.split("/")[1]);
    }
    //计算 有几个能力域 2
    nengLiArr=this.uniq(nengLiArr);
    var nengliNum=nengLiArr.length;
    var nengliObj={}
    for(var i=0;i<nengLiArr.length;i++){
        var nengliScrOne=0;
        for (var j = 0; j < obj.aresultsTreeDetailsList.length; j++) {
          if(obj.aresultsTreeDetailsList[j].treeNames.indexOf(nengLiArr[i])>=0){
              nengliScrOne=nengliScrOne + parseFloat(obj.aresultsTreeDetailsList[j].weightScore)
          }
        }
        nengliObj[nengLiArr[i]]=(nengliScrOne/100).toFixed(2);
    }
    //计算公式平均值
    obj.companyAvg=(answersSum/nengliNum/100).toFixed(2);
    obj.analysis=JSON.stringify(nengliObj).replace(/\"/g,"'");
    a.a_result_tree_add(obj,
      function success(data){
          app.globalData.reloadResults=true;
          wx.switchTab({
            url: '/pages/myPages/result/result'
          })
    },function fail(data){
        // console.log(data);
    })
    
  },
  uniq(array){
    var temp = []; //一个新的临时数组
    for(var i = 0; i < array.length; i++){
        if(temp.indexOf(array[i]) == -1){
            temp.push(array[i]);
        }
    }
    return temp;
}
})


