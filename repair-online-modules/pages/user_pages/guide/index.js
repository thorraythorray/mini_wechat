
// pages/funny/index.js
const app = getApp();
const common = require("../../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // contents: [{
    //   "title": "校园网报修指南",
    //   "date": "2017-03-18",
    //   "content": "PC端操作请登陆http://itss.wxc.edu.cn/进行报修，或进入网络中心主页，在导航栏点击“运维报修”。学生和教师的用户名、密码与学校“信息门户”的用户名和密码一致(学生账户是学号，教工账户是教工号，如若未修改密码，则默认为身份证后8位)。 "
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var notice = common.getNotice()
    wx.getSystemInfo({
      success (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        
        that.setData({
          windowHeight: res.windowHeight,
          notice: notice
        })
      }
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