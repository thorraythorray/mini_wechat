// pages/act_manage/index.js

var app = getApp();
const common = require("../../utils/common.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    let inst = app.globalData.inst;
    let data = common.getOrgsByInst(inst)
    that.setData({
      category: data,
      isAdmin: false,
    })
  },
  
  formSubmit: function(e) {
    let that = this;
    let org_id = e.detail.value.categoryInd;
    console.log("userInfo", userInfo)
    let form_data = {
      act_id: Date.now().toString(36),
      pm: e.detail.value.pm,
      name: e.detail.value.activity,
      info: e.detail.value.introduction,
      images: []
    }
    console.log("form data", form_data)

    common.addNewAct(org_id, form_data)
    
    wx.showToast({
      title: '创建成功',
      icon:'success',
      duration:1500
    })

    setTimeout(function()
    {
      wx.navigateBack({   //然后返回上一个页面
        delta: 1
      })
    },1500);
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