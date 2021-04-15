// pages/user/user_main.js
const app = getApp();
const util = require("../../utils/util.js");
const common = require("../../utils/common.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgPath: null,
    token: null,
    image_list: [],
    repair: {
      "username":  "联系人",
      "userphone": "联系电话",
      "location": "宿舍位置"
    },
    chooseViewShowDetail: true,
    state: "普通",
    repair_status_list:[
      '未处理',
      '处理中',
      '处理完成'
    ],
    repair_status_name:null
  },

  bindPickerChange(e) {
    let that = this;
    let repair_status_name = that.data.repair_status_list[e.detail.value]
    that.setData({
      repair_status: e.detail.value,
      repair_status_name: repair_status_name
    })
  },
   
  /** 查看大图Detail */
  showImageDetail: function(e) {
    let that = this;
    let detail = that.data.image_list;
    var itemIndex = e.currentTarget.dataset.id;
    wx.previewImage({
      current: detail[itemIndex], // 当前显示图片的http链接
      urls: detail // 需要预览的图片http链接列表
    })
  },

  //submit事件
  formSubmit: function (e) {
    let that = this;
    let id = that.data.id;
    let comment = e.detail.value.comment;
    let repair_status = that.data.repair_status;
    common.addRepairInfo(id, repair_status, comment)
    wx.showToast({
      title: '反馈成功！',
      icon: 'success'
    })
    setTimeout(function(){
      wx.switchTab({
        url: '/pages/repair/repair',
      })
      // that.onLoad();
    }, 1000)
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let id = options.id;
    let targ = common.getRepairObject(id);
    let indentify = app.globalData.identification;
    let repair_status_name = that.data.repair_status_list[targ.repair_status]
    that.setData({
      id: id,
      repair: targ,
      indentify: indentify,
      repair_status_name: repair_status_name
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