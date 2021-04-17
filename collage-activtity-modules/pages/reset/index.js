const app=getApp();
const common = require("../../utils/common.js");

// pages/password/password.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
  
  },
  formSubmit:function(e){
    // console.log(e);
    var oldpwd=e.detail.value.oldpwd;
    var newpwd = e.detail.value.newpwd;
    var newpwd2 = e.detail.value.newpwd2;
    let user = app.globalData.username;
    // console.log(no);
    if(oldpwd=='' || newpwd=='' || newpwd2==''){
      wx.showToast({
        title: '密码不能为空',
        icon:'none',
        duration:1000
      })
    }else if(newpwd!=newpwd2){
      wx.showToast({
        title: '两次输入不一致',
        icon: 'none',
        duration: 1000
      })
    }else{
      common.resetUserPasswd(user, newpwd2)
      wx.showToast({
        title: '修改成功！',
        icon: 'success'
      })
      setTimeout(function(){
        wx.switchTab({
          url: '/pages/my/my',
        })
      }, 1000)
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