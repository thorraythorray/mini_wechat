// pages/user_pages/baoxiujilu/baoxiujilu.js
const app = getApp();
const common = require("../../utils/common.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: null,
    result: null
  },
  //预览图片
  previewImg: function (e) {
    let name = e.currentTarget.dataset.name;
    wx.previewImage({
      current: 'http://119.45.143.167:5001/repairapp/v1/get/imgs?img_name=' + name,
      urls: [
        'http://119.45.143.167:5001/repairapp/v1/get/imgs?img_name=' + name,
      ]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    //加载本页面的tabBar样式
    let that = this;
    let key = app.globalData.identification;
    let user = app.globalData.username;
    wx.hideTabBar({
      success: function () {
          app.onTabBar(key);
      }
    });
    var userRepairList = common.getUserRepair(user)
    that.setData({
      result: userRepairList
    })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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