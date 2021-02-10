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
    that.setData({
      cateInfo: app.globalData.cateInfo
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


  
