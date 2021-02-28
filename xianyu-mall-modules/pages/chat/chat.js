// pages/contact/contact.js
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';

  msgList = [{
      speaker: 'server',
      contentType: 'text',
      content: '您好！'
    },
    {
      speaker: 'customer',
      contentType: 'text',
      content: '宝贝还在吗？'
    }
  ]
  that.setData({
    msgList,
    inputVal
  })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    initData(that);
    var new_msg = wx.getStorageSync('chat_msg') || []
    var new_msgList = that.data.msgList
    if (new_msg.length > 0){
      new_msg = JSON.parse(new_msg)
      new_msgList = new_msgList.concat(new_msg)
    }
    
    this.setData({
      cusHeadIcon: app.globalData.userInfo.avatarUrl,
      msgList: new_msgList
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    var that = this;
    var msgList = that.data.msgList
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });
    var new_msg = wx.getStorageSync('chat_msg') || []
    if (new_msg.length > 0){
      new_msg = JSON.parse(new_msg)
    }
    new_msg.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    wx.setStorageSync('chat_msg', JSON.stringify(new_msg))
  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }

})
