// pages/item/item.js
const app = getApp();
const common = require("../../common.js")
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
    console.log('options', options)
    var that = this;
    var itemId = options.itemId;
    var targetCate = common.allProds();
    for (var j in targetCate){
      console.log("targetCatetargetCatetargetCate", targetCate[j])
      if (targetCate[j].item_id == parseInt(itemId)){
        console.log("targetCate[j].images", targetCate[j].images)
        if (targetCate[j].images.length > 0){
          var itemPics = targetCate[j].images;
        }else{
          var itemPics = [targetCate[j].src];
        }
        that.setData({
          cateItemInfo: targetCate[j],
          itemPics: itemPics
        })
      }
    }
  },

  collect_it: function(e) {
    var item_id = parseInt(e.target.dataset.id);
    // var cateInfo = app.globalData.cateInfo;
    var cateInfo = common.allProds();
    var target_item = {}
    for (var j in cateInfo) {
      // var cate = cateInfo[i].items;
      // for (var j in cate) {
      if (cateInfo[j].item_id == item_id) {
        target_item = cateInfo[j]
        break
      }
      // }
    }
    var collect_list = wx.getStorageSync("collect_list") || '[]'
    var _collect_list = JSON.parse(collect_list)
    var aciton = "add";
    var message = "添加成功！"
    for (var k in _collect_list) {
      if (_collect_list[k].item_id == item_id){
        _collect_list.splice(k, 1)
        aciton = "del";
        message = "取消成功！"
        break
      }
    }
    if (aciton == "add"){
      _collect_list.push(target_item)
    }
    console.log("delllll", _collect_list)
    wx.setStorageSync("collect_list", JSON.stringify(_collect_list))
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    })
  },

  contactBuy: function(){
    wx.showToast({
      title: '已联系商家！',
      icon:"success"
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