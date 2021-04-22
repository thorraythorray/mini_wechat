const common = require("../../utils/common");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let inst = app.globalData.inst;
    console.log("inst_name", inst)
    let msg_list = common.getApplyByInst(inst)
    that.setData({
      msg_list: msg_list
    })
  },

  agree:function(e){
    let that = this;
    var id = e.currentTarget.dataset.id;
    common.feedbackApply(id, 1)
    that.onLoad()
  },

  reject:function(){
    let that = this;
    var id = e.currentTarget.dataset.id;
    common.feedbackApply(id, 2)
    that.onLoad()
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