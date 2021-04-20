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
    g:''
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
    let org_id = options.org_id;
    that.setData({
      org_id: org_id
    })
  },

  formSubmit: function(e) {
    let that = this;
    let userInfo = app.globalData.userInfo;
    console.log("userInfo", userInfo)
    let form_data = {
      name: e.detail.value.name,
      institute: e.detail.value.institute,
      grade: e.detail.value.grade,
      gender:that.data.g,
      phone:e.detail.value.phone,
      user: userInfo.nickName,
      org_id: that.data.org_id
    }
    console.log("form data", form_data)

    common.applyOrganize(form_data)
    
    wx.showToast({
      title: '提交成功',
      icon:'success',
      duration:1500
    })

  },

})