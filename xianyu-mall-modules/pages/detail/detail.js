const app = getApp()
// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  disPlay: function(options){
    var display_content = ""
    var type = options.type;
    if (type == "index"){
      var id = options.id;
      var targ_cate = app.globalData.cateInfo;
      for (var i in targ_cate){
        if (targ_cate[i].id == parseInt(id)){
          display_content = targ_cate[i].items;
          break
        }
      }
    }else if (type == "pub"){
      var has_pubbed = wx.getStorageSync('pub_list')
      if (has_pubbed){
        display_content = JSON.parse(has_pubbed)
      }
    }else if (type == "collect"){
      var has_collect = wx.getStorageSync('collect_list')
      if (has_collect){
        display_content = JSON.parse(has_collect)
      }
    }else{
      var has_traded = wx.getStorageSync('trade_list')
      if (has_traded){
        display_content = JSON.parse(has_traded)
      }
    }
    return display_content;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var display_content = ""
    var id = options.id;
    var targ_cate = app.globalData.cateInfo;
    for (var i in targ_cate){
      if (targ_cate[i].id == parseInt(id)){
        display_content = targ_cate[i].items;
        break
      }
    }
    that.setData({
      cate: display_content,
    })
  },

  onPullDownRefresh: function (e) {
    // wx.startPullDownRefresh()
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    //调用刷新时将执行的方法
    console.log("refresh");
    wx.stopPullDownRefresh();
    this.onLoad();
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