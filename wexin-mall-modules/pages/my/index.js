var app = getApp()
const requestUrl = require('../../config')
Page( {
  data: {
    userInfo: {},
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [ {
      icon: '../../images/iconfont-dingdan.png',
      text: '我的订单',
      isunread: true,
      unreadNum: 2,
      num: 0
    // }, {
    //     icon: '../../images/iconfont-card.png',
    //     text: '我的代金券',
    //     isunread: false,
    //     unreadNum: 2
    //   }, {
    //     icon: '../../images/iconfont-icontuan.png',
    //     text: '我的拼团',
    //     isunread: true,
    //     unreadNum: 1
      // }, {
      //   icon: '../../images/iconfont-shouhuodizhi.png',
      //   text: '收货地址管理'
      }, {
        icon: '../../images/iconfont-kefu.png',
        text: '联系客服',
        num: 1
      // }, {
      //   icon: '../../images/iconfont-help.png',
      //   text: '常见问题'
      }]
  },

  onLoad: function() {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      console.log("userInfouserInfo", userInfo)
      that.setData( {
        userInfo: userInfo
      })
    })

    var auth_flag = 0
    wx.getSetting({
      success(ress) {
        console.log("sssssssssssss", ress)
        if (ress.authSetting['scope.userInfo']) {
          auth_flag = 1
        }
        that.setData( {
          authFlag: auth_flag
        })
      }
    })
  },

  clickevent: function(option) {
    console.log("ddddd", option)
    var that = this
    var num = parseInt(option.target.dataset.num)
    
    if (num == 1){
      wx.showToast({
        title: '请拨打12345',
        icon: 'success',
        duration: 2000
      })
    }else if(num == 0){
      wx.redirectTo({
        url: '../order/index',
      })
    }
  },

  // auth_click: function() {
  //   var that = this
  //   app.getUserInfo( function( userInfo ) {
  //     //更新数据
  //     console.log("userInfouserInfo", userInfo)
  //     that.setData( {
  //       userInfo: userInfo,
  //       authFlag: 1
  //     })
  //   })
  // }
  logining(e) {
    var that = this
    console.log('click login------',e);
    that.setData({
      userInfo: e.detail.userInfo,
      authFlag: 1
    })

    app.getUserInfo(function(userInfo) {
      //更新数据
      console.log("userInfo", userInfo)
    })
  }
})