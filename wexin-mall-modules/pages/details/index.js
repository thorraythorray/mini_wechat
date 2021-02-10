var app = getApp()
const requestUrl = require('../../config')
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        // prodInfo: {
        //     "id": 1,
        //     "name": "华为 全面屏 笔记本",
        //     "price": 479900,
        //     "description": "华为笔记本，金属化一体机身采用4.4微边框屏幕，屏幕占比高达88%，使用带来更加宽广的浏览视野。此外机身内置空间散冷技术，高效散热畅快运行，同时可有效降低运行噪音。",
        //     "imageUrl": "https://img20.360buyimg.com/mobilecms/s700x700_jfs/t1/26362/25/9912/435471/5c820ec4E170e6d60/c0ae29ec5feb2352.png",
        //     "categoryId": 1,
        //     "categoryName": "电脑"
        // }
    },

    onLoad: function(options) {
      var that = this
      console.log("options.id", options.id)
      // 商品详情

      wx.getSetting({
          success(ress) {
            console.log("sssssssssssss", ress)
            if (!ress.authSetting['scope.userInfo']) {
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  wx.getUserInfo({
                    success: function (res) {
                      console.log("hhhhhhhhhhhhhhhhh", res.userInfo)
                      that.globalData.userInfo = res.userInfo
                      typeof cb == "function" && cb(that.globalData.userInfo)
                    }
                  })
                },
                fail(failres){
                  console.log("failres",failres)
                }
              })
            }
          }
        })

        app.getUserInfo(function(userInfo) {
          //更新数据
          that.setData({
            userId: userInfo.nickName,
          })
        })

        wx.request({
            url: requestUrl + 'WebServer/product/detail/',
            method: 'POST',
            data: {
                "id": options.id
            },
            header: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            success: function(res) {
                that.setData({
                    prodInfo: res.data,
                })
            }
        })
    },

    add_cart: function(e){
        var that = this

        wx.getSetting({
          success(ress) {
            console.log("sssssssssssss", ress)
            if (!ress.authSetting['scope.userInfo']) {
              wx.showToast({
                icon: 'error',
                title: '请先授权！',
                duration: 1000
              })
              setTimeout(function () {
                wx.switchTab({
                  url: '../my/index',
                })
              }, 1000)
            }else{
              // 商品详情
              let prod_id = parseInt(e.target.dataset.id)
              wx.request({
                  url: requestUrl + 'WebServer/cart/add/',
                  method: 'POST',
                  data: {
                      "userId": that.data.userId,
                      "productId": prod_id
                  },
                  header: {
                      "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
                  },
                  success: function(res) {
                      wx.showToast({
                        icon: 'success',
                        title: '已加入购物车！',
                        duration: 1000
                      })
                      setTimeout(function () {
                        wx.switchTab({
                          url: '../cart/index',
                        })
                      }, 1000)
                  }
              })
            }
          }
        })
    }
})
