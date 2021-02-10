const app = getApp();
const requestUrl = require('../../config').requestUrl;

Page( {
  data: {
    
  },

  onLoad: function() {
    //调用应用实例的方法获取全局数据

  },
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  
  usernameInput: function(e) {
    this.setData({
      username: e.detail.value
    })
  },

  passwordInput: function(e) {
    this.setData({
      passwd: e.detail.value
    })
  },

  login: function() {
    var that = this;
    wx.request({
      url: requestUrl + 'GarbageSorting/user/login',
      data: {
        phone: that.data.phone,
        password: that.data.passwd,
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0){
            // save global user info 
            app.globalData.userInfo = res.data.data
            try {
              wx.setStorageSync('userInfo', JSON.stringify(res.data.data))
            } catch (e) { 
              console.log("login success, storage faill ", e)
            }
            wx.showToast({
              title: '登录成功！',
              icon: 'success',
              duration: 2000
            })
            wx.switchTab({
              url: '../my/index',
            })
          }else{
            wx.showToast({
              title: '错误信息登录',
              icon: 'error',
              duration: 2000
            })
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
  },

  register: function() {
    var that = this;
    wx.request({
      url: requestUrl + 'GarbageSorting/user/register',
      method: 'POST',
      header: {
        "Content-type": "application/json"
      },
      data: {
        userName: Math.random().toString(36).substr(2, 15),
        phone: that.data.phone,
        password: that.data.passwd,
        address: "xi'an"
      },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0){
            app.globalData.userInfo = res.data.data
            wx.showToast({
              title: '注册成功！',
              icon: 'success',
              duration: 2000
            })
            wx.switchTab({
              url: '../my/index',
            })
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
  },

  clickevent: function(option) {
    var num = parseInt(option.currentTarget.dataset.num)
    
    if (num == 1){
      wx.showToast({
        title: '请拨打12345',
        icon: 'success',
        duration: 2000
      })
    }else if(num == 0){
      wx.redirectTo({
        url: '../collect/index',
      })
    }
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