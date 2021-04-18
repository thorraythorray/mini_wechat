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

  formSubmit: function (e) {
    let that = this;
    let institute = e.detail.value.categoryTitle;
    let password = e.detail.value.password;

    if (password != "123456") {
      wx.showToast({
        title: "登录密码是123456!", 
        icon: 'error',
        duration: 1500
      })
    }else{
      app.globalData.identification = "admin";
      app.globalData.user = institute;
      wx.navigateTo({
        url: '../admin_index/index',
      })
    }
  },

  userLogin: function(){
    app.globalData.identification = "user";

    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.navigateTo({
          url: '../index/index',
        })
      }
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