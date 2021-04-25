// pages/login/login.js
var app = getApp();
const common = require("../../utils/common.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    auth_type: "user"
  },

  changeIdentify(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let that = this;
    that.setData({
      auth_type: e.detail.value
    })
  },

  formSubmit: function (e) {
    let that = this;
    let auth_type = that.data.auth_type
    console.log("auth_type", auth_type)
    let username = e.detail.value.username;
    let password = e.detail.value.password;
    let reg = /^1[34578]\d{9}$/;
    let error_msg = "";
    
    let real_passwd = "123456";
    if (!username){
      var userObj = common.getUser(username);
      if (userObj) {
        real_passwd = userObj.passwd;
      }
    }
    console.log("passwd is", real_passwd)

    if (auth_type == "admin"){
      if (username != "admin" && username != "admins" && username != "admind"){
        error_msg = "管理员账号是admin,admins,admind！"
      }else if(password != real_passwd){
        error_msg = "密码不正确，首次登录密码是123456!"
      }
    }else{
      if (!username) {
        error_msg = "输入正确的学号！"
      }else if(password != real_passwd){
        error_msg = "密码不正确，首次登录密码是123456!"
      }
    }
    if (error_msg){
      wx.showToast({
        title: error_msg, 
        icon: 'none',
        duration: 1500
      })
    }else{
      app.globalData.identification = auth_type;
      app.globalData.username = username;
      switch (auth_type) {
        case 'user':
          wx.switchTab({
            url: '/pages/user_pages/index/index',
          });
          break;
        case 'admin':
          wx.switchTab({
            url: '/pages/admin_pages/index/index',
          });
          break;
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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