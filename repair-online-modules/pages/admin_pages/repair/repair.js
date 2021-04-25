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
    let rep = common.getRepairObject(id);
    let username = app.globalData.username;
    if (rep.repair_status > 0 || username == "admin"){
      wx.navigateTo({
        url: '/pages/repairInfo/index?id=' + id,
      })
    }else{
      wx.showModal({
        content: '等待管理员审阅！',
        title: '提示'
      })
    }
    
  },

  onShow() {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //加载本页面的tabBar样式
    let that = this;
    let baoxiu = options.t;
    let title = "电工维修";
    if (baoxiu == "shui"){
      title = "水暖维修";
    }

    let key = app.globalData.identification;
    let username = app.globalData.username;
    wx.hideTabBar({
      success: function () {
          app.onTabBar(key);
      }
    });
    
    var replay_type = true
    var reply_content = "接收"
    var currentTab = 3;
    if (username == "admin"){
      replay_type = true
      reply_content = "确认"
      currentTab = 0
    }
    let userRepairList = common.sortRepairListByType("admin", title, currentTab)
    console.log("userRepairList", userRepairList)


    that.setData({
      result: userRepairList.reverse(),
      baoxiu: title,
      reply_content: reply_content,
      replay_type: replay_type,
      username: username,
      currentTab: currentTab
    })
  },

  bindChange: function( e ) {  
  
    var that = this;  
    var title = that.data.title;
    var status = parseInt(e.detail.current);
    console.log("change status", status)

    var username = app.globalData.username;
    var userRepairList = common.sortRepairListByType(username, title, 0);
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
    var title = that.data.baoxiu;
    var status = parseInt(e.currentTarget.dataset.current);
    console.log("switch status", status)

    var username = app.globalData.username;
    var userRepairList = common.sortRepairListByType(username, title, status);
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