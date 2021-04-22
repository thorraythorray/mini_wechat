const app = getApp();
const common = require("../../utils/common.js");

var mydata = {
  end: 0,
  replyUserName: "",
  list: [
    {
      "userPhoto": "/pages/images/account.png",
      "userName": "学生",
      "replyUserName": "管理员",
      "comment": "多久啊的局面撒开聊加盟代理Skam打了卡刷卡吗",
      "id": 1,
      "userId": 123
    },
    {
      "userPhoto": "/pages/images/account.png",
      "userName": "学生",
      "replyUserName": "管理员",
      "comment": "多久啊的局面撒开聊加盟代理Skam打了卡刷卡吗",
      "id": 2,
      "userId": 1223
    },
    {
      "userPhoto": "/pages/images/account.png",
      "userName": "学生",
      "replyUserName": "管理员",
      "comment": "多久啊的局面撒开聊加盟代理Skam打了卡刷卡吗",
      "id": 3,
      "userId": 12232
    }
  ]
}
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        "userPhoto": "/images/account.png",
        "userName": "学生",
        "replyUserName": "管理员",
        "comment": "多久啊的局面撒开聊加盟代理Skam打了卡刷卡吗",
        "id": 1,
        "userId": 123
      },
      {
        "userPhoto": "/images/account.png",
        "userName": "学生",
        "replyUserName": "管理员",
        "comment": "多久啊的局面撒开聊加盟代理Skam打了卡刷卡吗",
        "id": 2,
        "userId": 1223
      },
      {
        "userPhoto": "/images/account.png",
        "userName": "学生",
        "replyUserName": "管理员",
        "comment": "多久啊的局面撒开聊加盟代理Skam打了卡刷卡吗",
        "id": 3,
        "userId": 12232
      }
    ],
    canReply: false
  },

  reply: function(e){
    let that = this;
    let id = e.target.dataset.id;
    that.setData({
      canReply: true,
      reply_id: id
    })
  },

  submitForm: function(e){
    let that = this;
    let reply_id = that.data.reply_id;
    let comment = e.detail.value.comment;
    common.addMessageComment(reply_id, comment)
    that.setData({
      canReply: false
    })

    that.onLoad()


  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    var msg_list = common.getAllMessages()
    console.log("getAllMessages", msg_list)
    //设置scroll的高度
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight,
          list: msg_list
          // userId:app.globalData.haulUserInfo.id
        });
      }
    });
    wx.hideTabBar({
      success: function () {
          app.onTabBar('admin');
      }
    });

  },
 /**
   * 页面下拉刷新事件的处理函数
   */

  // 合并数组
  addArr(arr1, arr2) {
    for (var i = 0; i < arr2.length; i++) {
      arr1.push(arr2[i]);
    }
    return arr1;
  },
})