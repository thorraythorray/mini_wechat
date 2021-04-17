// pages/login/index.js

var app = getApp();
const common = require("../../utils/common.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdmin: false,
    category: [
    ],
    categoryTitle: "请选择"
  },

  categoryyyyy(e) {
    console.log("eeeeee",e)
    var that = this;
    var selectCate = parseInt(e.detail.value);
    that.setData({
      categoryInd: that.data.category[selectCate].categoryID,
      categoryTitle: that.data.category[selectCate].title,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let data = common.getLoginItems()
    that.setData({
      category: data,
      isAdmin: false,
    })
  },

  userLogin: function(){
    wx.navigateTo({
      url: '../login/index',
    })
  },

  adminLogin: function(){
    let that = this;
    that.setData({
      isAdmin: true
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