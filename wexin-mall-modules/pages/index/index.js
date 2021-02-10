//获取应用实例
var app = getApp()
const requestUrl = require('../../config')
Page({
    data: {
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false,  // loading
        images: [
            {"picurl": "../../images/slider1.jpg"},
            {"picurl": "../../images/slider2.jpg"},
            {"picurl": "../../images/slider3.jpg"}
        ],
    },

    //事件处理函数
    swiperchange: function(e) {
        //console.log(e.detail.current)
    },

    onLoad: function() {
        console.log('onLoad')
        console.log("requestUrl", requestUrl)
        var that = this
            //调用应用实例的方法获取全局数据

        wx.request({
            url: requestUrl + 'WebServer/category/recommend/',
            method: 'POST',
            data: {},
            header: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            success: function(res) {
                console.log("index index===============",res)
                that.setData({
                    prodItems: res.data.data
                })
                setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 1500)
            }
        })
    },

    bindReplaceInput: function(e) {
      var that = this;
      let keywords = e.detail.value;
      if(keywords){
        wx.request({
          url: requestUrl + 'WebServer/product/search',
          data: {
            name: keywords
          },
          success(res) {
            if (res.statusCode == 200) {
              if (res.data.data.length > 0) {
                  var detail = res.data.data;
                  that.setData({
                    detail: detail,
                    is_show: true
                  })
                  // wx.redirectTo({
                  //   url: '../details/index?id=' + prod_id,
                  // })
              } else {
                wx.showToast({
                  title: '当前商城搜不到该商品！',
                  icon: 'error',
                  duration: 1500
                })
              }
            } else {
              wx.showToast({
                title: '网络异常',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }else{
        that.setData({
          is_show: false
        })
      }
    },

    bindNameDeatail: function(e) {
      var id = e.currentTarget.dataset.rid;
      wx.navigateTo({
        url: '../details/index?id=' + id,
      })
    }
})
