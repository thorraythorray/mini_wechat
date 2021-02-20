// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '师小淘，‘淘’出困境',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiper_list: [
      "/images/swiper1.jpg",
      "/images/swiper2.jpg",
      "/images/swiper3.jpg",
    ]
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    var that = this;
    var screenHeigh = "";
    var itemHeight = "";
    wx.getSystemInfo({
      success (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        screenHeigh = res.windowHeight
        itemHeight = (res.windowHeight - 154) / 3 + 8;
      }
    })
    
    that.setData({
      cateInfo: app.globalData.cateInfo,
      screenHeigh: screenHeigh,
      itemHeight: itemHeight
    })
  },

  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})


  
