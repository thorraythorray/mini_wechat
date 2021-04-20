//index.js  
//获取应用实例  
var app = getApp()  
var common = require("../../utils/common.js");
Page( {  
  data: {
    winWidth: 0,  
    winHeight: 0, 
    currentTab: 0,  
  }, 
  onLoad: function() {  
    var that = this;  
    var act_list = common.getAllActivity();
    console.log("all act list", act_list)
    wx.getSystemInfo( {  
      success: function( res ) {  
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight,
          act_list: act_list
        });  
      }  
    });
  }, 
  // bindChange: function( e ) { 
  //   var that = this;  
  //   that.setData( { currentTab: e.detail.current });  
  // }, 
  swichNav: function( e ) { 
    var that = this;  
    var userInfo = app.globalData.userInfo;
    var user = userInfo.nickName;
    if (e.target.dataset.current == "0"){
      var act_list = common.getAllActivity();
    }else{
      var act_list = common.getActByUser(user);
    }
    that.setData({
      act_list: act_list,
      currentTab: e.target.dataset.current
    })
  }

})  