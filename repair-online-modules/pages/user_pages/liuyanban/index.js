const app = getApp();
const common = require("../../../utils/common.js");
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    canReply: false
  },

  reply: function(e){
    let that = this;
    let id = e.target.dataset.id;
    that.setData({
      canReply: true,
      reply_id: id
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var user = app.globalData.username;

    var msg_list = common.getUserMessages(user)
    console.log("getAllMessages", msg_list)
    //设置scroll的高度
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight,
          list: msg_list
          // userId:app.globalData.haulUserInfo.id
        });
      }
    });
    wx.hideTabBar({
      success: function () {
          app.onTabBar('admin');
      }
    });
  },
  /**
   * 页面下拉刷新事件的处理函数
   */

  // 合并数组
  addArr(arr1, arr2) {
    for (var i = 0; i < arr2.length; i++) {
      arr1.push(arr2[i]);
    }
    return arr1;
  },
})