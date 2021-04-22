const app = getApp();
const common = require("../../../utils/common.js");

Page( {
  data: {
    userInfo: {},

  },

  onLoad: function() {
  },

  suggestSubmit: function(e) {
    
    let that = this;
    let user = app.globalData.username;
    let content = e.detail.value.content;
    let newMessage = {
      "id": Date.now().toString(36),
      "user": user,
      "content": content
    }

    common.addMessage(newMessage)
   
    wx.showToast({
      title: '留言成功！',
      icon: 'success',
      duration: 2000
    })
    setTimeout(
      function () {
        wx.switchTab({
          url: '../index/index',
        })
      },
      1500
    )
  },


  logining(e) {
    var that = this
    console.log('click login------',e);
    that.setData({
      userInfo: e.detail.userInfo,
      authFlag: 1
    })
  }
})