const app = getApp();
const requestUrl = require('../../config').requestUrl;

Page( {
  data: {
    userInfo: {},
  },

  onLoad: function() {
  },

  profileSubmit: function(e) {
    
    app.getSelfUserInfo(function(userInfo) {
      console.log("update profile", userInfo)
      wx.request({
        url: requestUrl + 'GarbageSorting/user/update',
        method: 'POST',
        header: {
          "Content-type": "application/json"
        },
        data: {
          id: userInfo.id,
          userId: userInfo.userId,
          userName: e.detail.value.usernmae ? e.detail.value.usernmae: userInfo.userName,
          password: e.detail.value.password ? e.detail.value.password: userInfo.password,
          phone: userInfo.phone,
          address: e.detail.value.address ? e.detail.value.address: userInfo.address,
          headImage: ""
        },
        success(res) {
          if (res.statusCode == 200) {
            if (res.data.code == 0){
              try {
                wx.setStorageSync('userInfo', JSON.stringify(res.data.data))
              } catch (e) { 
                console.log("update profile success, storage faill ", e)
              }
              wx.showToast({
                title: '修改成功！',
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
            }
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