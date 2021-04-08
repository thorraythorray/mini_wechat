// pages/user_pages/baoxiujilu/baoxiujilu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: null,
    result: null
  },
  //预览图片
  previewImg: function (e) {
    let name = e.currentTarget.dataset.name;
    wx.previewImage({
      current: 'http://119.45.143.167:5001/repairapp/v1/get/imgs?img_name=' + name,
      urls: [
        'http://119.45.143.167:5001/repairapp/v1/get/imgs?img_name=' + name,
      ]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let info = wx.getStorageSync("info");
    that.setData({
      token: info.token
    });
    wx.request({
      url: 'http://119.45.143.167:5001/repairapp/v1/add/affairs',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': that.data.token,
      },
      success: function (res) {
        if (res.data.code === 2000) {
          that.setData({
            result: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function (err) {
        wx.showToast({
          title: '请求数据失败',
          icon: 'none',
          duration: 1500
        })
      }
    });
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