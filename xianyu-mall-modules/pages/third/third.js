// pages/wohuandaode/wohuandaode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    // avatarUrl: '../../asset/image/pp.png',
    // item:'未获取头像昵称'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获取用户信息
  getUserInfo(info) {
    const userInfo = info.detail.userInfo
    this.setData({
      userInfo: info.detail.userInfo,
      hasUserInfo: true,
      // item:'已获取头像昵称'
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