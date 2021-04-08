// pages/user/user_main.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgPath: null,
    token: null,
  },

  //上传
  localImg: function () {
    let that = this;
    wx.chooseImage({
      count: 1, //一张
      sizeType: ['original'], //原图
      sourceType: ['album'], //相册
      success: function (res) {
        that.setData({
          imgPath: res.tempFilePaths[0]
        })
      }
    })
  },
  uploadImg: function () {
    let that = this;
    wx.chooseImage({
      count: 1, //一张
      sizeType: ['original'], //原图
      sourceType: ['camera'], //相机
      success: function (res) {
        that.setData({
          imgPath: res.tempFilePaths[0]
        })
      }
    })
  },
  //submit事件
  formSubmit: function (e) {
    let that = this;
    let desc = e.detail.value.desc;
    let remark = e.detail.value.remark;
    let site = e.detail.value.site;
    if (desc === '') {
      wx.showToast({
        title: '请填写问题描述',
        icon: 'none',
        duration: 1500
      })
    } else if (site === '') {
      wx.showToast({
        title: '请填写具体位置',
        icon: 'none',
        duration: 1500
      })
    } else if (that.data.imgPath === null) {
      wx.request({
        url: 'http://119.45.143.167:5001/repairapp/v1/add/affairs',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': that.data.token
        },
        method: 'POST',
        data: {
          desc: desc,
          remark: remark,
          site: site,
        },
        success: function (res) {
          if (res.data.code === 2000) {
            wx.showToast({
              title: '成功提交',
              icon: 'success',
              duration: 1500
            })
          }
        },
        fail: function (res) {
          console.log('返回失败: ', res);
          wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 1500
          });
        }
      })
      return false;
    } else {
      wx.uploadFile({
        filePath: that.data.imgPath,
        name: 'img',
        url: 'http://119.45.143.167:5001/repairapp/v1/add/affairs',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': that.data.token
        },
        method: 'POST',
        formData: {
          desc: desc,
          remark: remark,
          site: site,
        },
        success: function (res) {
          if (res.data.code === 2000) {
            wx.showToast({
              title: '成功提交',
              icon: 'success',
              duration: 1500
            })
          }

        },
        fail: function (res) {
          console.log('返回失败: ', res);
          wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 1500
          });
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //加载本页面的tabBar样式
    wx.hideTabBar({
      success: function () {
        app.onTabBar('user');
      }
    });
    //获取缓存中的值
    let info = wx.getStorageSync("info");
    that.setData({
      token: info.token
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
  onHide: function () {},

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