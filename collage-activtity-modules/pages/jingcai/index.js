const common = require("../../utils/common");
const app = getApp();

Page({
  data: {
    name: '',
    class: '',
    gender: [{
        name: '男',
        value: '0',
        checked: true
      },
      {
        name: '女',
        value: '1',
        checked: false
      }
    ],
    g:'',
    chooseViewShowDetail: true,
    image_list: [],
  },
  gen:function(a){
    var that = this
    if(a.detail.value==0){
      that.setData({
        g:'男'
      })
    }
    else{
      that.setData({
        g:'女'
      })
    }
    console.log(that.data.g)
  },

  onLoad: function(options){
    let that = this;
    let act_id = options.act_id;
    that.setData({
      act_id: act_id
    })
  },

  formSubmit: function(e) {
    let that = this;
    let userInfo = app.globalData.userInfo;
    console.log("userInfo", userInfo)
    let form_data = {
      id: Date.now().toString(36),
      act_id: that.data.act_id,
      images: that.data.image_list
    }
    console.log("form data", form_data)

    common.addJingcai(form_data)
    
    wx.showToast({
      title: '提交成功',
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
    if (_images.length > 1){
      wx.showToast({
        title: '暂时支持一张照片!',
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
})