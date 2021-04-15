// pages/user_pages/baoxiujilu/baoxiujilu.js
const app = getApp();
const common = require("../../../utils/common.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: null,
    result: null,
    currentTab: 0
  },
  

  clickDetail: function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/repairInfo/index?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    //加载本页面的tabBar样式
    let that = this; 
    let key = app.globalData.identification;
    wx.hideTabBar({
      success: function () {
          app.onTabBar(key);
      }
    });
    let username = app.globalData.username;
    let userRepairList = common.sortRepairListByStatus(username, 0)
    console.log("userRepairList", userRepairList)
    that.setData({
      result: userRepairList.reverse()
    })
  },
  
  bindChange: function( e ) {  
  
    var that = this;  
    var status = parseInt(e.detail.current);
    console.log("change status", status)

    var username = app.globalData.username;
    var userRepairList = common.sortRepairListByStatus(username, status)
    console.log("change userRepairList", userRepairList)
    that.setData({
      result: userRepairList.reverse()
    })
  
  },  
  /** 
   * 点击tab切换 
   */  
  swichNav: function( e ) {  
  
    var that = this;  
    console.log("e",e)
    var status = parseInt(e.currentTarget.dataset.current);
    console.log("switch status", status)

    var username = app.globalData.username;
    var userRepairList = common.sortRepairListByStatus(username, status)
    console.log("switch userRepairList", userRepairList)
    that.setData({
      result: userRepairList.reverse(),
      currentTab: status
    })
  } ,
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