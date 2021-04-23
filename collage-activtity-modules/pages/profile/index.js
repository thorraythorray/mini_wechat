const app = getApp();
const common = require("../../utils/common.js");

Page({
  data: {
   sex: '男',
   imageList:[]
  },

  onLoad: function(){
    var that = this;
    let user = app.globalData.userInfo.nickName;
    var userObj = common.getUser(user)
    if (userObj){
      that.setData({
        user: userObj
      })
    }
    
  },

  switch1Change:function(e){
    if(e.detail.value){
      this.setData({sex:'男'})
    }else{
      this.setData({sex:'女'})
    }
  },
  //表单提交
  formSubmit: function (e) {
    var that = this;
    let user = app.globalData.userInfo.nickName;
    var profile = {
      "no": user,
      "name": e.detail.value.name,
      "age": e.detail.value.age,
      "sex": that.data.sex,
      "phone": e.detail.value.phone,
      "institute": e.detail.value.institute,
    }
    console.log("profile", profile)
    common.setUserProfile(user, profile)
    wx.showToast({
      title: '修改成功！',
      icon: 'success'
    })
    setTimeout(function(){
      wx.switchTab({
        url: '/pages/my/index',
      })
    }, 1000)
  },
//拍照
  chooseImage: function () {
    var that = this;
    if (that.imageList.length > 1){
      wx.showToast({
        title: '只能上传一张！',
        icon: 'error',
        duration: 1000
      })
    }else{
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log(res)
          that.setData({
            imageList: res.tempFilePaths
          })
        }
      })
    }
    
  }
})