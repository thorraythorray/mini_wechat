const app = getApp();

Page( {
  data: {
    userInfo: {},

  },

  onLoad: function() {
  },

  suggestSubmit: function(e) {
    
    let that = this;
    let content = e.detail.value.content;
   
    wx.showToast({
      title: '提交成功！',
      icon: 'success',
      duration: 2000
    })
    setTimeout(
      function () {
        wx.switchTab({
          url: '../my/index',
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