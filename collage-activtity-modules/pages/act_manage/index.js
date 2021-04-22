// pages/act_manage/index.js

var app = getApp();
const common = require("../../utils/common.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseViewShowDetail: true,
    image_list: [],
    categoryTitle: "请选择"
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