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
    repair_status_dict:{
      '接收报修': 1,
      '修理完成': 2,
      '已提交': 0,
      '已阅': 3
    },
    repair_status_name:null
  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let id = options.id;
    let targ = common.getRepairObject(id);
    let indentify = app.globalData.identification;
    let username = app.globalData.username;
    let repair_status_name = 0;
    let commnet_canUse = false
    let pingjia_canUse = true
    let status_canUse = false
    let repair_status_list = ['已提交']
    if (username == "admins" || username == "admind"){
      commnet_canUse = true
      pingjia_canUse = false
      status_canUse = true
      repair_status_list = [
        '接收报修',
        '修理完成'
      ]
    }else if (username == "admin"){
      commnet_canUse = false
      pingjia_canUse = false
      status_canUse = true
      repair_status_list = [
        '已阅'
      ]
    }

    for (var i in that.data.repair_status_dict){
      if (that.data.repair_status_dict[i] == targ.repair_status){
        repair_status_name = i
      }
    }
    that.setData({
      id: id,
      repair: targ,
      indentify: indentify,
      repair_status: targ.repair_status,
      repair_status_name: repair_status_name,
      username: username,
      commnet_canUse: commnet_canUse,
      pingjia_canUse: pingjia_canUse,
      status_canUse: status_canUse,
      repair_status_list: repair_status_list
    })
  },

  bindPickerChange(e) {
    console.log("e", e)
    let that = this;
    let key = parseInt(e.detail.value);
    let repair_status_name = that.data.repair_status_list[key]
    let res = that.data.repair_status_dict;
    for (var i in res){
      if (i == repair_status_name){
        that.setData({
          repair_status: res[i],
          repair_status_name: repair_status_name
        })
      }
    } 
    
    
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
    let pingjia = e.detail.value.pingjia;    
    
    let repair_status = that.data.repair_status;
    common.addRepairInfo(id, repair_status, comment, pingjia)
    wx.showToast({
      title: '反馈成功！',
      icon: 'success'
    })
    setTimeout(function(){
      wx.navigateBack({
        delta: 2,
      })
      // that.onLoad();
    }, 1000)
      
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