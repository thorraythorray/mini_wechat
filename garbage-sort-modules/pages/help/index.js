const app = getApp();
const requestUrl = require('../../config').requestUrl;

Page( {
  data: {
    userInfo: {},
    userListInfo: [ {
      icon: '../../images/share_index.png',
      text: '我的收藏',
      isunread: true,
      unreadNum: 2,
      num: 0
      }
    ]
  },

  onLoad: function() {
  },

  suggestSubmit: function(e) {
    
    app.getSelfUserInfo(function(userInfo) {
      wx.request({
        url: requestUrl + 'GarbageSorting/help/add',
        method: 'POST',
        header: {
          "Content-type": "application/json"
        },
        data: {
          userId: userInfo.userId,
          title: e.detail.value.title,
          content: e.detail.value.content,
        },
        success(res) {
          if (res.statusCode == 200) {
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
          } else {
            wx.showToast({
              title: '网络异常',
              icon: 'none',
              duration: 2000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }
        }
      })
    })
  }
})