const app = getApp()
var common = require("../../common.js")
// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var display_content = ""
    var id = options.id;
    var id = options.id;
    display_content = common.getCateProducts(id);
    that.setData({
      cate: display_content,
    })
  },

  onPullDownRefresh: function (e) {
    // wx.startPullDownRefresh()
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    //调用刷新时将执行的方法
    console.log("refresh");
    wx.stopPullDownRefresh();
    this.onLoad();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})