// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  // data: {},
  formSubmit: function (e) {
    let username = e.detail.value.username;
    let password = e.detail.value.password;
    if (username === '') {
      wx.showToast({
        title: '请填写账号',
        icon: 'none',
        duration: 1500
      })
    } else if (password === '') {
      wx.showToast({
        title: '请填写密码',
        icon: 'none',
        duration: 1500
      })
    } else {
      let permission = '0';
      switch (permission) {
        case '0':
          wx.switchTab({
            url: '/pages/user_pages/index/index',
          });
          break;
        case '1':
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