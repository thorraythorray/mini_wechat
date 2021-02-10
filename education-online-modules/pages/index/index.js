var app = getApp()
Page({
  data: {

//1. 轮播图片数据
    imgUrls: [
      '../../image/home_banner1.jpg',
      '../../image/home_banner2.jpg',
      '../../image/home_banner3.jpg'
    ],

//2. 轮播配置
    autoplay:true,
    interval: 3000,
    duration: 1200,
  
  },

  onLoad: function(){
    var that = this;
    app.authorizeApp(function(userInfo){
      that.setData({
        userInfo: userInfo
      })
    })
  },

  // onShow: function(){
  //   var that = this;
  //   app.authorizeApp(function(userInfo){
  //     that.setData({
  //       userInfo: userInfo
  //     })
  //   })
  // }

 
})
