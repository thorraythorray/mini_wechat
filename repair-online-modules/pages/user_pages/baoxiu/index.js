// pages/user/user_main.js
const app = getApp();
const util = require("../../../utils/util.js");
const common = require("../../../utils/common.js");

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
    state: "普通"
  },

  //上传
  localImg: function () {
    let that = this;
    let _images = that.data.image_list;
    wx.chooseImage({
      count: 1, //一张
      sizeType: ['original'], //原图
      sourceType: ['album'], //相册
      success: function (res) {
        _images.push(res.tempFilePaths[0])
        that.setData({
          image_list: _images
        })
      }
    })
  },
  uploadImg: function () {
    let that = this;
    let _images = that.data.image_list;
    if (_images.length > 5){
      wx.showToast({
        title: '不能超过5张!',
        icon: 'error',
        duration: 1500
      })
    }else{
      wx.chooseImage({
        count: 1, //一张
        sizeType: ['original'], //原图
        sourceType: ['camera'], //相机
        success: function (res) {
          _images.push(res.tempFilePaths[0])
          that.setData({
            image_list: _images
          })
        }
      })
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

  /** 删除图片detail */
  deleteImvDetail: function(e) {
    var that = this;
    var detail = that.data.image_list;
    var itemIndex = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '删除不可恢复，请谨慎操作',
      success(res) {
        if (res.confirm) {
          detail.splice(itemIndex, 1);
          that.setData({
            image_list: detail,
            checkUp: false
          })
        }
      }
    })
  },

  levelChange(e) {
    let that = this;
    that.setData({
      state: e.detail.value
    })
  },

  //submit事件
  formSubmit: function (e) {
    let that = this;
    let image_list = that.data.image_list;
    let username = e.detail.value.username;
    let userphone = e.detail.value.phone;
    let location = e.detail.value.location;
    let desc = e.detail.value.desc;
  
    if (!username || !userphone || !location || !desc || !image_list){
      wx.showToast({
        title: '请将信息填写完整!',
        icon: 'none',
        duration: 1500
      })
    }else{
      var t = util.formatTime(new Date)
      let repairInfo = {
        "id": Date.now().toString(36),
        "user": app.globalData.username,
        "username": username,
        "userphone": userphone,
        "location": location,
        "desc": desc,
        "state": that.data.state,
        "repair_status": 0,
        "created_time": t,
        "images": that.data.image_list
      }
      console.log("repairInfo is", repairInfo)
      common.setNewRepair(repairInfo)
      wx.showToast({
        title: '发布成功！',
        icon: 'success'
      })
      setTimeout(function(){
        wx.switchTab({
          url: '/pages/repair/repair',
        })
        // that.onLoad();
      }, 1000)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let baoxiu = options.t;
    let title = "电工维修";
    if (baoxiu == "shui"){
      title = "水暖维修";
    }
    that.setData({
      baoxiu: title
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