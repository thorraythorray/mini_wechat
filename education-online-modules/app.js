//app.js
App({

// 1.程序启动完毕
  onLaunch:function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

// 2.当小程序启动，或从后台进入前台显示会触发
    onShow: function() {
      // Do something when show.
  },

  // 3.当小程序从前台进入后台，会触发 
  onHide: function() {
      // Do something when hide.
  },

// 4.获取用户信息
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  authorizeApp: function(cb){
    var that = this;
    wx.getSetting({
      success(ress) {
        if (!ress.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '提示',
            content: '需要您先授权后再使用！',
            showCancel: false,
            success (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../me/index',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          
        }else{
          that.getUserInfo()
        }
      }
    })
  },

// 5.全局数据

  globalData:{
    userInfo:null,
    request_url: "https://localhost",
    resource_url: "https://cloud.thorray.com/temp/images/"
  }
})